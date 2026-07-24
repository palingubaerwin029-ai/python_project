import React from 'react';
import { LayoutDashboard, BrainCircuit, Timer, Users, Settings, Sparkles, TrendingUp } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'overview', label: 'Overview Analytics', icon: LayoutDashboard, badge: null },
    { id: 'optimizer', label: 'AI Task Optimizer', icon: BrainCircuit, badge: 'AI Live' },
    { id: 'focus', label: 'Focus & Soundscapes', icon: Timer, badge: 'Flow' },
    { id: 'insights', label: 'AI Insights & Feed', icon: Sparkles, badge: 'Hot' },
  ];

  return (
    <aside className="w-64 glass-panel border-r border-slate-800/80 p-4 flex flex-col justify-between hidden md:flex shrink-0 min-h-[calc(100vh-65px)]">
      <div className="space-y-6">
        <div>
          <p className="px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3">Main Navigation</p>
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/10 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      isActive 
                        ? 'bg-cyan-400 text-slate-950' 
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Productivity Score Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-slate-900 border border-indigo-500/20 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-300 mb-1">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span>Weekly Flow Score</span>
          </div>
          <div className="text-2xl font-bold text-white mb-2">94.8 <span className="text-xs font-normal text-emerald-400">+12% vs last week</span></div>
          <div className="w-full bg-slate-950/80 rounded-full h-2 overflow-hidden border border-slate-800">
            <div className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full rounded-full" style={{ width: '94.8%' }}></div>
          </div>
        </div>
      </div>

      {/* Footer Settings */}
      <div className="pt-4 border-t border-slate-800/80 space-y-1">
        <button className="w-full flex items-center space-x-3 px-3.5 py-2.5 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 rounded-xl transition-colors">
          <Settings className="w-4 h-4 text-slate-500" />
          <span>System Settings</span>
        </button>
      </div>
    </aside>
  );
}
