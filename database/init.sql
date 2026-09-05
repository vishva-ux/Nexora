-- Nexora PostgreSQL Initialization Script
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Analyst',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Debate Sessions
CREATE TABLE IF NOT EXISTS debate_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    question TEXT NOT NULL,
    context TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    consensus_score DOUBLE PRECISION,
    confidence_score DOUBLE PRECISION,
    agreement_level DOUBLE PRECISION,
    duration_ms INT,
    llm_provider VARCHAR(50) DEFAULT 'OpenAI',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Agents Table
CREATE TABLE IF NOT EXISTS agents (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(10) NOT NULL
);

-- Seed Agents
INSERT INTO agents (id, name, role, description, icon) VALUES
('architect', 'Architect', 'Senior System Architect', 'Analyzes system topology, scalability, maintainability & tradeoffs', '🧠'),
('researcher', 'Researcher', 'Technical Researcher', 'Retrieves knowledge base evidence, benchmarks & documentation', '🔬'),
('security', 'Security Analyst', 'Security Engineer', 'Evaluates threat modeling, compliance, auth & vulnerabilities', '🛡️'),
('performance', 'Performance Engineer', 'Scalability Specialist', 'Focuses on latency, throughput, concurrency & database performance', '⚡')
ON CONFLICT (id) DO NOTHING;

-- Agent Opinions
CREATE TABLE IF NOT EXISTS agent_opinions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    debate_session_id UUID NOT NULL REFERENCES debate_sessions(id) ON DELETE CASCADE,
    agent_id VARCHAR(50) NOT NULL REFERENCES agents(id),
    recommendation TEXT NOT NULL,
    reasoning_summary TEXT NOT NULL,
    confidence DOUBLE PRECISION NOT NULL,
    risks JSONB DEFAULT '[]',
    assumptions JSONB DEFAULT '[]',
    counterarguments JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Debate Messages & Critiques
CREATE TABLE IF NOT EXISTS debate_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    debate_session_id UUID NOT NULL REFERENCES debate_sessions(id) ON DELETE CASCADE,
    sender_agent_id VARCHAR(50) NOT NULL REFERENCES agents(id),
    target_agent_id VARCHAR(50) REFERENCES agents(id),
    message_type VARCHAR(50) NOT NULL, -- 'Critique', 'Challenge', 'Rebuttal', 'Agreement'
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Consensus Decisions
CREATE TABLE IF NOT EXISTS consensus_decisions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    debate_session_id UUID UNIQUE NOT NULL REFERENCES debate_sessions(id) ON DELETE CASCADE,
    final_recommendation TEXT NOT NULL,
    summary TEXT NOT NULL,
    confidence DOUBLE PRECISION NOT NULL,
    agreement_score DOUBLE PRECISION NOT NULL,
    majority_position TEXT NOT NULL,
    minority_opinion TEXT,
    dissenting_agent_id VARCHAR(50) REFERENCES agents(id),
    key_arguments JSONB DEFAULT '[]',
    risks JSONB DEFAULT '[]',
    assumptions JSONB DEFAULT '[]',
    recommended_action TEXT NOT NULL,
    decision_matrix JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Knowledge Base Documents & Embeddings (RAG)
CREATE TABLE IF NOT EXISTS knowledge_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    chunk_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS document_chunks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID NOT NULL REFERENCES knowledge_documents(id) ON DELETE CASCADE,
    chunk_index INT NOT NULL,
    content TEXT NOT NULL,
    embedding vector(1536), -- Default OpenAI embedding dimension
    metadata JSONB DEFAULT '{}'
);

-- Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
