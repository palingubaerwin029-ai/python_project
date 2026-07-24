import React from 'react';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend 
} from 'recharts';
import { Clock, Zap, Target, ShieldCheck, ArrowUpRight, TrendingUp, Sparkles } from 'lucide-react';

const productivityData = [
  { day: 'Mon', manualHours: 6.2, aiSavedHours: 2.8, focusScore: 82 },
  { day: 'Tue', manualHours: 5.8, aiSavedHours: 3.5, focusScore: 88 },
  { day: 'Wed', manualHours: 4.5, aiSavedHours: 4.2, focusScore: 94 },
  { day: 'Thu', manualHours: 5.0, aiSavedHours: 3.9, focusScore: 91 },
  { day: 'Fri', manualHours: 4.2, aiSavedHours: 4.8, focusScore: 96 },
  { day: 'Sat', manualHours: 2.0, aiSavedHours: 1.5, focusScore: 78 },
  { day: 'Sun', manualHours: 1.5, aiSavedHours: 1.2, focusScore: 80 }
];

const compositionData = [
  { name: 'AI Task Decomposition', value: 35, color: '#38bdf8' },
  { name: 'Deep Focus Coding', value: 40, color: '#818cf8' },
  { name: 'Automated Code Review', value: 15, color: '#c084fc' },
  { name: 'Strategic Planning', value: 10, color: '#34d399' }
];

export default function OverviewAnalytics() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner / Welcome */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-900/30 via-slate-900 to-purple-900/30 border border-cyan-500/20 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1 relative z-10">
          <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-400">
            <Sparkles className="w-4 h-4" />
            <span>AI Real-time Intelligence Active</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Good evening, Alex 👋</h2>
          <p className="text-sm text-slate-400">Your AI automation workflow saved you <span className="text-cyan-300 font-semibold">4.8 hours</span> today. Your focus score is in the top <span className="text-emerald-400 font-semibold">5%</span>.</p>
        </div>

        <div className="flex items-center space-x-3 relative z-10">
          <button className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span>Optimize Active Workflow</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">AI Time Saved</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white font-display mb-1">21.9 hrs</div>
          <div className="flex items-center space-x-1 text-xs text-emerald-400 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% this week</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Deep Work Score</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white font-display mb-1">94.8 / 100</div>
          <div className="flex items-center space-x-1 text-xs text-emerald-400 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Optimal Flow State</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Task Completion Velocity</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white font-display mb-1">42 Tasks</div>
          <div className="flex items-center space-x-1 text-xs text-purple-400 font-medium">
            <span>3.2x faster with AI assistant</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Fatigue Index</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white font-display mb-1">Low (12%)</div>
          <div className="flex items-center space-x-1 text-xs text-emerald-400 font-medium">
            <span>Well rested & balanced</span>
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Productivity Area Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Productivity & AI Automation Trends</h3>
              <p className="text-xs text-slate-400">Comparing manual work hours vs. hours saved by AI automation</p>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="flex items-center gap-1.5 text-cyan-400"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> AI Saved Hours</span>
              <span className="flex items-center gap-1.5 text-indigo-400"><span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span> Manual Hours</span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorManual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} 
                />
                <Area type="monotone" dataKey="aiSavedHours" stroke="#38bdf8" strokeWidth={3} fillOpacity={1} fill="url(#colorAi)" name="AI Saved Hours" />
                <Area type="monotone" dataKey="manualHours" stroke="#818cf8" strokeWidth={2} fillOpacity={1} fill="url(#colorManual)" name="Manual Hours" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Work Composition Pie Chart */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white">AI Work Breakdown</h3>
            <p className="text-xs text-slate-400">Distribution of automated vs manual focus areas</p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={compositionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {compositionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            {compositionData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-300">{item.name}</span>
                </div>
                <span className="font-semibold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
