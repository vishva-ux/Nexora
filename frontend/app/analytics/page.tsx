'use client';

import React from 'react';
import { BarChart3, TrendingUp, Cpu, Clock, Zap } from 'lucide-react';

export default function AnalyticsPage() {
  const metrics = [
    { label: 'Total Deliberations', value: '42', detail: '100% completed cleanly' },
    { label: 'Avg Deliberation Time', value: '3.4s', detail: 'Parallel async graph' },
    { label: 'Dissent Frequency', value: '19%', detail: '8 sessions with dissent' },
    { label: 'Total Token Consumption', value: '184.2k', detail: 'Estimated cost: $0.36' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-indigo-400" />
          System Analytics & Telemetry
        </h1>
        <p className="text-sm text-gray-400 mt-1">Real-time performance metrics, agent consensus behavior, and latency analysis.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((m, idx) => (
          <div key={idx} className="glass-card p-5 border-white/10 space-y-2">
            <span className="text-xs text-gray-400 uppercase font-medium">{m.label}</span>
            <div className="text-3xl font-bold font-mono text-indigo-400">{m.value}</div>
            <p className="text-[11px] text-gray-500 font-mono">{m.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 border-white/10 space-y-4">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" /> Agent Council Reliability Metrics
          </h2>
          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-black/40 border border-white/5 flex justify-between">
              <span>🧠 Architect</span>
              <span className="text-emerald-400">Avg Confidence: 89% | Latency: 2.4s</span>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-white/5 flex justify-between">
              <span>🔬 Researcher</span>
              <span className="text-emerald-400">Avg Confidence: 85% | Latency: 3.1s</span>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-white/5 flex justify-between">
              <span>🛡️ Security Analyst</span>
              <span className="text-emerald-400">Avg Confidence: 92% | Latency: 2.1s</span>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-white/5 flex justify-between">
              <span>⚡ Performance Engineer</span>
              <span className="text-emerald-400">Avg Confidence: 81% | Latency: 2.8s</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 border-white/10 space-y-4">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-400" /> Disagreement & Dissent Rate
          </h2>
          <div className="p-6 rounded-xl bg-black/40 border border-white/5 text-center space-y-2">
            <div className="text-4xl font-bold font-mono text-amber-400">19%</div>
            <p className="text-xs text-gray-400">Sessions triggering explicit dissent detection and minority opinion evaluation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
