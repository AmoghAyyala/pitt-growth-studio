'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  ChevronRight,
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

const pages: { key: PageKey; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'websites', label: 'Websites' },
  { key: 'search-marketing', label: 'Google Ads + SEO' },
  { key: 'faqs', label: 'FAQs' },
  { key: 'contact', label: 'Contact' },
];

const testimonials = [
  {
    name: 'Mike D.',
    business: 'Roofing Company, Pittsburgh',
    quote:
      'After the SEO work, we started appearing much higher when people searched for Pittsburgh roofing company. We got more calls, more positive customer feedback, and more jobs from people who were ready to hire.',
  },
  {
    name: 'Sarah L.',
    business: 'Med Spa, South Hills',
    quote:
      'We began showing up better for searches related to med spa services in the area, and that brought in more appointment requests. We also noticed more happy client reviews coming in once our online presence looked stronger.',
  },
  {
    name: 'James R.',
    business: 'Home Services Business, North Hills',
    quote:
      'Once the new website and ads were live, we were getting better leads and more actual clients. We also started hearing much better feedback from customers because the business looked more established online.',
  },
];

const faqs = [
  {
    q: 'What kinds of businesses do you work with?',
    a: 'We mainly help local service businesses and small businesses in the Pittsburgh area that want more calls, inquiries, and clients.',
  },
  {
    q: 'How do you help us show up higher on Google?',
    a: 'We combine Google Ads and local search optimization so your business can capture demand now while building stronger long-term visibility.',
  },
  {
    q: 'Do you only build websites or do you market them too?',
    a: 'We do both. We help with the main things local businesses need to look stronger online and make it easier for customers to find and contact them.',
  },
  {
    q: 'How soon can we get started?',
    a: 'Most businesses can get started quickly once we understand your goals and what kind of help you need.',
  },
  {
    q: 'What happens when we get started?',
    a: 'We talk through your business, your current online presence, and the next steps that would make the biggest difference.',
  },
];

const resultStats = [
  { value: '+200%', label: 'More Leads', icon: TrendingUp },
  { value: '+150%', label: 'More Traffic', icon: BarChart3 },
  { value: '4.9/5', label: 'Client Rating', icon: Star },
  { value: '50+', label: 'Businesses Helped', icon: Users },
];

const serviceCards = [
  {
    key: 'websites' as PageKey,
    title: 'Website Design',
    text: 'Clean, conversion-focused websites with strong messaging and clear paths to more calls and inquiries.',
    icon: Monitor,
  },
  {
    key: 'search-marketing' as PageKey,
    title: 'SEO',
    text: 'Rank higher in local search results with technical SEO, content strategy, and Google Business Profile optimization.',
    icon: Search,
  },
  {
    key: 'search-marketing' as PageKey,
    title: 'Google Ads',
    text: 'Targeted ad campaigns that put your business in front of customers actively searching for your services.',
    icon: MousePointer2,
  },
];

const quizQuestions = [
  { q: 'What best describes your business?', opts: ['Local Service', 'Retail / eCommerce', 'Professional Services', 'Restaurant / Food'] },
  { q: "What's your biggest challenge right now?", opts: ['Not enough leads', 'Low website traffic', 'Poor Google rankings', 'Weak online presence'] },
  { q: 'How are customers currently finding you?', opts: ['Word of mouth', 'Google Search', 'Social media', "I'm not sure"] },
  { q: "What's your monthly marketing budget?", opts: ['Under $500', '$500\u2013$1,500', '$1,500\u2013$3,000', '$3,000+'] },
  { q: 'How old is your current website?', opts: ['Less than 1 year', '1\u20133 years', '3\u20135 years', "I don't have one"] },
  { q: "What's your #1 goal for the next 6 months?", opts: ['More phone calls', 'More form submissions', 'Higher Google ranking', 'More foot traffic'] },
];

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto max-w-[1100px] px-6 ${className}`}>
      {children}
    </div>
  );
}

function Stars() {
  return (
    <div className="flex items-center gap-0.5 text-[var(--accent)]">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="h-4 w-4 fill-current" />
      ))}
    </div>
  );
}

function ServicePage({ title, description, image, bullets }: ServicePageProps) {
  return (
    <Section className="py-20">
      <FadeIn>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-[clamp(40px,6vw,72px)] font-bold leading-[1.1] tracking-[-1px] text-[var(--text-primary)]">{title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-[1.7] text-[var(--text-secondary)]">{description}</p>
            <div className="mt-8 space-y-4">
              {bullets.map((bullet) => (
                <div key={bullet} className="flex gap-3 text-[var(--text-secondary)]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                  <p className="leading-[1.7]">{bullet}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <a href="#book" className="btn-shimmer inline-flex items-center gap-2 rounded-[12px] px-6 py-3.5 text-[15px] font-semibold tracking-[0.3px] text-white shadow-lg">
                Get Started <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-[14px] border border-white/5 shadow-2xl">
            <img src={image} alt={title} className="h-[460px] w-full object-cover" />
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}

export default function PittsburghAgencySite() {
  const [page, setPage] = useState<PageKey>('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: '',
    businessName: '',
    email: '',
    service: 'Website Creation',
    message: '',
    honeypot: '',
  });

  // Invoice (admin) state
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

  // Quiz state
  const [quizStep, setQuizStep] = useState(-1);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizName, setQuizName] = useState('');
  const [quizEmail, setQuizEmail] = useState('');
  const quizRef = useRef<HTMLDivElement>(null);

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const switchPage = (nextPage: PageKey) => {
    setPage(nextPage);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fireConfetti = async () => {
    if (typeof window === 'undefined') return;
    if (!(window as unknown as Record<string, unknown>).confetti) {
      await new Promise<void>((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
        script.onload = () => resolve();
        script.onerror = () => resolve();
        document.head.appendChild(script);
      });
    }
    const confetti = (window as unknown as Record<string, (opts: Record<string, unknown>) => void>).confetti;
    if (confetti) confetti({ particleCount: 100, spread: 70, colors: ['#3b82f6', '#6366f1', '#f0f4ff'], origin: { y: 0.6 } });
  };

  const getQuizResult = () => {
    const needsWebsite = quizAnswers[4] === '3\u20135 years' || quizAnswers[4] === "I don't have one";
    const needsAds = quizAnswers[1] === 'Not enough leads' || quizAnswers[1] === 'Low website traffic';
    if (needsWebsite && needsAds) return { title: 'Full Growth Strategy', desc: 'Your business would benefit from a complete digital overhaul \u2014 a modern website paired with targeted Google Ads and SEO to drive real, measurable growth.' };
    if (needsWebsite) return { title: 'Website Overhaul', desc: 'Your current website is holding back your growth. A modern, conversion-focused redesign would help customers find you and take action.' };
    if (needsAds) return { title: 'Google Ads Boost', desc: 'You have an opportunity to capture significantly more leads through targeted Google Ads and strategic SEO improvements.' };
    return { title: 'Full Growth Strategy', desc: 'A comprehensive approach combining website optimization, Google Ads, and SEO would give your business the strongest competitive advantage.' };
  };

  const handleQuizSelect = (answer: string) => {
    const updated = [...quizAnswers];
    updated[quizStep] = answer;
    setQuizAnswers(updated);
    setTimeout(() => {
      setQuizStep((s) => (s < 5 ? s + 1 : 6));
      quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 400);
  };

  const handleQuizContact = (e: React.FormEvent) => {
    e.preventDefault();
    setQuizStep(7);
    fireConfetti();
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Security: honeypot check ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â bots fill hidden fields, humans don't
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

      const contentType = response.headers.get('content-type') ?? '';
      const rawBody = await response.text();
      let data: { error?: string } | null = null;

      if (contentType.includes('application/json') && rawBody) {
        try {
          data = JSON.parse(rawBody);
        } catch {
          data = null;
        }
      }

      if (!response.ok) {
        throw new Error(
          data?.error ||
            (rawBody.startsWith('<!DOCTYPE') || rawBody.startsWith('<html')
              ? 'The contact form hit a server error. Please try again in a moment.'
              : 'Something went wrong. Please try again.')
        );
      }

      setSubmitMessage('Your request was sent successfully. We will be in touch soon.');
      setForm({ name: '', businessName: '', email: '', service: 'Website Creation', message: '', honeypot: '' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ Shared form input classes ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ */
  const inputClass = 'w-full rounded-[10px] border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-[15px] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)]/50 transition-colors duration-200 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20';
  const btnPrimary = 'btn-shimmer inline-flex items-center justify-center gap-2 rounded-[12px] px-6 py-3.5 text-[15px] font-semibold tracking-[0.3px] text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-60';

  /* ÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚Â HOME ÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚Â */
  const HomePage = () => (
    <>
      {/* Hero */}
      <section className="dot-pattern relative overflow-hidden bg-[var(--bg-primary)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.15)_0%,transparent_65%)]" />
        <Section className="relative py-24 md:py-32">
          <FadeIn>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-1.5 text-[11px] font-medium tracking-[3px] uppercase text-[var(--accent)]">
                  <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-glow)] opacity-75" /><span className="relative inline-block h-2 w-2 rounded-full bg-[var(--accent)]" /></span> Accepting new clients this month
                </div>
                <h1 className="text-[clamp(40px,6vw,72px)] font-bold leading-[1.08] tracking-[-1px] text-[var(--text-primary)]">
                  Get more calls, more clients, more{' '}<span className="gradient-text">revenue.</span>
                </h1>
                <p className="mt-6 max-w-lg text-[18px] leading-[1.7] text-[var(--text-secondary)]">
                  We build high-converting websites and run Google Ads + SEO campaigns that put Pittsburgh businesses in front of customers <span className="font-semibold text-white">ready to buy</span>.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => switchPage('book')}
                    className="btn-shimmer group inline-flex items-center justify-center gap-2 rounded-[12px] px-7 py-4 text-[15px] font-semibold tracking-[0.3px] text-white shadow-lg"
                  >
                    Get Your Free Growth Plan <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                  <button
                    onClick={() => switchPage('book')}
                    className="inline-flex items-center justify-center gap-2 rounded-[12px] border-2 border-[var(--border)] px-6 py-3.5 text-[15px] font-semibold tracking-[0.3px] text-[var(--text-primary)] transition-all duration-200 hover:border-[var(--border-hover)] hover:text-[var(--accent-glow)]"
                  >
                    See How It Works
                  </button>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)]/20 text-xs font-bold text-[var(--accent-glow)] ring-2 ring-[var(--bg-primary)]">M</div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)]/30 text-xs font-bold text-[var(--accent-glow)] ring-2 ring-[var(--bg-primary)]">S</div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)]/20 text-xs font-bold text-[var(--accent-glow)] ring-2 ring-[var(--bg-primary)]">J</div>
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">
                    <span className="font-semibold text-white">50+ Pittsburgh businesses</span> trust us to grow their leads
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 rounded-[14px] bg-[var(--accent)]/8 blur-3xl" />
                <div className="relative overflow-hidden rounded-[14px] border border-white/5 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80"
                    alt="Local business team meeting with digital marketing reports"
                    className="h-[440px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 via-[var(--bg-primary)]/10 to-transparent" />
                  {/* Floating social proof card */}
                  <div className="absolute bottom-5 left-5 right-5 rounded-[12px] border border-white/10 bg-[var(--bg-secondary)]/90 p-4 backdrop-blur-md md:left-6 md:right-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[var(--accent-glow)]">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">+200% average lead increase</p>
                        <p className="text-xs text-[var(--text-secondary)]">Across our Pittsburgh client portfolio</p>
                      </div>
                      <div className="ml-auto flex items-center gap-0.5 text-[var(--accent-glow)]">
                        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </Section>
      </section>

      {/* Trust bar */}
      <section className="border-y border-white/5 bg-[var(--bg-secondary)] py-5">
        <Section>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-sm font-medium text-[var(--text-secondary)]">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[var(--accent-glow)]" /> No contracts ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â cancel anytime</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[var(--accent-glow)]" /> Free website &amp; SEO audit</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[var(--accent-glow)]" /> Results in 30 days or less</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[var(--accent-glow)]" /> 4.9&#9733; from 50+ businesses</span>
          </div>
        </Section>
      </section>

      {/* Services ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â 3-column */}
      <section className="bg-[var(--bg-primary)] py-24">
        <Section>
          <FadeIn>
            <div className="text-center">
              <p className="text-[11px] font-medium uppercase tracking-[3px] text-[var(--accent-glow)]">Our Services</p>
              <h2 className="mt-3 text-[clamp(28px,4vw,48px)] font-bold tracking-[-0.5px] text-white">Everything you need to grow online</h2>
              <p className="mt-3 text-lg text-[var(--text-secondary)]">Websites, SEO, and Google Ads ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â built to work together.</p>
            </div>
          </FadeIn>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {serviceCards.map((service, idx) => {
              const Icon = service.icon;
              return (
                <FadeIn key={service.title} delay={idx * 0.12}>
                  <button
                    onClick={() => switchPage(service.key)}
                    className="blue-glow-border group flex h-full w-full flex-col rounded-[14px] border border-white/[0.06] bg-[var(--bg-card)] p-7 text-left transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                  >
                    <div className="inline-flex rounded-[10px] bg-[var(--accent)]/10 p-3 text-[var(--accent-glow)]">
                      <Icon className="h-6 w-6 stroke-[1.75]" />
                    </div>
                    <h3 className="mt-5 text-[22px] font-semibold text-white">{service.title}</h3>
                    <p className="mt-2 flex-1 leading-[1.7] text-[var(--text-secondary)]">{service.text}</p>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-glow)]">
                      Learn more <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </button>
                </FadeIn>
              );
            })}
          </div>
        </Section>
      </section>

      {/* Results / Stats */}
      <section className="bg-[var(--bg-secondary)] py-24">
        <Section>
          <FadeIn>
            <div className="text-center">
              <p className="text-[11px] font-medium uppercase tracking-[3px] text-[var(--accent-glow)]">Results</p>
              <h2 className="mt-3 text-[clamp(28px,4vw,48px)] font-bold tracking-[-0.5px] text-white">Real results for local businesses</h2>
              <p className="mt-3 text-lg text-[var(--text-secondary)]">Performance numbers our Pittsburgh clients see on average.</p>
            </div>
          </FadeIn>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {resultStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <FadeIn key={stat.label} delay={idx * 0.1}>
                  <div className="rounded-[14px] border border-white/[0.06] bg-[var(--bg-card)] p-6 text-center shadow-lg" style={{ borderBottom: '2px solid var(--accent)' }}>
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-[10px] bg-[var(--accent)]/10 text-[var(--accent-glow)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="mt-4 text-[36px] font-bold tracking-tight text-[var(--accent-glow)]">{stat.value}</div>
                    <div className="mt-1 text-sm font-medium text-[var(--text-secondary)]">{stat.label}</div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </Section>
      </section>

      {/* Why choose us */}
      <section className="bg-[var(--bg-primary)] py-24">
        <Section>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn>
              <div className="overflow-hidden rounded-[14px] border border-white/5 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80"
                  alt="Marketing team reviewing business growth"
                  className="h-[420px] w-full object-cover"
                />
              </div>
            </FadeIn>
            <div>
              <FadeIn>
                <p className="text-[11px] font-medium uppercase tracking-[3px] text-[var(--accent-glow)]">Why Us</p>
                <h2 className="mt-3 text-[clamp(28px,4vw,48px)] font-bold tracking-[-0.5px] text-white">Why businesses choose us</h2>
              </FadeIn>
              <div className="mt-8 space-y-5">
                {[
                  'We help businesses show up across paid and organic search when local customers are actively looking for their services.',
                  'We combine ad targeting, technical SEO, and AI/ML-assisted search term analysis so your budget supports both short-term lead flow and long-term visibility.',
                  'We design websites, help with hosting setup, and make it easier for visitors to call, book, or reach out.',
                  'We focus on what matters most to local businesses: better visibility, stronger reviews, and more real clients.',
                ].map((text, idx) => (
                  <FadeIn key={idx} delay={idx * 0.1}>
                    <div className="flex gap-4 rounded-[12px] border border-white/[0.04] bg-[var(--bg-secondary)] p-5 transition-all duration-300 hover:border-[var(--accent)]/20">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent-glow)]" />
                      <p className="leading-[1.7] text-[var(--text-secondary)]">{text}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* Quiz */}
      <section ref={quizRef} className="relative overflow-hidden bg-[var(--bg-secondary)] py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(59,130,246,0.08)_0%,transparent_65%)]" />
        <Section className="relative">
          <FadeIn>
            <div className="text-center">
              <p className="text-[11px] font-medium uppercase tracking-[3px] text-[var(--accent-glow)]">Not Sure Where to Start?</p>
              <h2 className="mt-3 text-[clamp(28px,4vw,48px)] font-bold tracking-[-0.5px] text-white">Find your perfect growth plan</h2>
              <p className="mx-auto mt-3 max-w-lg text-lg text-[var(--text-secondary)]">Answer a few quick questions and we&apos;ll recommend the best strategy for your business.</p>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="mx-auto mt-12 max-w-2xl">
              {quizStep === -1 ? (
                <div className="text-center">
                  <div className="relative mx-auto mb-8 flex h-20 w-20 items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-[var(--accent)]/10" style={{ animation: 'glow-pulse 4s ease-in-out infinite' }} />
                    <div style={{ animation: 'bob 3s ease-in-out infinite' }}>
                      <Search className="h-8 w-8 text-[var(--accent-glow)]" />
                    </div>
                  </div>
                  <button
                    onClick={() => { setQuizStep(0); setQuizAnswers([]); }}
                    className="btn-shimmer group inline-flex items-center gap-2 rounded-[12px] px-7 py-4 text-[15px] font-semibold tracking-[0.3px] text-white shadow-lg"
                  >
                    Take the 60-Second Quiz <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>
              ) : quizStep <= 5 ? (
                <div className="rounded-[14px] border border-white/[0.06] bg-[var(--bg-card)] p-8 shadow-lg">
                  <div className="mb-6 flex items-center justify-between text-sm text-[var(--text-secondary)]">
                    <span>Question {quizStep + 1} of 6</span>
                    <span>{Math.round(((quizStep + 1) / 6) * 100)}%</span>
                  </div>
                  <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${((quizStep + 1) / 6) * 100}%`, background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
                    />
                  </div>
                  <div key={quizStep} style={{ animation: 'fadeSlideIn 300ms ease-out' }}>
                    <h3 className="text-[22px] font-semibold text-white">{quizQuestions[quizStep].q}</h3>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {quizQuestions[quizStep].opts.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleQuizSelect(opt)}
                          className={`group flex items-center gap-3 rounded-[12px] border p-4 text-left text-[15px] font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                            quizAnswers[quizStep] === opt
                              ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-white'
                              : 'border-[rgba(59,130,246,0.15)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-[var(--accent)]/40 hover:text-white'
                          }`}
                        >
                          <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                            quizAnswers[quizStep] === opt
                              ? 'border-[var(--accent)] bg-[var(--accent)] text-white'
                              : 'border-[var(--text-secondary)]/30'
                          }`}>
                            {quizAnswers[quizStep] === opt && <CheckCircle2 className="h-3.5 w-3.5" />}
                          </div>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  {quizStep > 0 && (
                    <button onClick={() => setQuizStep(quizStep - 1)} className="mt-6 text-sm font-medium text-[var(--text-secondary)] transition-colors duration-200 hover:text-white">
                      &larr; Back
                    </button>
                  )}
                </div>
              ) : quizStep === 6 ? (
                <div className="rounded-[14px] border border-white/[0.06] bg-[var(--bg-card)] p-8 shadow-lg">
                  <div className="mb-6 flex items-center justify-between text-sm text-[var(--text-secondary)]">
                    <span>Almost done!</span>
                    <span>100%</span>
                  </div>
                  <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-full rounded-full" style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }} />
                  </div>
                  <h3 className="text-[22px] font-semibold text-white">Where should we send your results?</h3>
                  <p className="mt-2 text-[var(--text-secondary)]">We&apos;ll prepare a custom recommendation based on your answers.</p>
                  <form onSubmit={handleQuizContact} className="mt-6 grid gap-4">
                    <input value={quizName} onChange={(e) => setQuizName(e.target.value)} className={inputClass} placeholder="Your name" required />
                    <input type="email" value={quizEmail} onChange={(e) => setQuizEmail(e.target.value)} className={inputClass} placeholder="Email address" required />
                    <button type="submit" className={btnPrimary}>
                      See My Results <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                  <button onClick={() => setQuizStep(5)} className="mt-4 text-sm font-medium text-[var(--text-secondary)] transition-colors duration-200 hover:text-white">
                    &larr; Back
                  </button>
                </div>
              ) : (
                <div className="rounded-[14px] border border-white/[0.06] bg-[var(--bg-card)] p-8 text-center shadow-lg">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)]/15">
                    <CheckCircle2 className="h-7 w-7 text-[var(--accent-glow)]" />
                  </div>
                  <p className="text-[11px] font-medium uppercase tracking-[3px] text-[var(--accent-glow)]">Your Recommendation</p>
                  <h3 className="mt-3 text-[28px] font-bold text-white">{getQuizResult().title}</h3>
                  <p className="mx-auto mt-4 max-w-md leading-[1.7] text-[var(--text-secondary)]">{getQuizResult().desc}</p>
                  <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <button
                      onClick={() => switchPage('book')}
                      className="btn-shimmer group inline-flex items-center gap-2 rounded-[12px] px-7 py-4 text-[15px] font-semibold tracking-[0.3px] text-white shadow-lg"
                    >
                      Get Your Free Growth Plan <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                    <button
                      onClick={() => { setQuizStep(-1); setQuizAnswers([]); setQuizName(''); setQuizEmail(''); }}
                      className="text-sm font-medium text-[var(--text-secondary)] transition-colors duration-200 hover:text-white"
                    >
                      Retake Quiz
                    </button>
                  </div>
                </div>
              )}
            </div>
          </FadeIn>
        </Section>
      </section>

      {/* Testimonials */}
      <section className="bg-[var(--bg-secondary)] py-24">
        <Section>
          <FadeIn>
            <div className="max-w-2xl">
              <p className="text-[11px] font-medium uppercase tracking-[3px] text-[var(--accent-glow)]">Testimonials</p>
              <h2 className="mt-3 text-[clamp(28px,4vw,48px)] font-bold tracking-[-0.5px] text-white">Client feedback</h2>
              <p className="mt-3 text-lg text-[var(--text-secondary)]">Real results from Pittsburgh businesses we&apos;ve partnered with.</p>
            </div>
          </FadeIn>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((item, idx) => (
              <FadeIn key={item.name} delay={idx * 0.12}>
                <div className="flex h-full flex-col rounded-[14px] border-l-[3px] border-l-[var(--accent)] border border-white/[0.04] bg-[var(--bg-card)] p-6">
                  <Stars />
                  <p className="mt-4 flex-1 italic leading-[1.7] text-[var(--text-primary)]">&quot;{item.quote}&quot;</p>
                  <div className="mt-5 border-t border-white/[0.06] pt-4 text-sm">
                    <span className="font-semibold text-[var(--accent-glow)]">{item.name}</span>{' '}
                    <span className="text-[var(--text-secondary)]">&middot; {item.business}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[#131922] to-[#1c2333]" />
        <div className="absolute inset-0" style={{ clipPath: 'polygon(0 0, 100% 8%, 100% 100%, 0 92%)' }}>
          <div className="h-full w-full bg-gradient-to-br from-[#14202e] to-[#1a1a2e] opacity-80" />
        </div>
        <Section className="relative">
          <FadeIn>
            <div className="text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[3px] text-[var(--accent-glow)]">
                Limited availability
              </div>
              <h3 className="mx-auto max-w-2xl text-[clamp(28px,4vw,48px)] font-bold leading-[1.1] tracking-[-0.5px] text-white">Stop losing leads to your competitors.</h3>
              <p className="mx-auto mt-5 max-w-lg leading-[1.7] text-[var(--text-secondary)]">
                Get a free, no-obligation growth plan showing exactly how we&apos;d increase your calls, leads, and revenue. Most clients see results within 30 days.
              </p>
              <div className="mx-auto mt-6 flex max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"><CheckCircle2 className="h-4 w-4 text-[var(--accent-glow)]" /> Free website &amp; SEO audit</div>
                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"><CheckCircle2 className="h-4 w-4 text-[var(--accent-glow)]" /> Custom strategy</div>
                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"><CheckCircle2 className="h-4 w-4 text-[var(--accent-glow)]" /> No commitment</div>
              </div>
              <div className="mt-8">
                <button
                  onClick={() => switchPage('book')}
                  className="btn-shimmer group inline-flex items-center gap-2 rounded-[12px] px-8 py-4 text-[16px] font-semibold text-white shadow-lg"
                >
                  Claim Your Free Growth Plan <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </FadeIn>
        </Section>
      </section>
    </>
  );

  /* ÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚Â FAQs ÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚Â */
  const FAQPage = () => (
    <section className="bg-[var(--bg-primary)] py-24">
      <Section>
        <FadeIn>
          <div className="max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[3px] text-[var(--accent-glow)]">FAQs</p>
            <h1 className="mt-3 text-[clamp(40px,6vw,72px)] font-bold tracking-[-1px] text-white">Frequently asked questions</h1>
            <p className="mt-4 text-lg leading-[1.7] text-[var(--text-secondary)]">
              Quick answers about what we do, who we help, and how we bring in more qualified local leads.
            </p>
          </div>
        </FadeIn>
        <div className="mt-12 space-y-4">
          {faqs.map((faq, idx) => (
            <FadeIn key={faq.q} delay={idx * 0.06}>
              <div className="rounded-[14px] border border-white/[0.06] bg-[var(--bg-secondary)] p-7 transition-all duration-300 hover:border-[var(--accent)]/20">
                <h3 className="text-[20px] font-semibold text-white">{faq.q}</h3>
                <p className="mt-3 leading-[1.7] text-[var(--text-secondary)]">{faq.a}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>
    </section>
  );

  /* ÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚Â BOOK ÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚Â */
  const BookPage = () => (
    <section className="bg-[var(--bg-primary)] py-24">
      <Section>
        <FadeIn>
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[3px] text-[var(--accent-glow)]">Get Started</p>
              <h1 className="mt-3 text-[clamp(40px,6vw,72px)] font-bold tracking-[-1px] text-white">Tell us about your business</h1>
              <p className="mt-4 max-w-lg text-lg leading-[1.7] text-[var(--text-secondary)]">
                We&apos;ll review your current website, hosting setup, Google visibility, and lead flow, then recommend practical next steps.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  'A clear conversation about where your business is now and where you want it to go.',
                  'We identify opportunities across Google Ads, SEO, hosting performance, and AI-assisted keyword targeting.',
                  'You leave with practical next steps even if you are still exploring your options.',
                ].map((text, idx) => (
                  <div key={idx} className="flex gap-4 rounded-[12px] border border-white/[0.04] bg-[var(--bg-secondary)] p-5 transition-all duration-300 hover:border-[var(--accent)]/20">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent-glow)]" />
                    <p className="leading-[1.7] text-[var(--text-secondary)]">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[14px] border border-white/[0.06] bg-[var(--bg-secondary)] p-8 shadow-lg">
              <h2 className="text-[20px] font-semibold text-white">Request a time</h2>
              <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
                <input name="name" value={form.name} onChange={handleInputChange} className={inputClass} placeholder="Your name" required />
                <input name="businessName" value={form.businessName} onChange={handleInputChange} className={inputClass} placeholder="Business name" required />
                <input name="email" type="email" value={form.email} onChange={handleInputChange} className={inputClass} placeholder="Email address" required />
                <select name="service" value={form.service} onChange={handleInputChange} className={inputClass}>
                  <option>Website Creation</option>
                  <option>Google Ads + SEO</option>
                  <option>All of the above</option>
                </select>
                <textarea name="message" value={form.message} onChange={handleInputChange} className={`${inputClass} min-h-[130px]`} placeholder="Tell us about your business and goals" required />
                {/* Security: honeypot field ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â hidden from real users, traps bots */}
                <input name="honeypot" value={form.honeypot} onChange={handleInputChange} tabIndex={-1} aria-hidden="true" autoComplete="off" style={{ display: 'none' }} />
                {submitMessage && <div className="rounded-[10px] border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-3 text-sm text-[var(--accent-glow)]">{submitMessage}</div>}
                {submitError && <div className="rounded-[10px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">{submitError}</div>}
                <button type="submit" disabled={isSubmitting} className={btnPrimary}>
                  {isSubmitting ? 'Sending...' : 'Send Request'} <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </FadeIn>
      </Section>
    </section>
  );

  /* ÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚Â CONTACT ÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚Â */
  const ContactPage = () => (
    <section className="bg-[var(--bg-primary)] py-24">
      <Section>
        <FadeIn>
          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* Left ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â info */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[3px] text-[var(--accent-glow)]">Contact</p>
              <h1 className="mt-3 text-[clamp(40px,6vw,72px)] font-bold tracking-[-1px] text-white">Contact &amp; Support</h1>
              <p className="mt-4 max-w-lg text-lg leading-[1.7] text-[var(--text-secondary)]">
                Have a question about your website, hosting, Google Ads + SEO strategy, or analytics setup? Reach out and we&apos;ll get back to you.
              </p>

              <div className="mt-10 space-y-4">
                {/* Email */}
                <div className="flex items-start gap-4 rounded-[14px] border border-white/[0.06] bg-[var(--bg-secondary)] p-5 transition-all duration-300 hover:border-[var(--accent)]/20">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[var(--accent)]/10 text-[var(--accent-glow)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-secondary)]">Email us</p>
                    <a href="mailto:hello@pittgrowthstudio.com" className="mt-0.5 block font-semibold text-white transition-colors duration-200 hover:text-[var(--accent-glow)]">
                      hello@pittgrowthstudio.com
                    </a>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]/60">We typically respond within 1 business day.</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 rounded-[14px] border border-white/[0.06] bg-[var(--bg-secondary)] p-5 transition-all duration-300 hover:border-[var(--accent)]/20">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[var(--accent)]/10 text-[var(--accent-glow)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-secondary)]">Support hours</p>
                    <p className="mt-0.5 font-semibold text-white">Monday ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Friday</p>
                    <p className="mt-0.5 text-sm text-[var(--text-secondary)]/60">9:00 AM ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ 6:00 PM ET</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 rounded-[14px] border border-white/[0.06] bg-[var(--bg-secondary)] p-5 transition-all duration-300 hover:border-[var(--accent)]/20">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[var(--accent)]/10 text-[var(--accent-glow)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-secondary)]">Based in</p>
                    <p className="mt-0.5 font-semibold text-white">Pittsburgh, PA</p>
                    <p className="mt-0.5 text-sm text-[var(--text-secondary)]/60">Serving local businesses across the Pittsburgh area.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-sm text-[var(--text-secondary)]">
                Looking for quick answers?{' '}
                <button onClick={() => switchPage('faqs')} className="font-medium text-[var(--accent-glow)] transition-colors duration-200 hover:text-[var(--accent)] underline underline-offset-2">
                  Check our FAQs
                </button>
              </div>
            </div>

            {/* Right ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â form */}
            <div className="rounded-[14px] border border-white/[0.06] bg-[var(--bg-secondary)] p-8 shadow-lg">
              <h2 className="text-[20px] font-semibold text-white">Send us a message</h2>
              <p className="mt-2 text-sm leading-[1.7] text-[var(--text-secondary)]">Fill out the form and we&apos;ll follow up by email.</p>
              <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
                <input name="name" value={form.name} onChange={handleInputChange} className={inputClass} placeholder="Your name" required />
                <input name="businessName" value={form.businessName} onChange={handleInputChange} className={inputClass} placeholder="Business name" required />
                <input name="email" type="email" value={form.email} onChange={handleInputChange} className={inputClass} placeholder="Email address" required />
                <select name="service" value={form.service} onChange={handleInputChange} className={inputClass}>
                  <option>Website Creation</option>
                  <option>Google Ads + SEO</option>
                  <option>Billing / Payments</option>
                  <option>General Question</option>
                  <option>Other</option>
                </select>
                <textarea name="message" value={form.message} onChange={handleInputChange} className={`${inputClass} min-h-[130px]`} placeholder="How can we help you?" required />
                {/* Security: honeypot field ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â hidden from real users, traps bots */}
                <input name="honeypot" value={form.honeypot} onChange={handleInputChange} tabIndex={-1} aria-hidden="true" autoComplete="off" style={{ display: 'none' }} />
                {submitMessage && <div className="rounded-[10px] border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-3 text-sm text-[var(--accent-glow)]">{submitMessage}</div>}
                {submitError && <div className="rounded-[10px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">{submitError}</div>}
                <button type="submit" disabled={isSubmitting} className={btnPrimary}>
                  {isSubmitting ? 'Sending...' : 'Send Message'} <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </FadeIn>
      </Section>
    </section>
  );

  /* ÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚Â INVOICE (admin) ÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚Â */
  const InvoicePage = () => (
    <section className="bg-[var(--bg-primary)] py-24">
      <Section>
        <div className="mx-auto max-w-lg">
          <p className="text-[11px] font-medium uppercase tracking-[3px] text-[var(--accent-glow)]">Admin</p>
          <h1 className="mt-3 text-[clamp(40px,6vw,72px)] font-bold tracking-[-1px] text-white">Send Invoice</h1>
          <p className="mt-4 text-lg leading-[1.7] text-[var(--text-secondary)]">
            Create a Stripe payment link and email it directly to a client.
          </p>

          {!invoiceUnlocked ? (
            <form onSubmit={handleInvoiceUnlock} className="mt-10 rounded-[14px] border border-white/[0.06] bg-[var(--bg-secondary)] p-8 shadow-lg">
              <label className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">Admin password</label>
              <input
                type="password"
                value={invoicePassword}
                onChange={(e) => setInvoicePassword(e.target.value)}
                autoComplete="current-password"
                className={inputClass}
                placeholder="Enter password"
                required
              />
              {invoicePasswordError && (
                <p className="mt-2 text-sm text-red-400">{invoicePasswordError}</p>
              )}
              <button type="submit" className={`mt-4 w-full ${btnPrimary}`}>
                Unlock <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          ) : (
            <>
            <form onSubmit={handleSendInvoice} className="mt-10 rounded-[14px] border border-white/[0.06] bg-[var(--bg-secondary)] p-8 shadow-lg">
              <div className="grid gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">Client name <span className="text-red-400">*</span></label>
                  <input value={invoiceClientName} onChange={(e) => setInvoiceClientName(e.target.value)} className={inputClass} placeholder="e.g. Smith Roofing" required />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">Client email <span className="text-red-400">*</span></label>
                  <input type="email" value={invoiceClientEmail} onChange={(e) => setInvoiceClientEmail(e.target.value)} className={inputClass} placeholder="client@example.com" required />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">Service description</label>
                  <input value={invoiceService} onChange={(e) => setInvoiceService(e.target.value)} className={inputClass} placeholder="e.g. Website + Google Ads + SEO Package" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">Upfront fee ($)</label>
                  <input type="number" min="0" step="0.01" value={invoiceUpfront} onChange={(e) => setInvoiceUpfront(e.target.value)} className={inputClass} placeholder="0.00" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">Monthly fee ($)</label>
                  <input type="number" min="0" step="0.01" value={invoiceMonthly} onChange={(e) => setInvoiceMonthly(e.target.value)} className={inputClass} placeholder="0.00" />
                </div>
                {(parseFloat(invoiceUpfront) > 0 || parseFloat(invoiceMonthly) > 0) && (
                  <div className="rounded-[10px] border border-white/[0.06] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-secondary)] space-y-1">
                    {parseFloat(invoiceUpfront) > 0 && (
                      <div>Initial deposit: <span className="font-semibold text-white">${parseFloat(invoiceUpfront).toFixed(2)}</span> <span className="text-[var(--text-secondary)]/50">(charged once)</span></div>
                    )}
                    {parseFloat(invoiceMonthly) > 0 && (
                      <div>Monthly retainer: <span className="font-semibold text-white">${parseFloat(invoiceMonthly).toFixed(2)}/mo</span> <span className="text-[var(--text-secondary)]/50">(recurring)</span></div>
                    )}
                  </div>
                )}
                {invoiceError && (
                  <div className="rounded-[10px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">{invoiceError}</div>
                )}
                {invoiceSuccess && (
                  <div className="rounded-[10px] border border-[var(--accent)]/30 bg-[var(--accent)]/10 p-4 text-sm text-[var(--accent-glow)] space-y-2">
                    <p className="font-medium">{invoiceSuccess}</p>
                    {invoiceUpfrontUrl && (
                      <p>Deposit link: <a href={invoiceUpfrontUrl} target="_blank" rel="noopener noreferrer" className="underline break-all text-[var(--accent-glow)]">{invoiceUpfrontUrl}</a></p>
                    )}
                    {invoiceMonthlyUrl && (
                      <p>Monthly link: <a href={invoiceMonthlyUrl} target="_blank" rel="noopener noreferrer" className="underline break-all text-[var(--accent-glow)]">{invoiceMonthlyUrl}</a></p>
                    )}
                  </div>
                )}
                <button type="submit" disabled={invoiceLoading} className={btnPrimary}>
                  {invoiceLoading ? 'Sending...' : 'Send Payment Link'} <ArrowRight className="h-4 w-4" />
                </button>
                <p className="text-center text-xs text-[var(--text-secondary)]/60">A permanent Stripe payment link will be created and emailed to the client.</p>
              </div>
            </form>

            {/* Refund a payment */}
            <div className="mt-8 rounded-[14px] border border-white/[0.06] bg-[var(--bg-secondary)] p-8 shadow-lg">
              <h2 className="text-[20px] font-semibold text-white">Refund a Payment</h2>
              <p className="mt-2 text-sm leading-[1.7] text-[var(--text-secondary)]">
                Issue a full refund within the 2-week guarantee window. Find the Payment Intent ID in your Stripe dashboard under Payments (starts with <span className="font-mono text-white">pi_</span>).
              </p>
              <div className="mt-4 grid gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">Payment Intent ID</label>
                  <input
                    value={refundPaymentId}
                    onChange={(e) => setRefundPaymentId(e.target.value)}
                    className={`${inputClass} font-mono text-sm`}
                    placeholder="pi_3..."
                  />
                </div>
                {refundError && (
                  <div className="rounded-[10px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">{refundError}</div>
                )}
                {refundSuccess && (
                  <div className="rounded-[10px] border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-3 text-sm text-[var(--accent-glow)]">{refundSuccess}</div>
                )}
                <button
                  onClick={handleRefund}
                  disabled={refundLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-[12px] border border-white/10 px-6 py-3.5 font-semibold text-white transition-all duration-200 hover:border-red-500/40 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
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

  /* ÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚Â ROUTER ÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚Â */
  const currentPage = () => {
    if (page === 'websites') {
      return (
        <ServicePage
          title="Websites that help your business look professional and turn visitors into leads"
          description="We build fast, conversion-focused websites with clear messaging, hosting guidance, and the technical setup needed to turn visits into leads."
          image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80"
          bullets={[
            'Mobile-friendly design built for local business credibility and conversions',
            'Clear service pages that match what customers are searching for',
            'Hosting guidance, domain connection help, and dependable launch support',
            'Simple layouts focused on calls, form submissions, booked jobs, and supporting your Google Ads + SEO strategy',
          ]}
        />
      );
    }

    if (page === 'search-marketing') {
      return (
        <ServicePage
          title="Google Ads + SEO that work together to drive better local leads"
          description="We combine Google Ads, SEO, and AI/ML-assisted keyword analytics to build stronger visibility, better lead flow, and better search coverage over time."
          image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=80"
          bullets={[
            'Paid and organic keyword strategy aligned around the same local search intent',
            'AI and machine-learning-assisted search term analysis to find high-intent opportunities',
            'Google Ads campaigns built to generate qualified calls, quote requests, and form submissions',
            'SEO improvements across your website, service pages, content, and Google Business Profile',
            'Reporting focused on lead quality, search visibility, and actual business growth',
          ]}
        />
      );
    }

    if (page === 'contact') return <ContactPage />;
    if (page === 'invoice') return <InvoicePage />;
    if (page === 'faqs') return <FAQPage />;
    if (page === 'book') return <BookPage />;
    return <HomePage />;
  };

  /* ÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚Â SHELL ÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚ÂÃƒÂ¢Ã¢â‚¬Â¢Ã‚Â */
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-primary)]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 px-6 py-4">
          <button onClick={() => switchPage('home')} className="text-left">
            <img src="/logo.svg" alt="Pittsburgh Growth Studio" className="h-10 w-auto" />
          </button>

          <nav className="hidden items-center gap-7 lg:flex">
            {pages.map((item) => (
              <button
                key={item.key}
                onClick={() => switchPage(item.key)}
                className={`nav-link text-[15px] font-medium tracking-[0.2px] transition-colors duration-200 ${page === item.key ? 'text-[var(--accent-glow)]' : 'text-[var(--text-secondary)] hover:text-white'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => switchPage('book')}
              className="btn-shimmer hidden rounded-[10px] px-5 py-2.5 text-sm font-semibold text-white shadow-sm sm:inline-flex"
            >
              Get Started
            </button>
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="rounded-[10px] border border-white/10 bg-[var(--bg-secondary)] p-2.5 text-[var(--text-secondary)] lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/[0.06] bg-[var(--bg-secondary)] lg:hidden">
            <div className="mx-auto flex max-w-[1100px] flex-col gap-1 px-6 py-3">
              {pages.map((item) => (
                <button
                  key={item.key}
                  onClick={() => switchPage(item.key)}
                  className="rounded-[8px] px-3 py-2 text-left text-sm font-medium text-[var(--text-secondary)] transition-colors duration-200 hover:bg-white/[0.04] hover:text-white"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => switchPage('book')}
                className="btn-shimmer mt-2 rounded-[10px] px-5 py-2.5 text-center text-sm font-semibold text-white"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main>{currentPage()}</main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-[var(--bg-secondary)]">
        <Section className="py-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="Pittsburgh Growth Studio" className="h-8 w-auto" />
              <span className="text-sm text-[var(--text-secondary)]">&copy; {new Date().getFullYear()} Pittsburgh Growth Studio</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-[var(--text-secondary)]">
              <button onClick={() => switchPage('contact')} className="transition-colors duration-200 hover:text-[var(--accent-glow)]">Contact</button>
              <button onClick={() => switchPage('faqs')} className="transition-colors duration-200 hover:text-[var(--accent-glow)]">FAQs</button>
              <a href="mailto:hello@pittgrowthstudio.com" className="transition-colors duration-200 hover:text-[var(--accent-glow)]">hello@pittgrowthstudio.com</a>
            </div>
          </div>
        </Section>
      </footer>
    </div>
  );
}
