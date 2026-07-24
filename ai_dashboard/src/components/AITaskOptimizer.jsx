import React, { useState } from 'react';
import { BrainCircuit, Sparkles, CheckCircle2, Circle, Clock, Flame, Plus, ArrowRight, Wand2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const initialTasks = [
  {
    id: 1,
    title: 'Architect FastAPI Vector Search Endpoint',
    category: 'Backend AI',
    duration: '45 mins',
    difficulty: 'High',
    completed: true,
    aiRecommendation: 'Use pgvector or Redis Vector Search to reduce search latency under 50ms.'
  },
  {
    id: 2,
    title: 'Design Dark Glassmorphic Dashboard Layout',
    category: 'UI/UX Design',
    duration: '30 mins',
    difficulty: 'Medium',
    completed: false,
    aiRecommendation: 'Leverage Tailwind v4 backdrop-blur tokens and Outfit font headers.'
  },
  {
    id: 3,
    title: 'Implement Pomodoro Audio Soundscape Web Audio API',
    category: 'Frontend Logic',
    duration: '25 mins',
    difficulty: 'Low',
    completed: false,
    aiRecommendation: 'Use html5 Audio API loop mode with gain node fade-in.'
  }
];

export default function AITaskOptimizer() {
  const [tasks, setTasks] = useState(initialTasks);
  const [goalInput, setGoalInput] = useState('');
  const [isDecomposing, setIsDecomposing] = useState(false);

  const toggleTask = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const nextState = !task.completed;
        if (nextState) {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 }
          });
        }
        return { ...task, completed: nextState };
      }
      return task;
    }));
  };

  const handleDecompose = (e) => {
    e.preventDefault();
    if (!goalInput.trim()) return;

    setIsDecomposing(true);
    setTimeout(() => {
      const generated = [
        {
          id: Date.now() + 1,
          title: `Analyze & Structure: ${goalInput}`,
          category: 'AI Strategy',
          duration: '20 mins',
          difficulty: 'Medium',
          completed: false,
          aiRecommendation: 'Break requirements into atomic microservices.'
        },
        {
          id: Date.now() + 2,
          title: `Implement Core Engine for ${goalInput}`,
          category: 'Development',
          duration: '50 mins',
          difficulty: 'High',
          completed: false,
          aiRecommendation: 'Use asynchronous batch processing.'
        }
      ];

      setTasks([...generated, ...tasks]);
      setGoalInput('');
      setIsDecomposing(false);
      
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.5 }
      });
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <BrainCircuit className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AI Task & Workflow Decomposer</h2>
            <p className="text-sm text-slate-400">Enter a high-level goal and let AI decompose it into optimized subtasks.</p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleDecompose} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full">
            <Wand2 className="w-4 h-4 text-cyan-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              placeholder="e.g. Build an AI customer support bot with real-time streaming..."
              className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={isDecomposing}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2 shrink-0 disabled:opacity-50"
          >
            {isDecomposing ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Decomposing Goal...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Decompose with AI</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Task List Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Active Optimized Tasks</h3>
          <span className="text-xs text-slate-400 font-medium">
            {tasks.filter(t => t.completed).length} of {tasks.length} Completed
          </span>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`glass-card p-5 rounded-2xl cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 border transition-all ${
                task.completed 
                  ? 'bg-slate-900/40 border-slate-800/60 opacity-60' 
                  : 'border-slate-800 hover:border-cyan-500/30'
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <button className="mt-0.5 text-slate-400 hover:text-cyan-400 transition-colors">
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-500" />
                  )}
                </button>
                <div>
                  <h4 className={`text-base font-semibold text-white ${task.completed ? 'line-through text-slate-400' : ''}`}>
                    {task.title}
                  </h4>
                  <div className="flex items-center space-x-3 mt-1.5 text-xs text-slate-400">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                      {task.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {task.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      {task.difficulty} Complexity
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Recommendation Badge */}
              <div className="md:max-w-xs p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed text-slate-400">
                  <strong className="text-cyan-300">AI Tip:</strong> {task.aiRecommendation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
