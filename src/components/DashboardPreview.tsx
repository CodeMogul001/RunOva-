import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Check, 
  X, 
  ArrowUpRight, 
  TrendingUp, 
  RefreshCw,
  Cpu,
  Layers,
  FileCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PendingApproval, OperationalActivity } from '../types';

interface DashboardPreviewProps {
  onOpenAgentModal?: (agentId: string) => void;
}

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({ onOpenAgentModal }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'finance' | 'procurement' | 'ops'>('all');
  const [approval, setApproval] = useState<PendingApproval>({
    id: 'app-904',
    agent: 'Procurement Agent',
    title: 'PO-8842 · High-Throughput Node Server Capacity',
    description: 'Quarterly server infrastructure expansion for customer workload peak.',
    amount: '$1,850.00',
    currency: 'USD (NEAR Settlement)',
    recipient: 'ComputeHost Global Ltd',
    policyReason: 'Amount exceeds $1,000 autonomous threshold',
    timestamp: '14 mins ago',
    status: 'pending'
  });

  const [activeAgentFilter, setActiveAgentFilter] = useState<string>('all');

  const activities: OperationalActivity[] = [
    {
      id: 'act-1',
      agent: 'Finance Agent',
      action: 'Audited monthly vendor accounts & verified reconciliation',
      status: 'verified',
      timestamp: '12m ago',
      amount: '$4,120.00',
      hash: '9Fx...3Km'
    },
    {
      id: 'act-2',
      agent: 'Procurement Agent',
      action: 'Requested quote comparison for warehouse packaging supplies',
      status: 'completed',
      timestamp: '28m ago',
      amount: '$640.00',
      hash: '2Bq...9Tx'
    },
    {
      id: 'act-3',
      agent: 'Customer Agent',
      action: 'Auto-processed return authorization within $100 policy rule',
      status: 'completed',
      timestamp: '44m ago',
      amount: '$84.50',
      hash: '7Kp...1Za'
    },
    {
      id: 'act-4',
      agent: 'Growth Agent',
      action: 'Ingested 19 qualified prospects from inbound sales form',
      status: 'completed',
      timestamp: '1h ago'
    },
    {
      id: 'act-5',
      agent: 'Operations Agent',
      action: 'Triggered end-of-day workflow sync between Logistics & Inventory',
      status: 'verified',
      timestamp: '2h ago',
      hash: '4Yt...8Pp'
    }
  ];

  const filteredActivities = activities.filter((act) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'finance') return act.agent.includes('Finance');
    if (activeTab === 'procurement') return act.agent.includes('Procurement');
    if (activeTab === 'ops') return act.agent.includes('Operations') || act.agent.includes('Customer');
    return true;
  });

  const handleApprove = () => {
    setApproval((prev) => ({ ...prev, status: 'approved' }));
  };

  const handleDecline = () => {
    setApproval((prev) => ({ ...prev, status: 'declined' }));
  };

  const handleResetApproval = () => {
    setApproval((prev) => ({ ...prev, status: 'pending' }));
  };

  return (
    <div className="w-full bg-white border border-[#E5E0D3] text-[#111111] font-sans rounded-3xl overflow-hidden shadow-xs">
      {/* Top OS System Header Bar */}
      <div className="px-4 py-3 border-b border-[#E5E0D3] bg-[#F6F4EE] flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-3 font-mono">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md overflow-hidden bg-black shrink-0 relative">
              <img
                src="/assets/aistudio/1002255096_7163559e.jpg"
                alt="RunOva"
                className="absolute max-w-none w-[340%] h-[340%] object-cover pointer-events-none"
                style={{ objectPosition: '14.5% 48.5%' }}
              />
            </div>
            <span className="font-bold tracking-tight text-[#111111]">RUNOVA OS</span>
          </div>
          <span className="text-[#888888]">/</span>
          <span className="text-[#383838] uppercase text-[11px] font-semibold">CONSOLE PREVIEW</span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="hidden sm:inline text-[#555555]">NETWORK: NEAR TESTNET</span>
          <span className="text-[#00875A] font-semibold flex items-center gap-1.5 bg-[#00EC97]/15 px-2.5 py-0.5 rounded-full border border-[#00EC97]/30 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00EC97] animate-pulse" />
            INTERACTIVE DEMO SANDBOX
          </span>
        </div>
      </div>

      {/* KPI Performance Summary Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#E5E0D3] divide-y md:divide-y-0 md:divide-x divide-[#E5E0D3]">
        <div className="p-4 sm:p-5">
          <div className="text-[11px] font-mono uppercase text-[#555555] tracking-wider mb-1 flex items-center justify-between">
            <span>Simulated Volume</span>
            <span className="text-[9px] px-1.5 py-0.2 bg-[#F6F4EE] rounded text-[#383838] border border-[#E5E0D3]">DEMO</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-[#111111]">
            $142,850
          </div>
          <div className="text-[11px] text-[#383838] mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-[#00875A]" />
            <span>Illustrative benchmark</span>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="text-[11px] font-mono uppercase text-[#555555] tracking-wider mb-1 flex items-center justify-between">
            <span>Demo Test Suite</span>
            <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#00EC97]/20 text-[#00875A] rounded border border-[#00EC97]/30">SANDBOX</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-[#111111] flex items-baseline gap-1.5">
            <span>28 Tests</span>
            <span className="text-xs text-[#555555] font-normal font-mono">(simulated)</span>
          </div>
          <div className="text-[11px] text-[#383838] mt-1 font-mono">
            <span className="text-[#00875A] font-semibold">100%</span> pass rate in demo sandbox
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="text-[11px] font-mono uppercase text-[#555555] tracking-wider mb-1">
            Active Workforce
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-[#111111]">
            6 Agents
          </div>
          <div className="text-[11px] text-[#383838] mt-1">
            Coordinated via central kernel
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="text-[11px] font-mono uppercase text-[#555555] tracking-wider mb-1">
            Approval Queue
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-[#111111]">
            {approval.status === 'pending' ? '1 Demo Request' : '0 Pending'}
          </div>
          <div className="text-[11px] text-[#383838] mt-1">
            {approval.status === 'pending' ? 'Test interactive approve below' : 'Cleared in simulation'}
          </div>
        </div>
      </div>

      {/* Main Preview Grid: Operational Center + Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#EAEAEA]">
        {/* Left Column (7 cols): Coordination Diagram + Pending Approval + Chart */}
        <div className="lg:col-span-7 p-5 sm:p-6 space-y-6">
          {/* Section: Agent Coordination Around Central Business Operation */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#111111] uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <Cpu className="w-3.5 h-3.5" />
                Autonomous Coordination Kernel
              </span>
              <span className="text-[11px] font-mono text-[#666666]">
                6 AGENTS SYNCHRONIZED
              </span>
            </div>

            {/* Visual Representation of Agents Coordinating */}
            <div className="border border-[#EAEAEA] p-4 bg-[#F7F7F7]">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Central Kernel Node */}
                <div className="flex-1 w-full text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white border border-[#111111] text-xs font-mono font-bold text-[#111111] mb-1">
                    <Layers className="w-3.5 h-3.5" />
                    BUSINESS KERNEL (OWNER RULES)
                  </div>
                  <p className="text-xs text-[#666666] mt-1 max-w-sm">
                    Policy limits, spending rules and goals define the envelope. Agents collaborate autonomously within allowed boundaries.
                  </p>
                </div>

                {/* Agent Coordination Nodes */}
                <div className="grid grid-cols-3 gap-2 w-full sm:w-auto shrink-0">
                  {['Finance', 'Procure', 'Growth', 'Support', 'Analytics', 'Ops'].map((agentName, idx) => (
                    <div
                      key={agentName}
                      className="px-2 py-1.5 bg-white border border-[#EAEAEA] text-center hover:border-[#111111] transition-colors"
                    >
                      <div className="text-[10px] font-mono font-bold text-[#111111] truncate">{agentName}</div>
                      <div className="text-[9px] text-[#666666] font-mono">NODE 0{idx + 1}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pending Approval Card */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#111111] uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <FileCheck className="w-3.5 h-3.5" />
                Human-in-the-Loop Approval Queue
              </span>
              <span className="text-[11px] font-mono text-[#666666]">1 ACTION REQUIRING SIGN-OFF</span>
            </div>

            <div className="border border-[#111111] p-4 bg-white min-h-[148px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {approval.status === 'pending' ? (
                  <motion.div
                    key="pending-card"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="text-xs font-mono text-[#666666]">
                          {approval.agent} · {approval.timestamp}
                        </div>
                        <h4 className="text-sm font-bold text-[#111111] mt-0.5">
                          {approval.title}
                        </h4>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-bold font-mono text-[#111111]">
                          {approval.amount}
                        </div>
                        <div className="text-[10px] font-mono text-[#666666]">
                          {approval.currency}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-[#666666] mb-3">
                      {approval.description}
                    </p>

                    <div className="p-2.5 bg-[#F7F7F7] border border-[#EAEAEA] mb-3 text-xs flex items-center justify-between gap-2">
                      <span className="text-[11px] text-[#666666] font-mono">
                        RULE TRIGGERED: <span className="text-[#111111] font-semibold">{approval.policyReason}</span>
                      </span>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-white border border-[#EAEAEA] text-[#111111]">
                        Non-Custodial
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <motion.button
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={handleApprove}
                        className="px-5 py-2 text-xs font-medium bg-[#111111] text-white hover:bg-black transition-colors rounded-full flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Approve & Execute via NEAR
                      </motion.button>
                      <motion.button
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={handleDecline}
                        className="px-4 py-2 text-xs font-medium text-[#111111] border border-[#EAEAEA] hover:bg-[#F7F7F7] transition-colors rounded-full flex items-center gap-1.5 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        Decline
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="settled-card"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="py-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#111111] text-white flex items-center justify-center font-bold rounded-full">
                        {approval.status === 'approved' ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#111111] flex items-center gap-1.5">
                          <span>
                            {approval.status === 'approved'
                              ? 'Simulated Signature Broadcast (NEAR Testnet Demo)'
                              : 'Transaction Declined in Demo Sandbox'}
                          </span>
                          <span className="text-[10px] font-mono text-[#00875A] bg-[#00EC97]/15 px-2 py-0.2 rounded">DEMO</span>
                        </div>
                        <div className="text-[11px] font-mono text-[#383838]">
                          PO-8842 · Recipient: {approval.recipient} · {approval.amount} · Sandbox Gas: &lt;0.001 NEAR
                        </div>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleResetApproval}
                      className="px-3 py-1.5 text-xs text-[#666666] hover:text-[#111111] border border-[#EAEAEA] rounded-full flex items-center gap-1.5 font-mono cursor-pointer"
                      title="Reset preview"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Reset
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Revenue & Autonomous Operations Chart */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#111111] uppercase tracking-wider font-mono">
                Operational Run-Rate & Revenue (30 Days)
              </span>
              <span className="text-[11px] font-mono text-[#666666] tabular-nums">
                TOTAL: $142,850 · +18.4% MOM
              </span>
            </div>

            <div className="border border-[#EAEAEA] p-4 bg-white">
              {/* Minimalist SVG Chart */}
              <div className="h-28 w-full relative">
                <svg
                  viewBox="0 0 600 120"
                  className="w-full h-full overflow-visible"
                  preserveAspectRatio="none"
                >
                  {/* Grid Lines */}
                  <line x1="0" y1="30" x2="600" y2="30" stroke="#EAEAEA" strokeDasharray="3 3" />
                  <line x1="0" y1="60" x2="600" y2="60" stroke="#EAEAEA" strokeDasharray="3 3" />
                  <line x1="0" y1="90" x2="600" y2="90" stroke="#EAEAEA" strokeDasharray="3 3" />

                  {/* Revenue Line */}
                  <polyline
                    fill="none"
                    stroke="#111111"
                    strokeWidth="2"
                    points="0,95 60,88 120,78 180,82 240,65 300,55 360,60 420,40 480,45 540,25 600,15"
                  />

                  {/* Secondary Operations Line (grey) */}
                  <polyline
                    fill="none"
                    stroke="#888888"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                    points="0,110 60,105 120,95 180,92 240,80 300,75 360,70 420,60 480,55 540,48 600,38"
                  />

                  {/* Data Points on Primary */}
                  <circle cx="180" cy="82" r="3" fill="#111111" />
                  <circle cx="360" cy="60" r="3" fill="#111111" />
                  <circle cx="600" cy="15" r="3.5" fill="#111111" />
                </svg>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#EAEAEA] text-[10px] font-mono text-[#666666]">
                <span>WEEK 1</span>
                <span>WEEK 2</span>
                <span>WEEK 3</span>
                <span>WEEK 4</span>
                <span className="text-[#111111] font-bold">TODAY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Active Agents & Activity Log */}
        <div className="lg:col-span-5 p-5 sm:p-6 space-y-6">
          {/* Active AI Agents List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#111111] uppercase tracking-wider font-mono">
                Active Agents
              </span>
              <span className="text-[11px] font-mono text-[#666666]">ALL SYSTEMS OK</span>
            </div>

            <div className="space-y-1.5">
              {[
                { name: 'Finance Agent', role: 'Treasury & Ledger', status: 'Online · Auto-clearing <$1k', id: 'finance' },
                { name: 'Customer Agent', role: 'Support & Inquiries', status: 'Online · Queue: 0', id: 'customer' },
                { name: 'Procurement Agent', role: 'Supplier & Inventory', status: 'Awaiting human review', id: 'procurement' },
                { name: 'Growth Agent', role: 'Prospects & Outbound', status: 'Online · 28 leads', id: 'growth' },
                { name: 'Operations Agent', role: 'Master Workflow Sync', status: 'Online · Supervisory', id: 'operations' },
              ].map((ag) => (
                <motion.div
                  key={ag.name}
                  whileHover={{ x: 2, borderColor: '#111111' }}
                  transition={{ duration: 0.15 }}
                  onClick={() => onOpenAgentModal && onOpenAgentModal(ag.id)}
                  className="p-2.5 border border-[#EAEAEA] bg-white hover:border-[#111111] transition-colors cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-[#111111]">{ag.name}</div>
                    <div className="text-[10px] text-[#666666]">{ag.role}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] font-mono text-[#111111]">{ag.status}</div>
                    <div className="text-[10px] text-[#666666] flex items-center justify-end gap-0.5">
                      Inspect <ArrowUpRight className="w-2.5 h-2.5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Operational Activities Feed */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#111111] uppercase tracking-wider font-mono">
                Recent Operations Feed
              </span>
              <div className="flex gap-1 text-[10px] font-mono bg-[#F7F7F7] p-0.5 border border-[#EAEAEA] rounded-full">
                {(['all', 'finance', 'procurement', 'ops'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2.5 py-0.5 uppercase transition-all duration-150 cursor-pointer rounded-full ${
                      activeTab === tab
                        ? 'bg-[#111111] text-white shadow-xs'
                        : 'text-[#666666] hover:text-[#111111]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-[#EAEAEA] divide-y divide-[#EAEAEA] bg-white overflow-hidden min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="divide-y divide-[#EAEAEA]"
                >
                  {filteredActivities.map((act) => (
                    <div key={act.id} className="p-3 text-xs space-y-1 hover:bg-[#F7F7F7] transition-colors">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-[#111111]">{act.agent}</span>
                        <span className="font-mono text-[#666666]">{act.timestamp}</span>
                      </div>
                      <p className="text-xs text-[#333333] leading-snug">{act.action}</p>
                      <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-[#666666]">
                        <span>
                          {act.amount ? `AMOUNT: ${act.amount}` : 'INTERNAL PROCESS'}
                        </span>
                        {act.hash ? (
                          <span className="text-[#111111] font-semibold">
                            NEAR_TX: {act.hash}
                          </span>
                        ) : (
                          <span>POLICY OK</span>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Product preview disclosure notice */}
      <div className="px-4 py-2.5 border-t border-[#E5E0D3] bg-[#F6F4EE] text-center text-[11px] font-mono text-[#383838] flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00EC97]" />
        <span>INTERACTIVE DEMO SANDBOX · ALL METRICS &amp; WORKFLOWS ARE SIMULATED FOR PREVIEW</span>
      </div>
    </div>
  );
};
