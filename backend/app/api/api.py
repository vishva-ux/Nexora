from fastapi import APIRouter
from app.api.endpoints import debates, analytics, auth, knowledge, agents

api_router = APIRouter()

api_router.include_router(debates.router, prefix="/debates", tags=["debates"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(knowledge.router, prefix="/knowledge", tags=["knowledge"])
api_router.include_router(agents.router, prefix="/agents", tags=["agents"])
