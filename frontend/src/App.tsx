import { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { Navbar }         from './components/Navbar';
import { Hero }           from './components/Hero';
import { About }          from './components/About';
import { Skills }         from './components/Skills';
import { Projects }       from './components/Projects';
import { Certifications } from './components/Certifications';
import { Timeline }       from './components/Timeline';
import { Contact }        from './components/Contact';
import { Footer }         from './components/Footer';

/* ── Scroll progress bar ── */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="progress-bar" aria-hidden>
      <div className="progress-fill" style={{ width: `${progress}%` }} />
    </div>
  );
}

/* ── Back to top ── */
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-8 right-6 z-50 p-3 rounded-xl
        border border-white/[0.1] bg-[#080C12]/85 backdrop-blur-xl
        text-slate-500 hover:text-emerald-400
        hover:border-emerald-500/35 hover:bg-emerald-500/[0.06]
        hover:shadow-[0_0_18px_rgba(52,211,153,0.15)]
        shadow-xl shadow-black/30
        transition-all duration-300
        focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400
        ${visible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
        }`}
    >
      <ArrowUp size={17} aria-hidden />
    </button>
  );
}

/* ── Intersection-based reveal ── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Small delay lets async-fetched content paint before we measure.
    // Without this, the observer fires on a near-empty skeleton, disconnects,
    // and never re-fires when the real cards render.
    const timer = setTimeout(() => {
      const revealEl = el.querySelector('.reveal') as HTMLElement | null;
      if (!revealEl) return;

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              // Stagger children grids inside this section
              const grids = (entry.target as HTMLElement).querySelectorAll('.reveal-children');
              grids.forEach(g => g.classList.add('revealed'));
              observer.unobserve(entry.target);
            }
          });
        },
        // Generous rootMargin — fires well before the section hits the viewport
        // edge so content is visible without needing to scroll far.
        { threshold: 0, rootMargin: '0px 0px -60px 0px' }
      );

      observer.observe(revealEl);

      // If already in viewport at mount (e.g. page refresh partway down),
      // the observer fires synchronously. If not in viewport, it waits.
      return () => observer.disconnect();
    }, 120); // 120 ms — enough for one React render cycle + API state update

    return () => clearTimeout(timer);
  }, []);

  return ref;
}

function Section({ children }: { children: React.ReactNode }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref}>
      <div className="reveal">{children}</div>
    </div>
  );
}

/* ── Root ── */
export default function App() {
  return (
    <div className="min-h-screen bg-[#080C12] text-slate-100 antialiased selection:bg-emerald-500/20">
      <ScrollProgress />
      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Section><About /></Section>
        <Section><Skills /></Section>
        <Section><Projects /></Section>
        <Section><Certifications /></Section>
        <Section><Timeline /></Section>
        <Section><Contact /></Section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
