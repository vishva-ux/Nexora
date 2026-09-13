import uuid
from datetime import datetime
from typing import List
from fastapi import APIRouter
from app.schemas.dtos import KnowledgeDocumentDto

router = APIRouter()

DOCUMENTS_STORE: List[KnowledgeDocumentDto] = [
    KnowledgeDocumentDto(
        id=str(uuid.uuid4()),
        title="PostgreSQL 16 Performance Guidelines.pdf",
        file_type="pdf",
        chunk_count=14,
        created_at=datetime.utcnow()
    ),
    KnowledgeDocumentDto(
        id=str(uuid.uuid4()),
        title="Enterprise Database Benchmarks 2026.md",
        file_type="md",
        chunk_count=8,
        created_at=datetime.utcnow()
    )
]

@router.get("/documents", response_model=List[KnowledgeDocumentDto])
def get_documents():
    return DOCUMENTS_STORE
