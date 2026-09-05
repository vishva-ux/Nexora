using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Nexora.Domain.Entities;

namespace Nexora.Application.DTOs
{
    public record CreateDebateRequestDto(string Question, string? Context);
    
    public record DebateSessionDto(
        Guid Id,
        string Question,
        string Context,
        string Status,
        double? ConsensusScore,
        double? ConfidenceScore,
        double? AgreementLevel,
        int DurationMs,
        DateTime CreatedAt,
        List<AgentOpinionDto> Opinions,
        List<DebateMessageDto> DebateMessages,
        ConsensusDecisionDto? ConsensusDecision
    );

    public record AgentOpinionDto(
        string AgentId,
        string Recommendation,
        string ReasoningSummary,
        double Confidence,
        List<string> Risks,
        List<string> Assumptions,
        List<string> Counterarguments
    );

    public record DebateMessageDto(
        string SenderAgentId,
        string? TargetAgentId,
        string MessageType,
        string Content
    );

    public record ConsensusDecisionDto(
        string FinalRecommendation,
        string Summary,
        double Confidence,
        double AgreementScore,
        string MajorityPosition,
        string? MinorityOpinion,
        string? DissentingAgentId,
        List<string> KeyArguments,
        List<string> Risks,
        List<string> Assumptions,
        string RecommendedAction
    );

    public record AnalyticsOverviewDto(
        int TotalDebates,
        int CompletedDebates,
        int FailedDebates,
        double AverageDurationSeconds,
        double AverageConfidencePercent,
        double ConsensusAccuracyProxy,
        int ActiveSessions
    );
}

namespace Nexora.Application.Interfaces
{
    public interface IAiServiceClient
    {
        Task<Nexora.Application.DTOs.DebateSessionDto> TriggerDeliberationAsync(Guid sessionId, string question, string? context);
    }

    public interface IDebateHubService
    {
        Task BroadcastAgentStartedAsync(Guid sessionId, string agentId);
        Task BroadcastAgentOpinionCompletedAsync(Guid sessionId, string agentId, string recommendation, double confidence);
        Task BroadcastDissentDetectedAsync(Guid sessionId, string dissentingAgentId, string reason);
        Task BroadcastConsensusCompletedAsync(Guid sessionId, object consensusData);
    }
}
