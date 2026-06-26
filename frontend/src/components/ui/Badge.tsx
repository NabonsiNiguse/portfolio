interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'blue' | 'purple' | 'neutral' | 'outline';
  size?: 'xs' | 'sm' | 'md';
}

export function Badge({ children, variant = 'emerald', size = 'sm' }: BadgeProps) {
  const variants = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    blue:    'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple:  'bg-violet-500/10 text-violet-400 border-violet-500/20',
    neutral: 'bg-slate-700/60 text-slate-300 border-slate-600/30',
    outline: 'bg-transparent text-slate-400 border-white/10',
  };
  const sizes = {
    xs: 'px-2 py-0.5 text-[10px] tracking-wide',
    sm: 'px-2.5 py-0.5 text-xs tracking-wide',
    md: 'px-3.5 py-1 text-sm',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </span>
  );
}
