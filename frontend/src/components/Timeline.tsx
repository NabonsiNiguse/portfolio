import { useRef, useEffect, useState } from 'react';
import { SectionHeading } from './ui/SectionHeading';
import { EXPERIENCE_DATA, type ExperienceData } from '../data/content';

// ── Per-step color tokens ─────────────────────────────────────────────────
const STEP_COLORS = [
  { dot: 'bg-slate-400',   shadow: 'shadow-[0_0_12px_rgba(148,163,184,0.6)]', line: 'from-slate-400/50',   chip: 'text-slate-300 bg-slate-400/10 border-slate-400/25'   },
  { dot: 'bg-blue-400',    shadow: 'shadow-[0_0_12px_rgba(96,165,250,0.7)]',  line: 'from-blue-400/50',    chip: 'text-blue-300 bg-blue-400/10 border-blue-400/25'       },
  { dot: 'bg-violet-400',  shadow: 'shadow-[0_0_12px_rgba(167,139,250,0.7)]', line: 'from-violet-400/50',  chip: 'text-violet-300 bg-violet-400/10 border-violet-400/25' },
  { dot: 'bg-emerald-400', shadow: 'shadow-[0_0_12px_rgba(52,211,153,0.7)]',  line: 'from-emerald-400/50', chip: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/25' },
  { dot: 'bg-teal-400',    shadow: 'shadow-[0_0_12px_rgba(45,212,191,0.75)]', line: 'from-teal-400/50',    chip: 'text-teal-300 bg-teal-400/10 border-teal-400/25'       },
] as const;

type StepColor = (typeof STEP_COLORS)[number];

// ── Intersection helper ───────────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Root ─────────────────────────────────────────────────────────────────
export function Timeline() {
  const { ref: lineRef, inView: lineInView } = useInView(0.08);

  return (
    <section id="experience" className="py-24 lg:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(16,185,129,0.03),transparent)]"
        aria-hidden
      />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
        <SectionHeading
          label="Experience & Growth"
          title="The Journey So Far"
          subtitle="From first commit to certified, remote-ready engineer."
          align="center"
        />

        <div className="relative" ref={lineRef}>
          {/* Animated vertical spine */}
          <div
            className="absolute left-[7px] md:left-1/2 md:-translate-x-px top-0 w-px
              bg-gradient-to-b from-emerald-500/60 via-blue-500/30 via-violet-500/20 to-transparent
              transition-all duration-[1200ms] ease-out"
            style={{ height: lineInView ? '100%' : '0%' }}
            aria-hidden
          />

          <div className="space-y-10">
            {EXPERIENCE_DATA.map((entry, index) => (
              <TimelineCard
                key={entry.id}
                entry={entry}
                isRight={index % 2 === 0}
                index={index}
                lineInView={lineInView}
                colors={STEP_COLORS[index % STEP_COLORS.length]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Individual card ───────────────────────────────────────────────────────
function TimelineCard({
  entry, isRight, index, lineInView, colors,
}: {
  entry: ExperienceData;
  isRight: boolean;
  index: number;
  lineInView: boolean;
  colors: StepColor;
}) {
  const { ref, inView } = useInView(0.25);

  return (
    <div
      ref={ref}
      className={[
        'relative flex items-start gap-6 md:gap-0 transition-all duration-700 ease-out',
        isRight ? 'md:flex-row-reverse' : 'md:flex-row',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      ].join(' ')}
      style={{ transitionDelay: `${index * 110}ms` }}
    >
      {/* Dot */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-4 z-10">
        <div
          className={[
            'tl-dot relative w-3.5 h-3.5 rounded-full border-2 border-[#080C12] transition-all duration-500',
            lineInView ? `${colors.dot} ${colors.shadow} animate-pulse` : 'bg-slate-800',
          ].join(' ')}
          style={{ transitionDelay: `${index * 140 + 300}ms` }}
        />
      </div>

      {/* Spacer */}
      <div className="hidden md:block md:w-1/2" aria-hidden />

      {/* Card */}
      <div className={`ml-8 md:ml-0 md:w-1/2 ${isRight ? 'md:pr-10' : 'md:pl-10'}`}>
        <div className={[
          'group relative rounded-xl overflow-hidden',
          'bg-slate-900/80 border border-white/[0.12] backdrop-blur-sm',
          'shadow-[0_2px_6px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3)] p-5',
          'transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01]',
          'hover:border-emerald-400/[0.28] hover:shadow-[0_0_30px_rgba(52,211,153,0.2)]',
        ].join(' ')}>
          {/* Corner accent lines */}
          <div className={`absolute top-0 left-0 w-12 h-px bg-gradient-to-r ${colors.line} to-transparent`} />
          <div className={`absolute top-0 left-0 w-px h-12 bg-gradient-to-b ${colors.line} to-transparent`} />

          {/* Year chip */}
          <span
            className={[
              'inline-block text-[10px] font-black tracking-[0.22em] uppercase mb-2.5 px-2.5 py-0.5 rounded-full border',
              'transition-all duration-500',
              lineInView ? colors.chip : 'text-slate-600 bg-slate-800/40 border-white/[0.05]',
            ].join(' ')}
            style={{ transitionDelay: `${index * 140 + 400}ms` }}
          >
            {entry.year}
          </span>

          {/* Title */}
          <h3 className="text-white font-bold text-base mb-1 leading-snug tracking-tight
            group-hover:text-emerald-50 transition-colors duration-200">
            {entry.title}
          </h3>

          {/* Company */}
          {entry.company && (
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
              {entry.company}
            </p>
          )}

          {/* Description */}
          <p className="text-slate-200 text-[0.8125rem] leading-relaxed
            group-hover:text-slate-100 transition-colors duration-200">
            {entry.description}
          </p>
        </div>
      </div>
    </div>
  );
}
