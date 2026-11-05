import React, { useState } from 'react';
import { X, Check, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AGENTS_DATA } from '../../data/agents';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('E-Commerce & Retail');
  const [selectedAgents, setSelectedAgents] = useState<string[]>(['finance', 'customer', 'growth']);
  const [monthlySpendCap, setMonthlySpendCap] = useState('2500');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  if (!isOpen) return null;

  const toggleAgent = (id: string) => {
    if (selectedAgents.includes(id)) {
      if (selectedAgents.length > 1) {
        setSelectedAgents(selectedAgents.filter((a) => a !== id));
      }
    } else {
      setSelectedAgents([...selectedAgents, id]);
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!businessName.trim()) return;
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsComplete(true);
      }, 700);
    }
  };

  const handleReset = () => {
    setStep(1);
    setBusinessName('');
    setSelectedAgents(['finance', 'customer', 'growth']);
    setIsComplete(false);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="get-started-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl bg-white border border-[#EAEAEA] rounded-none shadow-2xl p-6 sm:p-8 relative text-[#111111]"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#666666] hover:text-[#111111] transition-colors focus:outline-none focus:ring-1 focus:ring-[#111111] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isComplete ? (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs text-[#666666] mb-2 font-mono">
                <span>STEP 0{step} OF 03</span>
                <span>·</span>
                <span>
                  {step === 1 && 'Business Profile'}
                  {step === 2 && 'Workforce Selection'}
                  {step === 3 && 'Governance & Limits'}
                </span>
              </div>
              <h2 id="get-started-title" className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
                {step === 1 && 'Configure your business environment'}
                {step === 2 && 'Select your initial AI agent workforce'}
                {step === 3 && 'Set autonomous spending boundaries'}
              </h2>
              <p className="text-sm text-[#666666] mt-1">
                {step === 1 && 'Define your organization identity and industry operational model.'}
                {step === 2 && 'Choose which specialised agents will manage day-to-day business execution.'}
                {step === 3 && 'Every financial action respects strict policy ceilings verified on NEAR Protocol.'}
              </p>
            </div>

            <form onSubmit={handleNext}>
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#111111] uppercase tracking-wider mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Global Operations"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#EAEAEA] text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#111111] transition-colors"
                      autoFocus
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#111111] uppercase tracking-wider mb-2">
                      Operational Model
                    </label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#EAEAEA] text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
                    >
                      <option value="E-Commerce & Retail">E-Commerce & Direct-to-Consumer</option>
                      <option value="B2B SaaS & Technology">B2B SaaS & Technology Services</option>
                      <option value="Digital Agency & Professional Services">Digital Agency & Professional Services</option>
                      <option value="Logistics & Supply Chain">Logistics, Wholesale & Supply Chain</option>
                    </select>
                  </div>

                  <div className="p-3 bg-[#F7F7F7] border border-[#EAEAEA] text-xs text-[#666666]">
                    <span className="font-semibold text-[#111111]">Non-custodial infrastructure: </span>
                    RunOva configures a smart contract treasury account on NEAR Protocol dedicated strictly to your organization.
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  <div className="text-xs text-[#666666] mb-1">
                    Select the agents you wish to deploy at launch (minimum 1):
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1">
                    {AGENTS_DATA.map((agent) => {
                      const isSelected = selectedAgents.includes(agent.id);
                      return (
                        <div
                          key={agent.id}
                          onClick={() => toggleAgent(agent.id)}
                          className={`p-3 border cursor-pointer transition-all ${
                            isSelected
                              ? 'border-[#111111] bg-[#F7F7F7]'
                              : 'border-[#EAEAEA] bg-white hover:border-[#CCCCCC]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold text-[#111111]">{agent.name}</span>
                            <div
                              className={`w-4 h-4 border flex items-center justify-center ${
                                isSelected ? 'bg-[#111111] border-[#111111] text-white' : 'border-[#CCCCCC] bg-white'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                          </div>
                          <p className="text-[11px] text-[#666666] leading-tight line-clamp-2">
                            {agent.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-xs text-[#666666] pt-1">
                    Selected: <span className="font-semibold text-[#111111]">{selectedAgents.length} agents</span> active
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#111111] uppercase tracking-wider mb-2">
                      Monthly Autonomous Spend Cap (USD)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="500"
                        max="10000"
                        step="500"
                        value={monthlySpendCap}
                        onChange={(e) => setMonthlySpendCap(e.target.value)}
                        className="w-full accent-[#111111]"
                      />
                      <span className="font-mono text-sm font-bold text-[#111111] min-w-[70px] text-right">
                        ${Number(monthlySpendCap).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-[#666666] mt-2">
                      Transactions exceeding this limit or individual purchase requests above $500 always require direct cryptographic owner sign-off.
                    </p>
                  </div>

                  <div className="border border-[#EAEAEA] bg-[#F7F7F7] p-4 text-xs space-y-2">
                    <div className="flex items-center gap-2 font-semibold text-[#111111]">
                      <ShieldCheck className="w-4 h-4" />
                      RunOva Safety Charter Enforced
                    </div>
                    <ul className="space-y-1 text-[#666666] list-disc list-inside">
                      <li>Dual human-in-the-loop authorization on any external vendor routing</li>
                      <li>Continuous cryptographic audit trail published to NEAR ledger</li>
                      <li>Instant kill-switch available in owner console at all times</li>
                    </ul>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#EAEAEA]">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => (s - 1) as 1 | 2)}
                    className="px-4 py-2 text-xs font-medium text-[#111111] hover:bg-[#F7F7F7] border border-[#EAEAEA] transition-colors"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || (step === 1 && !businessName.trim())}
                  className="px-5 py-2 text-xs font-medium bg-[#111111] text-white hover:bg-black transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Provisioning...'
                  ) : step < 3 ? (
                    <>
                      Continue <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    'Deploy RunOva Environment'
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-4 text-center space-y-4">
            <div className="w-12 h-12 mx-auto bg-[#111111] text-white flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#111111]">Environment Prepared</h3>
              <p className="text-sm text-[#666666] mt-1 max-w-sm mx-auto">
                Workspace for <span className="font-semibold text-[#111111]">{businessName}</span> has been configured with {selectedAgents.length} active AI agents and a ${Number(monthlySpendCap).toLocaleString()} policy threshold.
              </p>
            </div>

            <div className="bg-[#F7F7F7] border border-[#EAEAEA] p-4 text-left text-xs font-mono text-[#666666] space-y-1">
              <div>// RUNOVA ON-CHAIN REGISTRATION</div>
              <div>ENVIRONMENT: {businessName.toUpperCase().replace(/\s+/g, '_')}</div>
              <div>CHAIN: NEAR Protocol Mainnet</div>
              <div>POLICY_STATUS: ACTIVE · SPEND_CEILING: ${Number(monthlySpendCap).toLocaleString()}</div>
              <div>AGENTS_DEPLOYED: {selectedAgents.join(', ').toUpperCase()}</div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleReset}
                className="w-full px-5 py-2.5 text-xs font-medium bg-[#111111] text-white hover:bg-black transition-colors"
              >
                Enter Business Workspace Preview
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
