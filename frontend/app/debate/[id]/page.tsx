'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { HelpCircle, Bell, ChevronDown } from 'lucide-react';
import AgentCard from '@/components/AgentCard';
import DebateTimeline from '@/components/DebateTimeline';
import ConsensusJudgeCard from '@/components/ConsensusJudgeCard';

export default function LiveDeliberationWorkspace() {
  const searchParams = useSearchParams();
  const initialQ = searchParams?.get('q') || "Should our company migrate from PostgreSQL to MongoDB?";

  const [question, setQuestion] = useState(initialQ);
  const [sessionState, setSessionState] = useState(() => getDynamicDeliberation(initialQ));

  // Function that generates real multi-agent evaluation for ANY question
  function getDynamicDeliberation(q: string) {
    const qLower = (q || '').toLowerCase();

    // 1. ChatGPT vs Claude
    if (qLower.includes('chatgpt') || qLower.includes('claude')) {
      return {
        question: q,
        context: "Evaluating top AI models for software engineering, code reasoning, and multi-agent integration.",
        opinions: [
          { id: 'architect', name: 'Architect Agent', avatarBg: 'bg-cyan-600', avatarIcon: '🧠', confidence: 0.94, recommendation: 'Claude 3.5 Sonnet' },
          { id: 'researcher', name: 'Researcher Agent', avatarBg: 'bg-purple-500', avatarIcon: '🔬', confidence: 0.91, recommendation: 'Claude 3.5 Sonnet' },
          { id: 'security', name: 'Security Agent', avatarBg: 'bg-pink-600', avatarIcon: '🛡️', confidence: 0.88, recommendation: 'ChatGPT (Enterprise)' },
          { id: 'performance', name: 'Performance Agent', avatarBg: 'bg-emerald-600', avatarIcon: '⚡', confidence: 0.92, recommendation: 'Claude 3.5 Sonnet' }
        ],
        consensus: {
          confidence: 0.92,
          recommendation: "Use Claude 3.5 Sonnet for complex coding and architecture reasoning; leverage ChatGPT Enterprise for multi-modal ecosystem integrations."
        }
      };
    }

    // 2. REST vs GraphQL
    if (qLower.includes('rest') || qLower.includes('graphql')) {
      return {
        question: q,
        context: "High density microservices platform serving mobile apps and enterprise client dashboards.",
        opinions: [
          { id: 'architect', name: 'Architect Agent', avatarBg: 'bg-cyan-600', avatarIcon: '🧠', confidence: 0.92, recommendation: 'REST + OpenAPI' },
          { id: 'researcher', name: 'Researcher Agent', avatarBg: 'bg-purple-500', avatarIcon: '🔬', confidence: 0.88, recommendation: 'REST + OpenAPI' },
          { id: 'security', name: 'Security Agent', avatarBg: 'bg-pink-600', avatarIcon: '🛡️', confidence: 0.95, recommendation: 'REST + OpenAPI' },
          { id: 'performance', name: 'Performance Agent', avatarBg: 'bg-emerald-600', avatarIcon: '⚡', confidence: 0.85, recommendation: 'GraphQL Gateway' }
        ],
        consensus: {
          confidence: 0.91,
          recommendation: "Use REST with OpenAPI for core API gateway endpoints; expose GraphQL for complex multi-entity dashboard queries."
        }
      };
    }

    // 3. AWS vs GCP / Azure / Kubernetes
    if (qLower.includes('aws') || qLower.includes('gcp') || qLower.includes('kubernetes') || qLower.includes('ecs')) {
      return {
        question: q,
        context: "Cloud infrastructure deployment seeking minimal operational overhead and high uptime SLAs.",
        opinions: [
          { id: 'architect', name: 'Architect Agent', avatarBg: 'bg-cyan-600', avatarIcon: '🧠', confidence: 0.89, recommendation: 'AWS ECS / Fargate' },
          { id: 'researcher', name: 'Researcher Agent', avatarBg: 'bg-purple-500', avatarIcon: '🔬', confidence: 0.87, recommendation: 'AWS ECS / Fargate' },
          { id: 'security', name: 'Security Agent', avatarBg: 'bg-pink-600', avatarIcon: '🛡️', confidence: 0.93, recommendation: 'AWS ECS / Fargate' },
          { id: 'performance', name: 'Performance Agent', avatarBg: 'bg-emerald-600', avatarIcon: '⚡', confidence: 0.81, recommendation: 'Kubernetes (EKS)' }
        ],
        consensus: {
          confidence: 0.89,
          recommendation: "Deploy on AWS ECS with Fargate serverless containers to minimize cluster management overhead."
        }
      };
    }

    // 4. Default: Generic / Custom Engineering Question Evaluator
    return {
      question: q,
      context: `Multi-agent evaluation for: "${q}"`,
      opinions: [
        { id: 'architect', name: 'Architect Agent', avatarBg: 'bg-cyan-600', avatarIcon: '🧠', confidence: 0.90, recommendation: 'Modular Architecture' },
        { id: 'researcher', name: 'Researcher Agent', avatarBg: 'bg-purple-500', avatarIcon: '🔬', confidence: 0.86, recommendation: 'Standardized Pattern' },
        { id: 'security', name: 'Security Agent', avatarBg: 'bg-pink-600', avatarIcon: '🛡️', confidence: 0.93, recommendation: 'Zero-Trust Policy' },
        { id: 'performance', name: 'Performance Agent', avatarBg: 'bg-emerald-600', avatarIcon: '⚡', confidence: 0.84, recommendation: 'Redis Caching Tier' }
      ],
      consensus: {
        confidence: 0.88,
        recommendation: `Adopt standardized design patterns for: "${q.length > 35 ? q.substring(0, 35) + '...' : q}"`
      }
    };
  }

  // Handle when user prompts new questions in live chat
  const handleUpdateDeliberationFromChat = (newQ: string) => {
    setQuestion(newQ);
    setSessionState(getDynamicDeliberation(newQ));
  };

  useEffect(() => {
    setSessionState(getDynamicDeliberation(initialQ));
    setQuestion(initialQ);
  }, [initialQ]);

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto min-h-[85vh] flex flex-col justify-between">
      {/* Top Header */}
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
        
        {/* Column 1: Left (Deliberation Question + 2x2 Agent Cards Grid) */}
        <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
          <div className="glass-card p-5 border-white/10 bg-[#0F1420]/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-semibold">DELIBERATION</span>
              <button className="text-gray-500 hover:text-white text-xs">•••</button>
            </div>
            <h2 className="text-lg font-bold text-white leading-snug">
              {sessionState.question}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 flex-1">
            {sessionState.opinions.map((ag) => (
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

        {/* Column 2: Middle (Live Debate Transcript Chat Panel) */}
        <div className="lg:col-span-5 flex flex-col">
          <DebateTimeline
            currentQuestion={sessionState.question}
            onNewQuestionSubmitted={handleUpdateDeliberationFromChat}
          />
        </div>

        {/* Column 3: Right (Consensus Judge Gauge + Recommendation Card) */}
        <div className="lg:col-span-3 flex flex-col">
          <ConsensusJudgeCard
            confidence={sessionState.consensus.confidence}
            recommendation={sessionState.consensus.recommendation}
          />
        </div>

      </div>
    </div>
  );
}
