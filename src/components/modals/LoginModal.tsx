import React, { useState } from 'react';
import { X, Wallet, ArrowRight, CheckCircle2, Shield, ExternalLink, Cpu, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RunOvaLogo } from '../RunOvaLogo';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WalletProvider {
  id: string;
  name: string;
  type: string;
  description: string;
  defaultAccount: string;
}

const WALLET_PROVIDERS: WalletProvider[] = [
  {
    id: 'mynearwallet',
    name: 'MyNearWallet',
    type: 'Web & Extension',
    description: 'Official web gateway for NEAR accounts',
    defaultAccount: 'owner.near',
  },
  {
    id: 'meteor',
    name: 'Meteor Wallet',
    type: 'Browser Extension',
    description: 'DeFi & enterprise access control wallet',
    defaultAccount: 'enterprise.near',
  },
  {
    id: 'here',
    name: 'HERE Wallet',
    type: 'Mobile & QR',
    description: 'Biometric mobile authentication',
    defaultAccount: 'founder.tg',
  },
  {
    id: 'ledger',
    name: 'Ledger Hardware',
    type: 'Hardware Key',
    description: 'Physical USB cryptographic signature',
    defaultAccount: 'treasury-hardware.near',
  },
];

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [selectedProvider, setSelectedProvider] = useState<string>('mynearwallet');
  const [nearAccount, setNearAccount] = useState<string>('owner.near');
  const [status, setStatus] = useState<'idle' | 'connecting' | 'authenticated'>('idle');
  const [customInputMode, setCustomInputMode] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSelectProvider = (provider: WalletProvider) => {
    setSelectedProvider(provider.id);
    if (!customInputMode) {
      setNearAccount(provider.defaultAccount);
    }
  };

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nearAccount.trim()) return;

    setStatus('connecting');
    setTimeout(() => {
      setStatus('authenticated');
    }, 850);
  };

  const handleReset = () => {
    setStatus('idle');
    setNearAccount('owner.near');
    setCustomInputMode(false);
    onClose();
  };

  const handleDisconnect = () => {
    setStatus('idle');
    setNearAccount('owner.near');
    setCustomInputMode(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
        <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg bg-white border border-[#E5E0D3] p-6 sm:p-8 relative text-[#111111] shadow-2xl rounded-3xl"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#666666] hover:text-[#111111] transition-colors focus:outline-none focus:ring-1 focus:ring-[#111111] cursor-pointer rounded-full hover:bg-[#F7F7F7]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          {status !== 'authenticated' ? (
            <motion.div
              key="wallet-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Brand Header */}
              <div className="mb-6">
                <div className="mb-4">
                  <RunOvaLogo variant="lockup" size="md" />
                </div>
                <div className="flex items-center gap-2 text-xs text-[#383838] font-mono uppercase tracking-wider mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#00EC97] animate-pulse" />
                  <span>WALLET AUTHENTICATION</span>
                  <span>·</span>
                  <span className="text-[#111111] font-bold">NEAR PROTOCOL</span>
                </div>
                <h2 id="login-modal-title" className="text-2xl font-bold tracking-tight text-[#111111]">
                  Sign in with NEAR Wallet
                </h2>
                <p className="text-sm text-[#383838] mt-1 leading-relaxed">
                  Connect your authorized NEAR Protocol wallet to verify owner governance and access your RunOva workspace.
                </p>
              </div>

              <form onSubmit={handleConnect} className="space-y-4">
                {/* Wallet Provider Grid */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-[#111111] uppercase tracking-wider mb-2">
                    <span>Select Wallet Provider</span>
                    <span className="text-[11px] font-mono text-[#00875A] bg-[#00EC97]/15 px-2 py-0.5 rounded-full font-medium">
                      Non-custodial
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {WALLET_PROVIDERS.map((provider) => {
                      const isSelected = selectedProvider === provider.id;
                      return (
                        <button
                          key={provider.id}
                          type="button"
                          onClick={() => handleSelectProvider(provider)}
                          disabled={status === 'connecting'}
                          className={`p-3 text-left border transition-all cursor-pointer rounded-2xl flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#111111] bg-[#F6F4EE] shadow-xs ring-1 ring-[#111111]'
                              : 'border-[#E5E0D3] bg-white hover:border-[#111111]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-bold text-[#111111]">
                              {provider.name}
                            </span>
                            <div
                              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                isSelected
                                  ? 'bg-[#00EC97] border-[#00EC97]'
                                  : 'border-[#CCCCCC] bg-white'
                              }`}
                            >
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#111111]" />}
                            </div>
                          </div>
                          <div className="text-[11px] font-mono text-[#383838]">
                            {provider.type}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Account ID Input & Quick Suggestions */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-[#111111] uppercase tracking-wider">
                      NEAR Account ID
                    </label>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono">
                      <span className="text-[#383838]">Presets:</span>
                      {['owner.near', 'enterprise.near', 'treasury.tg'].map((acc) => (
                        <button
                          key={acc}
                          type="button"
                          onClick={() => {
                            setNearAccount(acc);
                            setCustomInputMode(true);
                          }}
                          className={`px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${
                            nearAccount === acc
                              ? 'border-[#111111] bg-[#111111] text-white'
                              : 'border-[#E5E0D3] hover:border-[#111111] text-[#383838] bg-white'
                          }`}
                        >
                          {acc.split('.')[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. yourname.near or organization.tg"
                      value={nearAccount}
                      onChange={(e) => {
                        setNearAccount(e.target.value);
                        setCustomInputMode(true);
                      }}
                      disabled={status === 'connecting'}
                      className="w-full pl-3.5 pr-10 py-2.5 text-sm font-mono bg-[#F6F4EE]/50 border border-[#E5E0D3] text-[#111111] placeholder:text-[#888888] focus:outline-none focus:border-[#111111] focus:bg-white transition-colors rounded-xl"
                      autoFocus
                    />
                    <div className="absolute right-3.5 top-3 text-[#383838]">
                      <Wallet className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Security Guarantee Notice */}
                <div className="border border-[#E5E0D3] bg-[#F6F4EE] p-3.5 text-xs text-[#383838] flex items-start gap-2.5 rounded-2xl">
                  <Shield className="w-4 h-4 text-[#111111] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-semibold text-[#111111]">Cryptographic Non-Custodial Sign-In: </span>
                    RunOva never requests private keys or seed phrases. Sign-in uses standard NEAR keypair signature to authorize session governance.
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'connecting' || !nearAccount.trim()}
                    className="w-full py-3 text-xs font-semibold bg-[#111111] text-white hover:bg-black transition-colors flex items-center justify-center gap-2 disabled:opacity-50 rounded-full cursor-pointer shadow-xs"
                  >
                    {status === 'connecting' ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#00EC97]" />
                        Authorizing via {WALLET_PROVIDERS.find((p) => p.id === selectedProvider)?.name}...
                      </>
                    ) : (
                      <>
                        <Wallet className="w-3.5 h-3.5" />
                        Connect Wallet &amp; Authorize Session
                        <ArrowRight className="w-3.5 h-3.5 text-[#00EC97]" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-5 pt-4 border-t border-[#E5E0D3] flex items-center justify-between text-xs text-[#383838] font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00EC97]" />
                  CHAIN: NEAR PROTOCOL
                </span>
                <a
                  href="https://near.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#111111] transition-colors flex items-center gap-1 text-[#383838]"
                >
                  Learn about NEAR <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="wallet-success"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="py-4 text-center space-y-5"
            >
              <div className="w-14 h-14 mx-auto bg-[#00EC97] text-[#111111] flex items-center justify-center rounded-2xl shadow-xs">
                <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
              </div>

              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-[#00875A] font-bold mb-1">
                  WALLET CONNECTED · OWNER AUTHENTICATED
                </div>
                <h3 className="text-2xl font-bold text-[#111111] font-display">
                  Welcome back, {nearAccount}
                </h3>
                <p className="text-sm text-[#383838] mt-1 max-w-sm mx-auto">
                  Cryptographic ownership verified on NEAR Protocol Sandbox. Your autonomous agent workforce is active.
                </p>
              </div>

              {/* On-Chain Session Details Card */}
              <div className="bg-[#F6F4EE] border border-[#E5E0D3] p-4 text-left text-xs font-mono text-[#383838] space-y-1.5 rounded-2xl">
                <div className="flex items-center justify-between text-[#111111] font-bold pb-1.5 border-b border-[#E5E0D3]">
                  <span className="flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#00875A]" />
                    RUNOVA GOVERNANCE SESSION
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-[#E5E0D3] text-[#00875A] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00EC97]" />
                    ACTIVE DEMO
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#555555]">CONNECTED ACCOUNT:</span>
                  <span className="text-[#111111] font-bold">{nearAccount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555555]">WALLET PROVIDER:</span>
                  <span className="text-[#111111]">
                    {WALLET_PROVIDERS.find((p) => p.id === selectedProvider)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555555]">LEDGER CONSENSUS:</span>
                  <span className="text-[#111111]">NEAR Protocol Mainnet Sandbox</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555555]">POLICY STATUS:</span>
                  <span className="text-[#111111]">Dual-Key Enforcement Enabled</span>
                </div>
              </div>

              {/* Success Actions */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-3 text-xs font-semibold bg-[#111111] text-white hover:bg-black transition-colors rounded-full cursor-pointer shadow-xs"
                >
                  Enter Business Workspace Dashboard
                </button>
                <button
                  type="button"
                  onClick={handleDisconnect}
                  className="w-full py-2 text-xs font-medium text-[#383838] hover:text-[#111111] border border-[#E5E0D3] hover:border-[#111111] bg-white transition-colors rounded-full cursor-pointer"
                >
                  Disconnect / Switch Wallet
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
