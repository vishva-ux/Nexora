using System;
using System.Collections.Generic;

namespace Nexora.Domain.Entities
{
    public class User
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Role { get; set; } = "Analyst";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class Agent
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
    }

    public class DebateSession
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid? UserId { get; set; }
        public string Question { get; set; } = string.Empty;
        public string Context { get; set; } = string.Empty;
        public string Status { get; set; } = "Pending"; // Pending, Running, Completed, Failed
        public double? ConsensusScore { get; set; }
        public double? ConfidenceScore { get; set; }
        public double? AgreementLevel { get; set; }
        public int DurationMs { get; set; }
        public string LlmProvider { get; set; } = "OpenAI";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? CompletedAt { get; set; }

        public List<AgentOpinion> Opinions { get; set; } = new();
        public List<DebateMessage> DebateMessages { get; set; } = new();
        public ConsensusDecision? ConsensusDecision { get; set; }
    }

    public class AgentOpinion
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid DebateSessionId { get; set; }
        public string AgentId { get; set; } = string.Empty;
        public string Recommendation { get; set; } = string.Empty;
        public string ReasoningSummary { get; set; } = string.Empty;
        public double Confidence { get; set; }
        public string RisksJson { get; set; } = "[]";
        public string AssumptionsJson { get; set; } = "[]";
        public string CounterargumentsJson { get; set; } = "[]";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class DebateMessage
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid DebateSessionId { get; set; }
        public string SenderAgentId { get; set; } = string.Empty;
        public string? TargetAgentId { get; set; }
        public string MessageType { get; set; } = "Critique"; // Critique, Challenge, Rebuttal, Agreement
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class ConsensusDecision
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid DebateSessionId { get; set; }
        public string FinalRecommendation { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public double Confidence { get; set; }
        public double AgreementScore { get; set; }
        public string MajorityPosition { get; set; } = string.Empty;
        public string? MinorityOpinion { get; set; }
        public string? DissentingAgentId { get; set; }
        public string KeyArgumentsJson { get; set; } = "[]";
        public string RisksJson { get; set; } = "[]";
        public string AssumptionsJson { get; set; } = "[]";
        public string RecommendedAction { get; set; } = string.Empty;
        public string DecisionMatrixJson { get; set; } = "{}";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class KnowledgeDocument
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; } = string.Empty;
        public string FileType { get; set; } = "txt";
        public int ChunkCount { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class AuditLog
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid? UserId { get; set; }
        public string Action { get; set; } = string.Empty;
        public string Details { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
