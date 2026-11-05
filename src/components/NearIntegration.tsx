import React from 'react';
import { ShieldCheck, Cpu, Key, FileCheck, Layers } from 'lucide-react';
import { motion } from 'motion/react';

export const NearIntegration: React.FC = () => {
  const integrationPoints = [
    {
      title: 'NEAR Protocol Identification',
      description: 'RunOva leverages NEAR Protocol as the deterministic settlement and security layer for autonomous agent operations.',
      icon: Cpu,
      meta: 'LAYER 1 · HIGH THROUGHPUT'
    },
    {
      title: 'On-chain payment infrastructure',
      description: 'Supports fast, low-cost commercial settlements with predictable sub-cent gas fees and sub-second transaction finality.',
      icon: Layers,
      meta: 'SETTLEMENT ENGINE'
    },
    {
      title: 'Wallet and treasury management',
      description: 'Employs NEAR Function-Call Access Keys allowing business owners to grant limited spending allowances without relinquishing custody.',
      icon: Key,
      meta: 'SCOPED KEY ARCHITECTURE'
    },
    {
      title: 'Transaction verification',
      description: 'Every autonomous purchase, vendor disbursement, and policy event leaves an immutable cryptographic audit record on-chain.',
      icon: FileCheck,
      meta: 'IMMUTABLE AUDIT TRAIL'
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#EAEAEA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-[#666666] mb-3">
            BLOCKCHAIN INFRASTRUCTURE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111111] leading-tight mb-5">
            Intelligence meets on-chain execution.
          </h2>
          <p className="text-base sm:text-lg text-[#666666] leading-relaxed">
            RunOva integrates AI-powered business operations with NEAR Protocol to support transparent, verifiable and programmable financial activities.
          </p>
        </motion.div>

        {/* Integration Block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="border border-[#111111] bg-white p-6 sm:p-10 mb-8"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b border-[#EAEAEA]">
            {/* NEAR Protocol Identifier Brand Mark */}
            <div className="flex items-center gap-4">
              {/* Minimal Geometric NEAR Brand Vector */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-14 h-14 bg-[#111111] text-white flex items-center justify-center font-mono font-extrabold text-2xl tracking-tighter shrink-0"
              >
                <svg
                  viewBox="0 0 32 32"
                  className="w-8 h-8 fill-current"
                  aria-label="NEAR Protocol"
                >
                  <path d="M7 6h6.2l9.8 14.5V6H27v20h-6.2L11 11.5V26H7V6z" />
                </svg>
              </motion.div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-[#666666]">
                  FOUNDATIONAL BLOCKCHAIN LAYER
                </div>
                <h3 className="text-2xl font-bold text-[#111111]">
                  NEAR Protocol
                </h3>
              </div>
            </div>

            <div className="text-left lg:text-right max-w-md">
              <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                Utilizing NEAR's account abstraction and restricted Access Key standards to enforce strict programmatic guardrails for AI agents.
              </p>
            </div>
          </div>

          {/* 4 Feature Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
            {integrationPoints.map((point, idx) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -2 }}
                  className="p-5 bg-[#F7F7F7] border border-[#EAEAEA] flex flex-col justify-between hover:border-[#111111] transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="w-5 h-5 text-[#111111]" />
                      <span className="text-[10px] font-mono text-[#666666]">{point.meta}</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#111111] mb-2">
                      {point.title}
                    </h4>
                    <p className="text-xs text-[#666666] leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Architecture Specification Strip */}
          <div className="mt-8 p-4 bg-white border border-[#EAEAEA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#666666]">
            <div className="flex items-center gap-2 text-[#111111]">
              <ShieldCheck className="w-4 h-4" />
              <span>SECURITY MODEL: Non-custodial Smart Contract Multi-Sig & Restricted Function-Call Keys</span>
            </div>
            <div className="text-[11px] text-[#666666]">
              STATUS: ARCHITECTURAL INTEGRATION SPECIFICATION
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
