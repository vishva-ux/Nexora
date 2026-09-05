import asyncio
from typing import Dict, Any
from app.llm.base import ILLMProvider, AgentOpinionOutput, CritiqueOutput, ConsensusOutput

class DemoLLMProvider(ILLMProvider):
    """
    Deterministic Demo Provider ensuring full functionality offline or without API keys.
    Generates rich, contextual analysis for questions like PostgreSQL vs MongoDB, REST vs GraphQL, etc.
    """

    async def analyze_agent(self, agent_id: str, role: str, focus: str, question: str, context: str, evidence: list[str]) -> AgentOpinionOutput:
        await asyncio.sleep(0.3) # Simulate fast realistic analysis latency

        q_lower = question.lower()
        is_db_question = "postgres" in q_lower or "mongo" in q_lower or "database" in q_lower

        if agent_id == "architect":
            rec = "PostgreSQL (Relational Core)" if is_db_question else "Modular Architecture"
            summary = (
                "From an architectural standpoint, PostgreSQL offers superior ACID compliance, robust relation management, "
                "and schema constraints required for financial integrity and complex domain models."
                if is_db_question else "Prioritize strong boundaries, clear interfaces, and high cohesion before decoupling services."
            )
            return AgentOpinionOutput(
                agent_id="architect",
                recommendation=rec,
                reasoning_summary=summary,
                confidence=0.91,
                risks=["Rigid schema migrations if requirements shift dynamically"],
                assumptions=["Transactional integrity is non-negotiable"],
                counterarguments=["MongoDB allows faster initial prototyping"]
            )

        elif agent_id == "researcher":
            rec = "PostgreSQL with pgvector" if is_db_question else "Industry Standard Pattern"
            summary = (
                "RAG evidence and industry benchmarks show PostgreSQL scaling efficiently to millions of rows while supporting "
                "native JSONB and pgvector for AI workflows without requiring additional NoSQL clusters."
                if is_db_question else "Empirical survey data points toward standardized REST/gRPC hybrid models."
            )
            return AgentOpinionOutput(
                agent_id="researcher",
                recommendation=rec,
                reasoning_summary=summary,
                confidence=0.87,
                risks=["Index inflation under heavy write workloads"],
                assumptions=["Vector search and relational data co-exist"],
                counterarguments=["MongoDB has native horizontal sharding"]
            )

        elif agent_id == "security":
            rec = "PostgreSQL" if is_db_question else "Strict Role-Based Access Control"
            summary = (
                "PostgreSQL features enterprise-grade Row Level Security (RLS), granular TLS configuration, "
                "SOC2 audit compliance tools, and robust protection against payload corruption."
                if is_db_question else "Enforce strict JWT auth, HTTPS everywhere, and least privilege access policies."
            )
            return AgentOpinionOutput(
                agent_id="security",
                recommendation=rec,
                reasoning_summary=summary,
                confidence=0.94,
                risks=["Misconfigured RLS policies can introduce silent data leaks"],
                assumptions=["Database sits behind private VPC network"],
                counterarguments=["MongoDB supports field-level encryption"]
            )

        else: # performance
            rec = "MongoDB for High Write Velocity" if is_db_question else "Redis Distributed Caching"
            summary = (
                "For ultra-high throughput document workloads and dynamic horizontal auto-sharding, MongoDB demonstrates lower "
                "write latency and simpler cluster scaling than traditional single-primary relational databases."
                if is_db_question else "Sub-millisecond latency requires Redis multi-tier caching at API ingress."
            )
            return AgentOpinionOutput(
                agent_id="performance",
                recommendation=rec,
                reasoning_summary=summary,
                confidence=0.79,
                risks=["Eventual consistency delays on replica reads"],
                assumptions=["Write volume exceeds 50,000 requests/sec"],
                counterarguments=["PostgreSQL horizontal scaling requires Citus extension"]
            )

    async def generate_critique(self, sender_id: str, sender_role: str, opinions: list[Dict[str, Any]], question: str) -> list[CritiqueOutput]:
        await asyncio.sleep(0.2)
        if sender_id == "performance":
            return [
                CritiqueOutput(
                    sender_agent_id="performance",
                    target_agent_id="architect",
                    message_type="Challenge",
                    content="Architect relies heavily on ACID guarantees, but underestimates write throughput degradation under high concurrency without sharding."
                )
            ]
        elif sender_id == "architect":
            return [
                CritiqueOutput(
                    sender_agent_id="architect",
                    target_agent_id="performance",
                    message_type="Critique",
                    content="Performance Engineer favors MongoDB horizontal sharding, but ignores operational overhead and eventual consistency risks in multi-document transactions."
                )
            ]
        elif sender_id == "security":
            return [
                CritiqueOutput(
                    sender_agent_id="security",
                    target_agent_id="researcher",
                    message_type="Agreement",
                    content="Security concurs with Researcher's pgvector recommendation, ensuring audit security and data isolation within single database boundaries."
                )
            ]
        else:
            return [
                CritiqueOutput(
                    sender_agent_id="researcher",
                    target_agent_id="performance",
                    message_type="Rebuttal",
                    content="Benchmarking research confirms PostgreSQL unlogged tables and partitioned indexes match NoSQL write speeds for most SaaS traffic loads."
                )
            ]

    async def generate_consensus(self, question: str, opinions: list[Dict[str, Any]], critiques: list[Dict[str, Any]], evidence: list[str]) -> ConsensusOutput:
        await asyncio.sleep(0.4)
        return ConsensusOutput(
            final_recommendation="Keep PostgreSQL as the primary database. Introduce MongoDB only for specific document-heavy or high-velocity write workloads where horizontal sharding is essential.",
            summary="3 out of 4 agents (Architect, Security, Researcher) strongly recommend PostgreSQL due to schema enforcement, security compliance (RLS), and pgvector capabilities. Performance Engineer dissented favoring MongoDB for scale.",
            confidence=0.93,
            agreement_score=0.75,
            majority_position="PostgreSQL provides necessary relational consistency, ACID transactions, and unified AI vector search.",
            minority_opinion="Performance Engineer highlights MongoDB's superior native sharding for extreme horizontal write throughput.",
            dissenting_agent_id="performance",
            key_arguments=[
                "Strong relational consistency and native RLS security protection",
                "pgvector support consolidates vector embeddings with main relational data",
                "Reduced operational complexity over managing dual database engines"
            ],
            risks=[
                "Horizontal write scaling limit if traffic bursts beyond single node limits",
                "Index maintenance overhead on rapidly mutating tables"
            ],
            assumptions=[
                "Data workload requires strict transactional integrity",
                "Read traffic significantly exceeds write traffic"
            ],
            recommended_action="Deploy PostgreSQL 16 with pgvector extension. Benchmark query performance under target traffic load before considering secondary NoSQL storage.",
            decision_matrix={
                "Consistency": {"PostgreSQL": 9, "MongoDB": 7},
                "Scalability": {"PostgreSQL": 8, "MongoDB": 9},
                "Complex Queries": {"PostgreSQL": 10, "MongoDB": 6},
                "Developer Fit": {"PostgreSQL": 9, "MongoDB": 8},
                "Operational Cost": {"PostgreSQL": 9, "MongoDB": 7}
            }
        )
