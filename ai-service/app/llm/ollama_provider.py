import json
import os
import httpx
from typing import Dict, Any
from app.llm.base import ILLMProvider, AgentOpinionOutput, CritiqueOutput, ConsensusOutput
from app.llm.demo_provider import DemoLLMProvider

class OllamaProvider(ILLMProvider):
    """
    Ollama Provider for local LLM inference (Llama, Mistral, etc.) via Ollama REST API.
    Gracefully falls back to DemoLLMProvider if local Ollama server is unreachable.
    """

    def __init__(self, base_url: str = None, model: str = None):
        self.base_url = base_url or os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
        self.model = model or os.getenv("OLLAMA_MODEL", "llama3")
        self.fallback = DemoLLMProvider()

    async def _call_ollama(self, prompt: str) -> Optional[str]:
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                resp = await client.post(
                    f"{self.base_url}/api/generate",
                    json={
                        "model": self.model,
                        "prompt": prompt,
                        "stream": False,
                        "format": "json"
                    }
                )
                if resp.status_code == 200:
                    data = resp.json()
                    return data.get("response")
        except Exception:
            pass
        return None

    async def analyze_agent(self, agent_id: str, role: str, focus: str, question: str, context: str, evidence: list[str]) -> AgentOpinionOutput:
        prompt = f"""You are the {role} AI agent. Focus: {focus}.
Analyze problem: "{question}". Context: {context}. Evidence: {evidence}.
Output MUST be JSON matching schema:
{{
    "agent_id": "{agent_id}",
    "recommendation": "Short recommendation title",
    "reasoning_summary": "Detailed technical reasoning summary",
    "confidence": 0.85,
    "risks": ["risk 1"],
    "assumptions": ["assumption 1"],
    "counterarguments": ["counterargument 1"]
}}"""
        raw_res = await self._call_ollama(prompt)
        if raw_res:
            try:
                data = json.loads(raw_res)
                return AgentOpinionOutput(**data)
            except Exception:
                pass
        
        # Fallback if Ollama model fails or unavailable
        return await self.fallback.analyze_agent(agent_id, role, focus, question, context, evidence)

    async def generate_critique(self, sender_id: str, sender_role: str, opinions: list[Dict[str, Any]], question: str) -> list[CritiqueOutput]:
        prompt = f"""As {sender_role} ({sender_id}), critique opinions for question '{question}': {json.dumps(opinions)}.
Return JSON list of critique objects matching format:
[
  {{"sender_agent_id": "{sender_id}", "target_agent_id": "architect", "message_type": "Challenge", "content": "critique text"}}
]"""
        raw_res = await self._call_ollama(prompt)
        if raw_res:
            try:
                items = json.loads(raw_res)
                return [CritiqueOutput(**item) for item in items]
            except Exception:
                pass

        return await self.fallback.generate_critique(sender_id, sender_role, opinions, question)

    async def generate_consensus(self, question: str, opinions: list[Dict[str, Any]], critiques: list[Dict[str, Any]], evidence: list[str]) -> ConsensusOutput:
        prompt = f"""As CONSENSUS JUDGE, evaluate question '{question}', opinions: {json.dumps(opinions)}, critiques: {json.dumps(critiques)}.
Return JSON matching ConsensusOutput schema."""
        raw_res = await self._call_ollama(prompt)
        if raw_res:
            try:
                data = json.loads(raw_res)
                return ConsensusOutput(**data)
            except Exception:
                pass

        return await self.fallback.generate_consensus(question, opinions, critiques, evidence)
