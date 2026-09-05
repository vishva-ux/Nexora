'use client';

import React from 'react';

interface AgentCardProps {
  id: string;
  name: string;
  avatarBg: string;
  avatarIcon: string;
  confidence: number;
  recommendation: string;
}

export default function AgentCard({ id, name, avatarBg, avatarIcon, confidence, recommendation }: AgentCardProps) {
  const percent = Math.round(confidence * 100);

  return (
    <div className="bg-[#141A28] p-4 rounded-xl border border-white/5 flex flex-col justify-between space-y-3 shadow-md hover:border-indigo-500/30 transition-all">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-full ${avatarBg} flex items-center justify-center text-white text-base shadow-sm`}>
            {avatarIcon}
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white">{name}</h4>
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-bold text-white font-mono">{percent}%</span>
              <span className="text-[10px] text-gray-400">Confidence</span>
            </div>
          </div>
        </div>
        <button className="text-gray-500 hover:text-white text-xs">•••</button>
      </div>

      {/* Blue Progress Bar */}
      <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${percent}%` }}></div>
      </div>

      {/* Recommendation Box */}
      <div className="bg-[#1C2538] py-2 px-3 rounded-lg text-center border border-white/5">
        <span className="text-[10px] text-gray-400 block mb-0.5">Recommendation</span>
        <span className="text-xs font-bold text-white block truncate">{recommendation}</span>
      </div>
    </div>
  );
}
