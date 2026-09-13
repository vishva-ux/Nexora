from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config import settings

# Fallback to SQLite in-memory or file if postgres isn't running locally
database_url = settings.DATABASE_URL
if "Host=" in database_url:
    # Handle legacy .NET connection string if passed
    database_url = "postgresql://postgres:nexorapassword@localhost:5432/nexora"

try:
    engine = create_engine(database_url, echo=False)
except Exception:
    # Graceful local fallback
    database_url = "sqlite:///./nexora.db"
    engine = create_engine(database_url, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
