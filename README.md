# Nexora — Multi-Agent AI Decision & Collaboration Platform

> **"Four perspectives. One evidence-backed decision."**

Nexora is a production-oriented, enterprise-grade multi-agent decision platform. When complex engineering or business problems are submitted, specialized AI agents (**Architect**, **Researcher**, **Security Analyst**, **Performance Engineer**) independently analyze the problem, cross-critique arguments, debate disagreements, retrieve RAG evidence, and produce an explainable consensus via a **Consensus Judge**.

![Nexora Live Deliberation Workspace](file:///Users/vishva/.gemini/antigravity-ide/brain/766286ae-3460-409e-a148-bcb7318d5224/nexora_live_deliberation_1788353342082.jpg)

---

## 🛠️ Technology Stack

| Layer | Stack & Technologies |
| :--- | :--- |
| **Frontend** | **Next.js 14+ (App Router)**, React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide React, SignalR Client |
| **Main Backend** | **C# / .NET 9 ASP.NET Core Web API**, Entity Framework Core 9, SignalR Hubs, JWT Authentication, Serilog |
| **AI Microservice** | **Python 3.12+**, FastAPI, **LangGraph** stateful multi-agent workflow, LangChain, Pydantic |
| **LLM Inference** | **Ollama** (Local models: `llama3`, `mistral`), OpenAI API support, with deterministic **Demo Mode** fallback |
| **Database & Vector** | **PostgreSQL 16** with `pgvector` extension & **Redis 7** distributed caching |
| **DevOps & CI/CD** | **Docker**, Docker Compose, Nginx, GitHub Actions CI/CD Pipeline |

---

## 🧠 Multi-Agent Orchestration Architecture

```
                    ┌────────────────────────┐
                    │    Next.js 14 Client   │
                    │  (React/TS/Tailwind)   │
                    └───────────┬────────────┘
                                │
                         REST + SignalR (WebSockets)
                                │
                    ┌───────────▼────────────┐
                    │  ASP.NET Core .NET 9   │
                    │   (Clean Architecture) │
                    └───────────┬────────────┘
                                │
                            REST API
                                │
                    ┌───────────▼────────────┐
                    │  Python FastAPI Service│
                    │ (LangGraph Agent Engine)│
                    └───────────┬────────────┘
                                │
                 ┌──────────────┼──────────────┐
                 ▼              ▼              ▼
           Architect       Researcher       Security      Performance
             🧠                🔬              🛡️             ⚡
                 │              │              │              │
                 └──────────────┴───────┬──────┴──────────────┘
                                        ▼
                                Consensus Judge ⚖️
                                        │
                         ┌──────────────┴──────────────┐
                         ▼                             ▼
                PostgreSQL (pgvector)              Redis Cache
```

### LangGraph Workflow Pipeline
`QUESTION_RECEIVED` ➔ `CLASSIFY_QUERY` ➔ `PARALLEL_AGENT_ANALYSIS` ➔ `CROSS_CRITIQUE` ➔ `DEBATE` ➔ `EVIDENCE_REVIEW` ➔ `CONSENSUS_JUDGE` ➔ `STORE_SESSION`

---

## 🦙 Ollama Local LLM Configuration

Nexora supports local offline LLM inference via **Ollama**.

### Environment Setup (`.env`):
```env
LLM_PROVIDER=ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3
USE_DEMO_MODE=false
```

### Pull Ollama Models:
```bash
ollama pull llama3
ollama pull mistral
```

---

## 🚀 How to Run the Application

### Option 1: Docker Compose (Full Stack)
```bash
docker compose up --build
```
- **Next.js Frontend**: `http://localhost:3000`
- **ASP.NET Core Backend API**: `http://localhost:5000` / Swagger at `http://localhost:5000/swagger`
- **Python FastAPI AI Microservice**: `http://localhost:8000` / OpenAPI at `http://localhost:8000/docs`

### Option 2: Local Development Mode

#### 1. AI Service (Python FastAPI):
```bash
cd ai-service
pip install -r requirements.txt
python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

#### 2. Main Backend (C# .NET 9):
```bash
cd backend
dotnet restore Nexora.sln
dotnet run --project Nexora.Api
```

#### 3. Frontend (Next.js 14):
```bash
cd frontend
npm install
npx tailwindcss -i ./app/globals.css -o ./app/static-globals.css
npm run dev
```
Navigate to `http://localhost:3000/debate/demo-session-1` to view the Live Deliberation workspace.

---

## 📄 License
MIT License
