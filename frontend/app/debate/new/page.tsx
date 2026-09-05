'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

export default function NewDeliberation() {
  const router = useRouter();
  const [question, setQuestion] = useState('');
  const [context, setContext] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const sampleQuestions = [
    'Should our company migrate from PostgreSQL to MongoDB?',
    'Should this backend microservice architecture use REST or GraphQL?',
    'Should we deploy our application infrastructure on Kubernetes vs ECS?',
    'What are the critical security risks in storing vector embeddings in pgvector vs Pinecone?'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      router.push(`/debate/session?q=${encodeURIComponent(question)}`);
    }, 400);
  };

  const handleSelectSample = (q: string) => {
    setQuestion(q);
    setSubmitting(true);
    setTimeout(() => {
      router.push(`/debate/session?q=${encodeURIComponent(q)}`);
    }, 400);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-indigo-400" />
          Initiate New Deliberation Session
        </h1>
        <p className="text-sm text-gray-400 mt-1">Submit any complex engineering decision for multi-agent council deliberation.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card p-6 border-white/10 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-300">Decision Question</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type any engineering question e.g. Should we use microservices or modular monolith?"
            rows={3}
            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-300">Context & Technical Constraints (Optional)</label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="e.g. Traffic requirements, security constraints, budget limits..."
            rows={3}
            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30"
        >
          {submitting ? 'Initializing Council Graph...' : 'Start Multi-Agent Deliberation'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Example Questions</h3>
        <div className="space-y-2">
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectSample(q)}
              className="w-full text-left p-3.5 rounded-xl bg-black/30 border border-white/5 hover:border-indigo-500/40 text-xs text-gray-300 hover:text-white transition-all flex items-center justify-between group"
            >
              <span>{q}</span>
              <MessageSquare className="w-4 h-4 text-gray-500 group-hover:text-indigo-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
