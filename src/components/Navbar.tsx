import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Wallet } from 'lucide-react';
import { RunOvaLogo } from './RunOvaLogo';

interface NavbarProps {
  onOpenGetStarted: () => void;
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenGetStarted, onOpenLogin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Policy engine', href: '#policy-simulator' },
    { label: 'Transactions', href: '#transactions' },
    { label: 'AI workforce', href: '#workforce' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Security', href: '#security' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-[#F6F4EE]/90 backdrop-blur-md transition-all duration-200 border-b ${
        isScrolled ? 'border-[#E5E0D3] shadow-[0_2px_8px_rgba(0,0,0,0.03)]' : 'border-[#E5E0D3]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Brand Wordmark + Official Logo Symbol */}
          <a
            href="#"
            className="flex items-center text-[#111111] group focus:outline-none shrink-0"
            aria-label="RunOva Home"
          >
            <RunOvaLogo variant="lockup" size="md" />
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#2C2C2C]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[#000000] transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenLogin}
              className="text-xs font-semibold text-[#111111] hover:text-black hover:bg-white border border-[#E5E0D3] hover:border-[#111111] transition-colors py-2 px-4 rounded-full whitespace-nowrap cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <Wallet className="w-3.5 h-3.5 text-[#111111]" />
              <span>Wallet Login</span>
            </button>
            <button
              onClick={onOpenGetStarted}
              className="px-5 py-2 text-xs font-medium text-white bg-[#111111] hover:bg-black transition-colors rounded-full whitespace-nowrap cursor-pointer shadow-xs"
            >
              Get started
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenGetStarted}
              className="px-3.5 py-1.5 text-xs font-medium text-white bg-[#111111] rounded-full"
            >
              Get started
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#111111] hover:bg-white rounded-full transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#E5E0D3] bg-[#F6F4EE] px-4 pt-3 pb-6 space-y-4 animate-in fade-in">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-semibold text-[#111111] py-2 border-b border-[#E5E0D3]/60 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#555555]" />
              </a>
            ))}
          </nav>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="w-full py-2.5 text-xs font-semibold text-[#111111] border border-[#E5E0D3] bg-white rounded-full text-center cursor-pointer flex items-center justify-center gap-2"
            >
              <Wallet className="w-3.5 h-3.5 text-[#00875A]" />
              <span>Wallet Login</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGetStarted();
              }}
              className="w-full py-2.5 text-xs font-medium text-white bg-[#111111] rounded-full text-center cursor-pointer"
            >
              Get started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
