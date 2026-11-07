import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface FinalCTAProps {
  onOpenGetStarted: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenGetStarted }) => {
  return (
    <section className="py-24 sm:py-36 bg-[#F6F4EE] border-b border-[#E5E0D3] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Intro Tag */}
        <div className="inline-block mb-4">
          <span className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-[#111111] px-4 py-1.5 bg-white border border-[#E5E0D3] rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#00EC97] animate-pulse" />
            DEPLOY RUNOVA AUTONOMOUS OS
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111111] leading-tight mb-6 max-w-3xl mx-auto font-display">
          Let your business move beyond manual operations.
        </h2>

        {/* Supporting text */}
        <p className="text-base sm:text-xl text-[#383838] leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
          Give your business an intelligent workforce. Set the rules, delegate routine operational tasks, and stay in control with cryptographic NEAR Protocol governance.
        </p>

        {/* Primary button */}
        <div className="flex flex-col items-center justify-center gap-4">
          <motion.button
            whileHover={{ y: -1, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenGetStarted}
            className="px-8 py-4 text-sm sm:text-base font-semibold bg-[#111111] text-white hover:bg-black transition-colors rounded-full flex items-center gap-2.5 shadow-sm cursor-pointer group"
          >
            <span>Get started with RunOva</span>
            <ArrowRight className="w-4 h-4 text-[#00EC97] group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {/* Secondary text */}
          <div className="text-xs sm:text-sm font-mono text-[#555555] tracking-wide mt-2">
            Your business. Your agents. Your rules.
          </div>
        </div>
      </motion.div>
    </section>
  );
};
