import React, { useState } from 'react';
import { Target, Sliders, PlayCircle, Eye, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      number: '01',
      title: 'Set your goals',
      description: 'Tell RunOva what you want your business to achieve.',
      detail: 'Define target revenue, growth benchmarks, target profit margins, customer satisfaction SLAs, or inventory turnover objectives in plain language.',
      icon: Target,
      snippet: {
        type: 'GOAL SPECIFICATION',
        content: '“Maintain 22% operating margin, scale wholesale reorders when inventory falls below 20 days supply, and answer 100% of support inquiries within 2 minutes.”'
      }
    },
    {
      number: '02',
      title: 'Define your rules',
      description: 'Set operating budgets, permissions and spending limits.',
      detail: 'Establish spending ceilings, whitelist verified vendor accounts, enforce multi-sig approval for large transactions, and restrict sensitive data access.',
      icon: Sliders,
      snippet: {
        type: 'POLICY PARAMETERS',
        content: 'POLICY_ENV: [Max Auto Spend: $1,000/tx] · [Dual-Sign Threshold: >$2,500] · [Allowed Settlement: USDC / NEAR] · [Human Escalation: Enabled]'
      }
    },
    {
      number: '03',
      title: 'Activate your agents',
      description: 'Your AI workforce coordinates tasks and manages permitted operations.',
      detail: 'Agents deploy into your existing stack, coordinate workflows across departments, negotiate vendor purchase quotes, and execute approved operational tasks.',
      icon: PlayCircle,
      snippet: {
        type: 'ORCHESTRATION KERNEL',
        content: 'STATUS: ACTIVE · 6 agents collaborating · Customer Agent routs 14 tickets · Procurement prepares Restock PO-912 · Finance reconciles ledger.'
      }
    },
    {
      number: '04',
      title: 'Monitor everything',
      description: 'Track performance, review decisions and approve sensitive actions.',
      detail: 'Inspect comprehensive activity trails, review real-time KPI metrics, receive push alerts when thresholds are reached, and sign high-stakes approvals.',
      icon: Eye,
      snippet: {
        type: 'AUDIT & VERIFICATION',
        content: 'IMMUTABLE PROOF: Every transaction and authorized business action is cryptographically anchored to NEAR Protocol for verifiable compliance.'
      }
    }
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white border-b border-[#EAEAEA] overflow-hidden">
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
            EXECUTION PIPELINE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111111] leading-tight mb-5">
            From business goals to autonomous execution.
          </h2>
          <p className="text-base sm:text-lg text-[#666666] leading-relaxed">
            A structured, human-governed operational lifecycle designed to give you scale without surrendering oversight.
          </p>
        </motion.div>

        {/* Desktop Horizontal Process Layout & Mobile Vertical Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative mb-12">
          {steps.map((step, idx) => {
            const isSelected = activeStep === idx;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3 }}
                onClick={() => setActiveStep(idx)}
                className={`p-6 sm:p-7 border transition-colors cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#111111] bg-white shadow-xs'
                    : 'border-[#EAEAEA] bg-white hover:border-[#CCCCCC]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`font-mono text-sm font-bold ${
                        isSelected ? 'text-[#111111]' : 'text-[#666666]'
                      }`}
                    >
                      {step.number}
                    </span>
                    <div
                      className={`w-2.5 h-2.5 border transition-colors ${
                        isSelected ? 'bg-[#111111] border-[#111111]' : 'border-[#CCCCCC] bg-transparent'
                      }`}
                    />
                  </div>

                  <h3 className="text-lg font-bold tracking-tight text-[#111111] mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[#666666] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#F7F7F7] flex items-center justify-between text-xs font-mono">
                  <span className={isSelected ? 'text-[#111111] font-bold' : 'text-[#666666]'}>
                    {isSelected ? 'ACTIVE VIEW' : 'CLICK TO VIEW'}
                  </span>
                  <span className="text-[#666666]">&rarr;</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Step Preview & Detail Panel with Smooth AnimatePresence */}
        <div className="border border-[#111111] p-6 sm:p-8 bg-[#F7F7F7] overflow-hidden min-h-[190px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
            >
              <div className="max-w-xl">
                <div className="flex items-center gap-2 text-xs font-mono text-[#666666] mb-2 uppercase">
                  <span>STAGE {steps[activeStep].number}</span>
                  <span>·</span>
                  <span>{steps[activeStep].title}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#111111] mb-2">
                  {steps[activeStep].title}
                </h3>
                <p className="text-sm text-[#666666] leading-relaxed">
                  {steps[activeStep].detail}
                </p>
              </div>

              <div className="w-full lg:w-1/2 p-4 bg-white border border-[#EAEAEA]">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#EAEAEA] text-xs font-mono">
                  <span className="text-[#111111] font-bold">
                    {steps[activeStep].snippet.type}
                  </span>
                  <span className="text-[#666666] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#111111]" /> VERIFIED
                  </span>
                </div>
                <p className="font-mono text-xs text-[#333333] leading-relaxed bg-[#F7F7F7] p-3 border border-[#EAEAEA]">
                  {steps[activeStep].snippet.content}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

