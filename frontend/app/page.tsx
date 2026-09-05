'use client';

import React from 'react';
import Link from 'next/link';
import { MessageSquarePlus, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const metrics = [
    { label: 'Active Deliberations', value: '3', change: '+1 this hour', color: 'text-indigo-400' },
    { label: 'Consensus Accuracy Proxy', value: '87%', change: 'Empirical model benchmark', color: 'text-emerald-400' },
    { label: 'Average Confidence', value: '84%', change: 'Across 42 sessions', color: 'text-purple-400' },
    { label: 'Average Deliberation Time', value: '3.4s', change: 'Concurrent execution', color: 'text-blue-400' },
  ];

  const recentSessions = [
    {
      id: 'demo-session-1',
      question: 'Should our company migrate from PostgreSQL to MongoDB?',
      status: 'Completed',
      consensus: 'PostgreSQL',
      confidence: '93%',
      agreement: '75%',
      time: '10 mins ago',
    },
    {
      id: 'demo-session-2',
      question: 'Should this microservices platform use REST or GraphQL for API gateway?',
      status: 'Completed',
      consensus: 'REST with OpenAPI',
      confidence: '88%',
      agreement: '100%',
      time: '2 hours ago',
    },
    {
      id: 'demo-session-3',
      question: 'Should we deploy our multi-tenant SaaS application on Kubernetes vs ECS?',
      status: 'Completed',
      consensus: 'AWS ECS / Fargate',
      confidence: '91%',
      agreement: '75%',
      time: 'Yesterday',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Executive Control Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">Multi-Agent Deliberation Network & Governance System</p>
        </div>

        <Link
          href="/debate/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-600/30"
        >
          <MessageSquarePlus className="w-4 h-4" />
          New Deliberation
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((m, idx) => (
          <div key={idx} className="glass-card p-5 border-white/10 space-y-2">
            <span className="text-xs text-gray-400 uppercase font-medium">{m.label}</span>
            <div className={`text-3xl font-bold font-mono ${m.color}`}>{m.value}</div>
            <p className="text-[11px] text-gray-500 font-mono">{m.change}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-6 border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-base font-semibold text-white">Recent Multi-Agent Deliberation Sessions</h2>
          <Link href="/history" className="text-xs text-indigo-400 hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-3">
          {recentSessions.map((s) => (
            <Link
              key={s.id}
              href={`/debate/${s.id}`}
              className="p-4 rounded-xl bg-black/40 border border-white/5 hover:border-indigo-500/40 transition-all flex items-center justify-between group"
            >
              <div className="space-y-1 max-w-2xl">
                <h3 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{s.question}</h3>
                <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
                  <span className="text-indigo-300">Consensus: {s.consensus}</span>
                  <span>Confidence: {s.confidence}</span>
                  <span>Agreement: {s.agreement}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {s.status}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-indigo-400 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
