import { useRef, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { apiFetch } from '../lib/api';

// ── API contract — matches ExperienceSerializer exactly ──────────────────
interface ExperienceData {
  id: number;
  year: string;        // e.g. "2024", "Now"
  title: string;       // serializer alias for model field "role"
  company: string;     // organisation / context
  description: string; // full narrative paragraph
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

const STEP_COLORS = [
  { dot: 'bg-slate-400',   glow: 'rgba(148,163,184,0.7)', line: 'from-slate-400/50' },
  { dot: 'bg-blue-400',    glow: 'rgba(96,165,250,0.8)',  line: 'from-blue-400/50' },
  { dot: 'bg-violet-400',  glow: 'rgba(167,139,250,0.8)', line: 'from-violet-400/50' },
  { dot: 'bg-emerald-400', glow: 'rgba(52,211,153,0.8)',  line: 'from-emerald-400/50' },
  { dot: 'bg-teal-400',    glow: 'rgba(45,212,191,0.9)',  line: 'from-teal-400/50' },
];

export function Timeline() {
  const { ref: lineRef, inView: lineInView } = useInView(0.08);
  const [entries, setEntries] = useState<ExperienceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    apiFetch<ExperienceData[]>('/api/experience/')
      .then((data) => { setEntries(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  return (
    <section id="experience" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(16,185,129,0.03),transparent)]" aria-hidden />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
        <SectionHeading
          label="Experience & Growth"
          title="The Journey So Far"
          subtitle="From first commit to certified, remote-ready engineer."
          align="center"
        />

        {loading && (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Loader2 className="w-7 h-7 text-blue-400 animate-spin" />
            <p className="text-slate-500 text-xs animate-pulse">Loading timeline…</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-6 border border-white/[0.05] rounded-xl bg-slate-900/20 max-w-xs mx-auto">
            <p className="text-xs text-slate-500">Timeline unavailable — backend unreachable.</p>
          </div>
        )}

        {!loading && !error && (
          <div className="relative" ref={lineRef}>
            <div
              className="absolute left-[7px] md:left-1/2 md:-translate-x-px top-0 w-px
                bg-gradient-to-b from-emerald-500/60 via-blue-500/30 via-violet-500/20 to-transparent
                transition-all duration-[1200ms] ease-out"
              style={{ height: lineInView ? '100%' : '0%' }}
              aria-hidden
            />

            <div className="space-y-10">
              {entries.map((entry, index) => (
                <TimelineEntry
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
        )}
      </div>
    </section>
  );
}

function TimelineEntry({
  entry,
  isRight,
  index,
  lineInView,
  colors,
}: {
  entry: ExperienceData;
  isRight: boolean;
  index: number;
  lineInView: boolean;
  colors: { dot: string; glow: string; line: string };
}) {
  const { ref, inView } = useInView(0.25);

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-6 md:gap-0 transition-all duration-700 ease-out
        ${isRight ? 'md:flex-row-reverse' : 'md:flex-row'}
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 110}ms` }}
    >
      {/* Dot */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-4 z-10">
        <div
          className={`tl-dot w-3.5 h-3.5 rounded-full border-2 border-[#080C12] transition-all duration-600
            ${lineInView ? `${colors.dot} shadow-[0_0_12px_${colors.glow}]` : 'bg-slate-800'}`}
          style={{ transitionDelay: `${index * 140 + 300}ms` }}
        />
      </div>

      {/* Spacer */}
      <div className="hidden md:block md:w-1/2" aria-hidden />

      {/* Card */}
      <div className={`ml-8 md:ml-0 md:w-1/2 ${isRight ? 'md:pr-10' : 'md:pl-10'}`}>
        <div className="group relative rounded-xl border border-white/[0.12] bg-slate-900/80 backdrop-blur-sm p-5 overflow-hidden hover:border-emerald-400/30 hover:bg-slate-900/90 hover:shadow-[0_0_30px_rgba(52,211,153,0.12)] transition-all duration-300">
          {/* Corner accent */}
          <div className={`absolute top-0 left-0 w-12 h-px bg-gradient-to-r ${colors.line} to-transparent`} />
          <div className={`absolute top-0 left-0 w-px h-12 bg-gradient-to-b ${colors.line} to-transparent`} />

          {/* Year chip */}
          <span
            className={`inline-block text-[10px] font-black tracking-[0.22em] uppercase mb-2.5 px-2.5 py-0.5 rounded-full
              transition-all duration-500
              ${lineInView
                ? `${colors.dot.replace('bg-', 'text-')} ${colors.dot.replace('bg-', 'bg-')}/10 border ${colors.dot.replace('bg-', 'border-')}/20`
                : 'text-slate-600 bg-slate-800/40 border border-white/5'}`}
            style={{ transitionDelay: `${index * 140 + 400}ms` }}
          >
            {entry.year}
          </span>

          {/* Title (serializer alias of model "role") */}
          <h3 className="text-white font-bold text-base mb-1 leading-snug tracking-tight group-hover:text-emerald-50 transition-colors">
            {entry.title}
          </h3>

          {/* Company / context */}
          {entry.company && (
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
              {entry.company}
            </p>
          )}

          {/* Description */}
          <p className="text-slate-200 text-[0.8125rem] leading-relaxed group-hover:text-slate-100 transition-colors">
            {entry.description}
          </p>
        </div>
      </div>
    </div>
  );
}
