import { useEffect, useState } from 'react';
import { MapPin, Download, ArrowRight, Linkedin } from 'lucide-react';
import { Button } from './ui/Button';
import { PERSONAL } from '../data/content';

// Inline GitHub mark — lucide deprecated and removed Github in v0.34x
function GitHubMark({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

/* ── Floating particles ─────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  size: 1.5 + Math.random() * 2,
  left: Math.random() * 100,
  delay: Math.random() * 20,
  duration: 16 + Math.random() * 12,
  opacity: 0.12 + Math.random() * 0.28,
  color: i % 3 === 0
    ? 'rgba(52,211,153'
    : i % 3 === 1
    ? 'rgba(96,165,250'
    : 'rgba(45,212,191',
}));

/* ── Typing effect ──────────────────────────────────────────────── */
function useTypingEffect(words: string[], speed = 85, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx]   = useState(0);
  const [charIdx, setCharIdx]   = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2.2);
    } else {
      setDeleting(false);
      setWordIdx(w => (w + 1) % words.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

/* ── Component ──────────────────────────────────────────────────── */
export function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const typedRole = useTypingEffect(
    ['Full-Stack Developer', 'Django Engineer', 'React Developer', 'Remote-Ready'],
    82,
    1900
  );

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* ── Ambient orbs ── */}
      <div
        className="orb orb-emerald"
        style={{ width: '65vw', height: '65vw', top: '-20%', left: '-15%' }}
        aria-hidden
      />
      <div
        className="orb orb-blue"
        style={{ width: '50vw', height: '50vw', bottom: '-15%', right: '-10%' }}
        aria-hidden
      />
      <div
        className="orb orb-purple"
        style={{ width: '30vw', height: '30vw', top: '30%', right: '15%' }}
        aria-hidden
      />

      {/* ── Grid ── */}
      <div className="hero-grid" aria-hidden />

      {/* ── Particles ── */}
      {PARTICLES.map(p => (
        <div
          key={p.id}
          className="particle"
          aria-hidden
          style={{
            width:             p.size,
            height:            p.size,
            left:              `${p.left}%`,
            bottom:            '-8px',
            background:        `${p.color},${p.opacity})`,
            animationDelay:    `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {/* ── Terminal watermark ── */}
      <div
        className="absolute top-[16%] right-8 xl:right-24 opacity-[0.055] select-none pointer-events-none hidden xl:block"
        aria-hidden
      >
        <pre className="text-emerald-400 text-[10px] font-mono leading-[1.9] tracking-tight">
{`$ python manage.py runserver
Performing system checks...
System check identified no issues.
Starting development server at 8000...

$ npm run dev
  VITE v5 ready in 311ms
  ➜ Local:   http://localhost:5173/
  ➜ Network: use --host to expose`}
        </pre>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">

        {/* Available badge */}
        <div className="hero-badge flex flex-wrap justify-center gap-2.5 mb-8">
          <span className="badge-glow inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase rounded-full bg-emerald-500/[0.09] text-emerald-400 border border-emerald-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)] animate-pulse" />
            Available for Remote Work
          </span>
          {PERSONAL.badges.map(badge => (
            <span
              key={badge}
              className="inline-flex items-center px-3.5 py-1.5 text-xs font-semibold rounded-full bg-white/[0.05] text-slate-400 border border-white/[0.08]"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Name */}
        <h1 className="hero-name font-black text-white tracking-[-0.04em] leading-[0.96] mb-6 drop-shadow-[0_2px_20px_rgba(255,255,255,0.1)]"
          style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}>
          {PERSONAL.name.split(' ')[0]}{' '}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(52,211,153,0.5)]">
              {PERSONAL.name.split(' ')[1]}
            </span>
            {/* underline accent */}
            <span
              className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-emerald-400 to-blue-400 shadow-[0_0_20px_rgba(52,211,153,0.6)]"
              aria-hidden
            />
          </span>
        </h1>

        {/* Role + role detail */}
        <div className="hero-role mb-3">
          <p className="text-xl md:text-2xl font-semibold text-slate-100 tracking-tight">
            <span className="text-slate-600 font-normal">// </span>
            <span className="typing-cursor font-mono text-emerald-300 drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]">{typedRole}</span>
          </p>
          <p className="text-sm text-slate-400 mt-1.5 font-medium tracking-wide">
            Django · React · PostgreSQL · REST APIs
          </p>
        </div>

        {/* Location */}
        <p className="hero-location flex items-center justify-center gap-1.5 text-slate-500 text-sm mb-12">
          <MapPin size={12} className="text-emerald-500/70" />
          {PERSONAL.location}
        </p>

        {/* CTAs */}
        <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <button
            onClick={() => scrollTo('projects')}
            className="btn-primary-anim inline-flex items-center gap-2 px-8 py-3.5 text-[0.9375rem] font-bold rounded-xl
              bg-gradient-to-r from-emerald-400 to-blue-500 text-slate-950
              shadow-[0_0_40px_rgba(52,211,153,0.4),0_4px_24px_rgba(52,211,153,0.25)] 
              hover:shadow-[0_0_60px_rgba(52,211,153,0.6),0_6px_32px_rgba(52,211,153,0.4)]
              hover:from-emerald-300 hover:to-blue-400 hover:scale-[1.02] active:scale-[0.98]
              transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080C12]"
          >
            View My Work
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>

          <Button variant="secondary" size="lg" as="button" onClick={() => scrollTo('contact')}>
            Get in Touch
          </Button>

        <a
          href={PERSONAL.cvPath}
          download="Nabonsi_Niguse_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-xl border border-white/[0.08] bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200 h-11"
        >
          <Download size={15} />
          Resume
        </a>
        </div>

        {/* Social links */}
        <div className="hero-ctas flex items-center justify-center gap-3">
          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-slate-500
              hover:text-white hover:border-white/20 hover:bg-white/[0.08]
              transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <GitHubMark size={18} />
          </a>
          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-slate-500
              hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/[0.06]
              transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${PERSONAL.email}`}
            aria-label="Email"
            className="px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-slate-500 text-sm
              hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/[0.06]
              transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            {PERSONAL.email}
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <button
        onClick={() => scrollTo('about')}
        aria-label="Scroll to about section"
        className="scroll-indicator text-slate-600 hover:text-emerald-400 transition-colors duration-200 group"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-bold opacity-50 group-hover:opacity-100 transition-opacity">
          Scroll
        </span>
        <div className="flex flex-col items-center gap-0.5 mt-1">
          {[0, 1, 2].map(i => (
            <svg key={i} width="12" height="7" viewBox="0 0 12 7" fill="none"
              className="animate-bounce text-current"
              style={{ animationDelay: `${i * 0.16}s`, opacity: 0.35 + i * 0.3 }}
            >
              <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ))}
        </div>
      </button>
    </section>
  );
}
