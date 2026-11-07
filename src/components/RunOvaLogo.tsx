import React from 'react';

export interface RunOvaLogoProps {
  variant?: 'icon' | 'badge' | 'banner' | 'lockup';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean;
}

export const RunOvaLogo: React.FC<RunOvaLogoProps> = ({
  variant = 'lockup',
  size = 'md',
  className = '',
  showTagline = false,
}) => {
  // Direct asset path as instructed
  const logoSrc = '/assets/aistudio/1002255096_7163559e.jpg';

  // Sizing definitions
  const iconDimensions = {
    sm: 'w-7 h-7 rounded-lg',
    md: 'w-8 h-8 sm:w-9 sm:h-9 rounded-xl',
    lg: 'w-10 h-10 sm:w-12 sm:h-12 rounded-2xl',
    xl: 'w-16 h-16 rounded-2xl',
  }[size];

  const wordmarkSizes = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  }[size];

  // 1. Icon Only: Focuses on the glowing violet "R" glyph and orbital swoosh
  if (variant === 'icon') {
    return (
      <div
        className={`relative bg-black overflow-hidden flex items-center justify-center border border-[#111111]/25 shadow-xs select-none shrink-0 ${iconDimensions} ${className}`}
        title="RunOva"
      >
        <img
          src={logoSrc}
          alt="RunOva Logo"
          className="absolute max-w-none w-[335%] h-[335%] object-cover pointer-events-none"
          style={{ objectPosition: '14.5% 48.5%' }}
          loading="eager"
        />
      </div>
    );
  }

  // 2. Banner: The complete 4:1 widescreen official logo lockup
  if (variant === 'banner') {
    const bannerHeights = {
      sm: 'h-8 w-32 rounded-lg',
      md: 'h-10 w-40 sm:h-11 sm:w-44 rounded-xl',
      lg: 'h-14 w-56 rounded-2xl',
      xl: 'h-20 w-80 rounded-2xl',
    }[size];

    return (
      <div
        className={`relative bg-black overflow-hidden border border-[#222222] shadow-sm select-none ${bannerHeights} ${className}`}
        title="RunOva — Your business. Your agents. Your rules."
      >
        <img
          src={logoSrc}
          alt="RunOva — Your business. Your agents. Your rules."
          className="w-full h-full object-cover pointer-events-none"
          style={{ objectPosition: 'center 48.2%' }}
          loading="eager"
        />
      </div>
    );
  }

  // 3. Badge: Compact dark pill container with the official logo lockup
  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex items-center gap-2 px-2.5 py-1 bg-black text-white rounded-full border border-[#222222] shadow-xs select-none ${className}`}
      >
        <div className="relative w-5 h-5 rounded-md overflow-hidden bg-black shrink-0">
          <img
            src={logoSrc}
            alt="RunOva Emblem"
            className="absolute max-w-none w-[340%] h-[340%] object-cover pointer-events-none"
            style={{ objectPosition: '14.5% 48.5%' }}
          />
        </div>
        <span className="text-xs font-extrabold tracking-tight font-display text-white">
          RunOva
        </span>
        {showTagline && (
          <span className="text-[10px] font-mono text-[#999999] pl-1 border-l border-[#333333]">
            OS
          </span>
        )}
      </div>
    );
  }

  // 4. Default Lockup: Official Glowing Emblem + Distinctive Typography
  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 group select-none ${className}`}>
      {/* Official Emblem */}
      <div
        className={`relative bg-black overflow-hidden flex items-center justify-center border border-[#111111]/25 group-hover:border-[#111111] transition-all shadow-xs shrink-0 ${iconDimensions}`}
      >
        <img
          src={logoSrc}
          alt="RunOva Official Emblem"
          className="absolute max-w-none w-[335%] h-[335%] object-cover pointer-events-none transition-transform duration-300 group-hover:scale-105"
          style={{ objectPosition: '14.5% 48.5%' }}
          loading="eager"
        />
      </div>

      {/* Brand Name & Subtitle */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-black tracking-[-0.03em] text-[#111111] font-display ${wordmarkSizes}`}
          >
            RunOva
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] font-mono text-[#666666] tracking-wider uppercase mt-1">
            Autonomous Business OS
          </span>
        )}
      </div>
    </div>
  );
};
