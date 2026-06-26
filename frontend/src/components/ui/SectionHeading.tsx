interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
}: SectionHeadingProps) {
  const isCentered = align === 'center';

  return (
    <div
      className={[
        'flex flex-col gap-4 mb-16',
        isCentered ? 'text-center items-center' : 'items-start',
      ].join(' ')}
    >
      {/* ── Label chip ───────────────────────────────────────────
          Solid legibility: opaque-enough bg, crisp border,
          high-contrast text (emerald-400 on dark bg).
      ──────────────────────────────────────────────────────── */}
      <div
        className={[
          'flex items-center gap-2.5',
          isCentered ? 'justify-center' : '',
        ].join(' ')}
      >
        {!isCentered && (
          <div className="w-6 h-px bg-gradient-to-r from-emerald-400 to-blue-500 flex-shrink-0" />
        )}

        <span
          className={[
            'text-[11px] font-bold tracking-[0.28em] uppercase',
            'text-emerald-400',
            // Solid bg + visible border — no transparency tricks that kill legibility
            'px-3 py-1 rounded-full',
            'bg-emerald-500/[0.10] border border-white/[0.12]',
          ].join(' ')}
        >
          {label}
        </span>

        {isCentered && (
          <div className="w-6 h-px bg-gradient-to-r from-emerald-400 to-blue-500 flex-shrink-0" />
        )}
      </div>

      {/* ── Main title ───────────────────────────────────────────
          drop-shadow adds soft luminance halo for depth.
      ──────────────────────────────────────────────────────── */}
      <h2
        className={[
          'text-3xl md:text-4xl lg:text-[2.75rem]',
          'font-bold text-white leading-[1.12] tracking-tight',
          'drop-shadow-[0_2px_20px_rgba(255,255,255,0.12)]',
        ].join(' ')}
      >
        {title}
      </h2>

      {/* ── Accent line ─────────────────────────────────────────── */}
      <div className={`section-line ${isCentered ? 'mx-auto' : ''}`} />

      {/* ── Subtitle ─────────────────────────────────────────────
          Exactly text-slate-200 as specified.
      ──────────────────────────────────────────────────────── */}
      {subtitle && (
        <p
          className={[
            'text-slate-200 text-base md:text-lg leading-relaxed mt-1',
            isCentered ? 'max-w-xl' : 'max-w-2xl',
          ].join(' ')}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
