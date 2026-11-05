import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

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
    { label: 'How it works', href: '#how-it-works' },
    { label: 'AI workforce', href: '#workforce' },
    { label: 'Features', href: '#features' },
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
      className={`sticky top-0 z-40 w-full bg-white transition-all duration-200 border-b ${
        isScrolled ? 'border-[#EAEAEA] shadow-[0_1px_3px_rgba(0,0,0,0.02)]' : 'border-[#EAEAEA]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Brand Wordmark + Geometric Brand Symbol */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-[#111111] group focus:outline-none shrink-0"
            aria-label="RunOva Home"
          >
            {/* Minimal Geometric Symbol: concentric precision circle & node */}
            <div className="w-6 h-6 border-2 border-[#111111] flex items-center justify-center relative">
              <div className="w-1.5 h-1.5 bg-[#111111]" />
            </div>
            <span className="text-xl font-extrabold tracking-[-0.03em] text-[#111111] font-display">
              RunOva
            </span>
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#666666]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[#111111] transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <button
              onClick={onOpenLogin}
              className="text-xs font-semibold text-[#111111] hover:text-[#666666] transition-colors py-2 px-3 whitespace-nowrap cursor-pointer"
            >
              Log in
            </button>
            <button
              onClick={onOpenGetStarted}
              className="px-4 py-2 text-xs font-medium text-white bg-[#111111] hover:bg-black transition-colors rounded-none whitespace-nowrap cursor-pointer"
            >
              Get started
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenGetStarted}
              className="px-3 py-1.5 text-xs font-medium text-white bg-[#111111] rounded-none"
            >
              Get started
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#111111] hover:bg-[#F7F7F7] transition-colors focus:outline-none"
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
        <div className="sm:hidden border-t border-[#EAEAEA] bg-white px-4 pt-3 pb-6 space-y-4 animate-in fade-in">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-[#111111] py-2 border-b border-[#F7F7F7] flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#666666]" />
              </a>
            ))}
          </nav>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="w-full py-2.5 text-xs font-semibold text-[#111111] border border-[#EAEAEA] bg-[#F7F7F7] text-center"
            >
              Log in
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGetStarted();
              }}
              className="w-full py-2.5 text-xs font-medium text-white bg-[#111111] text-center"
            >
              Get started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
