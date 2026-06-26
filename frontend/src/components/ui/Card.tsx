import React from 'react';

type GlowVariant = 'emerald' | 'blue' | 'violet' | 'red' | 'none';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: GlowVariant;
}

/**
 * Base shadow: heavy dark depth shadow.
 * Glow shadow: colored under-glow that activates on hover.
 * Both layers stack — dark shadow persists, colored glow appears.
 */
const glowMap: Record<GlowVariant, string> = {
  emerald:
    'hover:shadow-[0_2px_8px_rgba(0,0,0,0.55),0_24px_64px_rgba(0,0,0,0.45),0_0_40px_rgba(52,211,153,0.18)] hover:border-emerald-500/[0.28]',
  blue:
    'hover:shadow-[0_2px_8px_rgba(0,0,0,0.55),0_24px_64px_rgba(0,0,0,0.45),0_0_40px_rgba(96,165,250,0.16)] hover:border-blue-500/[0.28]',
  violet:
    'hover:shadow-[0_2px_8px_rgba(0,0,0,0.55),0_24px_64px_rgba(0,0,0,0.45),0_0_40px_rgba(139,92,246,0.16)] hover:border-violet-500/[0.28]',
  red:
    'hover:shadow-[0_2px_8px_rgba(0,0,0,0.55),0_24px_64px_rgba(0,0,0,0.45),0_0_40px_rgba(248,113,113,0.16)] hover:border-red-500/[0.28]',
  none:
    'hover:shadow-[0_2px_8px_rgba(0,0,0,0.55),0_24px_64px_rgba(0,0,0,0.45)]',
};

export function Card({
  children,
  className = '',
  hover = false,
  glow = 'none',
}: CardProps) {
  return (
    <div
      className={[
        // Structure & glass
        'relative rounded-2xl border border-white/[0.12]',
        'bg-slate-900/50 backdrop-blur-xl',
        // Base shadow: heavy dark depth (always visible)
        'shadow-[0_1px_3px_rgba(0,0,0,0.45),0_8px_32px_rgba(0,0,0,0.38)]',
        // Top-edge inner shine
        'before:absolute before:inset-0 before:rounded-2xl',
        'before:bg-gradient-to-b before:from-white/[0.035] before:to-transparent',
        'before:pointer-events-none',
        // Hover: lift + scale + colored under-glow
        hover
          ? `transition-all duration-300 hover:-translate-y-3 hover:scale-[1.01] ${glowMap[glow]}`
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
