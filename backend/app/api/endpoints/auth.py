from fastapi import APIRouter
from app.schemas.dtos import LoginRequest, LoginResponse

router = APIRouter()

@router.post("/login", response_model=LoginResponse)
def login(request: LoginRequest):
    return LoginResponse(
        token="demo-jwt-token-nexora-2026",
        user={
            "id": "demo-user-id",
            "email": request.email or "demo@nexora.ai",
            "fullName": "Demo Analyst",
            "role": "Admin"
        }
    )
