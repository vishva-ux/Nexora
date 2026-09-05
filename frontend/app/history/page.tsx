'use client';

import React from 'react';
import Link from 'next/link';
import { History, Search, ArrowRight } from 'lucide-react';

export default function HistoryPage() {
  const sessions = [
    { id: 'demo-session-1', question: 'Should our company migrate from PostgreSQL to MongoDB?', consensus: 'PostgreSQL', confidence: '93%', agreement: '75%', date: '2026-09-02' },
    { id: 'demo-session-2', question: 'Should this backend microservice architecture use REST or GraphQL?', consensus: 'REST', confidence: '88%', agreement: '100%', date: '2026-09-01' },
    { id: 'demo-session-3', question: 'Should we deploy our application infrastructure on Kubernetes vs ECS?', consensus: 'AWS ECS', confidence: '91%', agreement: '75%', date: '2026-08-30' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <History className="w-6 h-6 text-indigo-400" />
          Deliberation Decision History
        </h1>
        <p className="text-sm text-gray-400 mt-1">Audit log of all multi-agent consensus decisions and dissent memory.</p>
      </div>

      <div className="glass-card p-6 border-white/10 space-y-4">
        <div className="flex items-center gap-3 bg-black/40 p-3 rounded-xl border border-white/10">
          <Search className="w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search previous decisions by question or keyword..." className="bg-transparent text-sm text-white focus:outline-none w-full" />
        </div>

        <div className="space-y-3">
          {sessions.map((s) => (
            <Link key={s.id} href={`/debate/${s.id}`} className="p-4 rounded-xl bg-black/30 border border-white/5 hover:border-indigo-500/40 transition-all flex items-center justify-between group">
              <div>
                <h3 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">{s.question}</h3>
                <p className="text-xs text-gray-400 font-mono mt-1">Consensus: {s.consensus} • Confidence: {s.confidence} • Agreement: {s.agreement} • {s.date}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-indigo-400" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
