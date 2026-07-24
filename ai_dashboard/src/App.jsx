import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import OverviewAnalytics from './components/OverviewAnalytics';
import AITaskOptimizer from './components/AITaskOptimizer';
import FocusFlowState from './components/FocusFlowState';
import AIInsightsFeed from './components/AIInsightsFeed';
import AuthModal from './components/AuthModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState({
    name: 'Alex Morgan',
    email: 'alex.morgan@company.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  });

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewAnalytics user={user} />;
      case 'optimizer':
        return <AITaskOptimizer user={user} />;
      case 'focus':
        return <FocusFlowState user={user} />;
      case 'insights':
        return <AIInsightsFeed user={user} />;
      default:
        return <OverviewAnalytics user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dashboard Active Module View */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
          {/* Mobile Tab Navigation */}
          <div className="flex md:hidden items-center space-x-2 overflow-x-auto pb-4 mb-4 border-b border-slate-800 scrollbar-none">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'optimizer', label: 'AI Optimizer' },
              { id: 'focus', label: 'Focus Timer' },
              { id: 'insights', label: 'AI Insights' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {renderActiveModule()}
        </main>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
