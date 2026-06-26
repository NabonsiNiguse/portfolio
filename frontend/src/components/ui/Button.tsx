import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  as: Tag = 'button',
  href,
  target,
  rel,
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'relative inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080C12] select-none overflow-hidden';

  const variants = {
    primary:
      'bg-gradient-to-r from-emerald-400 to-blue-500 text-slate-950 hover:from-emerald-300 hover:to-blue-400 shadow-[0_0_30px_rgba(52,211,153,0.3),0_4px_20px_rgba(52,211,153,0.2)] hover:shadow-[0_0_50px_rgba(52,211,153,0.5),0_6px_30px_rgba(52,211,153,0.3)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300',
    secondary:
      'border border-white/[0.12] bg-white/[0.05] text-slate-200 backdrop-blur-sm hover:bg-white/[0.09] hover:border-white/20 hover:text-white active:scale-[0.97]',
    ghost:
      'text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/[0.07] active:scale-[0.97]',
    danger:
      'border border-red-500/20 bg-red-500/[0.06] text-red-400 hover:bg-red-500/[0.12] hover:border-red-500/30 active:scale-[0.97]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-[0.9375rem]',
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (Tag === 'a') {
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && (
        <svg className="animate-spin -ml-0.5 mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
