import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FinancialControl } from './components/FinancialControl';
import { TransactionHistory } from './components/TransactionHistory';
import { ProblemSolution } from './components/ProblemSolution';
import { AgentGrid } from './components/AgentGrid';
import { HowItWorks } from './components/HowItWorks';
import { NearIntegration } from './components/NearIntegration';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { GetStartedPage } from './pages/GetStartedPage';
import { LoginModal } from './components/modals/LoginModal';
import { ContactModal } from './components/modals/ContactModal';
import { AgentModal } from './components/modals/AgentModal';
import { AGENTS_DATA } from './data/agents';
import { AgentInfo } from './types';

export default function App() {
  // Real page routing for /get-started
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      if (
        window.location.pathname === '/get-started' ||
        window.location.hash === '#get-started'
      ) {
        return '/get-started';
      }
    }
    return '/';
  });

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentInfo | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      if (
        window.location.pathname === '/get-started' ||
        window.location.hash === '#get-started'
      ) {
        setCurrentRoute('/get-started');
      } else {
        setCurrentRoute('/');
      }
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentRoute(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenAgentById = (agentId: string) => {
    const found = AGENTS_DATA.find((a) => a.id === agentId);
    if (found) {
      setSelectedAgent(found);
    }
  };

  const handleDeployAgent = (agentId: string) => {
    setSelectedAgent(null);
    navigate('/get-started');
  };

  // If user is on the dedicated /get-started page
  if (currentRoute === '/get-started') {
    return <GetStartedPage onBack={() => navigate('/')} />;
  }

  return (
    <div className="min-h-screen bg-[#F6F4EE] text-[#111111] flex flex-col font-sans selection:bg-[#00EC97] selection:text-[#111111]">
      {/* SECTION 1: Sticky Navigation Bar */}
      <Navbar
        onOpenGetStarted={() => navigate('/get-started')}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      <main className="flex-1">
        {/* SECTION 2: Hero & 3D / Dashboard Visual Preview */}
        <Hero
          onOpenGetStarted={() => navigate('/get-started')}
          onOpenAgentModal={handleOpenAgentById}
        />

        {/* SECTION 3: Policy Simulator (Positioned right after the hero as requested) */}
        <FinancialControl />

        {/* SECTION 4: Transaction History & Recharts Financial Intelligence */}
        <TransactionHistory />

        {/* SECTION 5: Problem and Solution */}
        <ProblemSolution />

        {/* SECTION 6: AI Workforce */}
        <AgentGrid onSelectAgent={(agent) => setSelectedAgent(agent)} />

        {/* SECTION 7: How It Works */}
        <HowItWorks />

        {/* SECTION 8: Built on NEAR Protocol (Merged architecture specification) */}
        <NearIntegration />

        {/* SECTION 9: Final Call-To-Action */}
        <FinalCTA onOpenGetStarted={() => navigate('/get-started')} />
      </main>

      {/* SECTION 10: Minimal Footer */}
      <Footer
        onOpenContact={() => setIsContactOpen(true)}
        onOpenGetStarted={() => navigate('/get-started')}
      />

      {/* Wallet Sign-In Modal (Wallet sign-in only) */}
      <AnimatePresence>
        {isLoginOpen && (
          <LoginModal
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Executive Contact Inquiry Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <ContactModal
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Agent Detail Modal */}
      <AnimatePresence>
        {selectedAgent && (
          <AgentModal
            agent={selectedAgent}
            onClose={() => setSelectedAgent(null)}
            onDeploy={handleDeployAgent}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
