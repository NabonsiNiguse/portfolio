import { CheckCircle2, MapPin, User } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { PROFILE, PERSONAL, portfolioPhoto } from '../data/content';

const STATS = [
  { value: '3+',  suffix: '',  label: 'Years Coding'    },
  { value: '4',   suffix: '',  label: 'Full-Stack Apps' },
  { value: '3',   suffix: '',  label: 'Verified Certs'  },
  { value: '100', suffix: '%', label: 'Remote Ready'    },
] as const;

const HIGHLIGHTS = [
  'Django REST APIs & Python Backend Development',
  'MERN Stack — MongoDB, Express, React, Node.js',
  'React + TypeScript SPA Architecture',
  'PostgreSQL & Relational Database Design',
] as const;

export function About() {
  const displayName  = PROFILE.name;
  const isAvailable  = PROFILE.is_available;
  const paragraphs   = PROFILE.bio;
  const initials     = displayName.split(' ').map(n => n[0]).join('').toUpperCase();
  const avatarSrc    = portfolioPhoto; // portfolio.png from assets

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

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* ── LEFT COLUMN: Photo + Stats ── */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start gap-6">

            {/* Compact square avatar card */}
            <div className="relative group mx-auto w-48 lg:w-56">
              <div className="absolute -inset-[2px] bg-gradient-to-br from-emerald-400 via-blue-500 to-violet-500
                rounded-2xl opacity-40 group-hover:opacity-70 blur-[3px] transition-all duration-500" />

              <div className="relative aspect-square rounded-2xl overflow-hidden
                border border-white/[0.15] bg-slate-900
                shadow-[0_4px_24px_rgba(0,0,0,0.5)]">

                {avatarSrc ? (
                  <img
                    src={avatarSrc}
                    alt={`${displayName} — profile photo`}
                    className="w-full h-full object-cover object-top
                      group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2
                    bg-gradient-to-br from-slate-800 to-slate-900">
                    <div className="p-4 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                      <User size={36} className="text-emerald-400" aria-hidden />
                    </div>
                    <span className="text-3xl font-black text-white select-none">{initials}</span>
                  </div>
                )}

                {/* Bottom vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                {/* Availability badge */}
                <div className="absolute bottom-3 left-3">
                  <span className={[
                    'inline-flex items-center gap-1 text-[9px] font-bold',
                    'px-2 py-1 rounded-md uppercase tracking-wider border backdrop-blur-sm',
                    isAvailable
                      ? 'bg-emerald-500/25 border-emerald-500/40 text-emerald-300'
                      : 'bg-slate-500/20 border-slate-500/30 text-slate-300',
                  ].join(' ')}>
                    <span className={`w-1 h-1 rounded-full ${isAvailable ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
                    {isAvailable ? 'Available' : 'Busy'}
                  </span>
                </div>
              </div>

              {/* Name + title beneath photo */}
              <div className="mt-3 text-center">
                <p className="text-white font-bold text-sm tracking-tight">{displayName}</p>
                <p className="text-slate-400 text-xs mt-0.5">Full-Stack Developer</p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-2.5 w-full">
              {STATS.map(({ value, suffix, label }) => (
                <div
                  key={label}
                  className={[
                    'group relative rounded-xl overflow-hidden',
                    'bg-slate-900/85 border border-white/[0.12] backdrop-blur-xl',
                    'shadow-[0_2px_6px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3)]',
                    'p-5 text-center transition-all duration-300',
                    'hover:-translate-y-2 hover:border-emerald-400/[0.32]',
                    'hover:shadow-[0_2px_6px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3),0_0_28px_rgba(52,211,153,0.18)]',
                  ].join(' ')}
                >
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

          {/* ── RIGHT COLUMN: Bio + Highlights + Location ── */}
          <div className="lg:col-span-8 flex flex-col gap-7">

            {/* Bio paragraphs */}
            <div className="space-y-5 group/bio">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={[
                    'text-slate-200 text-base leading-[1.9] font-normal',
                    'transition-colors duration-200 group-hover/bio:text-slate-100',
                    i === 0 ? 'text-[1.0625rem] font-medium' : '',
                  ].join(' ')}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Core competencies */}
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
                    <CheckCircle2
                      size={15}
                      className="text-emerald-400 flex-shrink-0
                        group-hover/item:scale-110
                        group-hover/item:drop-shadow-[0_0_6px_rgba(52,211,153,0.7)]
                        transition-all duration-200"
                      aria-hidden
                    />
                    <span className="text-slate-200 text-sm font-medium leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location card */}
            <div className={[
              'flex items-center gap-4 px-5 py-4 rounded-xl',
              'bg-slate-900/85 border border-white/[0.12] backdrop-blur-xl',
              'shadow-[0_2px_6px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3)]',
              'transition-all duration-300',
              'hover:border-emerald-500/[0.28]',
              'hover:shadow-[0_2px_6px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3),0_0_24px_rgba(52,211,153,0.16)]',
            ].join(' ')}>
              <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/[0.28]
                shadow-[0_0_16px_rgba(52,211,153,0.2)] flex-shrink-0">
                <MapPin size={16} className="text-emerald-400" aria-hidden />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.15em] font-bold mb-0.5">
                  Location
                </p>
                <p className="text-white text-sm font-semibold">
                  {PERSONAL.location}
                  <span className="text-slate-400 font-normal"> — Remote Worldwide</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
