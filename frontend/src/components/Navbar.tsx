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
];

export function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [activeSection,  setActiveSection]  = useState('');
  const [menuOpen,       setMenuOpen]       = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);

      const sections = NAV_LINKS.map(l => l.href.slice(1));
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-[#080C12]/90 backdrop-blur-2xl border-b border-white/[0.12] shadow-[0_4px_40px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-8 h-[62px] flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Wordmark */}
        <a
          href="#"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="group relative font-black text-lg tracking-tighter focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg px-1"
          aria-label="Go to top"
        >
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
            {PERSONAL.wordmark}
          </span>
          {/* underline animation */}
          <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-emerald-400 to-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-0.5" role="list">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = activeSection === href.slice(1);
            return (
              <li key={label}>
                <button
                  onClick={() => handleNav(href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400
                    ${isActive
                      ? 'text-emerald-300 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]'
                      : 'text-slate-300 hover:text-white'
                    }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-lg bg-emerald-500/[0.09] border border-emerald-500/15" />
                  )}
                  <span className="relative">{label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-2">
          <a
            href={`mailto:${PERSONAL.email}`}
            className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl
              bg-emerald-500/10 text-emerald-400 border border-emerald-500/20
              hover:bg-emerald-500/16 hover:border-emerald-500/35
              transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            Hire Me
          </a>

          <button
            className="md:hidden p-2.5 rounded-xl border border-white/[0.08] text-slate-400
              hover:text-white hover:bg-white/[0.07] hover:border-white/14
              transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!menuOpen}
      >
        <ul
          className="px-4 pb-5 pt-2 flex flex-col gap-1 bg-[#080C12]/95 backdrop-blur-2xl border-b border-white/[0.06]"
          role="list"
        >
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = activeSection === href.slice(1);
            return (
              <li key={label}>
                <button
                  onClick={() => handleNav(href)}
                  className={`w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400
                    ${isActive
                      ? 'text-emerald-400 bg-emerald-500/[0.08] border border-emerald-500/15'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05] border border-transparent'
                    }`}
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
                bg-emerald-500/10 text-emerald-400 border border-emerald-500/20
                hover:bg-emerald-500/16 transition-colors"
            >
              Hire Me
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
