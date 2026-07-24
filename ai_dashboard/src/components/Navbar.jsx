import React, { useState } from 'react';
import { Sparkles, Activity, Bell, Search, User, ShieldCheck, Zap } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80 px-6 py-3.5 flex items-center justify-between">
      {/* Brand & Logo */}
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-0.5 flex items-center justify-center glow-cyan">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold tracking-tight text-white font-display">AI Pulse</h1>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full uppercase tracking-wider">v2.4 Pro</span>
          </div>
          <p className="text-xs text-slate-400 hidden sm:block">AI Productivity & Workflow Intelligence</p>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="hidden md:flex items-center relative max-w-md w-full mx-8">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search AI metrics, subtasks, or soundscapes..."
          className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
        />
        <kbd className="absolute right-3 text-[10px] font-mono bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">⌘K</kbd>
      </div>

      {/* Right Side Tools */}
      <div className="flex items-center space-x-4">
        {/* Live AI Status Pill */}
        <div className="hidden lg:flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> AI Engine Active
          </span>
        </div>

        {/* Notifications Button */}
        <div className="relative">
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-400 rounded-full"></span>
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 glass-panel rounded-2xl p-4 shadow-2xl border border-slate-800 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <h3 className="text-sm font-semibold text-white">AI Assistant Alerts</h3>
                <span className="text-xs text-cyan-400 font-medium cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs">
                  <Activity className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-cyan-200">Peak Focus Hour Detected</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">Your velocity is 34% higher right now. Focus mode enabled.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-200">Weekly Goal Achieved</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">Automated 12 repetitive tasks, saving 4.8 hours.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3 pl-2 border-l border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 cursor-pointer">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <User className="w-4 h-4 text-slate-200" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
