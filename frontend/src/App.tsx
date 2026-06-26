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

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Also trigger children stagger
            const children = entry.target.querySelectorAll('.reveal-children');
            children.forEach(c => c.classList.add('revealed'));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const targets = el.querySelectorAll('.reveal, .reveal-children');
    targets.forEach(t => observer.observe(t));
    return () => observer.disconnect();
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
