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

  const handleScrollToNext = () => {
    const el = document.getElementById('policy-simulator');
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
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 bg-[#F6F4EE] border-b border-[#E5E0D3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Narrative Block */}
        <motion.div
          initial="initial"
          animate="animate"
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-14"
        >
          {/* Small introductory label with NEAR green pulse */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E0D3] shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#00EC97] animate-pulse" />
            <div className="w-4 h-4 rounded-full overflow-hidden bg-black shrink-0 relative">
              <img
                src="/assets/aistudio/1002255096_7163559e.jpg"
                alt="RunOva"
                className="absolute max-w-none w-[340%] h-[340%] object-cover pointer-events-none"
                style={{ objectPosition: '14.5% 48.5%' }}
              />
            </div>
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#111111]">
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

          {/* Supporting description with high contrast darkened text */}
          <motion.p
            variants={{
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="text-lg sm:text-xl text-[#383838] leading-relaxed max-w-2xl mx-auto mb-8 font-normal"
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
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold bg-[#111111] text-white hover:bg-black transition-colors rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-xs group"
            >
              <span>Get started</span>
              <ArrowRight className="w-4 h-4 text-[#00EC97] group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleScrollToNext}
              className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-[#111111] bg-white border border-[#E5E0D3] hover:border-[#111111] hover:bg-[#FDFCF7] transition-colors rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <span>Test Policy Simulator</span>
              <ChevronDown className="w-4 h-4 text-[#00875A]" />
            </motion.button>
          </motion.div>

          {/* Small supporting statement */}
          <motion.div
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1, transition: { duration: 0.6, delay: 0.4 } }
            }}
            className="text-xs font-mono text-[#383838] tracking-wide flex items-center justify-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00EC97]" />
            <span>Powered by AI. Built on NEAR Protocol Non-Custodial Infrastructure.</span>
          </motion.div>
        </motion.div>

        {/* View Switcher: 3D Autonomous Architecture vs Operating System Console */}
        <div className="max-w-6xl mx-auto mb-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-1 border border-[#E5E0D3] p-1 bg-white rounded-full shadow-2xs">
            <button
              onClick={() => setVisualMode('3d')}
              className={`px-4 py-1.5 text-xs font-mono flex items-center gap-2 transition-all rounded-full cursor-pointer ${
                visualMode === '3d'
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'text-[#383838] hover:text-[#111111]'
              }`}
            >
              <Box className="w-3.5 h-3.5 text-[#00EC97]" />
              <span className="font-semibold">3D ORBITAL ARCHITECTURE</span>
            </button>
            <button
              onClick={() => setVisualMode('dashboard')}
              className={`px-4 py-1.5 text-xs font-mono flex items-center gap-2 transition-all rounded-full cursor-pointer ${
                visualMode === 'dashboard'
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'text-[#383838] hover:text-[#111111]'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#00EC97]" />
              <span className="font-semibold">OS CONSOLE PREVIEW</span>
            </button>
          </div>

          <div className="text-xs font-mono text-[#555555] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00EC97] animate-pulse" />
            <span className="hidden sm:inline">INTERACTIVE PROTOTYPE</span>
            <span>·</span>
            <span>NEAR TESTNET READY</span>
          </div>
        </div>

        {/* Dynamic Visual Container */}
        <motion.div
          key={visualMode}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto relative"
        >
          {visualMode === '3d' ? (
            <RunOva3DScene onSelectAgent={onOpenAgentModal} />
          ) : (
            <DashboardPreview onOpenAgentModal={onOpenAgentModal} />
          )}
        </motion.div>
      </div>
    </section>
  );
};
