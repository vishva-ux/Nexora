from datetime import datetime
from typing import Optional, List, Any, Dict
from pydantic import BaseModel, Field

class AgentOpinionDto(BaseModel):
    agent_id: str
    recommendation: str
    reasoning_summary: str
    confidence: float
    risks: List[str] = []
    assumptions: List[str] = []
    counterarguments: List[str] = []

class DebateMessageDto(BaseModel):
    sender_agent_id: str
    target_agent_id: Optional[str] = None
    message_type: str = "Critique"
    content: str

class ConsensusDecisionDto(BaseModel):
    final_recommendation: str
    summary: str
    confidence: float
    agreement_score: float
    majority_position: str
    minority_opinion: Optional[str] = None
    dissenting_agent_id: Optional[str] = None
    key_arguments: List[str] = []
    risks: List[str] = []
    assumptions: List[str] = []
    recommended_action: str

class DebateSessionDto(BaseModel):
    id: str
    question: str
    context: str = ""
    status: str = "Completed"
    consensus_score: Optional[float] = 0.0
    confidence_score: Optional[float] = 0.0
    agreement_level: Optional[float] = 0.0
    duration_ms: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    opinions: List[AgentOpinionDto] = []
    debate_messages: List[DebateMessageDto] = []
    consensus: Optional[ConsensusDecisionDto] = None

class CreateDebateRequestDto(BaseModel):
    question: str
    context: Optional[str] = ""

class AnalyticsOverviewDto(BaseModel):
    total_debates: int
    completed_debates: int
    failed_debates: int
    average_duration_seconds: float
    average_confidence_percent: float
    consensus_accuracy_proxy: float
    active_sessions: int

class AgentMetricDto(BaseModel):
    agent_id: str
    name: str
    confidence: float
    latency: float
    participation: float

class LoginRequest(BaseModel):
    email: Optional[str] = "demo@nexora.ai"
    password: Optional[str] = "password"

class LoginResponse(BaseModel):
    token: str
    user: Dict[str, Any]

class KnowledgeDocumentDto(BaseModel):
    id: str
    title: str
    file_type: str
    chunk_count: int
    created_at: datetime

class AgentInfoDto(BaseModel):
    id: str
    name: str
    role: str
    description: str
    icon: str
