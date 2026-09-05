from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
from pydantic import BaseModel

class AgentOpinionOutput(BaseModel):
    agent_id: str
    recommendation: str
    reasoning_summary: str
    confidence: float
    risks: list[str]
    assumptions: list[str]
    counterarguments: list[str]

class CritiqueOutput(BaseModel):
    sender_agent_id: str
    target_agent_id: str
    message_type: str  # Critique, Challenge, Rebuttal, Agreement
    content: str

class ConsensusOutput(BaseModel):
    final_recommendation: str
    summary: str
    confidence: float
    agreement_score: float
    majority_position: str
    minority_opinion: Optional[str] = None
    dissenting_agent_id: Optional[str] = None
    key_arguments: list[str]
    risks: list[str]
    assumptions: list[str]
    recommended_action: str
    decision_matrix: Dict[str, Dict[str, int]] = {}

class ILLMProvider(ABC):
    @abstractmethod
    async def analyze_agent(self, agent_id: str, role: str, focus: str, question: str, context: str, evidence: list[str]) -> AgentOpinionOutput:
        pass

    @abstractmethod
    async def generate_critique(self, sender_id: str, sender_role: str, opinions: list[Dict[str, Any]], question: str) -> list[CritiqueOutput]:
        pass

    @abstractmethod
    async def generate_consensus(self, question: str, opinions: list[Dict[str, Any]], critiques: list[Dict[str, Any]], evidence: list[str]) -> ConsensusOutput:
        pass
