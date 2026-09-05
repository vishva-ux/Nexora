import uuid
from typing import Optional, List
from fastapi import FastAPI, BackgroundTasks, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from app.graph.workflow import build_nexora_workflow
from app.rag.retriever import RAGRetriever

load_dotenv()

app = FastAPI(
    title="Nexora AI Service",
    description="Multi-Agent AI Decision & Collaboration Platform AI Microservice",
    version="1.0.0"
)

graph_app = build_nexora_workflow()
retriever = RAGRetriever()

class DeliberationRequest(BaseModel):
    session_id: Optional[str] = None
    question: str
    context: Optional[str] = ""
    evidence_ids: Optional[List[str]] = []

class DeliberationResponse(BaseModel):
    session_id: str
    question: str
    status: str
    opinions: list
    critiques: list
    debate_messages: list
    disagreements: list
    consensus: dict
    logs: list

@app.get("/")
def read_root():
    return {"service": "Nexora AI Microservice", "status": "active", "orchestration": "LangGraph"}

@app.post("/api/v1/deliberate", response_model=DeliberationResponse)
async def run_deliberation(req: DeliberationRequest):
    session_id = req.session_id or str(uuid.uuid4())
    
    # Retrieve initial RAG evidence
    evidence_docs = await retriever.retrieve(req.question)
    evidence_strings = [f"[{doc['document']}]: {doc['chunk']}" for doc in evidence_docs]
    
    initial_state = {
        "session_id": session_id,
        "question": req.question,
        "context": req.context or "",
        "opinions": [],
        "critiques": [],
        "debate_messages": [],
        "evidence": evidence_strings,
        "disagreements": [],
        "consensus": None,
        "status": "received",
        "logs": []
    }
    
    final_state = await graph_app.ainvoke(initial_state)
    
    return DeliberationResponse(
        session_id=final_state["session_id"],
        question=final_state["question"],
        status=final_state["status"],
        opinions=final_state["opinions"],
        critiques=final_state["critiques"],
        debate_messages=final_state["debate_messages"],
        disagreements=final_state["disagreements"],
        consensus=final_state.get("consensus") or {},
        logs=final_state["logs"]
    )
