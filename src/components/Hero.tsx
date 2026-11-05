import React, { useState } from 'react';
import { ArrowRight, ChevronDown, Box, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DashboardPreview } from './DashboardPreview';
import { RunOva3DScene } from './three/RunOva3DScene';

interface HeroProps {
  onOpenGetStarted: () => void;
  onOpenAgentModal: (agentId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenGetStarted, onOpenAgentModal }) => {
  const [visualMode, setVisualMode] = useState<'3d' | 'dashboard'>('3d');

  const handleScrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 bg-white border-b border-[#EAEAEA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Narrative Block */}
        <motion.div
          initial="initial"
          animate="animate"
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-14"
        >
          {/* Small introductory label */}
          <motion.div
            variants={fadeInUp}
            className="inline-block mb-4"
          >
            <span className="text-xs font-mono font-semibold tracking-widest uppercase text-[#666666] px-3 py-1 bg-[#F7F7F7] border border-[#EAEAEA]">
              AI-POWERED BUSINESS OPERATING SYSTEM
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={{
              initial: { opacity: 0, y: 18 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#111111] leading-[1.08] mb-6 font-display"
          >
            Your business.<br />
            Your agents.<br />
            Your rules.
          </motion.h1>

          {/* Supporting description */}
          <motion.p
            variants={{
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="text-lg sm:text-xl text-[#666666] leading-relaxed max-w-2xl mx-auto mb-8 font-normal"
          >
            Meet the AI-powered operating system that helps businesses manage operations, serve customers, execute tasks and manage resources through intelligent AI agents.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={{
              initial: { opacity: 0, y: 14 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-5"
          >
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenGetStarted}
              className="w-full sm:w-auto px-7 py-3 text-sm font-semibold bg-[#111111] text-white hover:bg-black transition-colors rounded-none flex items-center justify-center gap-2 cursor-pointer"
            >
              Get started
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleScrollToHowItWorks}
              className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-[#111111] bg-white border border-[#EAEAEA] hover:bg-[#F7F7F7] transition-colors rounded-none flex items-center justify-center gap-2 cursor-pointer"
            >
              Explore how it works
              <ChevronDown className="w-4 h-4 text-[#666666]" />
            </motion.button>
          </motion.div>

          {/* Small supporting statement */}
          <motion.div
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1, transition: { duration: 0.6, delay: 0.4 } }
            }}
            className="text-xs font-mono text-[#666666] tracking-wide"
          >
            Powered by AI. Built on NEAR Protocol.
          </motion.div>
        </motion.div>

        {/* View Switcher: 3D Autonomous Architecture vs Operating System Console */}
        <div className="max-w-6xl mx-auto mb-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-1 border border-[#EAEAEA] p-1 bg-[#F7F7F7]">
            <button
              onClick={() => setVisualMode('3d')}
              className={`px-3 py-1.5 text-xs font-mono flex items-center gap-2 transition-all cursor-pointer ${
                visualMode === '3d'
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'text-[#666666] hover:text-[#111111]'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D AUTONOMOUS FLEET (WEBGL)</span>
            </button>
            <button
              onClick={() => setVisualMode('dashboard')}
              className={`px-3 py-1.5 text-xs font-mono flex items-center gap-2 transition-all cursor-pointer ${
                visualMode === 'dashboard'
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'text-[#666666] hover:text-[#111111]'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>OS CONSOLE PREVIEW</span>
            </button>
          </div>

          <div className="text-xs font-mono text-[#666666] hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-none bg-[#111111]" />
            <span>INTERACTIVE REAL-TIME HARDWARE ACCELERATED VIEW</span>
          </div>
        </div>

        {/* Hero Visual Container with Smooth Transition */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {visualMode === '3d' ? (
              <motion.div
                key="3d-scene"
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.3 }}
              >
                <RunOva3DScene onSelectAgent={onOpenAgentModal} />
              </motion.div>
            ) : (
              <motion.div
                key="dashboard-view"
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.3 }}
              >
                <DashboardPreview onOpenAgentModal={onOpenAgentModal} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};


