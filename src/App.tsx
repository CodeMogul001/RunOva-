import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { AgentGrid } from './components/AgentGrid';
import { HowItWorks } from './components/HowItWorks';
import { FinancialControl } from './components/FinancialControl';
import { NearIntegration } from './components/NearIntegration';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { GetStartedModal } from './components/modals/GetStartedModal';
import { LoginModal } from './components/modals/LoginModal';
import { ContactModal } from './components/modals/ContactModal';
import { AgentModal } from './components/modals/AgentModal';
import { AGENTS_DATA } from './data/agents';
import { AgentInfo } from './types';

export default function App() {
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentInfo | null>(null);

  const handleOpenAgentById = (agentId: string) => {
    const found = AGENTS_DATA.find((a) => a.id === agentId);
    if (found) {
      setSelectedAgent(found);
    }
  };

  const handleDeployAgent = (agentId: string) => {
    // Open the GetStarted flow to configure the business workspace
    setIsGetStartedOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col font-sans selection:bg-[#111111] selection:text-white">
      {/* SECTION 1: Sticky Navigation Bar */}
      <Navbar
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      <main className="flex-1">
        {/* SECTION 2: Hero & Miniature Dashboard Preview */}
        <Hero
          onOpenGetStarted={() => setIsGetStartedOpen(true)}
          onOpenAgentModal={handleOpenAgentById}
        />

        {/* SECTION 3: Problem and Solution */}
        <ProblemSolution />

        {/* SECTION 4: AI Workforce */}
        <AgentGrid onSelectAgent={(agent) => setSelectedAgent(agent)} />

        {/* SECTION 5: How It Works */}
        <HowItWorks />

        {/* SECTION 6: Financial Control & Policy Simulator */}
        <FinancialControl />

        {/* SECTION 7: Built on NEAR Protocol */}
        <NearIntegration />

        {/* SECTION 8: Final Call-To-Action */}
        <FinalCTA onOpenGetStarted={() => setIsGetStartedOpen(true)} />
      </main>

      {/* SECTION 9: Minimal Footer */}
      <Footer
        onOpenContact={() => setIsContactOpen(true)}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
      />

      {/* Interactive Modals with smooth AnimatePresence transitions */}
      <AnimatePresence>
        {isGetStartedOpen && (
          <GetStartedModal
            isOpen={isGetStartedOpen}
            onClose={() => setIsGetStartedOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLoginOpen && (
          <LoginModal
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isContactOpen && (
          <ContactModal
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
          />
        )}
      </AnimatePresence>

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

