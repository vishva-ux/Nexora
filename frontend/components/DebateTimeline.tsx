'use client';

import React, { useState } from 'react';
import { Send, Smile } from 'lucide-react';

interface DebateTimelineProps {
  currentQuestion?: string;
}

export default function DebateTimeline({ currentQuestion }: DebateTimelineProps) {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    {
      sender_agent_id: 'Architect Agent',
      icon: '🧠',
      bg: 'bg-cyan-600',
      time: '1:33 AM',
      content: currentQuestion || 'Should our company migrate from PostgreSQL to MongoDB?',
      counterarguments: 'Data points on architectural constraints and trade-off analysis.'
    },
    {
      sender_agent_id: 'Security Agent',
      icon: '🛡️',
      bg: 'bg-purple-600',
      time: '1:53 AM',
      content: 'Security analysis recommends relational storage with Row Level Security (RLS) enforcement.'
    },
    {
      isDissent: true
    },
    {
      sender_agent_id: 'Performance Agent',
      icon: '⚡',
      bg: 'bg-emerald-600',
      time: '1:33 AM',
      content: 'Performance Engineer highlights write scaling bottlenecks under high traffic spikes.'
    },
    {
      sender_agent_id: 'Performance Agent',
      icon: '⚡',
      bg: 'bg-emerald-600',
      time: '7:35 AM',
      content: 'Consider hybrid caching layers before full database engine migration.'
    }
  ]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    const userMsg = {
      sender_agent_id: 'User / Analyst',
      icon: '👤',
      bg: 'bg-indigo-600',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: userText
    };

    let replyMsg;
    const lower = userText.toLowerCase();

    if (lower.includes("different") || lower.includes("dissent") || lower.includes("minority")) {
      replyMsg = {
        sender_agent_id: 'Performance Agent (Minority Dissent)',
        icon: '⚡',
        bg: 'bg-amber-600',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: `Dissenting perspective: If your write traffic bursts past 50,000 requests/sec, MongoDB's horizontal auto-sharding provides lower latency than single-primary PostgreSQL.`
      };
    } else if (lower.includes("security") || lower.includes("risk") || lower.includes("auth")) {
      replyMsg = {
        sender_agent_id: 'Security Agent',
        icon: '🛡️',
        bg: 'bg-purple-600',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: `Security assessment: PostgreSQL supports enterprise Row Level Security (RLS), transparent data encryption (TDE), and SOC2 compliance out of the box.`
      };
    } else {
      replyMsg = {
        sender_agent_id: 'Consensus Judge',
        icon: '⚖️',
        bg: 'bg-blue-600',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: `Evaluated analyst prompt: "${userText}". The agent council weighted evidence quality and recommends maintaining PostgreSQL for core ACID compliance.`
      };
    }

    setMessages((prev) => [...prev, userMsg, replyMsg]);
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="glass-card p-5 h-full flex flex-col justify-between border-white/10 bg-[#0F1420]/80">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <h3 className="text-xs uppercase font-mono font-semibold text-gray-300">LIVE DEBATE</h3>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> Live
          </span>
          <button className="text-xs bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded text-gray-300 border border-white/10">Timeline</button>
          <button className="text-gray-400 hover:text-white text-xs ml-1">•••</button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 my-4 pr-1 text-xs max-h-[460px]">
        {messages.map((item, idx) => {
          if (item.isDissent) {
            return (
              <div key={idx} className="relative my-4 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-red-500/40"></div></div>
                <div className="relative bg-[#0F1420] px-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/50 text-[10px] font-mono font-bold text-red-400 uppercase tracking-wide shadow-lg shadow-red-950/50">
                    DISSENT DETECTED
                  </span>
                </div>
              </div>
            );
          }

          return (
            <div key={idx} className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full ${item.bg} flex items-center justify-center text-white text-xs shrink-0 shadow`}>
                {item.icon}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between text-gray-400 text-[11px]">
                  <span className="font-semibold text-white">{item.sender_agent_id}</span>
                  <span className="font-mono text-gray-500">{item.time}</span>
                </div>
                <div className="bg-[#141A28] p-3 rounded-xl border border-white/5 text-gray-200 leading-relaxed">
                  {item.content}
                </div>
                {item.counterarguments && (
                  <div className="pl-4 border-l-2 border-indigo-500/30 text-[11px] text-gray-400 space-y-0.5 mt-1">
                    <span className="text-[10px] text-gray-500 uppercase font-mono block">Counterarguments</span>
                    <p>{item.counterarguments}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Input Box */}
      <div className="pt-2 border-t border-white/5">
        <div className="bg-[#141A28] border border-white/10 rounded-xl flex items-center px-3 py-2 space-x-2 focus-within:border-indigo-500 transition-all">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message to interact with agent council..."
            className="bg-transparent flex-1 text-xs text-white focus:outline-none placeholder-gray-500"
          />
          <button className="text-gray-400 hover:text-white p-1">
            <Smile className="w-4 h-4" />
          </button>
          <button onClick={handleSendMessage} className="text-indigo-400 hover:text-indigo-300 p-1">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
