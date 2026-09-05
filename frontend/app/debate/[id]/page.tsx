'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { HelpCircle, Bell, ChevronDown } from 'lucide-react';
import AgentCard from '@/components/AgentCard';
import DebateTimeline from '@/components/DebateTimeline';
import ConsensusJudgeCard from '@/components/ConsensusJudgeCard';

export default function LiveDeliberationWorkspace() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  const customQuestion = searchParams?.get('q') || "Should our company migrate from PostgreSQL to MongoDB?";

  // Dynamic analysis generator based on question text
  const getDynamicAnalysis = (q: string) => {
    const qLower = (q || '').toLowerCase();
    
    if (qLower.includes("graphql") || qLower.includes("rest")) {
      return {
        question: q,
        context: "High density microservice architecture with multi-client mobile & web applications.",
        opinions: [
          { id: 'architect', name: 'Architect Agent', avatarBg: 'bg-cyan-600', avatarIcon: '🧠', confidence: 0.92, recommendation: 'REST with OpenAPI' },
          { id: 'researcher', name: 'Researcher Agent', avatarBg: 'bg-purple-500', avatarIcon: '🔬', confidence: 0.88, recommendation: 'REST with OpenAPI' },
          { id: 'security', name: 'Security Agent', avatarBg: 'bg-pink-600', avatarIcon: '🛡️', confidence: 0.95, recommendation: 'REST with OpenAPI' },
          { id: 'performance', name: 'Performance Agent', avatarBg: 'bg-emerald-600', avatarIcon: '⚡', confidence: 0.84, recommendation: 'GraphQL' }
        ],
        hasDissent: true,
        dissentingAgent: 'performance',
        consensus: {
          confidence: 0.91,
          recommendation: "Use REST with OpenAPI specification for main gateway APIs; expose GraphQL only for complex client dashboards."
        }
      };
    }

    if (qLower.includes("kubernetes") || qLower.includes("ecs")) {
      return {
        question: q,
        context: "SaaS application infrastructure seeking low operational overhead and reliable deployment.",
        opinions: [
          { id: 'architect', name: 'Architect Agent', avatarBg: 'bg-cyan-600', avatarIcon: '🧠', confidence: 0.89, recommendation: 'AWS ECS / Fargate' },
          { id: 'researcher', name: 'Researcher Agent', avatarBg: 'bg-purple-500', avatarIcon: '🔬', confidence: 0.86, recommendation: 'AWS ECS / Fargate' },
          { id: 'security', name: 'Security Agent', avatarBg: 'bg-pink-600', avatarIcon: '🛡️', confidence: 0.91, recommendation: 'AWS ECS / Fargate' },
          { id: 'performance', name: 'Performance Agent', avatarBg: 'bg-emerald-600', avatarIcon: '⚡', confidence: 0.82, recommendation: 'Kubernetes (EKS)' }
        ],
        hasDissent: true,
        dissentingAgent: 'performance',
        consensus: {
          confidence: 0.89,
          recommendation: "Adopt AWS ECS with Fargate serverless containers to minimize cluster management overhead."
        }
      };
    }

    // Default PostgreSQL vs MongoDB analysis
    return {
      question: q,
      context: "High density SaaS platform with complex relational domain entities and audit integrity requirements.",
      opinions: [
        { id: 'architect', name: 'Architect Agent', avatarBg: 'bg-cyan-600', avatarIcon: '🧠', confidence: 0.91, recommendation: 'PostgreSQL' },
        { id: 'researcher', name: 'Researcher Agent', avatarBg: 'bg-purple-500', avatarIcon: '🔬', confidence: 0.87, recommendation: 'PostgreSQL' },
        { id: 'security', name: 'Security Agent', avatarBg: 'bg-pink-600', avatarIcon: '🛡️', confidence: 0.94, recommendation: 'PostgreSQL' },
        { id: 'performance', name: 'Performance Agent', avatarBg: 'bg-emerald-600', avatarIcon: '⚡', confidence: 0.79, recommendation: 'MongoDB' }
      ],
      hasDissent: true,
      dissentingAgent: 'performance',
      consensus: {
        confidence: 0.93,
        recommendation: "Keep PostgreSQL as primary DB"
      }
    };
  };

  const data = getDynamicAnalysis(customQuestion);

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto min-h-[85vh] flex flex-col justify-between">
      {/* Top Navigation Bar Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/5">
        <h1 className="text-xl font-bold text-white tracking-tight">Live Deliberation</h1>

        <div className="flex items-center gap-3">
          <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all">
            <HelpCircle className="w-4 h-4" />
          </button>
          <button className="relative w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-gray-200 hover:bg-white/10 transition-all">
            <span>Agents</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Main 3-Column Desktop Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 items-stretch">
        
        {/* Column 1: Left (Deliberation Question + 2x2 Agent Cards Grid) - 4 cols */}
        <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
          {/* Deliberation Question Card */}
          <div className="glass-card p-5 border-white/10 bg-[#0F1420]/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-semibold">DELIBERATION</span>
              <button className="text-gray-500 hover:text-white text-xs">•••</button>
            </div>
            <h2 className="text-lg font-bold text-white leading-snug">
              {data.question}
            </h2>
          </div>

          {/* 2x2 Agent Cards Grid */}
          <div className="grid grid-cols-2 gap-3 flex-1">
            {data.opinions.map((ag) => (
              <AgentCard
                key={ag.id}
                id={ag.id}
                name={ag.name}
                avatarBg={ag.avatarBg}
                avatarIcon={ag.avatarIcon}
                confidence={ag.confidence}
                recommendation={ag.recommendation}
              />
            ))}
          </div>
        </div>

        {/* Column 2: Middle (Live Debate Transcript Chat Panel) - 5 cols */}
        <div className="lg:col-span-5 flex flex-col">
          <DebateTimeline currentQuestion={data.question} />
        </div>

        {/* Column 3: Right (Consensus Judge Gauge + Recommendation Card) - 3 cols */}
        <div className="lg:col-span-3 flex flex-col">
          <ConsensusJudgeCard
            confidence={data.consensus.confidence}
            recommendation={data.consensus.recommendation}
          />
        </div>

      </div>
    </div>
  );
}
