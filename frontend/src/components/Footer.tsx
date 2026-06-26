import { Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL } from '../data/content';

const SOCIAL = [
  { icon: Github,   href: PERSONAL.github,              label: 'GitHub',   color: 'hover:text-white' },
  { icon: Linkedin, href: PERSONAL.linkedin,             label: 'LinkedIn', color: 'hover:text-blue-400' },
  { icon: Mail,     href: `mailto:${PERSONAL.email}`,   label: 'Email',    color: 'hover:text-emerald-400' },
];

const NAV_LINKS = [
  { label: 'About',          href: '#about' },
  { label: 'Skills',         href: '#skills' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Contact',        href: '#contact' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.12] overflow-hidden bg-slate-900/30">
      {/* Enhanced top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" aria-hidden />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* ── Brand ── */}
          <div className="space-y-4">
            <a
              href="#"
              onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-block font-black text-xl tracking-tighter
                bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent
                drop-shadow-[0_2px_8px_rgba(52,211,153,0.3)]
                hover:drop-shadow-[0_4px_12px_rgba(52,211,153,0.5)]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded
                transition-all duration-300"
            >
              {PERSONAL.wordmark}
            </a>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xs">
              Full-stack engineer specialising in Django REST APIs and React SPAs.
              Available for international remote work.
            </p>
            {/* Enhanced availability badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
              bg-emerald-500/[0.12] border border-emerald-500/30 
              text-xs text-emerald-300 font-semibold
              shadow-[0_0_20px_rgba(52,211,153,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse 
                shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              Open to opportunities
            </div>
          </div>

          {/* ── Nav links ── */}
          <div className="grid grid-cols-2 gap-3">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={e => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }); }}
                className="text-slate-400 text-sm hover:text-white py-1
                  hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]
                  transition-all duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
              >
                {label}
              </a>
            ))}
          </div>

          {/* ── Contact ── */}
          <div className="space-y-4">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.18em]">Connect</p>
            <div className="flex flex-col gap-3">
              {SOCIAL.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`inline-flex items-center gap-2.5 text-slate-400 text-sm
                    ${color} transition-all duration-300
                    hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded`}
                >
                  <Icon size={14} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-8 border-t border-white/[0.12] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">
            Designed &amp; built by{' '}
            <span className="text-slate-100 font-semibold">{PERSONAL.name}</span>
            {' '}·{' '}
            <span className="text-slate-500">© {year}</span>
          </p>

          {/* Enhanced tech stack */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Built with</span>
            {['React', 'TypeScript', 'Tailwind CSS', 'Vite'].map((tech, i) => (
              <span key={tech}>
                <span className="text-slate-400">{tech}</span>
                {i < 3 && <span className="mx-2 text-slate-700">·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
