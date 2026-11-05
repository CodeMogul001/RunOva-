import React, { useState } from 'react';
import { X, KeyRound, Wallet, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [authMethod, setAuthMethod] = useState<'passkey' | 'near' | 'email'>('near');
  const [email, setEmail] = useState('');
  const [nearAccount, setNearAccount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 700);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setEmail('');
    setNearAccount('');
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
      aria-labelledby="login-modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white border border-[#EAEAEA] p-6 sm:p-8 relative text-[#111111]"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#666666] hover:text-[#111111] transition-colors focus:outline-none focus:ring-1 focus:ring-[#111111] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="mb-6">
              <div className="text-xs text-[#666666] font-mono uppercase tracking-wider mb-1">
                OPERATING SYSTEM ACCESS
              </div>
              <h2 id="login-modal-title" className="text-2xl font-bold tracking-tight text-[#111111]">
                Sign in to RunOva
              </h2>
              <p className="text-sm text-[#666666] mt-1">
                Authenticate your owner credentials to review active agent operations.
              </p>
            </div>

            <div className="flex border border-[#EAEAEA] p-1 bg-[#F7F7F7] mb-5">
              <button
                type="button"
                onClick={() => setAuthMethod('near')}
                className={`flex-1 py-1.5 text-xs font-medium transition-colors ${
                  authMethod === 'near' ? 'bg-white text-[#111111] shadow-xs' : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                NEAR Account
              </button>
              <button
                type="button"
                onClick={() => setAuthMethod('passkey')}
                className={`flex-1 py-1.5 text-xs font-medium transition-colors ${
                  authMethod === 'passkey' ? 'bg-white text-[#111111] shadow-xs' : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                Passkey
              </button>
              <button
                type="button"
                onClick={() => setAuthMethod('email')}
                className={`flex-1 py-1.5 text-xs font-medium transition-colors ${
                  authMethod === 'email' ? 'bg-white text-[#111111] shadow-xs' : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                Work Email
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {authMethod === 'near' && (
                <div>
                  <label className="block text-xs font-semibold text-[#111111] uppercase tracking-wider mb-2">
                    NEAR Protocol Account ID
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="owner.near or enterprise.tg"
                      value={nearAccount}
                      onChange={(e) => setNearAccount(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#EAEAEA] text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#111111] transition-colors"
                      autoFocus
                    />
                    <div className="absolute right-3 top-3 text-[#666666]">
                      <Wallet className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-[11px] text-[#666666] mt-2">
                    Connects using your hardware wallet or authorized key-pair for transaction signature delegation.
                  </p>
                </div>
              )}

              {authMethod === 'passkey' && (
                <div className="p-4 border border-[#EAEAEA] bg-[#F7F7F7] text-center space-y-3">
                  <KeyRound className="w-8 h-8 mx-auto text-[#111111]" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#111111]">Biometric / Security Key</h4>
                    <p className="text-xs text-[#666666] mt-1">
                      Fast, passwordless sign-in using Touch ID, Face ID, or YubiKey hardware token.
                    </p>
                  </div>
                </div>
              )}

              {authMethod === 'email' && (
                <div>
                  <label className="block text-xs font-semibold text-[#111111] uppercase tracking-wider mb-2">
                    Work Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#EAEAEA] text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#111111] transition-colors"
                      autoFocus
                    />
                    <div className="absolute right-3 top-3 text-[#666666]">
                      <Mail className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 text-xs font-medium bg-[#111111] text-white hover:bg-black transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
              >
                {isLoading ? (
                  'Verifying credentials...'
                ) : (
                  <>
                    Sign In with {authMethod === 'near' ? 'NEAR Wallet' : authMethod === 'passkey' ? 'Passkey' : 'Magic Link'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-[#EAEAEA] text-center text-xs text-[#666666]">
              Need access? <button onClick={onClose} className="text-[#111111] font-semibold underline underline-offset-2">Request an enterprise pilot</button>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <CheckCircle2 className="w-10 h-10 mx-auto text-[#111111]" />
            <div>
              <h3 className="text-lg font-bold text-[#111111]">Session Authenticated</h3>
              <p className="text-xs text-[#666666] mt-1">
                Owner role verified. You have authorized management rights for your RunOva OS business instance.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-2.5 text-xs font-medium bg-[#111111] text-white hover:bg-black transition-colors"
            >
              Continue to Dashboard
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
