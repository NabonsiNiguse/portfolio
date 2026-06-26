import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'emerald' | 'blue' | 'none';
}

export function Card({ children, className = '', hover = false, glow = 'none' }: CardProps) {
  const glowMap = {
    emerald: 'hover:shadow-[0_8px_40px_rgba(52,211,153,0.12)] hover:border-emerald-500/25',
    blue:    'hover:shadow-[0_8px_40px_rgba(96,165,250,0.1)] hover:border-blue-500/25',
    none:    '',
  };

  return (
    <div
      className={`
        relative rounded-2xl border border-white/[0.07]
        bg-slate-900/50 backdrop-blur-xl
        shadow-[0_1px_3px_rgba(0,0,0,0.4),0_8px_32px_rgba(0,0,0,0.3)]
        before:absolute before:inset-0 before:rounded-2xl
        before:bg-gradient-to-b before:from-white/[0.035] before:to-transparent before:pointer-events-none
        ${hover ? `transition-all duration-300 hover:-translate-y-1.5 ${glowMap[glow]}` : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
