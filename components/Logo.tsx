
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '', showText = true, light = false }) => {
  const sizes = {
    sm: { icon: 'w-8 h-8', text: 'text-lg', sub: 'text-[7px]' },
    md: { icon: 'w-12 h-12', text: 'text-2xl', sub: 'text-[9px]' },
    lg: { icon: 'w-24 h-24', text: 'text-5xl', sub: 'text-[11px]' },
    xl: { icon: 'w-36 h-36', text: 'text-7xl', sub: 'text-[14px]' },
  };

  const currentSize = sizes[size];
  const primaryColor = light ? 'text-white' : 'text-emerald-50';

  return (
    <div className={`flex items-center space-x-5 ${className}`}>
      {/* The Sacred Emblem */}
      <div className={`relative ${currentSize.icon} flex-shrink-0 group perspective-1000`}>
        {/* Divine Aura Glow */}
        <div className="absolute inset-0 bg-amber-500/30 blur-[40px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse"></div>
        
        {/* Main Geometric Container */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 to-emerald-950 rounded-2xl shadow-2xl transform transition-all duration-700 group-hover:rotate-[22.5deg] group-hover:scale-110 overflow-hidden ring-1 ring-amber-500/30 flex items-center justify-center">
          {/* Subtle Rotating Radial Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.15),transparent)] animate-[spin_10s_linear_infinite]"></div>
          
          <svg viewBox="0 0 100 100" className="w-[80%] h-[80%] text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]">
            {/* The 8-pointed Khatam Star */}
            <path 
              fill="currentColor" 
              d="M50 0L61 39H100L69 61L81 100L50 78L19 100L31 61L0 39H39L50 0Z" 
              className="opacity-40 group-hover:opacity-100 transition-opacity"
            />
            {/* The Spiritual Crescent */}
            <path 
              fill="white" 
              d="M75,50 c0,13.8 -11.2,25 -25,25 s-25-11.2 -25-25 s11.2-25,25-25 c4.2,0,8.1,1,11.6,2.8 c-8.5,2.5-14.6,10.4-14.6,19.7 c0,11.3,9.2,20.5,20.5,20.5 c3.7,0,7.1-1,10.1-2.7 C72.5,43.3,75,46.4,75,50z" 
            />
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`serif font-bold tracking-tight leading-none ${currentSize.text} ${primaryColor} text-glow-gold`}>
            Barakah <span className="italic text-amber-500">Link</span>
          </span>
          <div className="flex items-center space-x-2 mt-2 opacity-60">
            <div className="h-[1px] w-6 bg-amber-500"></div>
            <span className={`font-black uppercase tracking-[0.6em] ${currentSize.sub} text-amber-200`}>
              Community Food Support
            </span>
          </div>
        </div>
      )}
    </div>
  );
};