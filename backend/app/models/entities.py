import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, Integer, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from app.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(50), default="Analyst")
    created_at = Column(DateTime, default=datetime.utcnow)

class AgentModel(Base):
    __tablename__ = "agents"

    id = Column(String(50), primary_key=True)
    name = Column(String(100), nullable=False)
    role = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    icon = Column(String(20), nullable=False)

class DebateSession(Base):
    __tablename__ = "debate_sessions"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    question = Column(Text, nullable=False)
    context = Column(Text, default="")
    status = Column(String(50), default="Pending")
    consensus_score = Column(Float, nullable=True)
    confidence_score = Column(Float, nullable=True)
    agreement_level = Column(Float, nullable=True)
    duration_ms = Column(Integer, default=0)
    llm_provider = Column(String(50), default="OpenAI")
    created_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)

    opinions = relationship("AgentOpinion", back_populates="session", cascade="all, delete-orphan")
    debate_messages = relationship("DebateMessage", back_populates="session", cascade="all, delete-orphan")
    consensus_decision = relationship("ConsensusDecision", back_populates="session", uselist=False, cascade="all, delete-orphan")

class AgentOpinion(Base):
    __tablename__ = "agent_opinions"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    debate_session_id = Column(String(36), ForeignKey("debate_sessions.id"), nullable=False)
    agent_id = Column(String(50), nullable=False)
    recommendation = Column(Text, nullable=False)
    reasoning_summary = Column(Text, nullable=False)
    confidence = Column(Float, default=0.0)
    risks_json = Column(JSON, default=list)
    assumptions_json = Column(JSON, default=list)
    counterarguments_json = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)

    session = relationship("DebateSession", back_populates="opinions")

class DebateMessage(Base):
    __tablename__ = "debate_messages"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    debate_session_id = Column(String(36), ForeignKey("debate_sessions.id"), nullable=False)
    sender_agent_id = Column(String(50), nullable=False)
    target_agent_id = Column(String(50), nullable=True)
    message_type = Column(String(50), default="Critique")
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    session = relationship("DebateSession", back_populates="debate_messages")

class ConsensusDecision(Base):
    __tablename__ = "consensus_decisions"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    debate_session_id = Column(String(36), ForeignKey("debate_sessions.id"), nullable=False)
    final_recommendation = Column(Text, nullable=False)
    summary = Column(Text, nullable=False)
    confidence = Column(Float, default=0.0)
    agreement_score = Column(Float, default=0.0)
    majority_position = Column(Text, default="")
    minority_opinion = Column(Text, nullable=True)
    dissenting_agent_id = Column(String(50), nullable=True)
    key_arguments_json = Column(JSON, default=list)
    risks_json = Column(JSON, default=list)
    assumptions_json = Column(JSON, default=list)
    recommended_action = Column(Text, default="")
    decision_matrix_json = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)

    session = relationship("DebateSession", back_populates="consensus_decision")

class KnowledgeDocument(Base):
    __tablename__ = "knowledge_documents"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    title = Column(String(255), nullable=False)
    file_type = Column(String(50), default="txt")
    chunk_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
