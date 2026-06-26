import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { PERSONAL } from '../data/content';

const NAV_LINKS = [
  { label: 'About',          href: '#about' },
  { label: 'Skills',         href: '#skills' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Contact',        href: '#contact' },
] as const;

export function Navbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen,      setMenuOpen]      = useState(false);

  /* ── Scroll listener ───────────────────────────────────────────
     Passive, hardware-friendly — only reads scrollY, never writes.
     Active section detection uses offsetTop - 140px threshold so
     the highlight advances slightly before the section hits center.
  ──────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);

      // Walk sections bottom-up so the last one that passes the
      // threshold wins (handles overlapping margins correctly).
      let current = '';
      for (const { href } of NAV_LINKS) {
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on mount to set initial state
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  /* ── Scrolled header classes ───────────────────────────────────
     Exactly: bg-slate-900/90 + backdrop-blur + border-white/[0.12]
  ──────────────────────────────────────────────────────────────── */
  const headerClass = scrolled
    ? [
        'bg-slate-900/90',
        'backdrop-blur-2xl',
        'border-b border-white/[0.12]',
        'shadow-[0_4px_40px_rgba(0,0,0,0.5)]',
      ].join(' ')
    : 'bg-transparent';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}
      style={{ willChange: 'background-color, backdrop-filter, box-shadow' }}
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-8 h-[62px] flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* ── Wordmark ──────────────────────────────────────────── */}
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group relative font-black text-lg tracking-tighter
            focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg px-1"
          aria-label="Back to top"
        >
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent
            drop-shadow-[0_2px_8px_rgba(52,211,153,0.3)]
            group-hover:drop-shadow-[0_4px_12px_rgba(52,211,153,0.55)]
            transition-all duration-300">
            {PERSONAL.wordmark}
          </span>
          {/* Animated underline */}
          <span className="absolute -bottom-0.5 left-0 right-0 h-px
            bg-gradient-to-r from-emerald-400 to-blue-400
            scale-x-0 group-hover:scale-x-100
            transition-transform duration-300 origin-left" />
        </a>

        {/* ── Desktop nav links ──────────────────────────────────── */}
        <ul className="hidden md:flex items-center gap-0.5" role="list">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = activeSection === href.slice(1);

            return (
              <li key={label}>
                <button
                  onClick={() => handleNav(href)}
                  className={[
                    'relative px-4 py-2 text-sm font-medium rounded-lg',
                    'transition-all duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400',
                    isActive
                      /* Active: text-white + emerald drop-shadow + inset glow pill */
                      ? [
                          'text-white',
                          'drop-shadow-[0_2px_8px_rgba(52,211,153,0.5)]',
                        ].join(' ')
                      : 'text-slate-300 hover:text-white',
                  ].join(' ')}
                >
                  {/* Inset emerald glow pill — only rendered when active */}
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-lg
                        bg-emerald-500/[0.09] border border-emerald-500/[0.18]
                        shadow-[inset_0_0_20px_rgba(52,211,153,0.15)]"
                      aria-hidden
                    />
                  )}
                  <span className="relative">{label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* ── CTA + mobile toggle ────────────────────────────────── */}
        <div className="flex items-center gap-2">
          <a
            href={`mailto:${PERSONAL.email}`}
            className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl
              bg-emerald-500/10 text-emerald-400 border border-emerald-500/[0.22]
              hover:bg-emerald-500/[0.16] hover:border-emerald-500/35
              hover:shadow-[0_0_20px_rgba(52,211,153,0.2)]
              transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            Hire Me
          </a>

          <button
            className="md:hidden p-2.5 rounded-xl border border-white/[0.08] text-slate-400
              hover:text-white hover:bg-white/[0.07] hover:border-white/[0.14]
              transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ───────────────────────────────────────────
          overflow-hidden + max-height transition for a smooth
          open/close without layout jumps. Hardware-accelerated.
      ──────────────────────────────────────────────────────────── */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!menuOpen}
      >
        <ul
          className="px-4 pb-5 pt-2 flex flex-col gap-1
            bg-slate-900/95 backdrop-blur-2xl border-b border-white/[0.06]"
          role="list"
        >
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = activeSection === href.slice(1);
            return (
              <li key={label}>
                <button
                  onClick={() => handleNav(href)}
                  className={[
                    'w-full text-left px-4 py-3 text-sm font-medium rounded-xl',
                    'transition-all duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400',
                    isActive
                      ? [
                          'text-white',
                          'drop-shadow-[0_2px_8px_rgba(52,211,153,0.5)]',
                          'bg-emerald-500/[0.08] border border-emerald-500/[0.18]',
                          'shadow-[inset_0_0_20px_rgba(52,211,153,0.15)]',
                        ].join(' ')
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05] border border-transparent',
                  ].join(' ')}
                >
                  {label}
                </button>
              </li>
            );
          })}

          <li className="pt-2 border-t border-white/[0.06]">
            <a
              href={`mailto:${PERSONAL.email}`}
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center px-4 py-3 text-sm font-semibold rounded-xl
                bg-emerald-500/10 text-emerald-400 border border-emerald-500/[0.22]
                hover:bg-emerald-500/[0.16] transition-colors"
            >
              Hire Me
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
