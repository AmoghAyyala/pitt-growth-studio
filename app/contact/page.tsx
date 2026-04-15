'use client';

import { useState } from 'react';
import { Clock3, MapPin, Phone } from 'lucide-react';

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  honeypot: string;
};

const INPUT_CLASS =
  'w-full rounded-[1.15rem] border border-[var(--border-subtle)] bg-[var(--bg-input)] px-4 py-3.5 text-[15px] text-[var(--text-primary)] outline-none transition duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]';

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.honeypot) return;

    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? 'Unable to send your message.');
      }

      setSubmitMessage('Your message was sent. We will contact you soon.');
      setForm({
        name: '',
        email: '',
        phone: '',
        service: 'Haircut & styling',
        message: '',
        honeypot: '',
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-16 text-[var(--text-primary)] md:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="animate-rise">
          <p className="editorial-kicker">Contact</p>
          <h1 className="mt-4 text-6xl font-semibold tracking-[-0.05em]">Book your next salon visit.</h1>
          <p className="mt-5 max-w-xl text-[17px] leading-8 text-[var(--text-secondary)]">
            Reach out for appointments, service questions, or availability. If you prefer, you can call directly and we’ll help you find a time that works.
          </p>
          <div className="mt-10 space-y-4">
            {[
              {
                icon: Phone,
                title: 'Call the salon',
                value: '(412) 403-8392',
                detail: 'Best for immediate scheduling questions',
                href: 'tel:4124038392',
              },
              {
                icon: MapPin,
                title: 'Visit us',
                value: '534 Lincoln Avenue, Bellevue, PA 15202',
                detail: 'Inside Monda & Weiss Family Dentistry',
              },
              {
                icon: Clock3,
                title: 'Appointments',
                value: 'Flexible scheduling',
                detail: 'Ask about current openings when you contact us',
              },
            ].map(({ icon: Icon, title, value, detail, href }, index) => (
              <div key={title} className={`surface-panel animate-rise delay-${Math.min(index + 2, 5)} rounded-[1.7rem] p-5`}>
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface-soft)] text-[var(--accent)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)]">{title}</p>
                    {href ? (
                      <a href={href} className="mt-1 block text-lg font-semibold transition hover:text-[var(--accent)]">{value}</a>
                    ) : (
                      <p className="mt-1 text-lg font-semibold">{value}</p>
                    )}
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">{detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="surface-panel surface-glow animate-rise delay-2 rounded-[2.2rem] p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="editorial-kicker">Direct message</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">Send a message</h2>
            </div>
            <div className="rounded-full border border-[var(--accent-soft)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              Safe form flow
            </div>
          </div>
          <form className="mt-6" onSubmit={handleSubmit} autoComplete="off">
            <div className="grid gap-4 md:grid-cols-2">
              <input name="name" value={form.name} onChange={handleChange} className={INPUT_CLASS} placeholder="Your name" required />
              <input name="email" value={form.email} onChange={handleChange} type="email" className={INPUT_CLASS} placeholder="Email address" required />
              <input name="phone" value={form.phone} onChange={handleChange} className={INPUT_CLASS} placeholder="Phone number" />
              <select name="service" value={form.service} onChange={handleChange} className={INPUT_CLASS}>
                <option>Haircut & styling</option>
                <option>Color or highlights</option>
                <option>Treatment</option>
                <option>Special occasion styling</option>
                <option>Facial waxing</option>
              </select>
            </div>
            <textarea name="message" value={form.message} onChange={handleChange} rows={6} className={`${INPUT_CLASS} mt-4`} placeholder="Tell us what you would like to book." required />
            <input name="honeypot" value={form.honeypot} onChange={handleChange} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="mt-4 rounded-[1.4rem] bg-white/65 p-4 text-sm leading-6 text-[var(--text-secondary)] shadow-[var(--shadow-card)]">
              This form is protected with same-origin validation, rate limiting, payload caps, sanitization, and a honeypot field.
            </div>
            {submitMessage ? <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700">{submitMessage}</div> : null}
            {submitError ? <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700">{submitError}</div> : null}
            <button type="submit" disabled={isSubmitting} className="primary-button mt-5 px-7 py-3 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? 'Sending...' : 'Send message'}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}