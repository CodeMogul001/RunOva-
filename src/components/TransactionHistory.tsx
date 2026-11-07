import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from 'recharts';
import {
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Filter,
  ShieldCheck,
  TrendingUp,
  FileCheck2,
  Check,
  X,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';

interface Transaction {
  id: string;
  txHash: string;
  agent: string;
  agentId: 'finance' | 'procurement' | 'growth' | 'operations';
  description: string;
  recipient: string;
  amount: number;
  status: 'processed' | 'pending';
  policyCheck: string;
  date: string;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TX-8921',
    txHash: '7Kx9p...M2qR',
    agent: 'Finance Agent',
    agentId: 'finance',
    description: 'Quarterly Cloud Computing Compute Settlement',
    recipient: 'Compute Cluster Europe Ltd',
    amount: 1420,
    status: 'pending',
    policyCheck: 'Exceeds $500 single-tx threshold · Requires Owner Signature',
    date: 'Today, 14:22',
  },
  {
    id: 'TX-8920',
    txHash: '3Ba1x...Z82p',
    agent: 'Procurement Agent',
    agentId: 'procurement',
    description: 'Inventory Replenishment Order #8842',
    recipient: 'Apex Logistics Freight',
    amount: 2850,
    status: 'pending',
    policyCheck: 'Bulk vendor purchase · Dual multi-sig approval required',
    date: 'Today, 11:05',
  },
  {
    id: 'TX-8919',
    txHash: '9Lm4k...W10t',
    agent: 'Finance Agent',
    agentId: 'finance',
    description: 'Autonomous Micro-SaaS API Settlement',
    recipient: 'Vector Embeddings Provider',
    amount: 180,
    status: 'processed',
    policyCheck: 'Within $2,500 monthly ceiling · Auto-Executed',
    date: 'Yesterday, 18:40',
  },
  {
    id: 'TX-8918',
    txHash: '5Po2q...R44v',
    agent: 'Growth Agent',
    agentId: 'growth',
    description: 'Targeted Lead Generation Campaign Budget',
    recipient: 'Global Ad Placement Network',
    amount: 350,
    status: 'processed',
    policyCheck: 'Within Growth envelope · Auto-Executed',
    date: 'Yesterday, 14:15',
  },
  {
    id: 'TX-8917',
    txHash: '2Yw8z...J77m',
    agent: 'Operations Agent',
    agentId: 'operations',
    description: 'Autonomous Domain & Security Certificate Renewal',
    recipient: 'Registry Trust Network',
    amount: 65,
    status: 'processed',
    policyCheck: 'Whitelisted operational vendor · Auto-Executed',
    date: 'Nov 04, 09:30',
  },
  {
    id: 'TX-8916',
    txHash: '8Tc5u...L19x',
    agent: 'Procurement Agent',
    agentId: 'procurement',
    description: 'Eco-Packaging Materials Delivery Batch 4',
    recipient: 'Sustainable Materials Corp',
    amount: 490,
    status: 'processed',
    policyCheck: 'Under $500 threshold · Auto-Executed',
    date: 'Nov 03, 16:10',
  },
];

const CHART_DATA = [
  { day: 'Mon', processed: 3200, pending: 800, volume: 4000 },
  { day: 'Tue', processed: 4800, pending: 1200, volume: 6000 },
  { day: 'Wed', processed: 2900, pending: 450, volume: 3350 },
  { day: 'Thu', processed: 6100, pending: 2200, volume: 8300 },
  { day: 'Fri', processed: 5400, pending: 1420, volume: 6820 },
  { day: 'Sat', processed: 2100, pending: 0, volume: 2100 },
  { day: 'Sun', processed: 3950, pending: 2850, volume: 6800 },
];

export const TransactionHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [filter, setFilter] = useState<'all' | 'processed' | 'pending'>('all');
  const [chartView, setChartView] = useState<'area' | 'bar'>('area');
  const [approvingId, setApprovingId] = useState<string | null>(null);

  // Derived summaries
  const processedTotal = transactions
    .filter((t) => t.status === 'processed')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingTotal = transactions
    .filter((t) => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingCount = transactions.filter((t) => t.status === 'pending').length;

  const handleApprove = (id: string) => {
    setApprovingId(id);
    setTimeout(() => {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                status: 'processed',
                policyCheck: 'Cryptographically signed & settled on NEAR Protocol · Approved by Owner',
                txHash: '7Kx9p...M2qR',
              }
            : t
        )
      );
      setApprovingId(null);
    }, 600);
  };

  const handleDecline = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredTransactions = transactions.filter((t) => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  return (
    <section id="transactions" className="py-20 sm:py-28 bg-[#F6F4EE] border-b border-[#E5E0D3] overflow-hidden">
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
            <span className="uppercase tracking-widest text-[#111111] font-bold">TRANSACTION INTELLIGENCE</span>
            <span className="text-[#666666]">·</span>
            <span className="text-[#444444]">[DEMO SIMULATION]</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111111] leading-tight mb-4 font-display">
            Autonomous financial activity in clear view.
          </h2>
          <p className="text-base sm:text-lg text-[#333333] leading-relaxed">
            Monitor real-time agent disbursements, track on-chain settlements on NEAR Protocol, and review items requiring human cryptographic sign-off.
          </p>
        </motion.div>

        {/* Top Summary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Card 1: Processed Volume */}
          <div className="bg-white border border-[#E5E0D3] p-5 rounded-2xl shadow-2xs">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#444444] mb-1">
              <span>Processed Payments</span>
              <span className="w-2 h-2 rounded-full bg-[#00EC97]" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#111111]">
              ${processedTotal.toLocaleString()}
            </div>
            <div className="text-xs text-[#444444] mt-2 flex items-center gap-1 font-mono">
              <span className="text-[#00875A] font-semibold">100% on-chain</span>
              <span>· Sub-cent NEAR gas</span>
            </div>
          </div>

          {/* Card 2: Pending Approvals */}
          <div className="bg-white border border-[#E5E0D3] p-5 rounded-2xl shadow-2xs">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#444444] mb-1">
              <span>Pending Approvals</span>
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-[#F6F4EE] text-[#111111] border border-[#E5E0D3]">
                {pendingCount} action{pendingCount !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#111111]">
              ${pendingTotal.toLocaleString()}
            </div>
            <div className="text-xs text-[#444444] mt-2 font-mono">
              {pendingCount > 0 ? 'Requires owner cryptographic sign-off' : 'All transactions cleared'}
            </div>
          </div>

          {/* Card 3: Autonomous Ratio */}
          <div className="bg-white border border-[#E5E0D3] p-5 rounded-2xl shadow-2xs">
            <div className="text-xs font-mono uppercase tracking-wider text-[#444444] mb-1">
              Autonomous Ratio
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#111111]">
              84.2%
            </div>
            <div className="text-xs text-[#444444] mt-2 flex items-center gap-1 font-mono">
              <TrendingUp className="w-3.5 h-3.5 text-[#00875A]" />
              <span>Routine ops automated within limit</span>
            </div>
          </div>

          {/* Card 4: Network Settlement */}
          <div className="bg-white border border-[#E5E0D3] p-5 rounded-2xl shadow-2xs">
            <div className="text-xs font-mono uppercase tracking-wider text-[#444444] mb-1">
              Settlement Engine
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#111111] font-display">
              NEAR Protocol
            </div>
            <div className="text-xs text-[#444444] mt-2 font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00875A]" />
              <span>Restricted Access Keys active</span>
            </div>
          </div>
        </div>

        {/* Visual Chart & Graph Card */}
        <div className="bg-white border border-[#E5E0D3] rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E0D3]">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#111111] font-display">
                  Weekly Settlement Activity by Agents
                </h3>
                <span className="text-[10px] font-mono text-[#555555] bg-[#F6F4EE] px-2 py-0.5 rounded-full border border-[#E5E0D3]">
                  DEMO DATA
                </span>
              </div>
              <p className="text-xs text-[#444444] mt-1">
                Visualizing processed autonomous volumes vs. owner-delegated approval items (USD).
              </p>
            </div>

            {/* Chart toggle controls */}
            <div className="flex items-center gap-2 bg-[#F6F4EE] p-1 rounded-full border border-[#E5E0D3]">
              <button
                type="button"
                onClick={() => setChartView('area')}
                className={`px-3 py-1 text-xs font-mono rounded-full transition-colors cursor-pointer ${
                  chartView === 'area'
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'text-[#444444] hover:text-[#111111]'
                }`}
              >
                Area View
              </button>
              <button
                type="button"
                onClick={() => setChartView('bar')}
                className={`px-3 py-1 text-xs font-mono rounded-full transition-colors cursor-pointer ${
                  chartView === 'bar'
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'text-[#444444] hover:text-[#111111]'
                }`}
              >
                Bar Breakdown
              </button>
            </div>
          </div>

          {/* Recharts Container */}
          <div className="h-64 sm:h-72 w-full pt-6">
            <ResponsiveContainer width="100%" height="100%">
              {chartView === 'area' ? (
                <AreaChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="processedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#111111" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#111111" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="pendingGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00EC97" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#00EC97" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E0D3" opacity={0.6} />
                  <XAxis
                    dataKey="day"
                    stroke="#555555"
                    fontSize={12}
                    fontFamily="JetBrains Mono, monospace"
                    tickLine={false}
                    axisLine={{ stroke: '#E5E0D3' }}
                  />
                  <YAxis
                    stroke="#555555"
                    fontSize={11}
                    fontFamily="JetBrains Mono, monospace"
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `$${v}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E5E0D3',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontFamily: 'JetBrains Mono, monospace',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                    }}
                    formatter={(value: any, name: any) => [
                      `$${Number(value).toLocaleString()}`,
                      name === 'processed' ? 'Processed' : 'Pending Approval',
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="processed"
                    stroke="#111111"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#processedGradient)"
                    name="processed"
                  />
                  <Area
                    type="monotone"
                    dataKey="pending"
                    stroke="#00EC97"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#pendingGradient)"
                    name="pending"
                  />
                </AreaChart>
              ) : (
                <BarChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E0D3" opacity={0.6} />
                  <XAxis
                    dataKey="day"
                    stroke="#555555"
                    fontSize={12}
                    fontFamily="JetBrains Mono, monospace"
                    tickLine={false}
                    axisLine={{ stroke: '#E5E0D3' }}
                  />
                  <YAxis
                    stroke="#555555"
                    fontSize={11}
                    fontFamily="JetBrains Mono, monospace"
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `$${v}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E5E0D3',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontFamily: 'JetBrains Mono, monospace',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                    }}
                    formatter={(value: any, name: any) => [
                      `$${Number(value).toLocaleString()}`,
                      name === 'processed' ? 'Processed' : 'Pending Approval',
                    ]}
                  />
                  <Bar dataKey="processed" fill="#111111" radius={[4, 4, 0, 0]} name="processed" />
                  <Bar dataKey="pending" fill="#00EC97" radius={[4, 4, 0, 0]} name="pending" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 text-xs font-mono text-[#444444]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#111111] rounded-sm" />
              <span>Processed Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#00EC97] rounded-sm" />
              <span>Pending Owner Approvals</span>
            </div>
          </div>
        </div>

        {/* Transaction Ledger Table Card */}
        <div className="bg-white border border-[#E5E0D3] rounded-3xl overflow-hidden shadow-sm">
          {/* Table Header Controls */}
          <div className="p-5 sm:p-6 border-b border-[#E5E0D3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white">
            <div className="flex items-center gap-2.5">
              <FileCheck2 className="w-4 h-4 text-[#111111]" />
              <h3 className="text-base font-bold text-[#111111] font-display">
                Agent Transaction Stream
              </h3>
              <span className="text-xs font-mono text-[#555555]">({filteredTransactions.length} records)</span>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 bg-[#F6F4EE] p-1 rounded-full border border-[#E5E0D3]">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-xs font-mono rounded-full transition-colors cursor-pointer ${
                  filter === 'all'
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'text-[#444444] hover:text-[#111111]'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFilter('processed')}
                className={`px-3 py-1 text-xs font-mono rounded-full transition-colors cursor-pointer ${
                  filter === 'processed'
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'text-[#444444] hover:text-[#111111]'
                }`}
              >
                Processed
              </button>
              <button
                type="button"
                onClick={() => setFilter('pending')}
                className={`px-3 py-1 text-xs font-mono rounded-full transition-colors cursor-pointer ${
                  filter === 'pending'
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'text-[#444444] hover:text-[#111111]'
                }`}
              >
                Pending ({pendingCount})
              </button>
            </div>
          </div>

          {/* Table Content */}
          <div className="divide-y divide-[#E5E0D3] overflow-x-auto">
            {filteredTransactions.map((tx) => (
              <div
                key={tx.id}
                className="p-4 sm:p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 hover:bg-[#F6F4EE]/40 transition-colors"
              >
                {/* Left Column: ID, Agent & Description */}
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#111111] bg-[#F6F4EE] px-2 py-0.5 rounded border border-[#E5E0D3]">
                      {tx.id}
                    </span>
                    <span className="text-xs font-semibold text-[#111111]">{tx.agent}</span>
                    <span className="text-[#666666]">·</span>
                    <span className="text-xs font-mono text-[#555555]">{tx.date}</span>
                  </div>
                  <div className="text-sm font-medium text-[#111111]">
                    {tx.description}
                  </div>
                  <div className="text-xs text-[#555555] font-mono">
                    Recipient: <span className="text-[#111111] font-semibold">{tx.recipient}</span> · NEAR TX: {tx.txHash}
                  </div>
                  <div className="text-[11px] text-[#444444] flex items-center gap-1 font-mono pt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00875A] shrink-0" />
                    <span>{tx.policyCheck}</span>
                  </div>
                </div>

                {/* Right Column: Amount, Status Badge, Actions */}
                <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
                  <div className="text-right">
                    <div className="text-lg font-mono font-extrabold text-[#111111]">
                      ${tx.amount.toLocaleString()} USD
                    </div>
                    <div>
                      {tx.status === 'processed' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-[#00875A] bg-[#00EC97]/20 border border-[#00EC97]/40 px-2.5 py-0.5 rounded-full">
                          <Check className="w-3 h-3 stroke-[3]" />
                          Processed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-[#8B6508] bg-[#FFF8E7] border border-[#F3E2B8] px-2.5 py-0.5 rounded-full">
                          <Clock className="w-3 h-3" />
                          Pending Owner Sign-Off
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action buttons for pending approvals */}
                  {tx.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleApprove(tx.id)}
                        disabled={approvingId === tx.id}
                        className="px-4 py-1.5 text-xs font-semibold bg-[#111111] text-white hover:bg-black rounded-full transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
                      >
                        {approvingId === tx.id ? (
                          <>
                            <RefreshCw className="w-3 h-3 animate-spin text-[#00EC97]" />
                            Signing...
                          </>
                        ) : (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#00EC97]" />
                            Approve
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDecline(tx.id)}
                        className="p-1.5 text-xs font-semibold text-[#444444] hover:text-[#111111] border border-[#E5E0D3] rounded-full hover:bg-white transition-colors cursor-pointer"
                        title="Decline request"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="p-4 bg-[#F6F4EE]/60 border-t border-[#E5E0D3] text-center text-xs font-mono text-[#555555]">
            ALL ACTIONS RUN VIA SCOPED ACCESS KEYS · CRYPTOGRAPHIC AUDIT ARCHIVED TO NEAR PROTOCOL LEDGER
          </div>
        </div>
      </div>
    </section>
  );
};
