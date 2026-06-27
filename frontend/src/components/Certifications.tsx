import { Award, ExternalLink, ShieldCheck } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { CERTIFICATIONS_DATA, type CertificationData } from '../data/content';

export function Certifications() {
  return (
    <section id="certifications" className="py-24 lg:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(59,130,246,0.06),transparent)]"
        aria-hidden
      />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        <SectionHeading
          label="Certifications"
          title="Verified Credentials"
          subtitle="Practical training and professional certification backing every skill claim."
          align="center"
        />

        <div className="reveal-children grid sm:grid-cols-2 gap-6">
          {CERTIFICATIONS_DATA.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertCard({ cert, index }: { cert: CertificationData; index: number }) {
  return (
    <div
      className={[
        'card-shimmer group relative flex flex-col gap-6 rounded-2xl overflow-hidden',
        'bg-slate-900/85 border border-white/[0.12] backdrop-blur-xl',
        'shadow-[0_2px_8px_rgba(0,0,0,0.5),0_12px_40px_rgba(0,0,0,0.45),0_0_0_1px_rgba(59,130,246,0.04)]',
        'p-8 transition-all duration-300',
        'hover:-translate-y-3 hover:scale-[1.01] hover:border-blue-400/[0.35]',
        'hover:shadow-[0_2px_8px_rgba(0,0,0,0.5),0_12px_40px_rgba(0,0,0,0.45),0_0_30px_rgba(96,165,250,0.2)]',
      ].join(' ')}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px
        bg-gradient-to-r from-transparent via-blue-400/0 to-transparent
        group-hover:via-blue-400/50 transition-all duration-500" />

      {/* Ambient blob */}
      <div
        className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-2xl
          bg-blue-500/[0.07] group-hover:bg-blue-500/[0.12] transition-all duration-500"
        aria-hidden
      />

      {/* Header row */}
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex-shrink-0">
          {cert.badge ? (
            <div className="w-14 h-14 rounded-xl overflow-hidden
              border border-blue-500/[0.20] bg-slate-800
              shadow-[0_0_16px_rgba(96,165,250,0.15)]
              group-hover:shadow-[0_0_24px_rgba(96,165,250,0.28)]
              transition-all duration-300">
              <img
                src={cert.badge}
                alt={`${cert.issuer} badge`}
                className="w-full h-full object-contain p-1.5"
              />
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/15 to-violet-500/[0.08]
              border border-blue-500/[0.14]
              group-hover:border-blue-500/35
              group-hover:shadow-[0_0_20px_rgba(96,165,250,0.22)]
              transition-all duration-300">
              <Award
                size={22}
                className="text-blue-400 group-hover:scale-110 transition-transform duration-300"
                aria-hidden
              />
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 tracking-[0.18em] uppercase">
            <ShieldCheck size={10} className="text-blue-400" aria-hidden />
            Verified
          </span>
          <span className="text-xs font-bold text-slate-300 tracking-[0.14em] uppercase">
            {cert.year}
          </span>
        </div>
      </div>

      {/* Title block */}
      <div className="relative">
        <p className="text-[10px] font-black tracking-[0.22em] text-blue-400 uppercase mb-2">
          {cert.issuer}
        </p>
        <h3 className={[
          'text-[1.0625rem] font-bold text-white leading-snug tracking-tight',
          'transition-all duration-200 group-hover:text-blue-50',
          'group-hover:drop-shadow-[0_2px_10px_rgba(96,165,250,0.35)]',
        ].join(' ')}>
          {cert.credential}
        </h3>
      </div>

      {/* Description */}
      <p className="relative text-slate-200 text-[0.8125rem] leading-relaxed flex-1
        group-hover:text-slate-100 transition-colors duration-200">
        {cert.description}
      </p>

      {/* Footer */}
      <div className="relative flex items-center justify-between pt-4 border-t border-white/[0.12]">
        <div className="flex gap-1.5">
          {[...Array(4)].map((_, k) => (
            <div
              key={k}
              className={[
                'h-1 rounded-full transition-all duration-500',
                k < 3
                  ? 'bg-blue-400/60 group-hover:bg-blue-400'
                  : 'bg-white/15 group-hover:bg-white/30',
              ].join(' ')}
              style={{ width: k < 3 ? '20px' : '8px', transitionDelay: `${k * 60}ms` }}
              aria-hidden
            />
          ))}
        </div>

        {cert.verifyUrl ? (
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-300
              hover:text-white transition-colors group/link
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
          >
            Verify
            <ExternalLink
              size={11}
              className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200"
              aria-hidden
            />
          </a>
        ) : (
          <span className="text-[10px] text-slate-500 font-medium italic">In progress</span>
        )}
      </div>
    </div>
  );
}
