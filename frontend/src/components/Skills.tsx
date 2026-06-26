import { useState, useEffect } from 'react';
import { Loader2, Code2, Globe, Database, Network, type LucideIcon } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { apiFetch } from '../lib/api';

// ── API contract — matches SkillGroupSerializer exactly ──────────────────
interface SkillItem {
  id: number;
  name: string;
}

interface SkillGroupData {
  id: number;
  label: string;       // serializer: category (display value)
  icon_name: string;   // e.g. "Code2", "Globe", "Database", "Network"
  tags: string[];      // flat array — ["Python", "Django", ...]
  skills: SkillItem[]; // object array — [{ id:1, name:"Python" }, ...]
}

// ── Static icon map (Lucide components keyed by name string) ─────────────
const ICON_MAP: Record<string, LucideIcon> = {
  Code2,
  Globe,
  Database,
  Network,
};

// ── Per-category accent tokens ────────────────────────────────────────────
// Color mapping: Backend → emerald, Frontend → blue, Database → purple, Core → teal

interface AccentTokens {
  // Card gradient overlay
  gradFrom:    string;
  gradTo:      string;
  // Card hover: border + under-glow
  hoverBorder: string;
  hoverShadow: string;
  // Icon wrapper bg + border + hover glow
  iconBg:      string;
  iconBorder:  string;
  iconHover:   string;
  // Icon color
  iconColor:   string;
  // Tag hover tint
  tagHover:    string;
  // Label drop-shadow color (for CSS filter)
  labelShadow: string;
  // Dot/bar color (replaces text- → bg-)
  dotColor:    string;
}

const ACCENT: Record<string, AccentTokens> = {
  Backend: {
    gradFrom:    'from-emerald-500/[0.09]',
    gradTo:      'to-teal-500/[0.04]',
    hoverBorder: 'hover:border-emerald-500/[0.32]',
    hoverShadow: 'hover:shadow-[0_2px_8px_rgba(0,0,0,0.45),0_8px_32px_rgba(0,0,0,0.35),0_0_32px_rgba(52,211,153,0.14)]',
    iconBg:      'from-emerald-500/20 to-teal-500/10',
    iconBorder:  'border-emerald-500/[0.18]',
    iconHover:   'group-hover:border-emerald-500/40 group-hover:shadow-[0_0_16px_rgba(52,211,153,0.25)]',
    iconColor:   'text-emerald-400',
    tagHover:    'group-hover:border-emerald-500/30 group-hover:text-emerald-200 group-hover:bg-emerald-500/[0.07]',
    labelShadow: 'drop-shadow-[0_2px_8px_rgba(52,211,153,0.5)]',
    dotColor:    'bg-emerald-400',
  },
  Frontend: {
    gradFrom:    'from-blue-500/[0.09]',
    gradTo:      'to-cyan-500/[0.04]',
    hoverBorder: 'hover:border-blue-500/[0.32]',
    hoverShadow: 'hover:shadow-[0_2px_8px_rgba(0,0,0,0.45),0_8px_32px_rgba(0,0,0,0.35),0_0_32px_rgba(96,165,250,0.14)]',
    iconBg:      'from-blue-500/20 to-cyan-500/10',
    iconBorder:  'border-blue-500/[0.18]',
    iconHover:   'group-hover:border-blue-500/40 group-hover:shadow-[0_0_16px_rgba(96,165,250,0.25)]',
    iconColor:   'text-blue-400',
    tagHover:    'group-hover:border-blue-500/30 group-hover:text-blue-200 group-hover:bg-blue-500/[0.07]',
    labelShadow: 'drop-shadow-[0_2px_8px_rgba(96,165,250,0.5)]',
    dotColor:    'bg-blue-400',
  },
  Database: {
    gradFrom:    'from-purple-500/[0.09]',
    gradTo:      'to-violet-500/[0.04]',
    hoverBorder: 'hover:border-purple-500/[0.32]',
    hoverShadow: 'hover:shadow-[0_2px_8px_rgba(0,0,0,0.45),0_8px_32px_rgba(0,0,0,0.35),0_0_32px_rgba(168,85,247,0.14)]',
    iconBg:      'from-purple-500/20 to-violet-500/10',
    iconBorder:  'border-purple-500/[0.18]',
    iconHover:   'group-hover:border-purple-500/40 group-hover:shadow-[0_0_16px_rgba(168,85,247,0.25)]',
    iconColor:   'text-purple-400',
    tagHover:    'group-hover:border-purple-500/30 group-hover:text-purple-200 group-hover:bg-purple-500/[0.07]',
    labelShadow: 'drop-shadow-[0_2px_8px_rgba(168,85,247,0.5)]',
    dotColor:    'bg-purple-400',
  },
  'Core & Networking': {
    gradFrom:    'from-teal-500/[0.09]',
    gradTo:      'to-cyan-500/[0.04]',
    hoverBorder: 'hover:border-teal-500/[0.32]',
    hoverShadow: 'hover:shadow-[0_2px_8px_rgba(0,0,0,0.45),0_8px_32px_rgba(0,0,0,0.35),0_0_32px_rgba(45,212,191,0.14)]',
    iconBg:      'from-teal-500/20 to-cyan-500/10',
    iconBorder:  'border-teal-500/[0.18]',
    iconHover:   'group-hover:border-teal-500/40 group-hover:shadow-[0_0_16px_rgba(45,212,191,0.25)]',
    iconColor:   'text-teal-400',
    tagHover:    'group-hover:border-teal-500/30 group-hover:text-teal-200 group-hover:bg-teal-500/[0.07]',
    labelShadow: 'drop-shadow-[0_2px_8px_rgba(45,212,191,0.5)]',
    dotColor:    'bg-teal-400',
  },
};

const FALLBACK_ACCENT = ACCENT['Backend'];

function getAccent(label: string): AccentTokens {
  return ACCENT[label] ?? FALLBACK_ACCENT;
}

export function Skills() {
  const [skillGroups, setSkillGroups] = useState<SkillGroupData[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState<string | null>(null);

  useEffect(() => {
    apiFetch<SkillGroupData[]>('/api/skills/')
      .then(data => { setSkillGroups(data); setLoading(false); })
      .catch(err  => { setError(err.message); setLoading(false); });
  }, []);

  return (
    <section id="skills" className="py-24 lg:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(16,185,129,0.05),transparent)]"
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <SectionHeading
          label="Technical Skills"
          title="What I Build With"
          subtitle="A focused, production-proven stack — chosen for impact, not résumé length."
          align="center"
        />

        {/* ── Loading ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            <p className="text-slate-400 text-sm animate-pulse">Loading tech stack…</p>
          </div>
        )}

        {/* ── Error ── */}
        {error && !loading && (
          <div className="text-center py-8 border border-emerald-500/10 rounded-2xl bg-emerald-500/[0.01] max-w-md mx-auto">
            <p className="text-sm font-medium text-emerald-400/80">Could not reach backend.</p>
            <p className="text-xs text-slate-500 mt-1">Ensure Django is running on port 8000.</p>
          </div>
        )}

        {/* ── Grid ── */}
        {!loading && !error && (
          <div className="reveal-children grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skillGroups.map(group => {
              const label = group.label;
              const acc   = getAccent(label);
              const Icon: LucideIcon = ICON_MAP[group.icon_name] ?? Code2;

              return (
                <div
                  key={group.id}
                  className={[
                    'card-shimmer group relative rounded-2xl overflow-hidden',
                    // Background: exact token + gradient overlay
                    `bg-slate-900/80 bg-gradient-to-br ${acc.gradFrom} ${acc.gradTo}`,
                    // Border: exact token
                    'border border-white/[0.12]',
                    'backdrop-blur-xl',
                    // Base shadow
                    'shadow-[0_2px_8px_rgba(0,0,0,0.4),0_8px_32px_rgba(0,0,0,0.3)]',
                    'p-6 flex flex-col gap-5',
                    // Hover: translate + scale (exact spec: -y-3 + 1.02)
                    'transition-all duration-300',
                    'hover:-translate-y-3 hover:scale-[1.02]',
                    'cursor-default',
                    acc.hoverBorder,
                    acc.hoverShadow,
                  ].join(' ')}
                >
                  {/* Top shimmer line */}
                  <div className="absolute top-0 left-4 right-4 h-px
                    bg-gradient-to-r from-transparent via-white/10 to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* ── Header ── */}
                  <div className="flex items-center gap-3">
                    {/* Icon wrapper with per-category accent */}
                    <div
                      className={[
                        'p-2.5 rounded-xl bg-gradient-to-br border',
                        acc.iconBg,
                        acc.iconBorder,
                        acc.iconHover,
                        'transition-all duration-300',
                      ].join(' ')}
                    >
                      <Icon
                        size={18}
                        className={`${acc.iconColor} group-hover:scale-110 transition-transform duration-300`}
                        aria-hidden
                      />
                    </div>

                    {/* Label: drop-shadow for readability against bg-slate-900/80 */}
                    <span
                      className={[
                        'font-bold text-white text-[0.9375rem] tracking-tight',
                        acc.labelShadow,
                      ].join(' ')}
                    >
                      {label}
                    </span>
                  </div>

                  {/* ── Tags (flat string array from serializer) ── */}
                  <div className="flex flex-wrap gap-2">
                    {group.tags.map((tag, i) => (
                      <span
                        key={tag}
                        className={[
                          'inline-flex items-center px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-lg',
                          'bg-slate-800/70 text-slate-400 border border-white/[0.06]',
                          'transition-all duration-200',
                          acc.tagHover,
                        ].join(' ')}
                        style={{ transitionDelay: `${i * 25}ms` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* ── Skill count bars ── */}
                  <div className="flex items-center gap-1.5 mt-auto">
                    <div className="flex gap-1">
                      {group.tags.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 rounded-full ${acc.dotColor} opacity-20 group-hover:opacity-60 transition-all duration-300`}
                          style={{
                            width: `${Math.max(8, 24 - i * 2)}px`,
                            transitionDelay: `${i * 40}ms`,
                          }}
                          aria-hidden
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-600 ml-auto font-medium">
                      {group.tags.length} skills
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
