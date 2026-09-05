'use client';

import React from 'react';
import { Settings, Shield, Key, Cpu } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-indigo-400" />
          Platform Settings & LLM Configurations
        </h1>
        <p className="text-sm text-gray-400 mt-1">Configure LLM providers, API keys, fallback logic, and demo mode settings.</p>
      </div>

      <div className="glass-card p-6 border-white/10 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <div>
              <h2 className="text-sm font-semibold text-white">Active LLM Provider Mode</h2>
              <p className="text-xs text-gray-400">Currently using Demo LLM Provider (Offline & Fallback Enabled)</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">DEMO MODE ACTIVE</span>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300">OpenAI API Key</label>
            <input type="password" placeholder="sk-..." className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300">Ollama Local LLM Endpoint</label>
            <input type="text" defaultValue="http://localhost:11434" className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono" />
          </div>
        </div>

        <button className="px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all">
          Save Settings
        </button>
      </div>
    </div>
  );
}
