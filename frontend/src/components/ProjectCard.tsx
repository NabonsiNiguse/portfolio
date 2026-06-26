import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';

// ── API contract — matches ProjectSerializer exactly ─────────────────────
export interface ProjectApiData {
  id?: number;
  title: string;
  summary: string;
  stack: string[];      // serializer SerializerMethodField: parsed from tags
  highlights: string[]; // serializer SerializerMethodField: parsed from bullet_points
  githubUrl: string | null;
  demoUrl: string | null;
  image?: string | null;
}

interface ProjectCardProps {
  project: ProjectApiData;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <article
      className={[
        // ── Structure ──
        'card-shimmer group relative flex flex-col h-full rounded-2xl overflow-hidden',
        // ── Background & border (exact tokens) ──
        'bg-slate-900/85 border border-white/[0.12] backdrop-blur-xl',
        // ── Base shadow stack (exact spec) ──
        'shadow-[0_2px_6px_rgba(0,0,0,0.4),0_8px_30px_rgba(0,0,0,0.35)]',
        'p-7 gap-5',
        // ── Hover: translate + scale (exact spec) + emerald under-glow ──
        'transition-all duration-300',
        'hover:-translate-y-3 hover:scale-[1.01]',
        'hover:border-emerald-400/[0.35]',
        'hover:shadow-[0_2px_6px_rgba(0,0,0,0.4),0_8px_30px_rgba(0,0,0,0.35),0_0_40px_rgba(52,211,153,0.18)]',
      ].join(' ')}
      style={{ transitionDelay: `${index * 55}ms` }}
    >
      {/* ── Top glow line (emerald on hover) ── */}
      <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl
        bg-gradient-to-r from-transparent via-emerald-500/0 to-transparent
        group-hover:via-emerald-400/45 transition-all duration-500" />

      {/* ── Corner accent lines ── */}
      <div className="absolute top-0 left-0 w-16 h-px
        bg-gradient-to-r from-emerald-400/40 to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 left-0 w-px h-16
        bg-gradient-to-b from-emerald-400/40 to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* ── Index watermark ── */}
      <span
        className="absolute top-4 right-5 text-5xl font-black text-white/[0.025]
          select-none pointer-events-none leading-none"
        aria-hidden
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* ── Header ── */}
      <div className="relative flex flex-col gap-2.5">
        <div className="flex items-start justify-between gap-3">
          {/* Title: drop-shadow on hover (exact spec) */}
          <h3
            className={[
              'text-lg font-bold text-white leading-snug tracking-tight pr-4',
              'transition-all duration-200',
              'group-hover:drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]',
            ].join(' ')}
          >
            {project.title}
          </h3>
          {/* Active dot */}
          <div className="flex-shrink-0 w-2 h-2 mt-1.5 rounded-full bg-emerald-400
            opacity-0 group-hover:opacity-100 transition-all duration-300
            shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
        </div>

        {/* Summary: text-slate-200 at rest → text-slate-100 on hover (exact spec) */}
        <p className="text-slate-200 text-sm leading-relaxed transition-colors duration-200 group-hover:text-slate-100">
          {project.summary}
        </p>
      </div>

      {/* ── Stack tags ── */}
      <div className="relative flex flex-wrap gap-1.5">
        {project.stack.map((tech, i) => (
          <span
            key={tech}
            className="inline-flex items-center px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-lg
              bg-slate-800/80 text-slate-400 border border-white/[0.06]
              transition-all duration-200
              group-hover:border-slate-500/40 group-hover:text-slate-300"
            style={{ transitionDelay: `${i * 18}ms` }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* ── Highlights ── */}
      <ul className="relative space-y-2 flex-1">
        {project.highlights.map((item, i) => (
          <li
            key={item}
            className="flex gap-2.5 text-[0.8125rem] text-slate-300 leading-relaxed
              transition-colors duration-200 group-hover:text-slate-100"
            style={{ transitionDelay: `${i * 22}ms` }}
          >
            <span className="mt-[7px] flex-shrink-0 w-1.5 h-1.5 rounded-full
              bg-emerald-500/40 group-hover:bg-emerald-400 transition-all duration-300" />
            {item}
          </li>
        ))}
      </ul>

      {/* ── Actions ── */}
      <div className="relative flex gap-2.5 pt-4 border-t border-white/[0.06]">
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg
              border border-white/[0.1] bg-white/[0.04] text-slate-300
              hover:bg-white/[0.08] hover:border-white/20 hover:text-white
              transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <Github size={13} aria-hidden />
            GitHub
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg
            border border-white/[0.04] text-slate-700 cursor-default select-none">
            <Github size={13} aria-hidden />
            Private
          </span>
        )}

        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg
              bg-gradient-to-r from-emerald-500/15 to-blue-500/10
              text-emerald-400 border border-emerald-500/[0.22]
              hover:from-emerald-500/22 hover:to-blue-500/15
              hover:border-emerald-500/35 hover:text-emerald-300
              transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <ExternalLink size={13} aria-hidden />
            Live Demo
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg
            border border-white/[0.04] text-slate-700 cursor-default select-none">
            <ArrowUpRight size={13} aria-hidden />
            Demo soon
          </span>
        )}
      </div>
    </article>
  );
}
