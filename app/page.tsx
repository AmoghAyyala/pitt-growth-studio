'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  Monitor,
  MousePointer2,
  Search,
  Menu,
  Star,
  X,
  BarChart3,
  TrendingUp,
  Users,
  CheckCircle2,
  Phone,
  Clock,
  MapPin,
  Mail,
  Zap,
  Target,
  Shield,
} from 'lucide-react';

type PageKey = 'home' | 'websites' | 'search-marketing' | 'faqs' | 'book' | 'invoice' | 'contact';

type ServicePageProps = {
  title: string;
  description: string;
  image: string;
  bullets: string[];
};

type FormState = {
  name: string;
  businessName: string;
  email: string;
  service: string;
  message: string;
  honeypot: string;
};

const NAV_PAGES: { key: PageKey; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'websites', label: 'Websites' },
  { key: 'search-marketing', label: 'Google Ads + SEO' },
  { key: 'faqs', label: 'FAQs' },
  { key: 'contact', label: 'Contact' },
];


// ─── DATA ───────────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    name: 'Mike D.',
    business: 'Roofing Company',
    location: 'Pittsburgh, PA',
    result: '+180% more calls in 3 months',
    quote:
      'We went from barely showing up on Google to being one of the first results when someone searches for Pittsburgh roofing. The phone started ringing more, the leads were better quality, and the new website made us look like a real company.',
  },
  {
    name: 'Sarah L.',
    business: 'Med Spa',
    location: 'South Hills, PA',
    result: '+65 new appointment requests/month',
    quote:
      'Before working with them, our website looked outdated and we weren\'t showing up in local searches. Now we rank for key terms, appointment requests are up, and clients tell us they found us on Google.',
  },
  {
    name: 'James R.',
    business: 'Home Services',
    location: 'North Hills, PA',
    result: 'Cut cost-per-lead by 40%',
    quote:
      'The Google Ads they set up actually converted. We stopped wasting money on clicks that went nowhere. Our cost per lead dropped significantly and we\'re booking more jobs than ever.',
  },
];

const FAQS = [
  {
    q: 'What kinds of businesses do you work with?',
    a: 'Mostly local service businesses in Pittsburgh — contractors, med spas, law firms, home services, and similar businesses that rely on local customers finding them online.',
  },
  {
    q: 'How quickly will we see results?',
    a: 'Google Ads can generate leads within days of launch. SEO is a 3–6 month build, but you\'ll see early movement in rankings and traffic within the first month.',
  },
  {
    q: 'Do you require long-term contracts?',
    a: 'No contracts. We work month-to-month because we believe clients should stay because the results are there, not because they\'re locked in.',
  },
  {
    q: 'Do you only build websites or do you run the marketing too?',
    a: 'Both. We handle website builds and ongoing Google Ads + SEO campaigns. Many clients start with one and add the other once they see traction.',
  },
  {
    q: 'How is this different from hiring a big marketing agency?',
    a: 'You\'re working directly with us — not handed off to a junior account manager. We\'re local, we move fast, and we focus on outcomes like leads and calls, not vanity metrics.',
  },
  {
    q: 'What does the onboarding process look like?',
    a: 'We start with a call to understand your business, goals, and current online presence. From there we audit your website, ads, and search visibility and show you exactly what we\'d fix first.',
  },
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Free audit & strategy call',
    desc: 'We review your website, Google presence, and current lead flow. You walk away with a clear picture of what\'s working and what\'s costing you customers.',
  },
  {
    step: '02',
    title: 'We build or fix what matters',
    desc: 'Website, Google Ads campaign, or SEO — we handle the setup, copy, and technical details so you don\'t have to.',
  },
  {
    step: '03',
    title: 'Leads start coming in',
    desc: 'You start getting more calls, form fills, and booked jobs. We monitor and improve continuously based on what the data shows.',
  },
];

const WHO_WE_HELP = [
  { title: 'Home Service Companies', desc: 'Roofing, plumbing, HVAC, landscaping — businesses where every call is worth hundreds or thousands.' },
  { title: 'Medical & Wellness Practices', desc: 'Med spas, chiropractors, dentists — where trust and local search dominance drive new patients.' },
  { title: 'Professional Services', desc: 'Law firms, financial advisors, CPAs — where a strong digital presence converts to high-value clients.' },
  { title: 'Local Retail & Restaurants', desc: 'Businesses that need foot traffic, map visibility, and a site that actually sells.' },
];

const STATS = [
  { value: '50+', label: 'Pittsburgh businesses', icon: Users },
  { value: '4.9★', label: 'Average client rating', icon: Star },
  { value: '+200%', label: 'Avg. lead increase', icon: TrendingUp },
  { value: '30 days', label: 'To first results', icon: Zap },
];

// ─── SHARED COMPONENTS ──────────────────────────────────────────────────────

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1100px] px-6 ${className}`}>{children}</div>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[3px] text-[var(--accent-glow)]">{children}</p>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-[var(--accent)] text-[var(--accent)]" />
      ))}
    </div>
  );
}

function FAQAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => (
        <FadeIn key={faq.q} delay={idx * 0.05}>
          <div className="rounded-[12px] border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden">
            <button
              onClick={() => setOpen(open === idx ? null : idx)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={open === idx}
            >
              <span className="text-[16px] font-semibold text-[var(--text-primary)]">{faq.q}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-[var(--text-muted)] transition-transform duration-300 ${open === idx ? 'rotate-180' : ''}`}
              />
            </button>
            {open === idx && (
              <div className="border-t border-[var(--border-subtle)] px-6 py-5">
                <p className="leading-[1.75] text-[var(--text-secondary)]">{faq.a}</p>
              </div>
            )}
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

// Shared form styles (module-level so they're stable references)
const INPUT_CLASS =
  'w-full rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-input)] px-4 py-3 text-[15px] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] transition-colors duration-200 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20';
const BTN_PRIMARY =
  'inline-flex items-center justify-center gap-2 rounded-[10px] bg-[var(--accent)] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_2px_12px_rgba(37,99,235,0.35)] transition-all duration-200 hover:bg-[var(--accent-hover)] hover:shadow-[0_4px_20px_rgba(37,99,235,0.45)] disabled:cursor-not-allowed disabled:opacity-60';
const BTN_SECONDARY =
  'inline-flex items-center justify-center gap-2 rounded-[10px] border border-[var(--border-subtle)] bg-transparent px-6 py-3.5 text-[15px] font-semibold text-[var(--text-primary)] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]';

// Async form submission helper (shared by BookPage & ContactPage)
async function submitContactForm(form: FormState): Promise<{ ok: boolean; message?: string; error?: string }> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
  const contentType = response.headers.get('content-type') ?? '';
  const rawBody = await response.text();
  let data: { error?: string } | null = null;
  if (contentType.includes('application/json') && rawBody) {
    try { data = JSON.parse(rawBody); } catch { data = null; }
  }
  if (!response.ok) {
    return {
      ok: false,
      error:
        data?.error ||
        (rawBody.startsWith('<!DOCTYPE') || rawBody.startsWith('<html')
          ? 'Server error. Please try again in a moment.'
          : 'Something went wrong. Please try again.'),
    };
  }
  return { ok: true };
}

// ─── BOOK PAGE ───────────────────────────────────────────────────────────────
// Top-level component so it has stable identity — no remount on parent renders

function BookPage({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  const [form, setForm] = useState<FormState>({
    name: '', businessName: '', email: '', service: 'Website Creation', message: '', honeypot: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.honeypot) return;
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitError('');
    const result = await submitContactForm(form);
    if (result.ok) {
      setSubmitMessage("Your request was sent! We'll be in touch soon.");
      setForm({ name: '', businessName: '', email: '', service: 'Website Creation', message: '', honeypot: '' });
    } else {
      setSubmitError(result.error ?? 'Something went wrong. Please try again.');
    }
    setIsSubmitting(false);
  };

  return (
    <section className="bg-[var(--bg-primary)] py-24">
      <Section>
        <FadeIn>
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel>Get Started</SectionLabel>
              <h1 className="mt-3 text-[clamp(36px,5vw,60px)] font-bold tracking-[-1px] text-[var(--text-primary)]">
                Tell us about your business
              </h1>
              <p className="mt-4 max-w-lg text-lg leading-[1.75] text-[var(--text-secondary)]">
                We&apos;ll review your website, Google presence, and current lead flow &mdash; then show you exactly what we&apos;d fix first.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  'A clear picture of where your business stands online today',
                  'Specific opportunities in Google Ads, SEO, and your website',
                  'Practical next steps — no obligation to move forward',
                ].map((text, idx) => (
                  <div key={idx} className="flex gap-3 rounded-[12px] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                    <p className="text-[14px] leading-[1.65] text-[var(--text-secondary)]">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 shadow-lg">
              <h2 className="text-[20px] font-bold text-[var(--text-primary)]">Request a free audit</h2>
              <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
                <input name="name" value={form.name} onChange={handleChange} className={INPUT_CLASS} placeholder="Your name" required />
                <input name="businessName" value={form.businessName} onChange={handleChange} className={INPUT_CLASS} placeholder="Business name" required />
                <input name="email" type="email" value={form.email} onChange={handleChange} className={INPUT_CLASS} placeholder="Email address" required />
                <select name="service" value={form.service} onChange={handleChange} className={INPUT_CLASS}>
                  <option>Website Creation</option>
                  <option>Google Ads + SEO</option>
                  <option>All of the above</option>
                </select>
                <textarea name="message" value={form.message} onChange={handleChange} className={`${INPUT_CLASS} min-h-[120px]`} placeholder="What's your biggest growth challenge right now?" required />
                {/* Honeypot — hidden from real users, traps bots */}
                <input name="honeypot" value={form.honeypot} onChange={handleChange} tabIndex={-1} aria-hidden="true" autoComplete="off" style={{ display: 'none' }} />
                {submitMessage && (
                  <div className="rounded-[10px] border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-3 text-sm text-[var(--accent)]">
                    {submitMessage}
                  </div>
                )}
                {submitError && (
                  <div className="rounded-[10px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {submitError}
                  </div>
                )}
                <button type="submit" disabled={isSubmitting} className={BTN_PRIMARY}>
                  {isSubmitting ? 'Sending...' : 'Send Request'}{' '}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </FadeIn>
      </Section>
    </section>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
// Top-level component so it has stable identity — no remount on parent renders

function ContactPage({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  const [form, setForm] = useState<FormState>({
    name: '', businessName: '', email: '', service: 'Website Creation', message: '', honeypot: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.honeypot) return;
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitError('');
    const result = await submitContactForm(form);
    if (result.ok) {
      setSubmitMessage("Message sent! We'll follow up within one business day.");
      setForm({ name: '', businessName: '', email: '', service: 'Website Creation', message: '', honeypot: '' });
    } else {
      setSubmitError(result.error ?? 'Something went wrong. Please try again.');
    }
    setIsSubmitting(false);
  };

  return (
    <section className="bg-[var(--bg-primary)] py-24">
      <Section>
        <FadeIn>
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel>Contact</SectionLabel>
              <h1 className="mt-3 text-[clamp(36px,5vw,60px)] font-bold tracking-[-1px] text-[var(--text-primary)]">
                Contact &amp; Support
              </h1>
              <p className="mt-4 max-w-lg text-lg leading-[1.75] text-[var(--text-secondary)]">
                Questions about your website, ads, or anything else? We typically reply within one business day.
              </p>
              <div className="mt-10 space-y-4">
                {([
                  { icon: Mail, label: 'Email us', value: 'hello@pittgrowthstudio.com', href: 'mailto:hello@pittgrowthstudio.com', note: 'Response within 1 business day' },
                  { icon: Clock, label: 'Support hours', value: 'Monday \u2013 Friday', href: undefined, note: '9:00 AM \u2013 6:00 PM ET' },
                  { icon: MapPin, label: 'Based in', value: 'Pittsburgh, PA', href: undefined, note: 'Serving businesses across the greater Pittsburgh area' },
                ] as { icon: React.ElementType; label: string; value: string; href?: string; note: string }[]).map(({ icon: Icon, label, value, href, note }) => (
                  <div key={label} className="flex items-start gap-4 rounded-[14px] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[9px] border border-[var(--accent)]/20 bg-[var(--accent)]/10 text-[var(--accent)]">
                      <Icon style={{ width: '18px', height: '18px' }} />
                    </div>
                    <div>
                      <p className="text-[12px] text-[var(--text-muted)]">{label}</p>
                      {href ? (
                        <a href={href} className="mt-0.5 block font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">{value}</a>
                      ) : (
                        <p className="mt-0.5 font-semibold text-[var(--text-primary)]">{value}</p>
                      )}
                      <p className="mt-0.5 text-[13px] text-[var(--text-secondary)]">{note}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[14px] text-[var(--text-secondary)]">
                Looking for quick answers?{' '}
                <button onClick={() => onNavigate('faqs')} className="font-medium text-[var(--accent)] underline underline-offset-2">
                  Check our FAQs
                </button>
              </p>
            </div>
            <div className="rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 shadow-lg">
              <h2 className="text-[20px] font-bold text-[var(--text-primary)]">Send a message</h2>
              <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
                <input name="name" value={form.name} onChange={handleChange} className={INPUT_CLASS} placeholder="Your name" required />
                <input name="businessName" value={form.businessName} onChange={handleChange} className={INPUT_CLASS} placeholder="Business name" required />
                <input name="email" type="email" value={form.email} onChange={handleChange} className={INPUT_CLASS} placeholder="Email address" required />
                <select name="service" value={form.service} onChange={handleChange} className={INPUT_CLASS}>
                  <option>Website Creation</option>
                  <option>Google Ads + SEO</option>
                  <option>Billing / Payments</option>
                  <option>General Question</option>
                  <option>Other</option>
                </select>
                <textarea name="message" value={form.message} onChange={handleChange} className={`${INPUT_CLASS} min-h-[130px]`} placeholder="How can we help?" required />
                {/* Honeypot — hidden from real users, traps bots */}
                <input name="honeypot" value={form.honeypot} onChange={handleChange} tabIndex={-1} aria-hidden="true" autoComplete="off" style={{ display: 'none' }} />
                {submitMessage && (
                  <div className="rounded-[10px] border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-3 text-sm text-[var(--accent)]">
                    {submitMessage}
                  </div>
                )}
                {submitError && (
                  <div className="rounded-[10px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {submitError}
                  </div>
                )}
                <button type="submit" disabled={isSubmitting} className={BTN_PRIMARY}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}{' '}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </FadeIn>
      </Section>
    </section>
  );
}

// ─── SERVICE PAGE ────────────────────────────────────────────────────────────

function ServicePage({ title, description, image, bullets }: ServicePageProps) {
  return (
    <section className="bg-[var(--bg-primary)] py-20">
      <Section>
        <FadeIn>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="text-[clamp(36px,5vw,60px)] font-bold leading-[1.1] tracking-[-1px] text-[var(--text-primary)]">
                {title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-[1.75] text-[var(--text-secondary)]">{description}</p>
              <ul className="mt-8 space-y-4">
                {bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                    <span className="leading-[1.7] text-[var(--text-secondary)]">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-hidden rounded-[16px] border border-[var(--border-subtle)] shadow-2xl">
              <img src={image} alt={title} className="h-[460px] w-full object-cover" />
            </div>
          </div>
        </FadeIn>
      </Section>
    </section>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function PittsburghAgencySite() {
  const [page, setPage] = useState<PageKey>('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Invoice state
  const [invoiceUnlocked, setInvoiceUnlocked] = useState(false);
  const [invoicePassword, setInvoicePassword] = useState('');
  const [invoicePasswordError, setInvoicePasswordError] = useState('');
  const [invoiceClientName, setInvoiceClientName] = useState('');
  const [invoiceClientEmail, setInvoiceClientEmail] = useState('');
  const [invoiceService, setInvoiceService] = useState('');
  const [invoiceUpfront, setInvoiceUpfront] = useState('');
  const [invoiceMonthly, setInvoiceMonthly] = useState('');
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  const [invoiceSuccess, setInvoiceSuccess] = useState('');
  const [invoiceError, setInvoiceError] = useState('');
  const [invoiceUpfrontUrl, setInvoiceUpfrontUrl] = useState('');
  const [invoiceMonthlyUrl, setInvoiceMonthlyUrl] = useState('');

  // Refund state
  const [refundPaymentId, setRefundPaymentId] = useState('');
  const [refundLoading, setRefundLoading] = useState(false);
  const [refundSuccess, setRefundSuccess] = useState('');
  const [refundError, setRefundError] = useState('');

  const switchPage = (nextPage: PageKey) => {
    setPage(nextPage);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInvoiceUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setInvoicePasswordError('');
    const res = await fetch('/api/send-invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: invoicePassword, checkOnly: true }),
    });
    if (res.status === 401) {
      setInvoicePasswordError('Incorrect password.');
    } else {
      setInvoiceUnlocked(true);
    }
  };

  const handleSendInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    setInvoiceError('');
    setInvoiceSuccess('');
    setInvoiceUpfrontUrl('');
    setInvoiceMonthlyUrl('');
    setInvoiceLoading(true);
    try {
      const res = await fetch('/api/send-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: invoicePassword,
          clientName: invoiceClientName,
          clientEmail: invoiceClientEmail,
          serviceDescription: invoiceService,
          upfrontAmount: invoiceUpfront,
          monthlyAmount: invoiceMonthly,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to send invoice.');
      setInvoiceSuccess(`Payment link(s) sent to ${invoiceClientEmail}!`);
      if (data.upfrontUrl) setInvoiceUpfrontUrl(data.upfrontUrl);
      if (data.monthlyUrl) setInvoiceMonthlyUrl(data.monthlyUrl);
      setInvoiceClientName('');
      setInvoiceClientEmail('');
      setInvoiceService('');
      setInvoiceUpfront('');
      setInvoiceMonthly('');
    } catch (err) {
      setInvoiceError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setInvoiceLoading(false);
    }
  };

  const handleRefund = async () => {
    setRefundError('');
    setRefundSuccess('');
    if (!refundPaymentId.trim()) {
      setRefundError('Please enter a Payment Intent ID.');
      return;
    }
    setRefundLoading(true);
    try {
      const res = await fetch('/api/refund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: invoicePassword, paymentIntentId: refundPaymentId.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Refund failed.');
      setRefundSuccess(`Refund issued successfully (ID: ${data.refundId})`);
      setRefundPaymentId('');
    } catch (err) {
      setRefundError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setRefundLoading(false);
    }
  };

  // ─── HOME ──────────────────────────────────────────────────────────────────
  const HomePage = () => (
    <>
      {/* HERO */}
      <section className="bg-[var(--bg-primary)] pt-20 pb-24 md:pt-28 md:pb-32">
        <Section>
          <div className="grid items-center gap-16 lg:grid-cols-[1fr_420px]">
            <FadeIn>
              {/* Status pill */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/8 px-4 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                  <span className="relative inline-block h-2 w-2 rounded-full bg-[var(--accent)]" />
                </span>
                <span className="text-[12px] font-semibold uppercase tracking-[2.5px] text-[var(--accent)]">
                  Accepting new clients
                </span>
              </div>

              <h1 className="text-[clamp(40px,5.5vw,68px)] font-bold leading-[1.07] tracking-[-1.5px] text-[var(--text-primary)]">
                More calls.{' '}
                <span className="text-[var(--accent)]">More clients.</span>
                <br />
                Better Google rankings.
              </h1>

              <p className="mt-6 max-w-[520px] text-[18px] leading-[1.75] text-[var(--text-secondary)]">
                We build high-converting websites and run Google Ads + SEO for Pittsburgh businesses that
                want more qualified leads — not just more traffic.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => switchPage('book')}
                  className={`${BTN_PRIMARY} group`}
                >
                  Get a Free Growth Plan{' '}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => switchPage('faqs')}
                  className={BTN_SECONDARY}
                >
                  See How It Works
                </button>
              </div>

              {/* Social proof row */}
              <div className="mt-8 flex items-center gap-4 border-t border-[var(--border-subtle)] pt-6">
                <div className="flex -space-x-2">
                  {['M', 'S', 'J', 'R'].map((letter, i) => (
                    <div
                      key={i}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)]/15 text-xs font-bold text-[var(--accent)] ring-2 ring-[var(--bg-primary)]"
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <div>
                  <Stars />
                  <p className="mt-0.5 text-[13px] text-[var(--text-secondary)]">
                    <span className="font-semibold text-[var(--text-primary)]">50+ Pittsburgh businesses</span> trust us with their growth
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Right: proof card */}
            <FadeIn delay={0.15}>
              <div className="rounded-[20px] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-7 shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
                <p className="text-[11px] font-semibold uppercase tracking-[2.5px] text-[var(--text-muted)]">Recent client results</p>
                <div className="mt-5 space-y-4">
                  {[
                    { label: 'Roofing Co. — Monthly Calls', before: '12', after: '47', pct: '+292%' },
                    { label: 'Med Spa — New Patients/mo', before: '8', after: '31', pct: '+288%' },
                    { label: 'HVAC — Cost Per Lead', before: '$85', after: '$38', pct: '−55%' },
                  ].map((row) => (
                    <div key={row.label} className="rounded-[12px] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-4">
                      <p className="text-[12px] font-medium text-[var(--text-muted)]">{row.label}</p>
                      <div className="mt-2 flex items-center gap-3">
                        <span className="text-[13px] text-[var(--text-muted)] line-through">{row.before}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-[var(--accent)]" />
                        <span className="text-[18px] font-bold text-[var(--text-primary)]">{row.after}</span>
                        <span className="ml-auto rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[12px] font-semibold text-emerald-400">
                          {row.pct}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-2 rounded-[10px] bg-[var(--accent)]/8 px-4 py-3">
                  <Shield className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                  <p className="text-[12px] text-[var(--text-secondary)]">No contracts · Results in 30 days or we refund</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </Section>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-[var(--border-subtle)] bg-[var(--bg-secondary)] py-4">
        <Section>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              { icon: CheckCircle2, text: 'No long-term contracts' },
              { icon: Zap, text: 'First results within 30 days' },
              { icon: Target, text: 'Free website & SEO audit' },
              { icon: MapPin, text: 'Pittsburgh-based team' },
              { icon: Star, text: '4.9/5 client rating' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-[13px] font-medium text-[var(--text-secondary)]">
                <Icon className="h-4 w-4 text-[var(--accent)]" />
                {text}
              </div>
            ))}
          </div>
        </Section>
      </section>

      {/* WHO WE HELP */}
      <section className="bg-[var(--bg-primary)] py-24">
        <Section>
          <FadeIn>
            <div className="max-w-2xl">
              <SectionLabel>Who We Help</SectionLabel>
              <h2 className="mt-3 text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.75px] text-[var(--text-primary)]">
                Built for local businesses that compete on Google
              </h2>
              <p className="mt-4 text-lg leading-[1.75] text-[var(--text-secondary)]">
                We work best with established Pittsburgh businesses that get most of their customers locally and want a reliable, predictable way to grow.
              </p>
            </div>
          </FadeIn>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHO_WE_HELP.map((item, idx) => (
              <FadeIn key={item.title} delay={idx * 0.1}>
                <div className="rounded-[14px] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 h-full">
                  <h3 className="text-[16px] font-bold text-[var(--text-primary)]">{item.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.65] text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>
      </section>

      {/* SERVICES */}
      <section className="bg-[var(--bg-secondary)] py-24">
        <Section>
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <SectionLabel>Services</SectionLabel>
              <h2 className="mt-3 text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.75px] text-[var(--text-primary)]">
                Three ways we generate more leads for your business
              </h2>
            </div>
          </FadeIn>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                key: 'websites' as PageKey,
                icon: Monitor,
                title: 'Website Design & Build',
                tagline: 'Turn visitors into leads',
                desc: 'Fast, mobile-first websites designed around how your customers think — not just how they look.',
                bullets: [
                  'Conversion-focused layout and copy',
                  'Built for local search intent',
                  'Clear calls to action on every page',
                  'Hosting setup and launch support',
                ],
              },
              {
                key: 'search-marketing' as PageKey,
                icon: Search,
                title: 'Local SEO',
                tagline: 'Rank where it matters',
                desc: 'Show up when local customers search for what you do — and stay there.',
                bullets: [
                  'Google Business Profile optimization',
                  'Local keyword targeting',
                  'Technical SEO fixes',
                  'Content built for local search',
                ],
              },
              {
                key: 'search-marketing' as PageKey,
                icon: MousePointer2,
                title: 'Google Ads',
                tagline: 'Drive leads now',
                desc: 'Targeted paid campaigns that reach customers ready to hire — not just browse.',
                bullets: [
                  'Campaign strategy and setup',
                  'AI-assisted keyword targeting',
                  'Budget optimization for lead cost',
                  'Conversion tracking and reporting',
                ],
              },
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <FadeIn key={service.title} delay={idx * 0.12}>
                  <button
                    onClick={() => switchPage(service.key)}
                    className="group flex h-full w-full flex-col rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/40 hover:shadow-[0_8px_32px_rgba(37,99,235,0.12)]"
                  >
                    <div className="inline-flex rounded-[10px] border border-[var(--accent)]/20 bg-[var(--accent)]/10 p-3 text-[var(--accent)]">
                      <Icon className="h-5 w-5 stroke-[1.75]" />
                    </div>
                    <p className="mt-5 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--accent)]">{service.tagline}</p>
                    <h3 className="mt-2 text-[20px] font-bold text-[var(--text-primary)]">{service.title}</h3>
                    <p className="mt-3 flex-1 text-[14px] leading-[1.7] text-[var(--text-secondary)]">{service.desc}</p>
                    <ul className="mt-5 space-y-2">
                      {service.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-[13px] text-[var(--text-secondary)]">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex items-center gap-1.5 text-[13px] font-semibold text-[var(--accent)] transition-all duration-200 group-hover:gap-2.5">
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </button>
                </FadeIn>
              );
            })}
          </div>
        </Section>
      </section>

      {/* WHY US */}
      <section className="bg-[var(--bg-primary)] py-24">
        <Section>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <FadeIn>
              <SectionLabel>Why Pittsburgh Growth Studio</SectionLabel>
              <h2 className="mt-3 text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.75px] text-[var(--text-primary)]">
                We focus on leads, not likes
              </h2>
              <p className="mt-4 text-lg leading-[1.75] text-[var(--text-secondary)]">
                Most agencies report on traffic, impressions, and rankings. We report on what actually grows your business: calls, form fills, and booked jobs.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  {
                    icon: Target,
                    title: 'Outcome-first strategy',
                    desc: 'Every decision is driven by what will generate the most qualified leads for your specific business and market.',
                  },
                  {
                    icon: MapPin,
                    title: 'Local expertise',
                    desc: 'We know Pittsburgh\'s neighborhoods, competition, and search patterns. We\'re not a generic remote agency applying a template.',
                  },
                  {
                    icon: Zap,
                    title: 'Fast, transparent execution',
                    desc: 'No handoffs to junior account managers. You work directly with us, with clear communication and fast turnarounds.',
                  },
                  {
                    icon: Shield,
                    title: 'No-contract model',
                    desc: 'Month-to-month only. We earn your business every month by delivering results, not by locking you into long agreements.',
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <FadeIn key={item.title} delay={idx * 0.08}>
                      <div className="flex gap-4 rounded-[12px] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[9px] border border-[var(--accent)]/20 bg-[var(--accent)]/10 text-[var(--accent)]">
                          <Icon className="h-4.5 w-4.5" style={{ width: '18px', height: '18px' }} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[var(--text-primary)]">{item.title}</h3>
                          <p className="mt-1 text-[14px] leading-[1.65] text-[var(--text-secondary)]">{item.desc}</p>
                        </div>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            </FadeIn>

            {/* Stats */}
            <FadeIn delay={0.1}>
              <div className="grid grid-cols-2 gap-5">
                {STATS.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 text-center">
                      <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-[10px] border border-[var(--accent)]/20 bg-[var(--accent)]/10 text-[var(--accent)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-[32px] font-bold tracking-tight text-[var(--text-primary)]">{stat.value}</div>
                      <div className="mt-1 text-[13px] text-[var(--text-secondary)]">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </FadeIn>
          </div>
        </Section>
      </section>

      {/* PROCESS */}
      <section className="bg-[var(--bg-secondary)] py-24">
        <Section>
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <SectionLabel>How It Works</SectionLabel>
              <h2 className="mt-3 text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.75px] text-[var(--text-primary)]">
                From first call to first lead in under 30 days
              </h2>
            </div>
          </FadeIn>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {PROCESS_STEPS.map((step, idx) => (
              <FadeIn key={step.step} delay={idx * 0.12}>
                <div className="relative rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-7">
                  <span className="text-[48px] font-black leading-none tracking-tight text-[var(--accent)]/15">
                    {step.step}
                  </span>
                  <h3 className="mt-3 text-[18px] font-bold text-[var(--text-primary)]">{step.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.7] text-[var(--text-secondary)]">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>
      </section>

      {/* CASE STUDIES / TESTIMONIALS */}
      <section className="bg-[var(--bg-primary)] py-24">
        <Section>
          <FadeIn>
            <div className="max-w-2xl">
              <SectionLabel>Client Results</SectionLabel>
              <h2 className="mt-3 text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.75px] text-[var(--text-primary)]">
                Real businesses, real numbers
              </h2>
              <p className="mt-4 text-lg leading-[1.75] text-[var(--text-secondary)]">
                Every testimonial below is paired with the actual outcome that client saw.
              </p>
            </div>
          </FadeIn>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((item, idx) => (
              <FadeIn key={item.name} delay={idx * 0.12}>
                <div className="flex h-full flex-col rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
                  <Stars />
                  {/* Result badge */}
                  <div className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-[12px] font-semibold text-emerald-400">{item.result}</span>
                  </div>
                  <blockquote className="mt-4 flex-1 text-[14px] italic leading-[1.75] text-[var(--text-secondary)]">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <div className="mt-5 border-t border-[var(--border-subtle)] pt-4">
                    <p className="font-semibold text-[var(--text-primary)]">{item.name}</p>
                    <p className="text-[13px] text-[var(--text-muted)]">
                      {item.business} &middot; {item.location}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg-secondary)] py-24">
        <Section>
          <div className="grid gap-16 lg:grid-cols-[380px_1fr]">
            <FadeIn>
              <SectionLabel>FAQ</SectionLabel>
              <h2 className="mt-3 text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.75px] text-[var(--text-primary)]">
                Common questions
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] leading-[1.75]">
                Straight answers about how we work, what to expect, and what makes us different.
              </p>
              <button
                onClick={() => switchPage('contact')}
                className={`mt-8 ${BTN_SECONDARY}`}
              >
                Still have questions?
              </button>
            </FadeIn>
            <FadeIn delay={0.1}>
              <FAQAccordion faqs={FAQS} />
            </FadeIn>
          </div>
        </Section>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[var(--bg-primary)] py-24">
        <Section>
          <FadeIn>
            <div className="rounded-[20px] border border-[var(--accent)]/20 bg-[var(--bg-card)] px-8 py-14 text-center shadow-[0_0_60px_rgba(37,99,235,0.08)] md:px-16">
              <span className="inline-flex rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[2.5px] text-[var(--accent)]">
                Limited spots available
              </span>
              <h2 className="mx-auto mt-5 max-w-2xl text-[clamp(28px,4vw,48px)] font-bold tracking-[-0.75px] text-[var(--text-primary)]">
                Stop losing leads to competitors who rank above you
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-lg leading-[1.75] text-[var(--text-secondary)]">
                Get a free audit of your website and Google presence. We&apos;ll show you exactly what&apos;s costing you leads and what we&apos;d do first.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[13px] text-[var(--text-secondary)]">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[var(--accent)]" /> Free, no-obligation audit</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[var(--accent)]" /> Custom strategy included</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[var(--accent)]" /> No contracts</span>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => switchPage('book')}
                  className={`${BTN_PRIMARY} group text-[16px] px-8 py-4`}
                >
                  Claim Your Free Audit{' '}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
                <a href="mailto:hello@pittgrowthstudio.com" className={`${BTN_SECONDARY} gap-2`}>
                  <Mail className="h-4 w-4" />
                  Email us directly
                </a>
              </div>
            </div>
          </FadeIn>
        </Section>
      </section>
    </>
  );

  // ─── FAQ PAGE ───────────────────────────────────────────────────────────────
  const FAQPage = () => (
    <section className="bg-[var(--bg-primary)] py-24">
      <Section>
        <FadeIn>
          <div className="max-w-3xl">
            <SectionLabel>FAQs</SectionLabel>
            <h1 className="mt-3 text-[clamp(36px,5vw,60px)] font-bold tracking-[-1px] text-[var(--text-primary)]">
              Frequently asked questions
            </h1>
            <p className="mt-4 text-lg leading-[1.75] text-[var(--text-secondary)]">
              Quick answers about what we do, who we help, and what to expect.
            </p>
          </div>
        </FadeIn>
        <div className="mt-12 max-w-3xl">
          <FAQAccordion faqs={FAQS} />
        </div>
        <FadeIn>
          <div className="mt-12 rounded-[14px] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-7">
            <p className="font-semibold text-[var(--text-primary)]">Still have a question?</p>
            <p className="mt-1 text-[14px] text-[var(--text-secondary)]">
              Email us at{' '}
              <a href="mailto:hello@pittgrowthstudio.com" className="font-medium text-[var(--accent)] underline underline-offset-2">
                hello@pittgrowthstudio.com
              </a>{' '}
              and we&apos;ll get back to you within one business day.
            </p>
          </div>
        </FadeIn>
      </Section>
    </section>
  );

  // ─── INVOICE PAGE ───────────────────────────────────────────────────────────
  const InvoicePage = () => (
    <section className="bg-[var(--bg-primary)] py-24">
      <Section>
        <div className="mx-auto max-w-lg">
          <SectionLabel>Admin</SectionLabel>
          <h1 className="mt-3 text-[clamp(36px,5vw,60px)] font-bold tracking-[-1px] text-[var(--text-primary)]">Send Invoice</h1>
          <p className="mt-4 text-lg leading-[1.75] text-[var(--text-secondary)]">
            Create a Stripe payment link and email it directly to a client.
          </p>
          {!invoiceUnlocked ? (
            <form onSubmit={handleInvoiceUnlock} className="mt-10 rounded-[14px] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 shadow-lg">
              <label className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">Admin password</label>
              <input
                type="password"
                value={invoicePassword}
                onChange={(e) => setInvoicePassword(e.target.value)}
                autoComplete="current-password"
                className={INPUT_CLASS}
                placeholder="Enter password"
                required
              />
              {invoicePasswordError && <p className="mt-2 text-sm text-red-400">{invoicePasswordError}</p>}
              <button type="submit" className={`mt-4 w-full ${BTN_PRIMARY}`}>
                Unlock <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          ) : (
            <>
              <form onSubmit={handleSendInvoice} className="mt-10 rounded-[14px] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 shadow-lg">
                <div className="grid gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">Client name <span className="text-red-400">*</span></label>
                    <input value={invoiceClientName} onChange={(e) => setInvoiceClientName(e.target.value)} className={INPUT_CLASS} placeholder="e.g. Smith Roofing" required />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">Client email <span className="text-red-400">*</span></label>
                    <input type="email" value={invoiceClientEmail} onChange={(e) => setInvoiceClientEmail(e.target.value)} className={INPUT_CLASS} placeholder="client@example.com" required />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">Service description</label>
                    <input value={invoiceService} onChange={(e) => setInvoiceService(e.target.value)} className={INPUT_CLASS} placeholder="e.g. Website + Google Ads Package" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">Upfront fee ($)</label>
                    <input type="number" min="0" step="0.01" value={invoiceUpfront} onChange={(e) => setInvoiceUpfront(e.target.value)} className={INPUT_CLASS} placeholder="0.00" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">Monthly fee ($)</label>
                    <input type="number" min="0" step="0.01" value={invoiceMonthly} onChange={(e) => setInvoiceMonthly(e.target.value)} className={INPUT_CLASS} placeholder="0.00" />
                  </div>
                  {(parseFloat(invoiceUpfront) > 0 || parseFloat(invoiceMonthly) > 0) && (
                    <div className="rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-3 text-sm text-[var(--text-secondary)] space-y-1">
                      {parseFloat(invoiceUpfront) > 0 && (
                        <div>Deposit: <span className="font-semibold text-[var(--text-primary)]">${parseFloat(invoiceUpfront).toFixed(2)}</span> <span className="text-[var(--text-muted)]">(charged once)</span></div>
                      )}
                      {parseFloat(invoiceMonthly) > 0 && (
                        <div>Monthly: <span className="font-semibold text-[var(--text-primary)]">${parseFloat(invoiceMonthly).toFixed(2)}/mo</span> <span className="text-[var(--text-muted)]">(recurring)</span></div>
                      )}
                    </div>
                  )}
                  {invoiceError && <div className="rounded-[10px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">{invoiceError}</div>}
                  {invoiceSuccess && (
                    <div className="rounded-[10px] border border-[var(--accent)]/30 bg-[var(--accent)]/10 p-4 text-sm text-[var(--accent)] space-y-2">
                      <p className="font-medium">{invoiceSuccess}</p>
                      {invoiceUpfrontUrl && <p>Deposit link: <a href={invoiceUpfrontUrl} target="_blank" rel="noopener noreferrer" className="underline break-all">{invoiceUpfrontUrl}</a></p>}
                      {invoiceMonthlyUrl && <p>Monthly link: <a href={invoiceMonthlyUrl} target="_blank" rel="noopener noreferrer" className="underline break-all">{invoiceMonthlyUrl}</a></p>}
                    </div>
                  )}
                  <button type="submit" disabled={invoiceLoading} className={BTN_PRIMARY}>
                    {invoiceLoading ? 'Sending...' : 'Send Payment Link'} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
              <div className="mt-8 rounded-[14px] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 shadow-lg">
                <h2 className="text-[20px] font-bold text-[var(--text-primary)]">Refund a Payment</h2>
                <p className="mt-2 text-sm leading-[1.7] text-[var(--text-secondary)]">
                  Issue a full refund. Find the Payment Intent ID in Stripe (starts with <span className="font-mono text-[var(--text-primary)]">pi_</span>).
                </p>
                <div className="mt-4 grid gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">Payment Intent ID</label>
                    <input value={refundPaymentId} onChange={(e) => setRefundPaymentId(e.target.value)} className={`${INPUT_CLASS} font-mono text-sm`} placeholder="pi_3..." />
                  </div>
                  {refundError && <div className="rounded-[10px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">{refundError}</div>}
                  {refundSuccess && <div className="rounded-[10px] border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-3 text-sm text-[var(--accent)]">{refundSuccess}</div>}
                  <button onClick={handleRefund} disabled={refundLoading} className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[var(--border-subtle)] px-6 py-3.5 font-semibold text-[var(--text-primary)] transition-all duration-200 hover:border-red-500/40 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-60">
                    {refundLoading ? 'Processing...' : 'Issue Full Refund'} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </Section>
    </section>
  );

  // ─── ROUTER ─────────────────────────────────────────────────────────────────
  const currentPage = () => {
    if (page === 'websites') {
      return (
        <ServicePage
          title="Websites that turn visitors into calls and clients"
          description="We build fast, conversion-focused websites with clear messaging, strong CTAs, and technical setup that supports your Google Ads and SEO."
          image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80"
          bullets={[
            'Mobile-first design built for local business credibility and conversion',
            'Clear service pages structured around what customers are searching for',
            'Hosting setup, domain connection, and dependable launch support',
            'Layouts optimized for calls, form fills, and supporting your Google campaigns',
          ]}
        />
      );
    }
    if (page === 'search-marketing') {
      return (
        <ServicePage
          title="Google Ads + SEO that drive qualified local leads"
          description="We combine Google Ads, local SEO, and AI-assisted keyword analysis to build better visibility, stronger lead flow, and more coverage over time."
          image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=80"
          bullets={[
            'Paid and organic keyword strategy aligned around local search intent',
            'AI-assisted search term analysis to find high-intent opportunities',
            'Google Ads campaigns built for qualified calls and form submissions',
            'SEO across your website, service pages, content, and Google Business Profile',
            'Reporting focused on lead quality, search visibility, and business growth',
          ]}
        />
      );
    }
    if (page === 'contact') return <ContactPage onNavigate={switchPage} />;
    if (page === 'invoice') return <InvoicePage />;
    if (page === 'faqs') return <FAQPage />;
    if (page === 'book') return <BookPage onNavigate={switchPage} />;
    return <HomePage />;
  };

  // ─── SHELL ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 px-6 py-4">
          <button onClick={() => switchPage('home')} className="text-left focus:outline-none">
            <img src="/logo.svg" alt="Pittsburgh Growth Studio" className="h-9 w-auto" />
          </button>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {NAV_PAGES.map((item) => (
              <button
                key={item.key}
                onClick={() => switchPage(item.key)}
                className={`text-[14px] font-medium tracking-[0.2px] transition-colors duration-200 ${
                  page === item.key
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => switchPage('book')}
              className="hidden sm:inline-flex items-center gap-2 rounded-[9px] bg-[var(--accent)] px-5 py-2.5 text-[14px] font-semibold text-white shadow-[0_2px_10px_rgba(37,99,235,0.3)] transition-all duration-200 hover:bg-[var(--accent-hover)]"
            >
              Get Free Audit
            </button>
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="rounded-[9px] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-2.5 text-[var(--text-secondary)] lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-card)] lg:hidden">
            <div className="mx-auto flex max-w-[1100px] flex-col gap-1 px-6 py-3">
              {NAV_PAGES.map((item) => (
                <button
                  key={item.key}
                  onClick={() => switchPage(item.key)}
                  className="rounded-[8px] px-3 py-2.5 text-left text-[14px] font-medium text-[var(--text-secondary)] transition-colors duration-200 hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => switchPage('book')}
                className="mt-2 rounded-[9px] bg-[var(--accent)] px-5 py-3 text-center text-[14px] font-semibold text-white"
              >
                Get Free Audit
              </button>
            </div>
          </div>
        )}
      </header>

      {/* MAIN */}
      <main>{currentPage()}</main>

      {/* FOOTER */}
      <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
        <Section className="py-10">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex flex-col items-center gap-2 sm:items-start">
              <img src="/logo.svg" alt="Pittsburgh Growth Studio" className="h-8 w-auto" />
              <p className="text-[13px] text-[var(--text-muted)]">
                &copy; {new Date().getFullYear()} Pittsburgh Growth Studio &middot; Pittsburgh, PA
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-5 text-[13px] text-[var(--text-secondary)]">
              <button onClick={() => switchPage('websites')} className="transition-colors duration-200 hover:text-[var(--text-primary)]">Websites</button>
              <button onClick={() => switchPage('search-marketing')} className="transition-colors duration-200 hover:text-[var(--text-primary)]">Google Ads + SEO</button>
              <button onClick={() => switchPage('faqs')} className="transition-colors duration-200 hover:text-[var(--text-primary)]">FAQs</button>
              <button onClick={() => switchPage('contact')} className="transition-colors duration-200 hover:text-[var(--text-primary)]">Contact</button>
              <a href="mailto:hello@pittgrowthstudio.com" className="flex items-center gap-1.5 transition-colors duration-200 hover:text-[var(--text-primary)]">
                <Mail className="h-3.5 w-3.5" />
                hello@pittgrowthstudio.com
              </a>
            </div>
          </div>
        </Section>
      </footer>
    </div>
  );
}
