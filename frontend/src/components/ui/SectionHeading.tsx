interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ label, title, subtitle, align = 'center' }: SectionHeadingProps) {
  const isCentered = align === 'center';
  return (
    <div className={`flex flex-col gap-4 mb-16 ${isCentered ? 'text-center items-center' : 'items-start'}`}>
      {/* Label chip */}
      <div className={`flex items-center gap-2.5 ${isCentered ? 'justify-center' : ''}`}>
        {!isCentered && <div className="w-6 h-px bg-gradient-to-r from-emerald-400 to-blue-500 flex-shrink-0" />}
        <span className="text-[11px] font-bold tracking-[0.28em] uppercase text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07]">
          {label}
        </span>
        {isCentered && <div className="w-6 h-px bg-gradient-to-r from-emerald-400 to-blue-500 flex-shrink-0" />}
      </div>

      {/* Title */}
      <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-[1.12] tracking-tight drop-shadow-[0_2px_20px_rgba(255,255,255,0.1)]">
        {title}
      </h2>

      {/* Accent line */}
      <div className={`section-line ${isCentered ? 'mx-auto' : ''}`} />

      {/* Subtitle */}
      {subtitle && (
        <p className={`text-slate-200 text-base md:text-lg leading-relaxed mt-1 ${isCentered ? 'max-w-xl' : 'max-w-2xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
