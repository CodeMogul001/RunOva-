import React from 'react';
import { ShieldCheck, Cpu, Key, FileCheck, Layers, Check, Zap, Lock, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export const NearIntegration: React.FC = () => {
  return (
    <section id="security" className="py-20 sm:py-28 bg-[#F6F4EE] border-b border-[#E5E0D3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E0D3] text-xs font-mono font-medium text-[#2C2C2C] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00EC97]" />
            <span className="uppercase tracking-widest text-[#111111] font-bold">BLOCKCHAIN INFRASTRUCTURE</span>
            <span className="text-[#666666]">·</span>
            <span className="text-[#555555]">SETTLEMENT LAYER</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111111] leading-tight mb-4 font-display">
            Built on NEAR Protocol.
          </h2>
          <p className="text-base sm:text-lg text-[#333333] leading-relaxed">
            RunOva combines intelligent AI agent orchestration with NEAR Protocol's high-throughput, non-custodial account infrastructure for transparent and programmable business finance.
          </p>
        </motion.div>

        {/* Unified Architectural Comparison & Pillar Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white border border-[#E5E0D3] rounded-3xl p-6 sm:p-10 shadow-sm"
        >
          {/* Header Strip with NEAR Brand Vector */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-[#E5E0D3]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#111111] text-[#00EC97] flex items-center justify-center font-mono font-extrabold text-2xl tracking-tighter shrink-0 shadow-xs">
                <svg
                  viewBox="0 0 32 32"
                  className="w-8 h-8 fill-current"
                  aria-label="NEAR Protocol"
                >
                  <path d="M7 6h6.2l9.8 14.5V6H27v20h-6.2L11 11.5V26H7V6z" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-[#555555]">
                  DETERMINISTIC FINANCIAL ENGINE
                </div>
                <h3 className="text-2xl font-bold text-[#111111] font-display">
                  NEAR Protocol Integration
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#00875A] bg-[#00EC97]/15 px-3 py-1 rounded-full border border-[#00EC97]/30 flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-[#00EC97]" />
                Non-Custodial Account Abstraction
              </span>
            </div>
          </div>

          {/* Merged Architecture Comparison: Conventional Banking vs RunOva on NEAR */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
            {/* Column 1: Conventional Corporate Banking Bottlenecks */}
            <div className="p-6 rounded-2xl bg-[#F6F4EE]/50 border border-[#E5E0D3] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase font-bold text-[#555555]">
                  Conventional Treasury
                </span>
                <span className="text-[10px] font-mono text-[#666666] bg-white px-2 py-0.5 rounded border border-[#E5E0D3]">
                  Legacy Model
                </span>
              </div>
              <h4 className="text-base font-bold text-[#111111] font-display">
                Manual Disconnected Operations
              </h4>
              <ul className="space-y-2.5 text-xs text-[#444444]">
                <li className="flex items-start gap-2">
                  <span className="text-[#999999] mt-0.5 select-none">—</span>
                  <span><strong>3-5 day settlement latency:</strong> Slow ACH/wire clearances stall inventory restocking.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#999999] mt-0.5 select-none">—</span>
                  <span><strong>All-or-nothing credentials:</strong> Employees or software tools get full card access or none.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#999999] mt-0.5 select-none">—</span>
                  <span><strong>Manual invoice reconciliation:</strong> Endless hours matching receipts against bank statements.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: RunOva on NEAR Protocol */}
            <div className="p-6 rounded-2xl bg-[#00EC97]/10 border border-[#00EC97]/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase font-bold text-[#00875A]">
                  RunOva + NEAR Architecture
                </span>
                <span className="text-[10px] font-mono text-[#00875A] bg-white px-2 py-0.5 rounded border border-[#00EC97]/40 font-bold">
                  Autonomous Standard
                </span>
              </div>
              <h4 className="text-base font-bold text-[#111111] font-display">
                Programmed Autonomous Governance
              </h4>
              <ul className="space-y-2.5 text-xs text-[#2C2C2C]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#00875A] shrink-0 mt-0.5 stroke-[2.5]" />
                  <span><strong>Sub-second finality:</strong> Instant verifiable payments settled on NEAR Protocol with sub-cent gas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#00875A] shrink-0 mt-0.5 stroke-[2.5]" />
                  <span><strong>Scoped Access Keys:</strong> Agents only possess restricted Function-Call keys bounded by deterministic ceilings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#00875A] shrink-0 mt-0.5 stroke-[2.5]" />
                  <span><strong>Zero-custody assurance:</strong> Business treasury resides strictly in your NEAR smart contract multi-sig.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Technical Specifications Bar */}
          <div className="mt-8 p-4 bg-[#F6F4EE] border border-[#E5E0D3] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#383838]">
            <div className="flex items-center gap-2 text-[#111111] font-medium">
              <ShieldCheck className="w-4 h-4 text-[#00875A]" />
              <span>SECURITY PROTOCOL: Multi-Sig Governance + Function-Call Allowance Guardrails</span>
            </div>
            <div className="text-[11px] text-[#555555]">
              ON-CHAIN AUDIT SPECIFICATION · NEAR MAINNET SANDBOX
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
