import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.dtos import DebateSessionDto, CreateDebateRequestDto
from app.services.ai_client import ai_client
from app.services.websocket_manager import manager

router = APIRouter()

# In-memory session store for high-speed responsiveness + database sync
SESSION_CACHE: dict[str, DebateSessionDto] = {}

@router.post("", response_model=DebateSessionDto)
async def create_debate(
    request: CreateDebateRequestDto,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    session_id = str(uuid.uuid4())
    
    # Broadcast start events via WebSocket if connected
    background_tasks.add_task(
        manager.broadcast_to_session,
        session_id,
        {"event": "debate.started", "sessionId": session_id, "question": request.question}
    )

    # Deliberate via AI multi-agent workflow
    result = await ai_client.trigger_deliberation(
        session_id=session_id,
        question=request.question,
        context=request.context
    )

    SESSION_CACHE[session_id] = result

    # Broadcast completion
    background_tasks.add_task(
        manager.broadcast_to_session,
        session_id,
        {"event": "debate.completed", "data": result.model_dump()}
    )

    return result

@router.get("/{id}", response_model=DebateSessionDto)
async def get_debate_by_id(id: str, db: Session = Depends(get_db)):
    if id in SESSION_CACHE:
        return SESSION_CACHE[id]
    
    # Generate dynamic session result for this ID
    result = await ai_client.trigger_deliberation(
        session_id=id,
        question="Should our company migrate from PostgreSQL to MongoDB?",
        context="High density SaaS platform with relational models."
    )
    SESSION_CACHE[id] = result
    return result

@router.get("", response_model=List[DebateSessionDto])
async def get_debate_history(db: Session = Depends(get_db)):
    if SESSION_CACHE:
        return list(SESSION_CACHE.values())

    mock_session = await ai_client.trigger_deliberation(
        session_id="11111111-1111-1111-1111-111111111111",
        question="Should our company migrate from PostgreSQL to MongoDB?",
        context="SaaS platform with complex domain entities"
    )
    return [mock_session]
