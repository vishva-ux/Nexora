'use client';

import React from 'react';
import { Users, Shield, Cpu, Zap, Microscope } from 'lucide-react';

export default function AgentsPage() {
  const agents = [
    { id: 'architect', name: 'Architect', role: 'Senior System Architect', icon: '🧠', focus: 'Architecture, maintainability, scalability, design tradeoffs', style: 'Strict ACID enforcement & modular domain design' },
    { id: 'researcher', name: 'Researcher', role: 'Technical Researcher', icon: '🔬', focus: 'Evidence, documentation, knowledge base, industry patterns', style: 'Empirical benchmark retrieval via RAG & pgvector' },
    { id: 'security', name: 'Security Analyst', role: 'Security Engineer', icon: '🛡️', focus: 'Threats, auth, data protection, compliance', style: 'Zero-trust evaluation, RLS security & audit readiness' },
    { id: 'performance', name: 'Performance Engineer', role: 'Scalability Specialist', icon: '⚡', focus: 'Latency, throughput, database performance, caching', style: 'Sub-millisecond SLA optimization & horizontal sharding' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-indigo-400" />
          Autonomous Agent Network Council
        </h1>
        <p className="text-sm text-gray-400 mt-1">Specialized AI personalities, domain focus, and operational rules.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((ag) => (
          <div key={ag.id} className="glass-card p-6 border-white/10 space-y-4">
            <div className="flex items-center gap-4">
              <div className="text-3xl p-3 rounded-xl bg-indigo-950/60 border border-indigo-500/20">{ag.icon}</div>
              <div>
                <h2 className="text-lg font-bold text-white">{ag.name}</h2>
                <p className="text-xs text-indigo-400 font-mono">{ag.role}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-gray-400 font-semibold">Core Focus:</span>
                <p className="text-gray-300 mt-0.5">{ag.focus}</p>
              </div>
              <div>
                <span className="text-gray-400 font-semibold">Reasoning Style:</span>
                <p className="text-gray-300 mt-0.5">{ag.style}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
