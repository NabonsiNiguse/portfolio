import { useState } from 'react';
import { Mail, Github as GithubIcon, Linkedin, ArrowRight, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { PERSONAL } from '../data/content';
import { SectionHeading } from './ui/SectionHeading';
import { Button } from './ui/Button';

// ── Contact link definitions ──────────────────────────────────────────────
const CONTACT_LINKS = [
  {
    icon:  Mail,
    label: 'Email',
    value: PERSONAL.email,
    href:  `mailto:${PERSONAL.email}`,
    color: 'text-emerald-400',
    bg:    'bg-emerald-500/10 border-emerald-500/15 group-hover:border-emerald-500/35 group-hover:shadow-[0_0_14px_rgba(52,211,153,0.15)]',
  },
  {
    icon:  GithubIcon,
    label: 'GitHub',
    value: 'github.com/NabonsiNiguse',
    href:  PERSONAL.github,
    color: 'text-slate-300',
    bg:    'bg-white/[0.05] border-white/[0.09] group-hover:border-white/20 group-hover:shadow-[0_0_12px_rgba(255,255,255,0.06)]',
  },
  {
    icon:  Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/nabonsi-niguse-8144953a8',
    href:  PERSONAL.linkedin,
    color: 'text-blue-400',
    bg:    'bg-blue-500/[0.07] border-blue-500/12 group-hover:border-blue-500/30 group-hover:shadow-[0_0_14px_rgba(96,165,250,0.14)]',
  },
] as const;

// ── Form types ────────────────────────────────────────────────────────────
// No backend — success means the mailto: link was opened
type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface FormData   { name: string; email: string; message: string; }
interface FormErrors { name?: string; email?: string; message?: string; }

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim())
    errors.name = 'Name is required.';
  if (!data.email.trim())
    errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = 'Enter a valid email address.';
  if (!data.message.trim())
    errors.message = 'Message is required.';
  else if (data.message.trim().length < 20)
    errors.message = 'Message must be at least 20 characters.';
  return errors;
}

export function Contact() {
  const [form,   setForm]   = useState<FormData>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormState>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors])
      setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  // No backend — open a pre-filled mailto: link instead
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(form);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStatus('submitting');
    try {
      const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
      const body    = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
      window.location.href = `mailto:${PERSONAL.email}?subject=${subject}&body=${body}`;
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setErrors({});
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_80%,rgba(16,185,129,0.06),transparent)]"
        aria-hidden
      />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        <SectionHeading
          label="Contact"
          title="Let's Build Something"
          subtitle="Open for international remote roles, freelance contracts, and open-source collaboration."
          align="center"
        />

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">

          {/* ── Left: Links + CTA ── */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <p className="text-slate-400 text-[0.9375rem] leading-relaxed">
              If you are building something meaningful, I want to hear about it.
              Response time is fast — let's not waste yours.
            </p>

            <div className="space-y-3">
              {CONTACT_LINKS.map(({ icon: Icon, label, value, href, color, bg }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={`${label}: ${value}`}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.08]
                    bg-slate-900/40 backdrop-blur-sm group transition-all duration-200
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <div className={`p-2.5 rounded-xl border transition-all duration-300 ${bg}`}>
                    <Icon size={16} className={color} aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.16em] mb-0.5">
                      {label}
                    </p>
                    <p className="text-slate-300 text-sm group-hover:text-white transition-colors truncate">
                      {value}
                    </p>
                  </div>
                  <ArrowRight
                    size={14}
                    className="flex-shrink-0 text-slate-700 group-hover:text-slate-400
                      group-hover:translate-x-0.5 transition-all duration-200"
                    aria-hidden
                  />
                </a>
              ))}
            </div>

            <Button
              variant="primary"
              size="lg"
              as="a"
              href={`mailto:${PERSONAL.email}`}
              aria-label={`Send email to ${PERSONAL.email}`}
              className="mt-2"
            >
              <Mail size={16} aria-hidden />
              Send an Email
              <ArrowRight size={15} aria-hidden />
            </Button>
          </div>

          {/* ── Right: Form ── */}
          <div className="lg:col-span-3">
            <div className="relative rounded-2xl border border-white/[0.12]
              bg-slate-900/85 backdrop-blur-xl overflow-hidden
              shadow-[0_2px_8px_rgba(0,0,0,0.55),0_16px_48px_rgba(0,0,0,0.45)]">

              <div className="absolute top-0 left-0 right-0 h-px
                bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.025] to-transparent pointer-events-none" aria-hidden />

              <div className="relative p-7 md:p-9">
                <h3 className="text-lg font-bold text-white mb-1">Send a Message</h3>
                <p className="text-slate-500 text-sm mb-7">
                  Filling this in will open your email client pre-filled and ready to send.
                </p>

                {/* Success state */}
                {status === 'success' ? (
                  <div
                    className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="p-4 rounded-full bg-emerald-500/[0.12] border border-emerald-500/[0.28]
                      shadow-[0_0_32px_rgba(52,211,153,0.25)]">
                      <CheckCircle2 size={32} className="text-emerald-400" aria-hidden />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">Email client opened!</h4>
                      <p className="text-slate-400 text-sm max-w-xs mx-auto">
                        Your message is pre-filled. Just hit send in your email app.
                      </p>
                    </div>
                    <button
                      onClick={() => setStatus('idle')}
                      className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors mt-2
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                    >
                      Send another →
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-label="Contact form">

                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-slate-400 uppercase tracking-[0.14em] mb-2">
                          Name
                        </label>
                        <input
                          id="name" name="name" type="text" autoComplete="name"
                          value={form.name} onChange={handleChange}
                          placeholder="Nabonsi Niguse"
                          aria-required="true"
                          aria-invalid={errors.name ? true : undefined}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                          className={`input-field ${errors.name ? 'error' : ''}`}
                        />
                        {errors.name && (
                          <p id="name-error" role="alert" className="mt-1.5 text-[11px] text-red-400 flex items-center gap-1">
                            <AlertCircle size={10} aria-hidden /> {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-slate-400 uppercase tracking-[0.14em] mb-2">
                          Email
                        </label>
                        <input
                          id="email" name="email" type="email" autoComplete="email"
                          value={form.email} onChange={handleChange}
                          placeholder="you@company.com"
                          aria-required="true"
                          aria-invalid={errors.email ? true : undefined}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                          className={`input-field ${errors.email ? 'error' : ''}`}
                        />
                        {errors.email && (
                          <p id="email-error" role="alert" className="mt-1.5 text-[11px] text-red-400 flex items-center gap-1">
                            <AlertCircle size={10} aria-hidden /> {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-slate-400 uppercase tracking-[0.14em] mb-2">
                        Message
                      </label>
                      <textarea
                        id="message" name="message" rows={5}
                        value={form.message} onChange={handleChange}
                        placeholder="Tell me about your project, role, or idea..."
                        aria-required="true"
                        aria-invalid={errors.message ? true : undefined}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        maxLength={1000}
                        className={`input-field resize-none ${errors.message ? 'error' : ''}`}
                      />
                      <div className="flex items-start justify-between mt-1.5">
                        {errors.message ? (
                          <p id="message-error" role="alert" className="text-[11px] text-red-400 flex items-center gap-1">
                            <AlertCircle size={10} aria-hidden /> {errors.message}
                          </p>
                        ) : <span />}
                        <span className={`text-[11px] tabular-nums ${form.message.length > 800 ? 'text-red-400' : 'text-slate-600'}`}>
                          {form.message.length}/1000
                        </span>
                      </div>
                    </div>

                    {/* Error banner */}
                    {status === 'error' && (
                      <div role="alert" className="flex items-center gap-3 p-3.5 rounded-xl
                        bg-red-500/[0.07] border border-red-500/20 text-red-400 text-sm">
                        <AlertCircle size={15} className="flex-shrink-0" aria-hidden />
                        <span>
                          Could not open your email client.{' '}
                          <a href={`mailto:${PERSONAL.email}`}
                            className="underline underline-offset-2 hover:text-red-300 transition-colors">
                            Email me directly
                          </a>{' '}instead.
                        </span>
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      aria-label="Send message via email client"
                      className={[
                        'btn-primary-anim w-full inline-flex items-center justify-center gap-2',
                        'px-7 py-3.5 text-[0.9375rem] font-bold rounded-xl',
                        'bg-gradient-to-r from-emerald-400 to-blue-500 text-slate-950',
                        'hover:from-emerald-300 hover:to-blue-400',
                        'shadow-[0_0_40px_rgba(52,211,153,0.3)]',
                        'hover:shadow-[0_0_60px_rgba(52,211,153,0.5)]',
                        'hover:scale-[1.02] active:scale-[0.98]',
                        'transition-all duration-300',
                        'disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400',
                        'focus-visible:ring-offset-2 focus-visible:ring-offset-[#080C12]',
                      ].join(' ')}
                    >
                      <Send size={16} aria-hidden />
                      Open Email Client
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
