import json
import os
from typing import Dict, Any
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from app.llm.base import ILLMProvider, AgentOpinionOutput, CritiqueOutput, ConsensusOutput
from app.llm.demo_provider import DemoLLMProvider

class OpenAIProvider(ILLMProvider):
    def __init__(self, api_key: str, model_name: str = "gpt-4o-mini"):
        self.api_key = api_key
        self.model_name = model_name
        self.fallback = DemoLLMProvider()
        try:
            self.llm = ChatOpenAI(openai_api_key=api_key, model=model_name, temperature=0.2)
        except Exception:
            self.llm = None

    async def analyze_agent(self, agent_id: str, role: str, focus: str, question: str, context: str, evidence: list[str]) -> AgentOpinionOutput:
        if not self.llm or not self.api_key:
            return await self.fallback.analyze_agent(agent_id, role, focus, question, context, evidence)

        prompt = f"""You are the {role} AI agent. Focus areas: {focus}.
Analyze this problem: "{question}". Context: {context}. Evidence: {evidence}.
Respond ONLY in JSON matching this schema:
{{
    "agent_id": "{agent_id}",
    "recommendation": "Short recommendation title",
    "reasoning_summary": "Detailed technical reasoning summary",
    "confidence": 0.85,
    "risks": ["risk 1", "risk 2"],
    "assumptions": ["assumption 1"],
    "counterarguments": ["counterargument 1"]
}}"""
        try:
            res = await self.llm.ainvoke([SystemMessage(content="You are a specialized enterprise technical AI agent."), HumanMessage(content=prompt)])
            data = json.loads(res.content)
            return AgentOpinionOutput(**data)
        except Exception:
            return await self.fallback.analyze_agent(agent_id, role, focus, question, context, evidence)

    async def generate_critique(self, sender_id: str, sender_role: str, opinions: list[Dict[str, Any]], question: str) -> list[CritiqueOutput]:
        if not self.llm or not self.api_key:
            return await self.fallback.generate_critique(sender_id, sender_role, opinions, question)
        try:
            prompt = f"As {sender_role} ({sender_id}), critique these opinions for question '{question}': {json.dumps(opinions)}. Return JSON list of critique objects."
            res = await self.llm.ainvoke([HumanMessage(content=prompt)])
            items = json.loads(res.content)
            return [CritiqueOutput(**item) for item in items]
        except Exception:
            return await self.fallback.generate_critique(sender_id, sender_role, opinions, question)

    async def generate_consensus(self, question: str, opinions: list[Dict[str, Any]], critiques: list[Dict[str, Any]], evidence: list[str]) -> ConsensusOutput:
        if not self.llm or not self.api_key:
            return await self.fallback.generate_consensus(question, opinions, critiques, evidence)
        try:
            prompt = f"As CONSENSUS JUDGE, evaluate question '{question}', opinions: {json.dumps(opinions)}, critiques: {json.dumps(critiques)}. Return valid JSON for ConsensusOutput schema."
            res = await self.llm.ainvoke([HumanMessage(content=prompt)])
            data = json.loads(res.content)
            return ConsensusOutput(**data)
        except Exception:
            return await self.fallback.generate_consensus(question, opinions, critiques, evidence)
