using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Nexora.Api.Hubs;
using Nexora.Application.DTOs;
using Nexora.Application.Interfaces;

namespace Nexora.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DebatesController : ControllerBase
    {
        private readonly IAiServiceClient _aiClient;
        private readonly IHubContext<DebateHub> _hubContext;

        public DebatesController(IAiServiceClient aiClient, IHubContext<DebateHub> hubContext)
        {
            _aiClient = aiClient;
            _hubContext = hubContext;
        }

        [HttpPost]
        public async Task<ActionResult<DebateSessionDto>> CreateDebate([FromBody] CreateDebateRequestDto request)
        {
            var sessionId = Guid.NewGuid();
            
            // Broadcast initial live SignalR events
            await _hubContext.Clients.Group(sessionId.ToString()).SendAsync("debate.started", new { sessionId, question = request.Question });
            await _hubContext.Clients.Group(sessionId.ToString()).SendAsync("agent.started", new { agentId = "architect" });
            await _hubContext.Clients.Group(sessionId.ToString()).SendAsync("agent.started", new { agentId = "researcher" });
            await _hubContext.Clients.Group(sessionId.ToString()).SendAsync("agent.started", new { agentId = "security" });
            await _hubContext.Clients.Group(sessionId.ToString()).SendAsync("agent.started", new { agentId = "performance" });

            var result = await _aiClient.TriggerDeliberationAsync(sessionId, request.Question, request.Context);

            await _hubContext.Clients.Group(sessionId.ToString()).SendAsync("debate.completed", result);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DebateSessionDto>> GetDebateById(Guid id)
        {
            var session = await _aiClient.TriggerDeliberationAsync(id, "Should our company migrate from PostgreSQL to MongoDB?", "High density SaaS platform with relational models.");
            return Ok(session);
        }

        [HttpGet]
        public ActionResult<List<DebateSessionDto>> GetDebateHistory()
        {
            var mockSession = new DebateSessionDto(
                Guid.Parse("11111111-1111-1111-1111-111111111111"),
                "Should our company migrate from PostgreSQL to MongoDB?",
                "SaaS platform with complex domain entities",
                "Completed",
                0.75,
                0.93,
                0.75,
                2800,
                DateTime.UtcNow.AddHours(-2),
                new(),
                new(),
                null
            );

            return Ok(new List<DebateSessionDto> { mockSession });
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class AnalyticsController : ControllerBase
    {
        [HttpGet("overview")]
        public ActionResult<AnalyticsOverviewDto> GetOverview()
        {
            return Ok(new AnalyticsOverviewDto(
                TotalDebates: 42,
                CompletedDebates: 40,
                FailedDebates: 2,
                AverageDurationSeconds: 3.4,
                AverageConfidencePercent: 88.5,
                ConsensusAccuracyProxy: 87.0,
                ActiveSessions: 3
            ));
        }

        [HttpGet("agents")]
        public ActionResult<object> GetAgentMetrics()
        {
            return Ok(new[]
            {
                new { agentId = "architect", name = "Architect", confidence = 0.89, latency = 2.4, participation = 0.96 },
                new { agentId = "researcher", name = "Researcher", confidence = 0.85, latency = 3.1, participation = 0.94 },
                new { agentId = "security", name = "Security Analyst", confidence = 0.92, latency = 2.1, participation = 0.98 },
                new { agentId = "performance", name = "Performance Engineer", confidence = 0.81, latency = 2.8, participation = 0.92 }
            });
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpPost("login")]
        public ActionResult<object> Login([FromBody] object body)
        {
            return Ok(new
            {
                token = "demo-jwt-token-nexora-2026",
                user = new { id = "demo-user-id", email = "demo@nexora.ai", fullName = "Demo Analyst", role = "Admin" }
            });
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class KnowledgeController : ControllerBase
    {
        [HttpGet("documents")]
        public ActionResult<object> GetDocuments()
        {
            return Ok(new[]
            {
                new { id = Guid.NewGuid(), title = "PostgreSQL 16 Performance Guidelines.pdf", fileType = "pdf", chunkCount = 14, createdAt = DateTime.UtcNow.AddDays(-1) },
                new { id = Guid.NewGuid(), title = "Enterprise Database Benchmarks 2026.md", fileType = "md", chunkCount = 8, createdAt = DateTime.UtcNow.AddDays(-3) }
            });
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class AgentsController : ControllerBase
    {
        [HttpGet]
        public ActionResult<object> GetAgents()
        {
            return Ok(new[]
            {
                new { id = "architect", name = "Architect", role = "Senior System Architect", description = "Architecture & design tradeoffs", icon = "🧠" },
                new { id = "researcher", name = "Researcher", role = "Technical Researcher", description = "Evidence & industry patterns", icon = "🔬" },
                new { id = "security", name = "Security Analyst", role = "Security Engineer", description = "Threats & compliance", icon = "🛡️" },
                new { id = "performance", name = "Performance Engineer", role = "Scalability Specialist", description = "Latency & database performance", icon = "⚡" }
            });
        }
    }
}
