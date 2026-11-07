import React from 'react';
import { X, Shield, Terminal, Check, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { AgentInfo } from '../../types';

interface AgentModalProps {
  agent: AgentInfo | null;
  onClose: () => void;
  onDeploy: (agentId: string) => void;
}

export const AgentModal: React.FC<AgentModalProps> = ({ agent, onClose, onDeploy }) => {
  if (!agent) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="agent-modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl bg-white border border-[#E5E0D3] rounded-3xl p-6 sm:p-8 relative text-[#111111] max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#383838] hover:text-[#111111] transition-colors focus:outline-none focus:ring-1 focus:ring-[#111111] cursor-pointer rounded-full hover:bg-[#F6F4EE]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs text-[#383838] font-mono uppercase tracking-wider mb-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00EC97]" />
          <span>AGENT SPECIFICATION [DEMO PREVIEW]</span>
          <span>·</span>
          <span>{agent.id.toUpperCase()}</span>
        </div>

        <h2 id="agent-modal-title" className="text-2xl font-bold tracking-tight text-[#111111]">
          {agent.name}
        </h2>
        <p className="text-sm text-[#383838] mt-1">{agent.description}</p>

        <div className="mt-6 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-[#F6F4EE] border border-[#E5E0D3] rounded-2xl">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#383838]">
                Autonomous Spending Ceiling
              </div>
              <div className="text-sm font-semibold text-[#111111] mt-0.5 font-mono">
                {agent.maxAutonomyBudget}
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#383838]">
                {agent.metrics.label}
              </div>
              <div className="text-sm font-semibold text-[#111111] mt-0.5 font-mono">
                {agent.metrics.value}
              </div>
            </div>
          </div>

          {/* Permitted Operations */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#111111] uppercase tracking-wider mb-3">
              <Shield className="w-4 h-4 text-[#111111]" />
              Standard Permission Envelope
            </div>
            <div className="space-y-2">
              {agent.defaultPermissions.map((perm, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-[#111111] p-3 border border-[#E5E0D3] bg-[#FAF8F3] rounded-xl"
                >
                  <Check className="w-4 h-4 text-[#00EC97] shrink-0 mt-0.5" />
                  <span className="font-medium text-[#2C2C2C]">{perm}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Simulated Activity Trace */}
          <div>
            <div className="flex items-center justify-between gap-2 text-xs font-semibold text-[#111111] uppercase tracking-wider mb-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#111111]" />
                Sample Operational Trace (Simulated Demo)
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E5E0D3] text-[#383838]">DEMO RUN</span>
            </div>
            <div className="p-3.5 bg-[#111111] text-[#EAEAEA] rounded-2xl font-mono text-xs space-y-1.5 shadow-inner">
              <div className="flex items-center gap-2 text-[#00EC97]">
                <Activity className="w-3.5 h-3.5" />
                <span className="font-bold">SIMULATED_TASK_EXECUTION: SUCCESS</span>
              </div>
              <p className="text-white mt-1">"{agent.sampleAction}"</p>
              <div className="text-[11px] text-[#A0A0A0] pt-1.5 border-t border-[#2A2A2A]">
                DEMO_NEAR_TX: 7Kx9p...M2qR · POLICY_COMPLIANT: TRUE · VERIFIED: DEMO_SANDBOX
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#E5E0D3]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-xs font-medium text-[#383838] hover:text-[#111111] transition-colors rounded-full border border-transparent hover:border-[#E5E0D3] cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onDeploy(agent.id);
              }}
              className="px-6 py-2.5 text-xs font-medium bg-[#111111] text-white hover:bg-black transition-colors rounded-full cursor-pointer shadow-sm hover:shadow-md"
            >
              Configure in Workspace
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
