import { Github, Linkedin, Mail } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PERSONAL } from '../data/content';

/* ── Social link definitions ─────────────────────────────────────────
   Each platform gets its own hover color + matching drop-shadow glow.
   - GitHub  → white/slate  (neutral, recognisable brand colour on dark)
   - LinkedIn → blue-400    (matches LinkedIn's brand blue)
   - Email    → emerald-400 (primary accent, matches CTA button)
────────────────────────────────────────────────────────────────────── */
interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
  hoverText: string;
  hoverGlow: string;
}

const SOCIAL: SocialLink[] = [
  {
    icon:      Github,
    href:      PERSONAL.github,
    label:     'GitHub',
    hoverText: 'hover:text-slate-100',
    hoverGlow: 'hover:drop-shadow-[0_0_10px_rgba(241,245,249,0.5)]',
  },
  {
    icon:      Linkedin,
    href:      PERSONAL.linkedin,
    label:     'LinkedIn',
    hoverText: 'hover:text-blue-400',
    hoverGlow: 'hover:drop-shadow-[0_0_10px_rgba(96,165,250,0.55)]',
  },
  {
    icon:      Mail,
    href:      `mailto:${PERSONAL.email}`,
    label:     'Email',
    hoverText: 'hover:text-emerald-400',
    hoverGlow: 'hover:drop-shadow-[0_0_10px_rgba(52,211,153,0.55)]',
  },
];

const NAV_LINKS = [
  { label: 'About',          href: '#about' },
  { label: 'Skills',         href: '#skills' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Contact',        href: '#contact' },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    /* ── Shell ──────────────────────────────────────────────────────
       border-t border-white/[0.12]  — Phase 1 universal border token.
       bg-slate-900/30               — keep low for subtle depth.
       overflow-hidden               — contains the absolute top-glow bar.
    ─────────────────────────────────────────────────────────────── */
    <footer className="relative border-t border-white/[0.12] overflow-hidden bg-slate-900/30">

      {/* ── Top glow bar ───────────────────────────────────────────
          1px gradient bar centred on the border: transparent →
          via-emerald-500/40 → transparent. Gives the border a
          subtle luminance bloom without a real box-shadow.
      ──────────────────────────────────────────────────────────── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px
          bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* ── Brand column ───────────────────────────────────────── */}
          <div className="space-y-4">

            {/* Wordmark — subtle glow at rest, stronger on hover */}
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block font-black text-xl tracking-tighter
                bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400
                bg-clip-text text-transparent
                drop-shadow-[0_2px_8px_rgba(52,211,153,0.3)]
                hover:drop-shadow-[0_4px_16px_rgba(52,211,153,0.55)]
                transition-all duration-300
                focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
              style={{ willChange: 'filter' }}
            >
              {PERSONAL.wordmark}
            </a>

            {/* Description — exactly text-slate-300 */}
            <p className="text-slate-300 text-sm leading-relaxed max-w-xs">
              Full-stack engineer specialising in Django REST APIs and React SPAs.
              Available for international remote work.
            </p>

            {/* ── Availability badge ─────────────────────────────────
                bg-emerald-500/[0.12] + border + active pulse glow.
                The box-shadow gives the badge a constant soft corona;
                the dot has its own animate-pulse + tighter glow.
            ──────────────────────────────────────────────────────── */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
              bg-emerald-500/[0.12] border border-emerald-500/[0.28]
              text-xs text-emerald-300 font-semibold
              shadow-[0_0_20px_rgba(52,211,153,0.14),0_0_8px_rgba(52,211,153,0.08)]">
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse
                  shadow-[0_0_8px_rgba(52,211,153,0.7)]"
              />
              Open to opportunities
            </div>
          </div>

          {/* ── Nav links column ───────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={e => {
                  e.preventDefault();
                  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-slate-400 text-sm py-1
                  hover:text-white
                  hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]
                  transition-all duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
              >
                {label}
              </a>
            ))}
          </div>

          {/* ── Connect column ─────────────────────────────────────── */}
          <div className="space-y-4">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.18em]">
              Connect
            </p>

            <div className="flex flex-col gap-3">
              {SOCIAL.map(({ icon: Icon, href, label, hoverText, hoverGlow }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={[
                    'inline-flex items-center gap-2.5',
                    'text-slate-400 text-sm',
                    'transition-all duration-300',
                    hoverText,
                    hoverGlow,
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded',
                  ].join(' ')}
                  style={{ willChange: 'filter, color' }}
                >
                  <Icon size={14} aria-hidden />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────────
            Name text: text-slate-100 (high contrast).
            Copyright: text-slate-500 (subtle).
        ──────────────────────────────────────────────────────────── */}
        <div className="pt-8 border-t border-white/[0.12]
          flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-slate-400 text-sm">
            Designed &amp; built by{' '}
            <span className="text-slate-100 font-semibold">{PERSONAL.name}</span>
            {' '}·{' '}
            <span className="text-slate-500">© {year}</span>
          </p>

          {/* Tech stack pills */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Built with</span>
            {(['React', 'TypeScript', 'Tailwind CSS', 'Vite'] as const).map((tech, i, arr) => (
              <span key={tech} className="inline-flex items-center gap-2">
                <span className="text-slate-400">{tech}</span>
                {i < arr.length - 1 && (
                  <span className="text-slate-700" aria-hidden>·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
