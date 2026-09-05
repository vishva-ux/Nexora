'use client';

import React from 'react';

interface ConsensusJudgeCardProps {
  confidence?: number;
  recommendation?: string;
}

export default function ConsensusJudgeCard({
  confidence = 0.93,
  recommendation = "Keep PostgreSQL as primary DB"
}: ConsensusJudgeCardProps) {
  const percent = Math.round(confidence * 100);

  return (
    <div className="glass-card p-6 h-full flex flex-col justify-between border-white/10 bg-[#0F1420]/80">
      <div className="flex items-center justify-between">
        <h2 className="text-xs uppercase tracking-wider font-semibold text-gray-400 font-mono">CONSENSUS JUDGE</h2>
        <button className="text-gray-400 hover:text-white text-xs">•••</button>
      </div>

      {/* Large Glowing Circular Gauge */}
      <div className="flex flex-col items-center justify-center py-8">
        <div className="relative w-44 h-44 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#1E293B"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#3B82F6"
              strokeWidth="8"
              strokeDasharray={251.2}
              strokeDashoffset={251.2 * (1 - percent / 100)}
              strokeLinecap="round"
              fill="transparent"
              className="drop-shadow-[0_0_12px_rgba(59,130,246,0.6)] transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold text-white font-mono tracking-tight">{percent}%</span>
          </div>
        </div>
      </div>

      {/* Recommendation Card */}
      <div className="p-5 rounded-2xl bg-[#161D2F] border border-white/5 space-y-2 text-center shadow-inner">
        <span className="text-xs text-gray-400 font-medium">Recommendation:</span>
        <h3 className="text-lg font-bold text-white leading-snug">
          {recommendation}
        </h3>
      </div>
    </div>
  );
}
