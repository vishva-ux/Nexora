'use client';

import React from 'react';
import { Database, Upload, FileText, CheckCircle } from 'lucide-react';

export default function KnowledgeBasePage() {
  const documents = [
    { title: 'PostgreSQL 16 Performance Guidelines.pdf', chunks: 14, size: '2.4 MB', date: '2026-09-01' },
    { title: 'Enterprise Database Benchmarks 2026.md', chunks: 8, size: '480 KB', date: '2026-08-28' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Database className="w-6 h-6 text-indigo-400" />
            RAG Knowledge Base & pgvector Storage
          </h1>
          <p className="text-sm text-gray-400 mt-1">Upload technical evidence documents used by the Researcher agent.</p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-600/30">
          <Upload className="w-4 h-4" /> Upload Document
        </button>
      </div>

      <div className="glass-card p-6 border-white/10 space-y-4">
        <h2 className="text-base font-semibold text-white">Ingested RAG Documents</h2>

        <div className="space-y-3">
          {documents.map((doc, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-indigo-400" />
                <div>
                  <h3 className="text-sm font-semibold text-white">{doc.title}</h3>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">{doc.chunks} chunks embedded in pgvector • {doc.size} • Uploaded {doc.date}</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <CheckCircle className="w-3.5 h-3.5" /> ACTIVE IN RAG
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
