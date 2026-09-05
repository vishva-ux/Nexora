import asyncio
import os
from typing import Dict, Any
from app.graph.state import WorkflowState
from app.llm.demo_provider import DemoLLMProvider
from app.llm.openai_provider import OpenAIProvider
from app.llm.ollama_provider import OllamaProvider

def get_provider():
    provider_type = os.getenv("LLM_PROVIDER", "ollama").lower()
    api_key = os.getenv("OPENAI_API_KEY", "")
    use_demo = os.getenv("USE_DEMO_MODE", "false").lower() == "true"

    if use_demo:
        return DemoLLMProvider()

    if provider_type == "openai" and api_key:
        return OpenAIProvider(api_key=api_key)

    # Default to Ollama local LLM provider with fallback
    return OllamaProvider(
        base_url=os.getenv("OLLAMA_BASE_URL", "http://localhost:11434"),
        model=os.getenv("OLLAMA_MODEL", "llama3")
    )

async def node_classify_query(state: WorkflowState) -> WorkflowState:
    state["status"] = "classified"
    state["logs"].append(f"Received question: '{state['question']}'")
    return state

async def node_parallel_analysis(state: WorkflowState) -> WorkflowState:
    provider = get_provider()
    state["logs"].append(f"Started parallel analysis using LLM Provider ({provider.__class__.__name__})")
    
    agents = [
        ("architect", "Senior System Architect", "Architecture, maintainability, scalability, design tradeoffs"),
        ("researcher", "Technical Researcher", "Evidence, benchmarks, knowledge base, technical documentation"),
        ("security", "Security Engineer", "Threats, authentication, data protection, attack surface, compliance"),
        ("performance", "Performance Specialist", "Latency, throughput, database performance, caching, concurrency")
    ]

    tasks = [
        provider.analyze_agent(agent_id, role, focus, state["question"], state.get("context", ""), state.get("evidence", []))
        for agent_id, role, focus in agents
    ]

    results = await asyncio.gather(*tasks, return_exceptions=True)
    opinions = []
    for (agent_id, _, _), res in zip(agents, results):
        if isinstance(res, Exception):
            state["logs"].append(f"Agent {agent_id} failed gracefully: {str(res)}")
        else:
            opinions.append(res.model_dump())
            state["logs"].append(f"Agent {agent_id} completed analysis (Confidence: {int(res.confidence * 100)}%)")

    state["opinions"] = opinions
    state["status"] = "analysis_completed"
    return state

async def node_cross_critique(state: WorkflowState) -> WorkflowState:
    provider = get_provider()
    state["logs"].append("Cross-critique phase initiated between agent council")
    
    critiques = []
    for op in state["opinions"]:
        sender_id = op["agent_id"]
        res = await provider.generate_critique(sender_id, f"{sender_id.capitalize()} Agent", state["opinions"], state["question"])
        for item in res:
            critiques.append(item.model_dump())

    state["critiques"] = critiques
    state["status"] = "critique_completed"
    return state

async def node_debate(state: WorkflowState) -> WorkflowState:
    state["logs"].append("Debate round active. Analyzing dissent and counterarguments...")
    messages = []
    disagreements = []
    
    for c in state["critiques"]:
        messages.append({
            "sender_agent_id": c["sender_agent_id"],
            "target_agent_id": c.get("target_agent_id"),
            "message_type": c["message_type"],
            "content": c["content"]
        })
        if c["message_type"] in ["Challenge", "Critique"]:
            disagreements.append({
                "challenger": c["sender_agent_id"],
                "target": c.get("target_agent_id"),
                "reason": c["content"]
            })

    state["debate_messages"] = messages
    state["disagreements"] = disagreements
    if disagreements:
        state["logs"].append(f"DISSENT DETECTED: {len(disagreements)} challenge(s) identified")
    state["status"] = "debate_completed"
    return state

async def node_consensus_judge(state: WorkflowState) -> WorkflowState:
    provider = get_provider()
    state["logs"].append("Consensus Judge evaluating arguments, evidence, and minority opinions...")
    
    consensus_res = await provider.generate_consensus(
        state["question"],
        state["opinions"],
        state["critiques"],
        state.get("evidence", [])
    )
    
    state["consensus"] = consensus_res.model_dump()
    state["status"] = "completed"
    state["logs"].append(f"Consensus achieved with {int(consensus_res.confidence * 100)}% confidence")
    return state
