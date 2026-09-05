using Microsoft.EntityFrameworkCore;
using Nexora.Domain.Entities;

namespace Nexora.Infrastructure.Persistence
{
    public class NexoraDbContext : DbContext
    {
        public NexoraDbContext(DbContextOptions<NexoraDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Agent> Agents => Set<Agent>();
        public DbSet<DebateSession> DebateSessions => Set<DebateSession>();
        public DbSet<AgentOpinion> AgentOpinions => Set<AgentOpinion>();
        public DbSet<DebateMessage> DebateMessages => Set<DebateMessage>();
        public DbSet<ConsensusDecision> ConsensusDecisions => Set<ConsensusDecision>();
        public DbSet<KnowledgeDocument> KnowledgeDocuments => Set<KnowledgeDocument>();
        public DbSet<AuditLog> AuditLogs => Set<AuditLog>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<Agent>().HasData(
                new Agent { Id = "architect", Name = "Architect", Role = "Senior System Architect", Description = "Architecture & tradeoffs", Icon = "🧠" },
                new Agent { Id = "researcher", Name = "Researcher", Role = "Technical Researcher", Description = "Evidence & industry patterns", Icon = "🔬" },
                new Agent { Id = "security", Name = "Security Analyst", Role = "Security Engineer", Description = "Threats & vulnerability protection", Icon = "🛡️" },
                new Agent { Id = "performance", Name = "Performance Engineer", Role = "Scalability Specialist", Description = "Latency & throughput optimization", Icon = "⚡" }
            );
        }
    }
}
