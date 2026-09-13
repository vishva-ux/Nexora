from typing import List
from fastapi import APIRouter
from app.schemas.dtos import AnalyticsOverviewDto, AgentMetricDto

router = APIRouter()

@router.get("/overview", response_model=AnalyticsOverviewDto)
def get_analytics_overview():
    return AnalyticsOverviewDto(
        total_debates=42,
        completed_debates=40,
        failed_debates=2,
        average_duration_seconds=3.4,
        average_confidence_percent=88.5,
        consensus_accuracy_proxy=87.0,
        active_sessions=3
    )

@router.get("/agents", response_model=List[AgentMetricDto])
def get_agent_metrics():
    return [
        AgentMetricDto(agent_id="architect", name="Architect", confidence=0.89, latency=2.4, participation=0.96),
        AgentMetricDto(agent_id="researcher", name="Researcher", confidence=0.85, latency=3.1, participation=0.94),
        AgentMetricDto(agent_id="security", name="Security Analyst", confidence=0.92, latency=2.1, participation=0.98),
        AgentMetricDto(agent_id="performance", name="Performance Engineer", confidence=0.81, latency=2.8, participation=0.92)
    ]
