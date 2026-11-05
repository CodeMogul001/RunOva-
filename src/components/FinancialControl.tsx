import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  UserCheck, 
  Coins, 
  FileText, 
  Check, 
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FinancialControl: React.FC = () => {
  const [testAmount, setTestAmount] = useState<number>(350);
  const [spendingLimit, setSpendingLimit] = useState<number>(1000);

  const capabilities = [
    {
      title: 'Configurable spending limits',
      description: 'Define precise per-transaction, daily, and monthly autonomous spending ceilings for every agent role.',
      icon: SlidersHorizontal
    },
    {
      title: 'Transaction approval workflows',
      description: 'Any expense or purchasing order exceeding pre-defined rules escalates immediately for human authorization.',
      icon: UserCheck
    },
    {
      title: 'Treasury monitoring',
      description: 'Continuous real-time tracking of operational balances, pending outflows, and liquidity reserves on NEAR Protocol.',
      icon: Coins
    },
    {
      title: 'Transparent activity records',
      description: 'Every autonomous action and transaction signature is immutably documented with verifiable on-chain receipts.',
      icon: FileText
    }
  ];

  const isAutoApproved = testAmount <= spendingLimit;

  return (
    <section id="security" className="py-20 sm:py-28 bg-white border-b border-[#EAEAEA] overflow-hidden">
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
            GOVERNANCE & FINANCIAL INTEGRITY
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111111] leading-tight mb-5">
            Autonomy without losing control.
          </h2>
          <p className="text-base sm:text-lg text-[#666666] leading-relaxed">
            RunOva gives AI agents the ability to execute business operations while keeping financial authority in human hands. Controlled autonomy is the default.
          </p>
        </motion.div>

        {/* 4 Capabilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3 }}
                className="p-6 border border-[#EAEAEA] bg-white hover:border-[#111111] transition-colors"
              >
                <div className="w-10 h-10 border border-[#EAEAEA] bg-[#F7F7F7] flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5 text-[#111111]" />
                </div>
                <h3 className="text-base font-bold text-[#111111] mb-2">
                  {cap.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Monochrome Visual Architecture Diagram + Interactive Policy Simulator */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="border border-[#111111] bg-white"
        >
          <div className="px-6 py-4 bg-[#F7F7F7] border-b border-[#EAEAEA] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <span className="font-bold text-[#111111] uppercase tracking-wide">
              CONTROLLED AUTONOMY PIPELINE · POLICY ENGINE
            </span>
            <span className="text-[#666666] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#111111]" />
              HUMAN-IN-THE-LOOP ACTIVE
            </span>
          </div>

          {/* 3-Step Process Visual */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Step 1: Agent Prepares */}
              <div className="border border-[#EAEAEA] p-5 bg-[#FFFFFF]">
                <div className="text-[11px] font-mono text-[#666666] mb-1">PHASE 01</div>
                <h4 className="text-base font-bold text-[#111111] mb-2">
                  1. Agent Prepares
                </h4>
                <p className="text-xs text-[#666666] mb-4">
                  Procurement or Finance agent monitors requirements and drafts a formal transaction requisition.
                </p>
                <div className="p-3 bg-[#F7F7F7] border border-[#EAEAEA] font-mono text-[11px] text-[#333333] space-y-1">
                  <div>REQUISITION: PO-9821</div>
                  <div>PAYEE: Verified Supplier</div>
                  <div className="font-bold text-[#111111]">AMOUNT: ${testAmount.toLocaleString()}</div>
                </div>
              </div>

              {/* Step 2: Policy Check */}
              <div className="border border-[#111111] p-5 bg-[#F7F7F7]">
                <div className="text-[11px] font-mono text-[#666666] mb-1">PHASE 02</div>
                <h4 className="text-base font-bold text-[#111111] mb-2">
                  2. Policy Check
                </h4>
                <p className="text-xs text-[#666666] mb-4">
                  Deterministic smart contract logic compares request against owner's autonomous ceiling.
                </p>
                <div className="p-3 bg-white border border-[#EAEAEA] font-mono text-[11px] text-[#333333] space-y-1">
                  <div>RULE: MAX_AUTO_CAP</div>
                  <div>THRESHOLD: ${spendingLimit.toLocaleString()}</div>
                  <div className="font-bold text-[#111111]">
                    RESULT: {isAutoApproved ? 'WITHIN LIMIT' : 'EXCEEDS LIMIT'}
                  </div>
                </div>
              </div>

              {/* Step 3: Owner Approval or Auto Clear */}
              <div className="border border-[#EAEAEA] p-5 bg-[#FFFFFF] min-h-[175px] flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono text-[#666666] mb-1">PHASE 03</div>
                  <h4 className="text-base font-bold text-[#111111] mb-2">
                    3. Settlement Decision
                  </h4>
                  <p className="text-xs text-[#666666] mb-3">
                    Autonomous transactions execute under policy limit; exceeding requests require human signature.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {isAutoApproved ? (
                    <motion.div
                      key="auto-cleared"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="p-3 bg-white border border-[#111111] text-xs font-mono space-y-1"
                    >
                      <div className="flex items-center gap-1.5 font-bold text-[#111111]">
                        <Check className="w-3.5 h-3.5" />
                        AUTO-CLEARED BY POLICY
                      </div>
                      <div className="text-[11px] text-[#666666]">
                        Broadcast to NEAR ledger without human intervention.
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="owner-required"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="p-3 bg-[#111111] text-white text-xs font-mono space-y-1"
                    >
                      <div className="flex items-center gap-1.5 font-bold">
                        <AlertCircle className="w-3.5 h-3.5" />
                        OWNER APPROVAL REQUIRED
                      </div>
                      <div className="text-[11px] text-[#CCCCCC]">
                        Escalated to owner console for cryptographic sign-off.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Interactive Policy Threshold Simulator */}
            <div className="mt-8 pt-6 border-t border-[#EAEAEA] bg-[#F7F7F7] p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-[#111111] uppercase tracking-wider font-mono">
                    Interactive Policy Engine Simulator
                  </div>
                  <p className="text-xs text-[#666666]">
                    Test how RunOva evaluates transactions against your defined spending rules:
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-[#666666]">Sample Orders:</span>
                  {[250, 750, 1500, 3000].map((amt) => (
                    <motion.button
                      key={amt}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setTestAmount(amt)}
                      className={`px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
                        testAmount === amt
                          ? 'bg-[#111111] text-white shadow-xs'
                          : 'bg-white border border-[#EAEAEA] text-[#111111] hover:border-[#111111]'
                      }`}
                    >
                      ${amt}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#EAEAEA] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
                <div>
                  Autonomous Limit: <span className="font-bold text-[#111111]">${spendingLimit}</span>
                </div>
                <div className="w-full sm:w-64">
                  <input
                    type="range"
                    min="250"
                    max="2000"
                    step="250"
                    value={spendingLimit}
                    onChange={(e) => setSpendingLimit(Number(e.target.value))}
                    className="w-full accent-[#111111] cursor-pointer"
                  />
                </div>
                <div>
                  Current Order: <span className="font-bold text-[#111111]">${testAmount}</span> &rarr;{' '}
                  <span className={isAutoApproved ? 'font-bold text-[#111111]' : 'font-bold text-[#111111] underline'}>
                    {isAutoApproved ? 'Autonomous Clearance' : 'Escalates to Owner'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

