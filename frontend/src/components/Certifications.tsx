import { useState, useEffect } from 'react';
import { Award, ExternalLink, ShieldCheck, Loader2 } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { apiFetch } from '../lib/api';

// Define the clear interface expected from the Django REST API
interface CertificationData {
  id: number;
  issuer: string;
  credential: string;
  description: string;
  year: string;
  verifyUrl: string | null;
}

export function Certifications() {
  const [certifications, setCertifications] = useState<CertificationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<CertificationData[]>('/api/certifications/')
      .then((data) => { setCertifications(data); setLoading(false); })
      .catch((err) => { console.error(err); setError(err.message); setLoading(false); });
  }, []);

  return (
    <section id="certifications" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(59,130,246,0.05),transparent)]" aria-hidden />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        <SectionHeading
          label="Certifications"
          title="Verified Credentials"
          subtitle="Practical training and professional certification backing every skill claim."
          align="center"
        />

        {/* ── Loading State ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <p className="text-slate-400 text-sm font-medium animate-pulse">Loading live credentials...</p>
          </div>
        )}

        {/* ── Error Fallback State ── */}
        {error && !loading && (
          <div className="text-center py-8 border border-red-500/10 rounded-2xl bg-red-500/[0.02] max-w-md mx-auto">
            <p className="text-sm font-medium text-red-400">Unable to load certificates connectively.</p>
            <p className="text-xs text-slate-500 mt-1">Please ensure your Django backend is running.</p>
          </div>
        )}

        {/* ── Dynamic Main Content Grid ── */}
        {!loading && !error && (
          <div className="reveal-children grid sm:grid-cols-2 gap-6">
            {certifications.map((cert, i) => (
              <div
                key={cert.id || cert.credential}
                className="card-shimmer group relative flex flex-col gap-6
                  rounded-2xl border border-white/[0.12]
                  bg-slate-900/85
                  backdrop-blur-xl
                  shadow-[0_2px_8px_rgba(0,0,0,0.5),0_10px_40px_rgba(0,0,0,0.4)]
                  p-8 overflow-hidden
                  transition-all duration-350 hover:-translate-y-3 hover:scale-[1.01]
                  hover:border-blue-400/40 hover:shadow-[0_0_50px_rgba(96,165,250,0.25),0_8px_40px_rgba(0,0,0,0.6)]"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Top glow line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/0 to-transparent group-hover:via-blue-400/50 transition-all duration-500" />
                {/* Diagonal bg accent */}
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/[0.04] rounded-full blur-2xl group-hover:bg-blue-500/[0.07] transition-all duration-500" aria-hidden />

                {/* ── Header row ── */}
                <div className="relative flex items-start justify-between gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/15 to-violet-500/8
                    border border-blue-500/12 group-hover:border-blue-500/30
                    group-hover:shadow-[0_0_18px_rgba(96,165,250,0.18)]
                    transition-all duration-300">
                    <Award size={22} className="text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 tracking-[0.18em] uppercase">
                      <ShieldCheck size={10} className="text-emerald-500/60" />
                      Verified
                    </span>
                    <span className="text-xs font-bold text-slate-500 tracking-[0.14em] uppercase">
                      {cert.year}
                    </span>
                  </div>
                </div>

                {/* ── Title block ── */}
                <div className="relative">
                  <p className="text-[10px] font-black tracking-[0.22em] text-blue-400/75 uppercase mb-2">
                    {cert.issuer}
                  </p>
                  <h3 className="text-[1.0625rem] font-bold text-white leading-snug tracking-tight group-hover:text-blue-50 transition-colors duration-200">
                    {cert.credential}
                  </h3>
                </div>

                {/* ── Description ── */}
                <p className="relative text-slate-400 text-[0.8125rem] leading-relaxed flex-1">
                  {cert.description}
                </p>

                {/* ── Footer ── */}
                <div className="relative flex items-center justify-between pt-4 border-t border-white/[0.05]">
                  <div className="flex gap-1.5">
                    {[...Array(4)].map((_, k) => (
                      <div
                        key={k}
                        className={`h-1 rounded-full transition-all duration-500 ${
                          k < 3
                            ? 'bg-blue-400/50 group-hover:bg-blue-400'
                            : 'bg-white/10 group-hover:bg-white/20'
                        }`}
                        style={{ width: k < 3 ? '20px' : '8px', transitionDelay: `${k * 60}ms` }}
                      />
                    ))}
                  </div>

                  {cert.verifyUrl ? (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400
                        hover:text-blue-300 transition-colors group/link
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                    >
                      Verify
                      <ExternalLink size={11} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                    </a>
                  ) : (
                    <span className="text-[10px] text-slate-700 font-medium italic">In progress</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}