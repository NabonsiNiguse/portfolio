import React from 'react';

type BadgeVariant = 'emerald' | 'blue' | 'purple' | 'neutral' | 'outline';
type BadgeSize    = 'xs' | 'sm' | 'md';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

/**
 * Color variants — all text colors are verified legible against
 * their background opacities (contrast ≥ 4.5:1 on #080C12 base).
 *
 * - emerald  : emerald-400 (#34d399) on emerald-500/10 bg  ✓
 * - blue     : blue-400    (#60a5fa) on blue-500/10    bg  ✓
 * - purple   : purple-400  (#c084fc) on purple-500/10  bg  ✓  (Tailwind default purple scale)
 * - neutral  : slate-200   (#e2e8f0) on slate-700/60   bg  ✓
 * - outline  : slate-300   (#cbd5e1) on transparent    bg  ✓
 */
const variants: Record<BadgeVariant, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/[0.22]',
  blue:    'bg-blue-500/10    text-blue-400    border-blue-500/[0.22]',
  purple:  'bg-purple-500/10  text-purple-400  border-purple-500/[0.22]',
  neutral: 'bg-slate-700/60   text-slate-200   border-slate-600/30',
  outline: 'bg-transparent    text-slate-300   border-white/[0.12]',
};

/**
 * xs  — compact pill for tight spaces (tags, labels inside cards)
 * sm  — default pill
 * md  — slightly larger for hero/section contexts
 */
const sizes: Record<BadgeSize, string> = {
  xs: 'px-1.5 py-px   text-[10px] leading-4 tracking-wide font-semibold',
  sm: 'px-2.5 py-0.5  text-xs     leading-4 tracking-wide font-medium',
  md: 'px-3.5 py-1    text-sm     leading-5              font-medium',
};

export function Badge({
  children,
  variant = 'emerald',
  size = 'sm',
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full border',
        variants[variant],
        sizes[size],
      ].join(' ')}
    >
      {children}
    </span>
  );
}
