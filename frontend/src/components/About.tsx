import { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, MapPin, User } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import heroImg from '../assets/hero.png';
import { apiFetch } from '../lib/api';

// ── API contract — matches ProfileSerializer exactly ─────────────────────
interface ProfileData {
  id: number;
  name: string;
  title: string;
  bio_paragraphs: string; // newline-separated paragraphs
  avatar: string | null;  // absolute URL or null
  is_available: boolean;
}

const STATS = [
  { value: '3+',  suffix: '',  label: 'Years Coding'    },
  { value: '4',   suffix: '',  label: 'Full-Stack Apps' },
  { value: '2',   suffix: '',  label: 'Verified Certs'  },
  { value: '100', suffix: '%', label: 'Remote Ready'    },
] as const;

const HIGHLIGHTS = [
  'Production-grade Django REST APIs',
  'React + TypeScript SPA Architecture',
  'PostgreSQL & Relational Database Design',
  'Secure API Authentication & Optimization',
] as const;

// Shown while backend is unreachable or profile not yet created
const FALLBACK_PARAGRAPHS = [
  `I am a dedicated Full-Stack Software Engineer and Computer Science student based in Bale Robe, Ethiopia. By balancing academic depth with self-directed execution, I specialise in architecting secure, high-performance web applications from database schema design to clean user interfaces.`,
  `My core expertise lies in backend development using Django and Django REST Framework, where I engineer production-grade REST APIs, custom authentication workflows, and robust relational models with PostgreSQL.`,
  `Driven by clean architecture and continuous growth, I bridge business logic and user experience — writing production-ready code optimised for security, scalability, and international remote engineering roles.`,
];

export function About() {
  const [profile,     setProfile]     = useState<ProfileData | null>(null);
  const [loading,     setLoading]     = useState(true);
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    apiFetch<ProfileData[]>('/api/profile/')
      .then(data => {
        if (data.length > 0) setProfile(data[0]);
        setLoading(false);
      })
      .catch(() => {
        setFetchFailed(true);
        setLoading(false);
      });
  }, []);

  const paragraphs = profile?.bio_paragraphs
    ? profile.bio_paragraphs.split('\n').filter(p => p.trim())
    : FALLBACK_PARAGRAPHS;

  // Use API avatar → local hero image → initials fallback
  const avatarSrc  = profile?.avatar ?? heroImg;
  const displayName = profile?.name ?? 'Nabonsi Niguse';
  const initials    = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase();
  const isAvailable = profile?.is_available ?? true;

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_50%,rgba(16,185,129,0.05),transparent)]"
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <SectionHeading
          label="About Me"
          title="Engineering with Purpose"
          subtitle="Background, technical philosophy, and what drives the work."
          align="center"
        />

        {/* ── Loading ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            <p className="text-slate-400 text-sm animate-pulse">Loading profile…</p>
          </div>
        )}

        {!loading && (
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* ────────────── LEFT COLUMN: Photo + Stats ─────────────── */}
            <div className="lg:col-span-5 space-y-6">

              {/* ── Profile photo frame ── */}
              <div className="relative group mx-auto max-w-[340px] lg:max-w-none">
                {/* Animated gradient border glow */}
                <div className="absolute -inset-[3px] bg-gradient-to-br from-emerald-400 via-blue-500 to-violet-500
                  rounded-2xl opacity-30 group-hover:opacity-60 blur-[6px] transition-all duration-500" />
                <div className="absolute -inset-[1.5px] bg-gradient-to-br from-emerald-400 via-blue-500 to-violet-500
                  rounded-2xl opacity-50 group-hover:opacity-80 transition-all duration-500" />

                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden
                  border border-white/[0.15] bg-slate-900
                  shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_80px_rgba(52,211,153,0.08)]">

                  {avatarSrc ? (
                    <img
                      src={avatarSrc}
                      alt={`${displayName} — portfolio photo`}
                      className="w-full h-full object-cover object-center
                        group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4
                      bg-gradient-to-br from-slate-800 via-slate-900 to-slate-900">
                      <div className="p-6 rounded-full bg-emerald-500/15 border-2 border-emerald-500/30">
                        <User size={56} className="text-emerald-400" aria-hidden />
                      </div>
                      <span className="text-5xl font-black text-white tracking-tight select-none">
                        {initials}
                      </span>
                      <p className="text-slate-400 text-sm font-medium">Add photo in Admin panel</p>
                    </div>
                  )}

                  {/* Bottom vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Overlay badges */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className={[
                      'inline-flex items-center gap-1.5 text-[10px] font-bold',
                      'px-2.5 py-1.5 rounded-lg uppercase tracking-wider border backdrop-blur-sm',
                      isAvailable
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.3)]'
                        : 'bg-slate-500/20 border-slate-500/30 text-slate-300',
                    ].join(' ')}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
                      {isAvailable ? 'Available for Hire' : 'Currently Busy'}
                    </span>
                    <span className="text-[9px] text-white/60 font-mono tracking-widest
                      px-2 py-1 rounded-md bg-white/[0.08] border border-white/[0.12] backdrop-blur-sm">
                      REMOTE
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Stats grid ──────────────────────────────────────────
                  bg-slate-900/85 | border-white/[0.12] | emerald under-glow
              ──────────────────────────────────────────────────────── */}
              <div className="grid grid-cols-2 gap-3">
                {STATS.map(({ value, suffix, label }) => (
                  <div
                    key={label}
                    className={[
                      'group relative rounded-xl overflow-hidden',
                      // Exact spec tokens
                      'bg-slate-900/85 border border-white/[0.12]',
                      'backdrop-blur-xl',
                      // Base shadow
                      'shadow-[0_2px_6px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3)]',
                      'p-5 text-center',
                      // Hover: lift + emerald under-glow (exact spec)
                      'transition-all duration-300',
                      'hover:-translate-y-2',
                      'hover:border-emerald-400/[0.32]',
                      'hover:shadow-[0_2px_6px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3),0_0_28px_rgba(52,211,153,0.18)]',
                    ].join(' ')}
                  >
                    {/* Top shimmer on hover */}
                    <div className="absolute top-0 left-0 right-0 h-px
                      bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="stat-value text-3xl font-black mb-1">
                      {value}<span className="text-xl">{suffix}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 tracking-[0.14em] uppercase font-bold">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ────────────── RIGHT COLUMN: Bio + Highlights + Location ── */}
            <div className="lg:col-span-7 flex flex-col gap-7">

              {/* API fallback notice */}
              {fetchFailed && (
                <p className="text-[11px] text-slate-500 italic px-3 py-2 rounded-lg
                  bg-white/[0.03] border border-white/[0.06]">
                  Showing cached bio — add your profile in Django Admin to override.
                </p>
              )}

              {/* ── Bio text ────────────────────────────────────────────
                  text-slate-200 at rest → text-slate-100 on hover
                  (group applied to the wrapping div so all paragraphs shift)
              ──────────────────────────────────────────────────────── */}
              <div className="space-y-5 group/bio">
                {paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className={[
                      // text-slate-200 at rest → text-slate-100 on hover
                      'text-slate-200 text-base leading-[1.9] font-normal',
                      'transition-colors duration-200 group-hover/bio:text-slate-100',
                      // First paragraph gets slightly larger + brighter treatment
                      i === 0 ? 'text-[1.0625rem] font-medium' : '',
                    ].join(' ')}
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* ── Highlights ──────────────────────────────────────────
                  CheckCircle2 icon: text-emerald-400 (high contrast,
                  not a low-contrast default). Hover glow on icon.
              ──────────────────────────────────────────────────────── */}
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.16em] mb-4">
                  Core Competencies
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {HIGHLIGHTS.map(item => (
                    <div
                      key={item}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl
                        border border-white/[0.08] bg-white/[0.03]
                        hover:bg-white/[0.06] hover:border-emerald-500/[0.22]
                        transition-all duration-200 group/item"
                    >
                      {/* High-contrast emerald icon (exact spec) */}
                      <CheckCircle2
                        size={15}
                        className="text-emerald-400 flex-shrink-0
                          group-hover/item:scale-110
                          group-hover/item:drop-shadow-[0_0_6px_rgba(52,211,153,0.7)]
                          transition-all duration-200"
                        aria-hidden
                      />
                      <span className="text-slate-200 text-sm font-medium leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Location card ───────────────────────────────────────
                  Same enhanced border + shadow treatment as stats cards.
              ──────────────────────────────────────────────────────── */}
              <div
                className={[
                  'flex items-center gap-4 px-5 py-4 rounded-xl',
                  // Exact spec: same border + bg as stats cards
                  'bg-slate-900/85 border border-white/[0.12]',
                  'backdrop-blur-xl',
                  // Matching shadow stack
                  'shadow-[0_2px_6px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3)]',
                  // Hover: emerald glow
                  'transition-all duration-300',
                  'hover:border-emerald-500/[0.28]',
                  'hover:shadow-[0_2px_6px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3),0_0_24px_rgba(52,211,153,0.16)]',
                ].join(' ')}
              >
                <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/[0.28]
                  shadow-[0_0_16px_rgba(52,211,153,0.2)] flex-shrink-0">
                  <MapPin size={16} className="text-emerald-400" aria-hidden />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.15em] font-bold mb-0.5">
                    Location
                  </p>
                  <p className="text-white text-sm font-semibold">
                    Bale Robe, Ethiopia
                    <span className="text-slate-400 font-normal"> — Remote Worldwide</span>
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </section>
  );
}
