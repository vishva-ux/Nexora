'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MessageSquarePlus, History, Database, Users, BarChart3, Settings, Shield } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'New Deliberation', path: '/debate/new', icon: MessageSquarePlus },
    { name: 'History', path: '/history', icon: History },
    { name: 'Knowledge Base', path: '/knowledge', icon: Database },
    { name: 'Agent Network', path: '/agents', icon: Users },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0B101D] border-r border-white/10 h-screen flex flex-col justify-between p-4 fixed left-0 top-0 z-40">
      <div>
        <Link href="/" className="flex items-center gap-3 px-2 py-4 mb-6">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/30">
            N
          </div>
          <div>
            <h1 className="font-bold text-lg text-white tracking-wide">NEXORA</h1>
            <p className="text-[10px] text-indigo-400 font-medium">MULTI-AGENT DECISION</p>
          </div>
        </Link>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.path === '/' ? pathname === '/' : pathname?.startsWith(item.path);
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-3 glass-card flex items-center justify-between border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-xs text-gray-300 font-mono">DEMO MODE ACTIVE</span>
        </div>
        <Shield className="w-4 h-4 text-indigo-400" />
      </div>
    </aside>
  );
}
