import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check } from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
  onOpenGetStarted: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, onOpenGetStarted }) => {
  const [copiedTwitter, setCopiedTwitter] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTwitterPlaceholder = () => {
    navigator.clipboard?.writeText('https://x.com/RunOvaOS');
    setCopiedTwitter(true);
    setTimeout(() => setCopiedTwitter(false), 2000);
  };

  return (
    <footer className="bg-white border-t border-[#EAEAEA] text-[#111111] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#EAEAEA]">
          {/* Brand & Short Description (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 border-2 border-[#111111] flex items-center justify-center relative">
                <div className="w-1.5 h-1.5 bg-[#111111]" />
              </div>
              <span className="text-xl font-extrabold tracking-[-0.03em] text-[#111111] font-display">
                RunOva
              </span>
            </div>
            <p className="text-sm text-[#666666] leading-relaxed max-w-sm">
              The AI-powered autonomous business operating system. Delegate operational routines to specialised agents while retaining absolute financial authority.
            </p>
            <div className="text-xs font-mono text-[#666666]">
              Your business. Your agents. Your rules.
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#111111] font-bold">
              Navigation
            </div>
            <ul className="space-y-2 text-sm text-[#666666]">
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleNavClick(e, '#how-it-works')}
                  className="hover:text-[#111111] transition-colors"
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  href="#workforce"
                  onClick={(e) => handleNavClick(e, '#workforce')}
                  className="hover:text-[#111111] transition-colors"
                >
                  AI workforce
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  onClick={(e) => handleNavClick(e, '#features')}
                  className="hover:text-[#111111] transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#security"
                  onClick={(e) => handleNavClick(e, '#security')}
                  className="hover:text-[#111111] transition-colors"
                >
                  Security & Limits
                </a>
              </li>
            </ul>
          </div>

          {/* Ecosystem & Contacts (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#111111] font-bold">
              Protocol & Contact
            </div>
            <p className="text-xs text-[#666666] leading-relaxed">
              Financial verification and access key governance powered by NEAR Protocol.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={onOpenContact}
                className="px-3.5 py-2 text-xs font-medium border border-[#EAEAEA] hover:border-[#111111] bg-white transition-colors text-left flex items-center justify-between"
              >
                <span>Contact Systems Team</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#666666]" />
              </button>
              <button
                type="button"
                onClick={handleTwitterPlaceholder}
                className="px-3.5 py-2 text-xs font-medium border border-[#EAEAEA] hover:border-[#111111] bg-[#F7F7F7] transition-colors text-left flex items-center justify-between gap-2"
                title="Copy official X / Twitter handle"
              >
                <span>{copiedTwitter ? 'Handle Copied' : 'X / Twitter: @RunOvaOS'}</span>
                {copiedTwitter ? (
                  <Check className="w-3.5 h-3.5 text-[#111111]" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-[#666666]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Strip: NEAR Reference & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#666666] font-mono">
          <div>
            &copy; 2026 RunOva OS. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>BUILT ON NEAR PROTOCOL</span>
            <span>·</span>
            <span>NON-CUSTODIAL GOVERNANCE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
