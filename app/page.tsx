'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CheckCircle2, Clock3, MapPin, Phone, Scissors, Sparkles, Star } from 'lucide-react';

const INPUT_CLASS =
  'w-full rounded-[1.15rem] border border-[var(--border-subtle)] bg-[var(--bg-input)] px-4 py-3.5 text-[15px] text-[var(--text-primary)] outline-none transition duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]';

type InquiryForm = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  honeypot: string;
};

export default function HomePage() {
  const [form, setForm] = useState<InquiryForm>({
    name: '',
    email: '',
    phone: '',
    service: 'Haircut & styling',
    message: '',
    honeypot: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const updateField = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.honeypot) return;

    setIsSubmitting(true);
    setSubmitError('');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? 'Unable to send your request right now.');
      }

      setSubmitMessage('Your appointment request was sent. We will reach out shortly to confirm.');
      setForm({
        name: '',
        email: '',
        phone: '',
        service: 'Haircut & styling',
        message: '',
        honeypot: '',
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="overflow-hidden">
      <section className="relative border-b border-[var(--border-subtle)]">
        <div className="absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(circle_at_12%_16%,rgba(239,182,110,0.32),transparent_28%),radial-gradient(circle_at_88%_18%,rgba(214,96,69,0.18),transparent_24%),linear-gradient(180deg,rgba(255,249,244,0.98),rgba(255,240,231,0.92))]" />
        <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-16 md:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div>
            <div className="animate-rise inline-flex items-center gap-2 rounded-full border border-[var(--accent-soft)] bg-white/75 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)] shadow-[0_12px_30px_rgba(214,96,69,0.08)] backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Bellevue salon appointments
            </div>
            <h1 className="animate-rise delay-1 mt-6 max-w-4xl text-[3.9rem] font-bold tracking-[-0.05em] text-[var(--text-primary)] md:text-[5.8rem]">
              Bright hair, calm energy, and a salon visit that feels personal.
            </h1>
            <p className="animate-rise delay-2 mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)] md:text-[1.2rem]">
              A Cut Above The Rest is designed around low-friction beauty care: polished cuts, flattering color, thoughtful styling, and a neighborhood experience that feels warm instead of rushed.
            </p>
            <div className="animate-rise delay-3 mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="primary-button px-8 py-3.5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 hover:brightness-105">
                Book an appointment
              </Link>
              <Link href="/services" className="secondary-button px-8 py-3.5 text-sm font-semibold text-[var(--text-primary)] transition duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_14px_32px_rgba(84,40,57,0.08)]">
                Explore services
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Scissors, label: 'Cuts, color, styling', text: 'Everything from routine upkeep to event-ready polish.', delay: 'delay-2' },
                { icon: Star, label: 'Warm, attentive service', text: 'A more human salon rhythm with real listening.', delay: 'delay-3' },
                { icon: CheckCircle2, label: 'Clear, comfortable process', text: 'Easy booking, honest guidance, no template feel.', delay: 'delay-4' },
              ].map(({ icon: Icon, label, text, delay }) => (
                <div key={label} className={`surface-panel animate-rise ${delay} rounded-[2rem] p-5`}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface-soft)] text-[var(--accent)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">{label}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-rise delay-3 animate-float rounded-[2.4rem] border border-[var(--border-subtle)] bg-[linear-gradient(180deg,rgba(255,253,250,0.92),rgba(255,239,229,0.94))] p-6 shadow-[0_32px_80px_rgba(166,101,75,0.14)]">
            <div className="surface-panel surface-glow rounded-[2rem] p-6">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="editorial-kicker">Visit the salon</p>
                  <h2 className="mt-3 text-5xl font-semibold tracking-[-0.05em] text-[var(--text-primary)]">Bellevue ease, polished finish.</h2>
                </div>
                <div className="rounded-full border border-[var(--accent-soft)] bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                  Local favorite
                </div>
              </div>
              <div className="mt-8 space-y-5">
                <div className="flex gap-3 rounded-[1.4rem] bg-white/70 p-4">
                  <MapPin className="mt-1 h-5 w-5 text-[var(--accent)]" />
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">534 Lincoln Avenue</p>
                    <p className="text-sm leading-6 text-[var(--text-secondary)]">Bellevue, PA 15202 inside Monda & Weiss Family Dentistry</p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-[1.4rem] bg-white/70 p-4">
                  <Phone className="mt-1 h-5 w-5 text-[var(--accent)]" />
                  <div>
                    <a href="tel:4124038392" className="font-semibold text-[var(--text-primary)] transition hover:text-[var(--accent)]">
                      (412) 403-8392
                    </a>
                    <p className="text-sm leading-6 text-[var(--text-secondary)]">Call for appointments and current availability</p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-[1.4rem] bg-white/70 p-4">
                  <Clock3 className="mt-1 h-5 w-5 text-[var(--accent)]" />
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">Flexible scheduling</p>
                    <p className="text-sm leading-6 text-[var(--text-secondary)]">A smoother, lower-friction appointment process for regular upkeep.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(214,96,69,0.95),rgba(171,62,44,0.92))] p-5 text-white shadow-[0_18px_35px_rgba(201,79,52,0.26)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Why people return</p>
                  <p className="mt-3 text-lg font-semibold leading-7">Consistency, comfort, and styling that fits real life.</p>
                </div>
                <div className="rounded-[1.5rem] border border-[var(--accent-soft)] bg-[var(--surface-soft)] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Psychology in practice</p>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">Clear hierarchy, low cognitive load, warm contrast, and trust cues make the experience feel premium before the appointment even starts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="surface-panel animate-rise rounded-[2.3rem] p-8">
              <p className="editorial-kicker">Designed to reduce hesitation</p>
              <h2 className="mt-4 max-w-2xl text-5xl font-semibold tracking-[-0.05em] text-[var(--text-primary)]">The site now leads with comfort, credibility, and a clear next step.</h2>
              <p className="mt-5 max-w-2xl text-[16px] leading-8 text-[var(--text-secondary)]">
                Strong first impressions come from contrast, rhythm, and focus. The brighter palette signals care and cleanliness. The editorial typography adds personality. The content order reduces friction by answering the right questions before asking for action.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  title: 'Signature salon services',
                  body: 'Haircuts, styling, color, highlights, treatments, special-occasion hair, and facial waxing.',
                  delay: 'delay-2',
                },
                {
                  title: 'Neighborhood convenience',
                  body: 'Easy Bellevue access, approachable service, and a location that feels close to home.',
                  delay: 'delay-3',
                },
                {
                  title: 'Care that feels current',
                  body: 'Classic technique backed by up-to-date trends, product knowledge, and practical styling advice.',
                  delay: 'delay-4',
                },
                {
                  title: 'Premium without pretension',
                  body: 'The visual tone feels elevated, but the messaging stays grounded and approachable.',
                  delay: 'delay-5',
                },
              ].map((item) => (
                <div key={item.title} className={`surface-panel animate-rise ${item.delay} rounded-[2rem] p-6`}>
                  <h3 className="text-[2rem] font-semibold tracking-[-0.04em] text-[var(--text-primary)]">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-[var(--text-secondary)]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:px-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="animate-rise">
            <p className="editorial-kicker">What to expect</p>
            <h2 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-[var(--text-primary)]">Relaxed appointments. Clean finishes. No generic chain-salon feel.</h2>
            <p className="mt-5 max-w-xl text-[17px] leading-8 text-[var(--text-secondary)]">
              The experience is intentionally easy to scan and easy to trust. That same principle carries into the appointment itself: consult first, keep the process comfortable, and finish with styling that feels polished but wearable.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                'Consultation before every service',
                'Color and cut options tailored to your routine',
                'Products and techniques chosen for hair health',
                'Event styling available for weddings and celebrations',
              ].map((item, index) => (
                <div key={item} className={`surface-panel animate-rise delay-${Math.min(index + 2, 5)} flex gap-3 rounded-[1.6rem] p-4`}>
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                  <span className="text-sm leading-6 text-[var(--text-secondary)]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                quote: 'Always a great cut and genuinely easy to work with. It feels local in the best way.',
                name: 'Jamie P.',
                delay: 'delay-2',
              },
              {
                quote: 'Professional, relaxed, and consistent. They actually listen before they start.',
                name: 'Alex R.',
                delay: 'delay-3',
              },
              {
                quote: 'Perfect for color maintenance without having to drive into the city.',
                name: 'Morgan T.',
                delay: 'delay-4',
              },
              {
                quote: 'My appointment felt personal, not rushed. The result looked polished immediately.',
                name: 'Samantha L.',
                delay: 'delay-5',
              },
            ].map((item) => (
              <div key={item.name} className={`animate-rise ${item.delay} rounded-[2rem] border border-[var(--border-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(255,240,231,0.92))] p-6 shadow-[var(--shadow-card)]`}>
                <div className="flex gap-1 text-[var(--accent)]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-[15px] leading-7 text-[var(--text-secondary)]">&ldquo;{item.quote}&rdquo;</p>
                <p className="mt-5 font-semibold text-[var(--text-primary)]">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border-subtle)] bg-[linear-gradient(180deg,rgba(255,240,231,0.6),rgba(255,247,240,0.96))] py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="animate-rise">
            <p className="editorial-kicker">Request an appointment</p>
            <h2 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-[var(--text-primary)]">Send a quick note and we’ll follow up.</h2>
            <p className="mt-5 text-[16px] leading-7 text-[var(--text-secondary)]">
              The page is built to lower friction: a focused form, a clear value exchange, and visible protection cues so users feel safe sharing their details.
            </p>
            <div className="mt-8 space-y-3 text-sm leading-6 text-[var(--text-secondary)]">
              <div className="animate-rise delay-2 flex items-start gap-3 rounded-[1.4rem] bg-white/70 p-4 shadow-[var(--shadow-card)]">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                Same-origin checks, rate limiting, payload limits, input sanitization, and a honeypot field remain in place.
              </div>
              <div className="animate-rise delay-3 flex items-start gap-3 rounded-[1.4rem] bg-white/70 p-4 shadow-[var(--shadow-card)]">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                Clear next actions and reassurance copy reduce abandonment and increase perceived trust.
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="surface-panel animate-rise delay-2 rounded-[2.2rem] p-6 md:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <input name="name" value={form.name} onChange={updateField} className={INPUT_CLASS} placeholder="Your name" required />
              <input name="email" type="email" value={form.email} onChange={updateField} className={INPUT_CLASS} placeholder="Email address" required />
              <input name="phone" value={form.phone} onChange={updateField} className={INPUT_CLASS} placeholder="Phone number" />
              <select name="service" value={form.service} onChange={updateField} className={INPUT_CLASS}>
                <option>Haircut & styling</option>
                <option>Color or highlights</option>
                <option>Treatment</option>
                <option>Special occasion styling</option>
                <option>Facial waxing</option>
              </select>
            </div>
            <textarea name="message" value={form.message} onChange={updateField} className={`${INPUT_CLASS} mt-4 min-h-[140px]`} placeholder="Tell us what you want to book or ask about." required />
            <input name="honeypot" value={form.honeypot} onChange={updateField} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            {submitMessage ? <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700">{submitMessage}</div> : null}
            {submitError ? <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700">{submitError}</div> : null}
            <button type="submit" disabled={isSubmitting} className="primary-button mt-5 px-8 py-3.5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? 'Sending...' : 'Send appointment request'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}