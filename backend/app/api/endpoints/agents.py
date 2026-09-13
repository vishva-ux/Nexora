from typing import List
from fastapi import APIRouter
from app.schemas.dtos import AgentInfoDto

router = APIRouter()

AGENTS_LIST: List[AgentInfoDto] = [
    AgentInfoDto(id="architect", name="Architect", role="Senior System Architect", description="Architecture & design tradeoffs", icon="🧠"),
    AgentInfoDto(id="researcher", name="Researcher", role="Technical Researcher", description="Evidence & industry patterns", icon="🔬"),
    AgentInfoDto(id="security", name="Security Analyst", role="Security Engineer", description="Threats & compliance", icon="🛡️"),
    AgentInfoDto(id="performance", name="Performance Engineer", role="Scalability Specialist", description="Latency & database performance", icon="⚡")
]

@router.get("", response_model=List[AgentInfoDto])
def get_agents():
    return AGENTS_LIST
