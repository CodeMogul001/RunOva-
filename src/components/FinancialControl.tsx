import React, { useState } from 'react';
import {
  SlidersHorizontal,
  UserCheck,
  Coins,
  FileText,
  Check,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Lock,
  Zap,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FinancialControl: React.FC = () => {
  const [testAmount, setTestAmount] = useState<number>(350);
  const [spendingLimit, setSpendingLimit] = useState<number>(1000);
  const [vendorType, setVendorType] = useState<'whitelisted' | 'new'>('whitelisted');

  const isAutoApproved = testAmount <= spendingLimit && vendorType === 'whitelisted';

  return (
    <section id="policy-simulator" className="py-20 sm:py-28 bg-[#F6F4EE] border-b border-[#E5E0D3] overflow-hidden">
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
            <span className="uppercase tracking-widest text-[#111111] font-bold">GOVERNANCE & POLICY SIMULATOR</span>
            <span className="text-[#666666]">·</span>
            <span className="text-[#555555]">NEAR PROTOCOL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111111] leading-tight mb-4 font-display">
            Autonomy without losing financial authority.
          </h2>
          <p className="text-base sm:text-lg text-[#333333] leading-relaxed">
            RunOva gives AI agents the authority to execute business operations while keeping financial guardrails strictly in human hands. Controlled autonomy is the default.
          </p>
        </motion.div>

        {/* Unified Interactive Policy Simulator Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white border border-[#E5E0D3] rounded-3xl shadow-sm overflow-hidden"
        >
          {/* Top System Header */}
          <div className="px-6 py-4 bg-[#F6F4EE]/70 border-b border-[#E5E0D3] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-[#111111] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#00EC97]" />
              <span className="uppercase tracking-wide">
                POLICY SIMULATION SANDBOX · DUAL-KEY GOVERNANCE
              </span>
            </div>
            <div className="text-[#444444] flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00875A]" />
              <span>NON-CUSTODIAL HUMAN-IN-THE-LOOP ACTIVE</span>
            </div>
          </div>

          {/* 3-Step Visual Architecture Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E5E0D3] border-b border-[#E5E0D3]">
            {/* Step 1: Agent Prepares */}
            <div className="p-6 sm:p-8 space-y-3 bg-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#555555]">
                  01 / PROPOSAL
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F6F4EE] text-[#111111] border border-[#E5E0D3]">
                  AI AGENT
                </span>
              </div>
              <h3 className="text-base font-bold text-[#111111] font-display">
                Agent Prepares Action
              </h3>
              <p className="text-xs text-[#383838] leading-relaxed">
                Procurement or Finance Agent detects an operational requirement, selects a supplier, and drafts the transaction payload.
              </p>
              <div className="p-3 bg-[#F6F4EE] rounded-xl font-mono text-[11px] text-[#333333] space-y-1 border border-[#E5E0D3]">
                <div>AMOUNT: ${testAmount} USD</div>
                <div>SUPPLIER: Apex Logistics Services</div>
                <div>VENDOR: {vendorType === 'whitelisted' ? 'Whitelisted (Approved)' : 'Unverified (New)'}</div>
              </div>
            </div>

            {/* Step 2: Policy & Limit Evaluation */}
            <div className="p-6 sm:p-8 space-y-3 bg-[#F6F4EE]/30">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#555555]">
                  02 / EVALUATION
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white text-[#111111] border border-[#E5E0D3]">
                  NEAR SMART CONTRACT
                </span>
              </div>
              <h3 className="text-base font-bold text-[#111111] font-display">
                Automated Policy Check
              </h3>
              <p className="text-xs text-[#383838] leading-relaxed">
                Deterministic rules check spend ceilings, whitelist status, and available departmental budget before execution.
              </p>
              <div
                className={`p-3 rounded-xl font-mono text-[11px] border transition-all ${
                  isAutoApproved
                    ? 'bg-[#00EC97]/15 border-[#00EC97]/40 text-[#0a5233]'
                    : 'bg-[#FFF8E7] border-[#F3E2B8] text-[#8B6508]'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  {isAutoApproved ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>WITHIN POLICY CEILING (${spendingLimit})</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>THRESHOLD EXCEEDED &gt; ${spendingLimit}</span>
                    </>
                  )}
                </div>
                <div className="text-[10px] mt-0.5">
                  {isAutoApproved
                    ? 'Eligible for instant autonomous execution'
                    : 'Escalation trigger: Requires owner cryptographic signature'}
                </div>
              </div>
            </div>

            {/* Step 3: Owner Authorization or Auto-Execution */}
            <div className="p-6 sm:p-8 space-y-3 bg-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#555555]">
                  03 / SETTLEMENT
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    isAutoApproved
                      ? 'bg-[#00EC97]/20 text-[#00875A] border-[#00EC97]/40 font-bold'
                      : 'bg-[#111111] text-white border-[#111111]'
                  }`}
                >
                  {isAutoApproved ? 'AUTONOMOUS' : 'HUMAN SIGN-OFF'}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#111111] font-display">
                {isAutoApproved ? 'Autonomous Execution' : 'Cryptographic Owner Sign-Off'}
              </h3>
              <p className="text-xs text-[#383838] leading-relaxed">
                {isAutoApproved
                  ? 'The scoped Function-Call Access Key on NEAR Protocol signs the transaction without touching master funds.'
                  : 'Owner receives real-time notification with full context to approve or decline via NEAR wallet.'}
              </p>
              <div className="p-3 bg-[#F6F4EE] rounded-xl font-mono text-[11px] text-[#333333] border border-[#E5E0D3]">
                <div>SETTLEMENT: NEAR Protocol Layer 1</div>
                <div>AUDIT TRAIL: Immutable On-Chain Receipt</div>
              </div>
            </div>
          </div>

          {/* Interactive Simulator Controls */}
          <div className="p-6 sm:p-8 bg-white">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#E5E0D3]">
              <div>
                <span className="text-xs font-mono uppercase text-[#00875A] font-bold tracking-wider">
                  Interactive Simulator
                </span>
                <h4 className="text-xl font-bold text-[#111111] font-display mt-0.5">
                  Test Autonomous Spending Limits
                </h4>
                <p className="text-xs sm:text-sm text-[#383838] mt-1">
                  Adjust order amount or spend ceiling to see how RunOva protects business treasury.
                </p>
              </div>

              {/* Sample Order Preset Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-[#555555]">Preset Orders:</span>
                {[250, 450, 850, 1500, 3000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setTestAmount(amt)}
                    className={`px-3 py-1 text-xs font-mono transition-colors rounded-full cursor-pointer ${
                      testAmount === amt
                        ? 'bg-[#111111] text-white shadow-2xs'
                        : 'bg-white border border-[#E5E0D3] text-[#111111] hover:border-[#111111]'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider Controls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              {/* Slider 1: Test Transaction Amount */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-[#111111] uppercase tracking-wider">
                    Simulated Transaction Amount:
                  </span>
                  <span className="font-bold text-base text-[#111111] bg-[#F6F4EE] px-3 py-0.5 rounded-full border border-[#E5E0D3]">
                    ${testAmount} USD
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="4000"
                  step="50"
                  value={testAmount}
                  onChange={(e) => setTestAmount(Number(e.target.value))}
                  className="w-full accent-[#111111] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-[#555555]">
                  <span>$50 (Micro-pay)</span>
                  <span>$2,000</span>
                  <span>$4,000 (Bulk purchase)</span>
                </div>
              </div>

              {/* Slider 2: Autonomous Policy Ceiling */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-[#111111] uppercase tracking-wider">
                    Autonomous Policy Ceiling:
                  </span>
                  <span className="font-bold text-base text-[#111111] bg-[#F6F4EE] px-3 py-0.5 rounded-full border border-[#E5E0D3]">
                    ${spendingLimit} USD
                  </span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="3000"
                  step="100"
                  value={spendingLimit}
                  onChange={(e) => setSpendingLimit(Number(e.target.value))}
                  className="w-full accent-[#111111] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-[#555555]">
                  <span>$200</span>
                  <span>$1,500</span>
                  <span>$3,000 (Enterprise limit)</span>
                </div>
              </div>
            </div>

            {/* Result Strip */}
            <div className="mt-8 p-4 rounded-2xl bg-[#F6F4EE] border border-[#E5E0D3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    isAutoApproved
                      ? 'bg-[#00EC97] text-[#111111]'
                      : 'bg-[#111111] text-white'
                  }`}
                >
                  {isAutoApproved ? <Zap className="w-5 h-5 fill-current" /> : <Lock className="w-4 h-4" />}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#111111]">
                    {isAutoApproved
                      ? 'Status: Auto-Permitted by NEAR Smart Contract'
                      : 'Status: Escalate to Business Owner (Multi-Sig Required)'}
                  </div>
                  <div className="text-xs text-[#383838]">
                    {isAutoApproved
                      ? `$${testAmount} is below your $${spendingLimit} ceiling · Executed via restricted Function-Call Access Key`
                      : `$${testAmount} exceeds your $${spendingLimit} ceiling · Funds remain safe until you sign via NEAR Wallet`}
                  </div>
                </div>
              </div>

              <div className="text-xs font-mono text-[#555555] shrink-0">
                AUDIT LOG: IMMUTABLE ON NEAR
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
