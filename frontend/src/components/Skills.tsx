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

// ── Static icon map (Lucide components by name string) ───────────────────
const ICON_MAP: Record<string, LucideIcon> = {
  Code2:    Code2,
  Globe:    Globe,
  Database: Database,
  Network:  Network,
};

// ── Per-category accent tokens ────────────────────────────────────────────
const CARD_ACCENT: Record<string, { from: string; to: string; border: string; ring: string }> = {
  Backend:             { from: 'from-emerald-500/12', to: 'to-teal-500/6',   border: 'group-hover:border-emerald-500/30', ring: 'group-hover:shadow-[0_8px_32px_rgba(52,211,153,0.1)]' },
  Frontend:            { from: 'from-blue-500/12',    to: 'to-cyan-500/6',   border: 'group-hover:border-blue-500/30',   ring: 'group-hover:shadow-[0_8px_32px_rgba(96,165,250,0.1)]' },
  Database:            { from: 'from-violet-500/12',  to: 'to-blue-500/6',   border: 'group-hover:border-violet-500/30', ring: 'group-hover:shadow-[0_8px_32px_rgba(139,92,246,0.1)]' },
  'Core & Networking': { from: 'from-amber-500/10',   to: 'to-orange-500/5', border: 'group-hover:border-amber-500/25',  ring: 'group-hover:shadow-[0_8px_32px_rgba(245,158,11,0.08)]' },
};

const ICON_ACCENT: Record<string, string> = {
  Backend:             'from-emerald-500/20 to-teal-500/10 border-emerald-500/15 group-hover:border-emerald-500/35 group-hover:shadow-[0_0_16px_rgba(52,211,153,0.2)]',
  Frontend:            'from-blue-500/20 to-cyan-500/10 border-blue-500/15 group-hover:border-blue-500/35 group-hover:shadow-[0_0_16px_rgba(96,165,250,0.2)]',
  Database:            'from-violet-500/20 to-blue-500/10 border-violet-500/15 group-hover:border-violet-500/35 group-hover:shadow-[0_0_16px_rgba(139,92,246,0.18)]',
  'Core & Networking': 'from-amber-500/18 to-orange-500/8 border-amber-500/12 group-hover:border-amber-500/30 group-hover:shadow-[0_0_16px_rgba(245,158,11,0.14)]',
};

const ICON_COLOR: Record<string, string> = {
  Backend:             'text-emerald-400',
  Frontend:            'text-blue-400',
  Database:            'text-violet-400',
  'Core & Networking': 'text-amber-400',
};

const TAG_ACCENT: Record<string, string> = {
  Backend:             'group-hover:border-emerald-500/30 group-hover:text-emerald-200 group-hover:bg-emerald-500/[0.06]',
  Frontend:            'group-hover:border-blue-500/30 group-hover:text-blue-200 group-hover:bg-blue-500/[0.06]',
  Database:            'group-hover:border-violet-500/30 group-hover:text-violet-200 group-hover:bg-violet-500/[0.06]',
  'Core & Networking': 'group-hover:border-amber-500/25 group-hover:text-amber-200 group-hover:bg-amber-500/[0.05]',
};

function fallback(map: Record<string, string>, key: string): string {
  return map[key] ?? map['Backend'];
}

export function Skills() {
  const [skillGroups, setSkillGroups] = useState<SkillGroupData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    apiFetch<SkillGroupData[]>('/api/skills/')
      .then((data) => { setSkillGroups(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  return (
    <section id="skills" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(16,185,129,0.05),transparent)]" aria-hidden />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <SectionHeading
          label="Technical Skills"
          title="What I Build With"
          subtitle="A focused, production-proven stack — chosen for impact, not résumé length."
          align="center"
        />

        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            <p className="text-slate-400 text-sm animate-pulse">Loading tech stack…</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-8 border border-emerald-500/10 rounded-2xl bg-emerald-500/[0.01] max-w-md mx-auto">
            <p className="text-sm font-medium text-emerald-400/80">Could not reach backend.</p>
            <p className="text-xs text-slate-500 mt-1">Ensure Django is running on port 8000.</p>
          </div>
        )}

        {!loading && !error && (
          <div className="reveal-children grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skillGroups.map(group => {
              const label = group.label; // already the display value from serializer
              const acc   = CARD_ACCENT[label]  ?? CARD_ACCENT['Backend'];
              const iacc  = ICON_ACCENT[label]  ?? ICON_ACCENT['Backend'];
              const icol  = fallback(ICON_COLOR, label);
              const tacc  = fallback(TAG_ACCENT, label);
              // Resolve lucide icon from name, fall back to Code2
              const Icon: LucideIcon = ICON_MAP[group.icon_name] ?? Code2;

              return (
                <div
                  key={group.id}
                  className={`card-shimmer group relative rounded-2xl border border-white/[0.12]
                    bg-gradient-to-br ${acc.from} ${acc.to}
                    bg-slate-900/80 backdrop-blur-xl
                    shadow-[0_2px_8px_rgba(0,0,0,0.4),0_8px_32px_rgba(0,0,0,0.3)]
                    p-6 flex flex-col gap-5
                    transition-all duration-350 hover:-translate-y-3 hover:scale-[1.02] cursor-default
                    ${acc.border} ${acc.ring}`}
                >
                  <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${iacc} border transition-all duration-300`}>
                      <Icon size={18} className={`${icol} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <span className="font-bold text-white text-[0.9375rem] tracking-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.1)]">{label}</span>
                  </div>

                  {/* Tags — use `tags` (flat string array) for badges */}
                  <div className="flex flex-wrap gap-2">
                    {group.tags.map((tag, i) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-lg
                          bg-slate-800/70 text-slate-400 border border-white/[0.06]
                          transition-all duration-200 ${tacc}`}
                        style={{ transitionDelay: `${i * 25}ms` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Skill count bar */}
                  <div className="flex items-center gap-1.5 mt-auto">
                    <div className="flex gap-1">
                      {group.tags.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 rounded-full ${icol.replace('text-', 'bg-')} opacity-20 group-hover:opacity-60 transition-all duration-300`}
                          style={{ width: `${Math.max(8, 24 - i * 2)}px`, transitionDelay: `${i * 40}ms` }}
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
