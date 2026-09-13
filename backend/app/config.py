import os

try:
    from pydantic_settings import BaseSettings
except ImportError:
    try:
        from pydantic import BaseSettings
    except ImportError:
        from pydantic import BaseModel as BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Nexora Backend API"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    
    # AI Service URL
    AI_SERVICE_URL: str = os.getenv("AI_SERVICE_URL", "http://ai-service:8000")
    
    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql://postgres:nexorapassword@localhost:5432/nexora"
    )
    
    # JWT & Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "nexora-secret-key-2026-super-secure")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24
    
    # CORS
    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "*"
    ]

    class Config:
        case_sensitive = True

settings = Settings()
