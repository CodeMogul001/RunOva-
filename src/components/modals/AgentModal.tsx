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
        className="w-full max-w-xl bg-white border border-[#EAEAEA] p-6 sm:p-8 relative text-[#111111] max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#666666] hover:text-[#111111] transition-colors focus:outline-none focus:ring-1 focus:ring-[#111111] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs text-[#666666] font-mono uppercase tracking-wider mb-2">
          <span>AGENT PROTOCOL SPECIFICATION</span>
          <span>·</span>
          <span>{agent.id.toUpperCase()}</span>
        </div>

        <h2 id="agent-modal-title" className="text-2xl font-bold tracking-tight text-[#111111]">
          {agent.name}
        </h2>
        <p className="text-sm text-[#666666] mt-1">{agent.description}</p>

        <div className="mt-6 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-[#F7F7F7] border border-[#EAEAEA]">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#666666]">
                Autonomous Spending Ceiling
              </div>
              <div className="text-sm font-semibold text-[#111111] mt-0.5 font-mono">
                {agent.maxAutonomyBudget}
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#666666]">
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
              <Shield className="w-4 h-4" />
              Standard Permission Envelope
            </div>
            <div className="space-y-2">
              {agent.defaultPermissions.map((perm, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-[#111111] p-2.5 border border-[#EAEAEA] bg-white"
                >
                  <Check className="w-4 h-4 text-[#111111] shrink-0 mt-0.5" />
                  <span>{perm}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Simulated Activity Trace */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#111111] uppercase tracking-wider mb-2">
              <Terminal className="w-4 h-4" />
              Sample Operational Trace
            </div>
            <div className="p-3 bg-[#F7F7F7] border border-[#EAEAEA] font-mono text-xs text-[#666666] space-y-1">
              <div className="flex items-center gap-2 text-[#111111]">
                <Activity className="w-3.5 h-3.5" />
                <span>TASK_EXECUTION: SUCCESS</span>
              </div>
              <p className="text-[#111111] mt-1">"{agent.sampleAction}"</p>
              <div className="text-[11px] text-[#666666] pt-1 border-t border-[#EAEAEA]">
                NEAR_TX_HASH: 7Kx9p...M2qR · POLICY_COMPLIANT: TRUE · AUDITED: TRUE
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#EAEAEA]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#666666] hover:text-[#111111] transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onDeploy(agent.id);
              }}
              className="px-5 py-2 text-xs font-medium bg-[#111111] text-white hover:bg-black transition-colors"
            >
              Configure in Workspace
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
