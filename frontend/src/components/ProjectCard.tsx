import { ExternalLink, ArrowUpRight } from 'lucide-react';

// ── Inline GitHub mark — lucide-react removed the Github icon in v0.34x ──
function GitHubMark({ size = 14, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

// ── API contract — matches ProjectSerializer exactly ─────────────────────
export interface ProjectApiData {
  id?: number;
  title: string;
  summary: string;
  stack: string[];
  highlights: string[];
  githubUrl: string | null;
  demoUrl: string | null;
  image?: string | null;
}

interface ProjectCardProps {
  project: ProjectApiData;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  // Cap at 3 highlights — prevents card height from ballooning on verbose data
  const bullets = project.highlights.slice(0, 3);

  return (
    <article
      className={[
        'card-shimmer group relative flex flex-col rounded-2xl overflow-hidden',
        // Background & border
        'bg-slate-900/85 border border-white/[0.12] backdrop-blur-xl',
        // Shadow
        'shadow-[0_2px_6px_rgba(0,0,0,0.4),0_8px_30px_rgba(0,0,0,0.35)]',
        // No top padding — image sits flush to the top edge
        'gap-0',
        // Hover
        'transition-all duration-300',
        'hover:-translate-y-2 hover:scale-[1.01]',
        'hover:border-emerald-400/[0.35]',
        'hover:shadow-[0_2px_6px_rgba(0,0,0,0.4),0_8px_30px_rgba(0,0,0,0.35),0_0_36px_rgba(52,211,153,0.16)]',
      ].join(' ')}
      style={{ transitionDelay: `${index * 55}ms` }}
    >
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl z-10
        bg-gradient-to-r from-transparent via-emerald-500/0 to-transparent
        group-hover:via-emerald-400/45 transition-all duration-500" />

      {/* Corner accent lines */}
      <div className="absolute top-0 left-0 w-12 h-px z-10
        bg-gradient-to-r from-emerald-400/35 to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 left-0 w-px h-12 z-10
        bg-gradient-to-b from-emerald-400/35 to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* ── Project image (if provided by Django admin) ── */}
      {project.image && (
        <div className="relative w-full h-40 overflow-hidden flex-shrink-0">
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover object-top
              group-hover:scale-[1.04] transition-transform duration-700 ease-out"
          />
          {/* Gradient fade into card body */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
        </div>
      )}

      {/* ── Card body ── */}
      <div className="flex flex-col gap-3 p-5 flex-1">

        {/* Index watermark */}
        <span
          className="absolute top-3 right-4 text-4xl font-black text-white/[0.03]
            select-none pointer-events-none leading-none"
          aria-hidden
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* ── Title ── */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[0.9375rem] font-bold text-white leading-snug tracking-tight
            transition-all duration-200
            group-hover:drop-shadow-[0_2px_8px_rgba(255,255,255,0.25)]">
            {project.title}
          </h3>
          <div className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-emerald-400
            opacity-0 group-hover:opacity-100 transition-all duration-300
            shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
        </div>

        {/* ── Summary — 2-line clamp ── */}
        <p className="text-slate-300 text-xs leading-relaxed line-clamp-2
          transition-colors duration-200 group-hover:text-slate-100">
          {project.summary}
        </p>

        {/* ── Stack tags ── */}
        <div className="flex flex-wrap gap-1">
          {project.stack.map((tech, i) => (
            <span
              key={tech}
              className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-md
                bg-slate-700 text-slate-100 border border-slate-600/50
                transition-all duration-200
                group-hover:bg-slate-600 group-hover:text-white"
              style={{ transitionDelay: `${i * 15}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* ── Highlights — max 3 bullets ── */}
        {bullets.length > 0 && (
          <ul className="space-y-1.5">
            {bullets.map((item, i) => (
              <li
                key={item}
                className="flex gap-2 text-[0.75rem] text-slate-400 leading-snug
                  transition-colors duration-200 group-hover:text-slate-200"
                style={{ transitionDelay: `${i * 20}ms` }}
              >
                <span className="mt-[5px] flex-shrink-0 w-1 h-1 rounded-full
                  bg-emerald-400/50 group-hover:bg-emerald-400 transition-colors duration-300" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {/* ── Actions ── */}
        <div className="flex gap-2 pt-3 mt-auto border-t border-white/[0.08]">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-lg
                border border-white/[0.12] bg-white/[0.05] text-slate-200
                hover:bg-white/[0.10] hover:border-white/25 hover:text-white
                transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <GitHubMark size={12} />
              GitHub
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-lg
              border border-white/[0.05] text-slate-600 cursor-default select-none">
              <GitHubMark size={12} />
              Private
            </span>
          )}

          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-lg
                bg-gradient-to-r from-emerald-500/15 to-blue-500/10
                text-emerald-300 border border-emerald-500/[0.25]
                hover:from-emerald-500/25 hover:border-emerald-500/40 hover:text-emerald-200
                transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <ExternalLink size={12} aria-hidden />
              Demo
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-lg
              border border-white/[0.05] text-slate-600 cursor-default select-none">
              <ArrowUpRight size={12} aria-hidden />
              Soon
            </span>
          )}
        </div>

      </div>
    </article>
  );
}
