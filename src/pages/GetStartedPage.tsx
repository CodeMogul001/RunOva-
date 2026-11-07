import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Check,
  Wallet,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  Download,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RunOvaLogo } from '../components/RunOvaLogo';
import { AGENTS_DATA } from '../data/agents';

interface GetStartedPageProps {
  onBack: () => void;
}

export const GetStartedPage: React.FC<GetStartedPageProps> = ({ onBack }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('E-Commerce & Digital Commerce');
  const [monthlyVolume, setMonthlyVolume] = useState('50,000');
  const [selectedAgents, setSelectedAgents] = useState<string[]>([
    'finance',
    'customer',
    'growth',
    'procurement',
  ]);
  const [spendingLimit, setSpendingLimit] = useState(2500);

  // Wallet Connection State (Wallet Sign In ONLY)
  const [selectedWallet, setSelectedWallet] = useState<'mynearwallet' | 'meteor' | 'here' | 'ledger' | 'custom'>('mynearwallet');
  const [customAccountId, setCustomAccountId] = useState('');
  const [isWalletConnecting, setIsWalletConnecting] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);

  // Deployment State
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentLogs, setDeploymentLogs] = useState<string[]>([]);

  const toggleAgent = (id: string) => {
    if (selectedAgents.includes(id)) {
      if (selectedAgents.length > 1) {
        setSelectedAgents(selectedAgents.filter((a) => a !== id));
      }
    } else {
      setSelectedAgents([...selectedAgents, id]);
    }
  };

  const handleConnectWallet = (walletType: typeof selectedWallet) => {
    setSelectedWallet(walletType);
    setIsWalletConnecting(true);

    setTimeout(() => {
      setIsWalletConnecting(false);
      let account = 'enterprise.near';
      if (walletType === 'custom' && customAccountId.trim()) {
        account = customAccountId.trim().endsWith('.near') ? customAccountId.trim() : `${customAccountId.trim()}.near`;
      } else if (businessName.trim()) {
        const sanitized = businessName.toLowerCase().replace(/[^a-z0-9]/g, '');
        account = `${sanitized || 'owner'}.near`;
      }
      setConnectedWallet(account);
    }, 800);
  };

  const handleDeploy = () => {
    setStep(4);
    setIsDeploying(true);
    setDeploymentLogs([
      'Initiating RunOva Autonomous Environment setup...',
      `Binding owner wallet: ${connectedWallet || 'owner.near'} (NEAR Protocol)`,
      `Compiling multi-sig smart contract with $${spendingLimit.toLocaleString()} monthly ceiling...`,
    ]);

    setTimeout(() => {
      setDeploymentLogs((prev) => [
        ...prev,
        `Deploying ${selectedAgents.length} specialised autonomous agents...`,
        'Provisioning scoped Function-Call Access Keys on NEAR Testnet Sandbox...',
      ]);
    }, 700);

    setTimeout(() => {
      setDeploymentLogs((prev) => [
        ...prev,
        'Deploying policy governance guardrails: Dual human-in-the-loop over $500 threshold.',
        'Cryptographic audit trail initialized. Contract Hash: 8F2b...X91z',
        'WORKSPACE ENVIRONMENT DEPLOYED AND READY.',
      ]);
      setIsDeploying(false);
    }, 1500);
  };

  const handleDownloadManifest = () => {
    const manifest = {
      protocol: 'RunOva Autonomous OS',
      version: '1.2.0-sandbox',
      environment: businessName || 'Enterprise Sandbox',
      operationalModel: industry,
      settlementLayer: 'NEAR Protocol',
      ownerWallet: connectedWallet || 'owner.near',
      spendCeilingUSD: spendingLimit,
      activeAgents: selectedAgents,
      deployedAt: new Date().toISOString(),
      governanceMode: 'Non-custodial Restricted Access Key',
    };

    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `runova-${(businessName || 'workspace').toLowerCase().replace(/\s+/g, '-')}-config.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#F6F4EE] text-[#111111] flex flex-col font-sans selection:bg-[#00EC97] selection:text-[#111111]">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#F6F4EE]/90 backdrop-blur-md border-b border-[#E5E0D3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-xs font-mono font-medium text-[#2C2C2C] hover:text-[#111111] px-3.5 py-1.5 rounded-full border border-[#E5E0D3] bg-white hover:border-[#111111] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
            </button>
            <div className="h-4 w-[1px] bg-[#E5E0D3]" />
            <RunOvaLogo variant="lockup" size="sm" />
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E0D3] text-xs font-mono text-[#2C2C2C] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#00EC97] animate-pulse" />
              <span className="font-semibold text-[#111111]">NEAR Protocol Sandbox</span>
              <span className="hidden sm:inline text-[#555555]">· Demo Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Stepper Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E0D3] text-[11px] font-mono text-[#2C2C2C] uppercase tracking-wider mb-3">
            <span>Step 0{step} of 04</span>
            <span className="text-[#00EC97] font-bold">●</span>
            <span>
              {step === 1 && 'Organization Profile'}
              {step === 2 && 'Workforce Allocation'}
              {step === 3 && 'Wallet Governance'}
              {step === 4 && 'Environment Deployment'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111] font-display">
            {step === 1 && 'Define your business environment'}
            {step === 2 && 'Select your autonomous workforce'}
            {step === 3 && 'Authorize with NEAR Wallet'}
            {step === 4 && 'Deploying your autonomous operating system'}
          </h1>
          <p className="text-sm sm:text-base text-[#383838] mt-2 max-w-lg mx-auto">
            {step === 1 && 'RunOva provisions a dedicated smart contract environment tailored to your operations.'}
            {step === 2 && 'Choose which specialised AI agents coordinate your daily operations and purchasing workflows.'}
            {step === 3 && 'Wallet sign-in is the only login method. Connect via non-custodial NEAR account.'}
            {step === 4 && 'Verifying policy parameters and compiling scoped autonomous execution rules.'}
          </p>
        </div>

        {/* Multi-step Card Container */}
        <div className="bg-white border border-[#E5E0D3] rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
          {/* STEP 1: Organization Profile */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-xs font-mono uppercase font-bold text-[#111111] tracking-wider mb-2">
                  Business / Organization Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Global Logistics, Horizon Apparel"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-[#F6F4EE]/50 border border-[#E5E0D3] text-[#111111] rounded-2xl placeholder:text-[#888888] focus:outline-none focus:border-[#111111] focus:bg-white transition-colors"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-[#111111] tracking-wider mb-2">
                    Industry Domain
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-[#F6F4EE]/50 border border-[#E5E0D3] text-[#111111] rounded-2xl focus:outline-none focus:border-[#111111] focus:bg-white transition-colors"
                  >
                    <option value="E-Commerce & Digital Commerce">E-Commerce & Digital Commerce</option>
                    <option value="B2B Software & Professional Services">B2B Software & Technology</option>
                    <option value="Supply Chain & Wholesale Logistics">Supply Chain & Logistics</option>
                    <option value="Digital Agency & Creative Studio">Digital Agency & Creative Services</option>
                    <option value="Manufacturing & Physical Goods">Manufacturing & Hardware</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-[#111111] tracking-wider mb-2">
                    Estimated Monthly Volume (USD)
                  </label>
                  <select
                    value={monthlyVolume}
                    onChange={(e) => setMonthlyVolume(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-[#F6F4EE]/50 border border-[#E5E0D3] text-[#111111] rounded-2xl focus:outline-none focus:border-[#111111] focus:bg-white transition-colors"
                  >
                    <option value="10,000">$10,000 / month</option>
                    <option value="50,000">$50,000 / month</option>
                    <option value="150,000">$150,000 / month</option>
                    <option value="500,000+">$500,000+ / month</option>
                  </select>
                </div>
              </div>

              {/* NEAR Non-custodial Note */}
              <div className="p-4 rounded-2xl bg-[#F6F4EE] border border-[#E5E0D3] flex items-start gap-3 text-xs text-[#383838]">
                <div className="w-5 h-5 rounded-full bg-[#00EC97]/20 border border-[#00EC97]/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#0a5233]" />
                </div>
                <div>
                  <strong className="text-[#111111]">Non-custodial smart contract architecture:</strong>
                  <p className="mt-0.5 text-[#383838] leading-relaxed">
                    RunOva does not hold your company funds. All agent transactions execute via restricted NEAR access keys with strict spending caps that you control.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#E5E0D3] flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!businessName.trim()}
                  className="px-8 py-3 text-sm font-semibold bg-[#111111] text-white hover:bg-black rounded-full transition-colors flex items-center gap-2 disabled:opacity-40 cursor-pointer shadow-xs"
                >
                  Continue to Workforce Selection
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Workforce Allocation */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-mono uppercase text-[#383838]">
                  Select the specialised agents you wish to deploy:
                </p>
                <span className="text-xs font-mono font-bold text-[#111111] bg-[#F6F4EE] px-3 py-1 rounded-full border border-[#E5E0D3]">
                  {selectedAgents.length} Agents Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {AGENTS_DATA.map((agent) => {
                  const isSelected = selectedAgents.includes(agent.id);
                  return (
                    <div
                      key={agent.id}
                      onClick={() => toggleAgent(agent.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#111111] bg-[#F6F4EE]/60 shadow-xs ring-1 ring-[#111111]'
                          : 'border-[#E5E0D3] bg-white hover:border-[#CCCCCC]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-[#111111] font-display">
                            {agent.name}
                          </span>
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? 'bg-[#00EC97] border-[#00EC97] text-[#111111]'
                                : 'border-[#CCCCCC] bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                          </div>
                        </div>
                        <p className="text-xs text-[#383838] leading-relaxed">
                          {agent.description}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-[#E5E0D3]/60 flex items-center justify-between text-[11px] font-mono text-[#555555]">
                        <span>Cap: {agent.maxAutonomyBudget}</span>
                        <span className="text-[#111111] font-medium">{agent.metrics.value}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="pt-6 border-t border-[#E5E0D3] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-2.5 text-xs font-semibold text-[#2C2C2C] hover:text-[#111111] border border-[#E5E0D3] rounded-full hover:bg-[#F6F4EE] transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={selectedAgents.length === 0}
                  className="px-8 py-3 text-sm font-semibold bg-[#111111] text-white hover:bg-black rounded-full transition-colors flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-40"
                >
                  Continue to Wallet Authorization
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Governance & Wallet Authorization (Wallet Sign In ONLY) */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Spending Limit Slider */}
              <div className="p-5 rounded-2xl bg-[#F6F4EE] border border-[#E5E0D3] space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase font-bold text-[#111111] tracking-wider">
                    Autonomous Monthly Spending Ceiling
                  </label>
                  <span className="font-mono text-base font-bold text-[#111111] bg-white px-3 py-1 rounded-full border border-[#E5E0D3]">
                    ${spendingLimit.toLocaleString()} USD
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="15000"
                  step="500"
                  value={spendingLimit}
                  onChange={(e) => setSpendingLimit(Number(e.target.value))}
                  className="w-full accent-[#111111] cursor-pointer"
                />
                <p className="text-xs text-[#383838] leading-relaxed">
                  Purchases or vendor disbursements exceeding this threshold or any single transaction above $500 automatically mandate cryptographic owner sign-off.
                </p>
              </div>

              {/* WALLET SIGN IN ONLY Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-[#111111]" />
                    <span className="text-xs font-mono uppercase font-bold text-[#111111] tracking-wider">
                      Wallet Sign In (Only Supported Auth Method)
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#00875A] bg-[#00EC97]/15 px-2.5 py-0.5 rounded-full border border-[#00EC97]/30">
                    Non-Custodial NEAR
                  </span>
                </div>

                <p className="text-xs text-[#383838]">
                  RunOva uses cryptographic wallet authentication via NEAR Protocol. Select your wallet to authorize your autonomous business workspace:
                </p>

                {/* Wallet Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {[
                    { id: 'mynearwallet', name: 'MyNearWallet', desc: 'Standard browser web wallet', badge: 'Recommended' },
                    { id: 'meteor', name: 'Meteor Wallet', desc: 'Browser extension & DeFi', badge: 'Popular' },
                    { id: 'here', name: 'Here Wallet', desc: 'Mobile app & biometric QR', badge: 'Mobile' },
                    { id: 'ledger', name: 'Ledger Hardware', desc: 'Cold storage security key', badge: 'Enterprise' },
                  ].map((w) => {
                    const isSelected = selectedWallet === w.id;
                    const isConnected = connectedWallet && selectedWallet === w.id;
                    return (
                      <div
                        key={w.id}
                        onClick={() => handleConnectWallet(w.id as any)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          isConnected
                            ? 'border-[#00EC97] bg-[#00EC97]/10'
                            : isSelected
                            ? 'border-[#111111] bg-white'
                            : 'border-[#E5E0D3] bg-[#F6F4EE]/50 hover:border-[#111111]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center text-xs font-mono font-bold shrink-0">
                            {w.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#111111] flex items-center gap-1.5">
                              <span>{w.name}</span>
                              <span className="text-[10px] font-mono text-[#555555] px-1.5 py-0.2 bg-white rounded border border-[#E5E0D3]">
                                {w.badge}
                              </span>
                            </div>
                            <div className="text-[11px] text-[#555555]">{w.desc}</div>
                          </div>
                        </div>

                        <div>
                          {isConnected ? (
                            <span className="text-xs font-mono font-bold text-[#00875A] flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" />
                              Connected
                            </span>
                          ) : isWalletConnecting && selectedWallet === w.id ? (
                            <RefreshCw className="w-4 h-4 animate-spin text-[#111111]" />
                          ) : (
                            <span className="text-xs font-medium text-[#2C2C2C] border border-[#E5E0D3] bg-white px-2.5 py-1 rounded-full">
                              Connect
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Custom NEAR Account Input */}
                <div className="p-4 rounded-2xl border border-[#E5E0D3] bg-white space-y-2 mt-2">
                  <label className="text-xs font-mono uppercase font-bold text-[#111111] flex items-center justify-between">
                    <span>Or specify custom NEAR Account ID:</span>
                    <span className="text-[11px] font-normal text-[#555555]">e.g. enterprise.near</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="business.near"
                      value={customAccountId}
                      onChange={(e) => setCustomAccountId(e.target.value)}
                      className="flex-1 px-3.5 py-2 text-xs bg-[#F6F4EE] border border-[#E5E0D3] rounded-full focus:outline-none focus:border-[#111111]"
                    />
                    <button
                      type="button"
                      onClick={() => handleConnectWallet('custom')}
                      className="px-4 py-2 text-xs font-medium bg-[#111111] text-white rounded-full hover:bg-black transition-colors cursor-pointer"
                    >
                      Authorize Key
                    </button>
                  </div>
                </div>

                {/* Connection confirmation */}
                {connectedWallet && (
                  <div className="p-3.5 rounded-2xl bg-[#00EC97]/15 border border-[#00EC97]/40 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00875A]" />
                      <span className="font-semibold text-[#111111]">
                        Wallet Connected: <span className="font-mono text-[#00875A] font-bold">{connectedWallet}</span>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#383838] uppercase">Full Access Key Sign-off</span>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="pt-6 border-t border-[#E5E0D3] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 text-xs font-semibold text-[#2C2C2C] hover:text-[#111111] border border-[#E5E0D3] rounded-full hover:bg-[#F6F4EE] transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleDeploy}
                  disabled={!connectedWallet && !businessName}
                  className="px-8 py-3 text-sm font-semibold bg-[#111111] text-white hover:bg-black rounded-full transition-colors flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-40"
                >
                  Deploy RunOva Environment
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Live Deployment & Manifest */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {isDeploying ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#111111] text-white flex items-center justify-center mx-auto relative">
                    <RefreshCw className="w-7 h-7 animate-spin text-[#00EC97]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#111111] font-display">
                      Deploying Autonomous Contracts to NEAR...
                    </h3>
                    <p className="text-xs font-mono text-[#555555] mt-1">
                      Generating Function-Call keys and policy guardrails
                    </p>
                  </div>
                </div>
              ) : (
                <div className="py-4 space-y-6">
                  {/* Success Banner */}
                  <div className="p-6 rounded-3xl bg-[#00EC97]/15 border border-[#00EC97]/40 text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-[#00EC97] text-[#111111] flex items-center justify-center mx-auto shadow-xs">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-[#111111] font-display">
                      Autonomous Environment Live
                    </h3>
                    <p className="text-xs sm:text-sm text-[#2C2C2C] max-w-md mx-auto">
                      Workspace for <strong className="text-[#111111]">{businessName || 'Your Business'}</strong> is deployed on NEAR Protocol with {selectedAgents.length} active agents.
                    </p>
                  </div>

                  {/* On-chain Details Card */}
                  <div className="bg-[#F6F4EE] border border-[#E5E0D3] rounded-2xl p-5 font-mono text-xs text-[#2C2C2C] space-y-2">
                    <div className="text-[10px] text-[#555555] font-bold uppercase tracking-wider pb-1 border-b border-[#E5E0D3]">
                      // VERIFIED RUNOVA ARCHITECTURE CONTRACT
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#E5E0D3]/60">
                      <span className="text-[#555555]">ENVIRONMENT:</span>
                      <span className="font-bold text-[#111111]">{(businessName || 'ENTERPRISE').toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#E5E0D3]/60">
                      <span className="text-[#555555]">BLOCKCHAIN SETTLEMENT:</span>
                      <span className="text-[#00875A] font-bold">NEAR Protocol Sandbox (Active)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#E5E0D3]/60">
                      <span className="text-[#555555]">OWNER GOVERNANCE WALLET:</span>
                      <span className="font-bold text-[#111111]">{connectedWallet || 'owner.near'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#E5E0D3]/60">
                      <span className="text-[#555555]">AUTONOMOUS SPEND CAP:</span>
                      <span className="font-bold text-[#111111]">${spendingLimit.toLocaleString()} USD / month</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#555555]">ACTIVE WORKFORCE:</span>
                      <span className="font-bold text-[#111111]">{selectedAgents.join(', ').toUpperCase()}</span>
                    </div>
                  </div>

                  {/* Terminal Execution Trace */}
                  <div className="bg-[#111111] text-[#00EC97] p-4 rounded-2xl font-mono text-xs space-y-1 overflow-x-auto">
                    {deploymentLogs.map((log, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-[#888888] select-none">&gt;</span>
                        <span className={idx === deploymentLogs.length - 1 ? 'text-white font-bold' : ''}>
                          {log}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleDownloadManifest}
                      className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-[#111111] border border-[#E5E0D3] bg-white hover:border-[#111111] rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download Deployment JSON
                    </button>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={onBack}
                        className="w-full sm:w-auto px-8 py-3 text-sm font-semibold bg-[#111111] text-white hover:bg-black rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                      >
                        Launch Business Workspace
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer Strip */}
      <footer className="border-t border-[#E5E0D3] py-6 text-center text-xs font-mono text-[#555555] bg-[#F6F4EE]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>RUNOVA AUTONOMOUS OPERATING SYSTEM · ONBOARDING ENGINE</span>
          <div className="flex items-center gap-2">
            <span>NEAR PROTOCOL SETTLEMENT</span>
            <span>·</span>
            <span>NON-CUSTODIAL GOVERNANCE</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
