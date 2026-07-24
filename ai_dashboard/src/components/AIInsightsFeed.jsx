import React from 'react';
import { Sparkles, Lightbulb, Zap, ShieldAlert, ArrowUpRight, CheckCircle } from 'lucide-react';

const insightsList = [
  {
    id: 1,
    type: 'peak',
    title: 'Peak Cognitive Velocity Detected',
    time: '10 mins ago',
    description: 'Your focus intensity score reached 96%. We recommend tackling complex architectural decisions or high-difficulty coding now.',
    badge: 'High Impact',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    icon: Zap,
    iconColor: 'text-cyan-400'
  },
  {
    id: 2,
    type: 'automation',
    title: 'Automation Opportunity Identified',
    time: '45 mins ago',
    description: 'You repeated file parsing code across 3 separate handlers. Delegate boilerplate generation to AI Assistant to save ~40 mins.',
    badge: 'Time Saver',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    icon: Lightbulb,
    iconColor: 'text-purple-400'
  },
  {
    id: 3,
    type: 'fatigue',
    title: 'Cognitive Fatigue Prevention Warning',
    time: '2 hours ago',
    description: 'You have been working continuously for 110 minutes without a break. Take a 5-minute hydration break to maintain peak flow.',
    badge: 'Health Alert',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    icon: ShieldAlert,
    iconColor: 'text-amber-400'
  }
];

export default function AIInsightsFeed() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" /> AI Coach & Workflow Intelligence
          </h2>
          <p className="text-xs text-slate-400">Personalized real-time feedback based on your daily work patterns and telemetry.</p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 transition-all flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Mark All Addressed
        </button>
      </div>

      {/* Feed Items */}
      <div className="space-y-4">
        {insightsList.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="glass-card p-6 rounded-3xl border border-slate-800/80 hover:border-slate-700 transition-all flex items-start space-x-4">
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 shrink-0">
                <Icon className={`w-5 h-5 ${item.iconColor}`} />
              </div>

              <div className="space-y-2 w-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-semibold ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">{item.time}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

                <div className="pt-2 flex items-center space-x-3 text-xs">
                  <button className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 font-semibold transition-all flex items-center space-x-1">
                    <span>Apply Recommendation</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                  <button className="text-slate-500 hover:text-slate-300 transition-colors">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
