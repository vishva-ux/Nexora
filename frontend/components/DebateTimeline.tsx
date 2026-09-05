'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Loader2, Sparkles } from 'lucide-react';

interface MessageItem {
  id: string;
  sender: string;
  role: string;
  icon: string;
  bg: string;
  time: string;
  content: string;
  isDissent?: boolean;
}

interface DebateTimelineProps {
  currentQuestion?: string;
  onNewQuestionSubmitted?: (q: string) => void;
}

export default function DebateTimeline({ currentQuestion, onNewQuestionSubmitted }: DebateTimelineProps) {
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getInitialMessages = (q?: string): MessageItem[] => {
    const qText = q || 'Should our company migrate from PostgreSQL to MongoDB?';
    return [
      {
        id: '1',
        sender: 'Architect Agent',
        role: 'Senior System Architect',
        icon: '🧠',
        bg: 'bg-cyan-600',
        time: '1:33 AM',
        content: `Initiating architecture analysis for: "${qText}". Evaluating domain complexity, maintainability, and system boundaries.`
      },
      {
        id: '2',
        sender: 'Researcher Agent',
        role: 'Technical Researcher',
        icon: '🔬',
        bg: 'bg-purple-600',
        time: '1:34 AM',
        content: `Retrieved empirical benchmark data and RAG evidence for: "${qText}".`
      },
      {
        id: '3',
        sender: 'Security Agent',
        role: 'Security Engineer',
        icon: '🛡️',
        bg: 'bg-pink-600',
        time: '1:35 AM',
        content: `Security & compliance evaluation active. Analyzing authentication protocols, data protection, and vulnerability surface.`
      },
      {
        id: 'dissent-1',
        sender: 'DISSENT',
        role: 'Dissent',
        icon: '⚠️',
        bg: '',
        time: '',
        content: '',
        isDissent: true
      },
      {
        id: '4',
        sender: 'Performance Agent',
        role: 'Scalability Specialist',
        icon: '⚡',
        bg: 'bg-emerald-600',
        time: '1:36 AM',
        content: `Performance Engineer analysis: Evaluating latency, throughput bursts, concurrency bottlenecks, and caching requirements.`
      }
    ];
  };

  const [messages, setMessages] = useState<MessageItem[]>(() => getInitialMessages(currentQuestion));

  useEffect(() => {
    setMessages(getInitialMessages(currentQuestion));
  }, [currentQuestion]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSendMessage = () => {
    if (!inputText.trim() || isThinking) return;

    const userQuery = inputText.trim();
    setInputText('');

    const userMsg: MessageItem = {
      id: Date.now().toString(),
      sender: 'User / Analyst',
      role: 'Prompt Author',
      icon: '👤',
      bg: 'bg-indigo-600',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: userQuery
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    // Notify parent workspace to update Agent Cards & Consensus Judge Card dynamically
    if (onNewQuestionSubmitted) {
      onNewQuestionSubmitted(userQuery);
    }

    setTimeout(() => {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const lower = userQuery.toLowerCase();

      let archContent = '';
      let resContent = '';
      let secContent = '';
      let perfContent = '';
      let judgeContent = '';

      if (lower.includes('chatgpt') || lower.includes('claude')) {
        archContent = 'Claude 3.5 Sonnet exhibits superior long-context retention and architectural precision for large codebase refactoring.';
        resContent = 'Benchmarks show Claude 3.5 Sonnet leading HumanEval coding tests (92%), while ChatGPT (GPT-4o) leads in multi-modal ecosystem integrations.';
        secContent = 'ChatGPT Enterprise provides SOC2 Type II compliance and zero data retention; Claude Enterprise offers strict VPC data isolation.';
        perfContent = 'Claude 3.5 Sonnet yields 2.5x faster token output generation for complex JSON schema responses compared to GPT-4o.';
        judgeContent = 'Consensus Judge: Use Claude 3.5 Sonnet for technical coding & system design; leverage ChatGPT Enterprise for broader multi-modal workflows.';
      } else if (lower.includes('rest') || lower.includes('graphql')) {
        archContent = 'REST with OpenAPI specifications provides strict domain contracts, predictable caching, and simpler team onboarding.';
        resContent = 'Industry surveys indicate REST powers 84% of enterprise API gateways due to standardized HTTP tooling and tooling matureness.';
        secContent = 'REST endpoints allow precise granular RBAC authorization per path, avoiding GraphQL over-fetching security vulnerabilities.';
        perfContent = 'GraphQL reduces network roundtrips for multi-entity mobile client dashboards through single-query payload bundling.';
        judgeContent = 'Consensus Judge: Standardize on REST for main gateway APIs; use GraphQL only for complex multi-entity client views.';
      } else {
        archContent = `Architect evaluation for "${userQuery}": Prioritize modular boundaries, clean interface abstraction, and maintainable data contracts.`;
        resContent = `Researcher evaluation for "${userQuery}": Empirical benchmarks demonstrate standardized industry patterns minimize maintenance overhead.`;
        secContent = `Security evaluation for "${userQuery}": Enforce zero-trust JWT authentication, payload validation, and encrypted storage.`;
        perfContent = `Performance evaluation for "${userQuery}": Implement multi-tier Redis caching at the ingress layer to maintain sub-10ms response times.`;
        judgeContent = `Consensus Judge evaluation: Evaluated "${userQuery}" across all 4 agent perspectives. Recommendation updated with 92% confidence.`;
      }

      const agentReplies: MessageItem[] = [
        { id: Math.random().toString(), sender: 'Architect Agent', role: 'Architect', icon: '🧠', bg: 'bg-cyan-600', time: now, content: archContent },
        { id: Math.random().toString(), sender: 'Researcher Agent', role: 'Researcher', icon: '🔬', bg: 'bg-purple-600', time: now, content: resContent },
        { id: Math.random().toString(), sender: 'Security Agent', role: 'Security', icon: '🛡️', bg: 'bg-pink-600', time: now, content: secContent },
        { id: Math.random().toString(), sender: 'Performance Agent', role: 'Performance', icon: '⚡', bg: 'bg-emerald-600', time: now, content: perfContent },
        { id: Math.random().toString(), sender: 'Consensus Judge', role: 'Judge', icon: '⚖️', bg: 'bg-blue-600', time: now, content: judgeContent }
      ];

      setMessages((prev) => [...prev, ...agentReplies]);
      setIsThinking(false);
    }, 600);
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
        <div className="flex items-center gap-2">
          <h3 className="text-xs uppercase font-mono font-semibold text-gray-300">LIVE MULTI-AGENT DEBATE & CHAT</h3>
          <span className="flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">
            <Sparkles className="w-3 h-3 text-emerald-400" /> 2-Way Interactive
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> Live
          </span>
          <button className="text-xs bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded text-gray-300 border border-white/10">Timeline</button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 my-4 pr-1 text-xs max-h-[460px]">
        {messages.map((item) => {
          if (item.isDissent) {
            return (
              <div key={item.id} className="relative my-4 flex items-center justify-center">
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
            <div key={item.id} className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full ${item.bg} flex items-center justify-center text-white text-xs shrink-0 shadow`}>
                {item.icon}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between text-gray-400 text-[11px]">
                  <span className="font-semibold text-white">{item.sender}</span>
                  <span className="font-mono text-gray-500">{item.time}</span>
                </div>
                <div className="bg-[#141A28] p-3 rounded-xl border border-white/5 text-gray-200 leading-relaxed">
                  {item.content}
                </div>
              </div>
            </div>
          );
        })}

        {isThinking && (
          <div className="flex items-center gap-2 p-3 bg-[#141A28] rounded-xl border border-indigo-500/30 text-xs text-indigo-300 animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
            <span>Agent Council (Architect, Researcher, Security, Performance & Judge) evaluating prompt...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Interactive Chat Input Box */}
      <div className="pt-2 border-t border-white/5">
        <div className="bg-[#141A28] border border-white/10 rounded-xl flex items-center px-3 py-2 space-x-2 focus-within:border-indigo-500 transition-all">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isThinking}
            placeholder="Ask ANY engineering question e.g. 'Which is best ChatGPT or Claude?'..."
            className="bg-transparent flex-1 text-xs text-white focus:outline-none placeholder-gray-500"
          />
          <button className="text-gray-400 hover:text-white p-1">
            <Smile className="w-4 h-4" />
          </button>
          <button
            onClick={handleSendMessage}
            disabled={isThinking || !inputText.trim()}
            className="text-indigo-400 hover:text-indigo-300 p-1 disabled:opacity-50"
          >
            {isThinking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
