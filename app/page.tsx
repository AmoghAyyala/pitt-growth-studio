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
    <div className="flex items-center gap-0.5 text-amber-400">
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
            <h1 className="text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-gray-900">{title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-[1.6] text-gray-600">{description}</p>
            <div className="mt-8 space-y-4">
              {bullets.map((bullet) => (
                <div key={bullet} className="flex gap-3 text-gray-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                  <p className="leading-[1.6]">{bullet}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <a href="#book" className="inline-flex items-center gap-2 rounded-[12px] bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-110">
                Get Started <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-[14px] shadow-xl">
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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Security: honeypot check — bots fill hidden fields, humans don't
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

  /* ── Shared form input classes ── */
  const inputClass = 'w-full rounded-[10px] border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400 transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20';
  const btnPrimary = 'inline-flex items-center justify-center gap-2 rounded-[12px] bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3.5 font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60';
  const btnAccent = 'inline-flex items-center justify-center gap-2 rounded-[12px] bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3.5 font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-110';

  /* ═══════════════════════════════════ HOME ═══════════════════════════════════ */
  const HomePage = () => (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.06),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.05),transparent_50%)]" />
        <Section className="relative py-20 md:py-28">
          <FadeIn>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
                  <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-block h-2 w-2 rounded-full bg-emerald-500" /></span> Accepting new clients this month
                </div>
                <h1 className="text-[48px] font-bold leading-[1.08] tracking-[-0.02em] text-gray-900 md:text-[56px]">
                  Get more calls, more clients, more revenue.
                </h1>
                <p className="mt-6 max-w-lg text-[18px] leading-[1.65] text-gray-600">
                  We build high-converting websites and run Google Ads + SEO campaigns that put Pittsburgh businesses in front of customers <span className="font-semibold text-gray-900">ready to buy</span>.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => switchPage('book')}
                    className="group inline-flex items-center justify-center gap-2 rounded-[12px] bg-gradient-to-r from-blue-600 to-blue-700 px-7 py-4 text-[16px] font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:shadow-xl hover:shadow-blue-600/30 hover:brightness-110"
                  >
                    Get Your Free Growth Plan <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                  <button
                    onClick={() => switchPage('book')}
                    className="inline-flex items-center justify-center gap-2 rounded-[12px] border-2 border-gray-200 bg-white px-6 py-3.5 text-[15px] font-semibold text-gray-700 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    See How It Works
                  </button>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 ring-2 ring-white">M</div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-700 ring-2 ring-white">S</div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700 ring-2 ring-white">J</div>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-semibold text-gray-900">50+ Pittsburgh businesses</span> trust us to grow their leads
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 rounded-[14px] bg-gradient-to-r from-blue-500/10 via-orange-400/8 to-blue-300/10 blur-3xl" />
                <div className="relative overflow-hidden rounded-[14px] shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80"
                    alt="Local business team meeting with digital marketing reports"
                    className="h-[440px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/5 to-transparent" />
                  {/* Floating social proof card */}
                  <div className="absolute bottom-5 left-5 right-5 rounded-[12px] border border-white/20 bg-white/90 p-4 backdrop-blur-md md:left-6 md:right-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">+200% average lead increase</p>
                        <p className="text-xs text-gray-500">Across our Pittsburgh client portfolio</p>
                      </div>
                      <div className="ml-auto flex items-center gap-0.5 text-amber-400">
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
      <section className="border-y border-gray-100 bg-gray-50 py-5">
        <Section>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-sm font-medium text-gray-500">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> No contracts — cancel anytime</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Free website &amp; SEO audit</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Results in 30 days or less</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> 4.9&#9733; from 50+ businesses</span>
          </div>
        </Section>
      </section>

      {/* Services — 3-column */}
      <section className="bg-white py-20">
        <Section>
          <FadeIn>
            <div className="text-center">
              <h2 className="text-[32px] font-semibold tracking-[-0.01em] text-gray-900">Everything you need to grow online</h2>
              <p className="mt-3 text-lg text-gray-500">Websites, SEO, and Google Ads — built to work together.</p>
            </div>
          </FadeIn>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {serviceCards.map((service, idx) => {
              const Icon = service.icon;
              return (
                <FadeIn key={service.title} delay={idx * 0.1}>
                  <button
                    onClick={() => switchPage(service.key)}
                    className="group flex h-full w-full flex-col rounded-[14px] border border-gray-100 bg-white p-7 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="inline-flex rounded-[10px] bg-blue-50 p-3 text-blue-600">
                      <Icon className="h-6 w-6 stroke-[1.75]" />
                    </div>
                    <h3 className="mt-5 text-[20px] font-semibold text-gray-900">{service.title}</h3>
                    <p className="mt-2 flex-1 leading-[1.6] text-gray-600">{service.text}</p>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
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
      <section className="bg-gray-50 py-20">
        <Section>
          <FadeIn>
            <div className="text-center">
              <h2 className="text-[32px] font-semibold tracking-[-0.01em] text-gray-900">Real results for local businesses</h2>
              <p className="mt-3 text-lg text-gray-500">Performance numbers our Pittsburgh clients see on average.</p>
            </div>
          </FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {resultStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <FadeIn key={stat.label} delay={idx * 0.08}>
                  <div className="rounded-[14px] border border-gray-100 bg-white p-6 text-center shadow-sm">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-[10px] bg-gradient-to-br from-blue-50 to-orange-50 text-blue-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="mt-4 text-[32px] font-bold tracking-tight text-gray-900">{stat.value}</div>
                    <div className="mt-1 text-sm font-medium text-gray-500">{stat.label}</div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </Section>
      </section>

      {/* Why choose us */}
      <section className="bg-white py-20">
        <Section>
          <FadeIn>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="overflow-hidden rounded-[14px] shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80"
                  alt="Marketing team reviewing business growth"
                  className="h-[420px] w-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-[32px] font-semibold tracking-[-0.01em] text-gray-900">Why businesses choose us</h2>
                <div className="mt-6 space-y-4 text-gray-700">
                  <div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" /><p className="leading-[1.6]">We help businesses show up across paid and organic search when local customers are actively looking for their services.</p></div>
                  <div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" /><p className="leading-[1.6]">We combine ad targeting, technical SEO, and AI/ML-assisted search term analysis so your budget supports both short-term lead flow and long-term visibility.</p></div>
                  <div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" /><p className="leading-[1.6]">We design websites, help with hosting setup, and make it easier for visitors to call, book, or reach out.</p></div>
                  <div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" /><p className="leading-[1.6]">We focus on what matters most to local businesses: better visibility, stronger reviews, and more real clients.</p></div>
                </div>
              </div>
            </div>
          </FadeIn>
        </Section>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-20">
        <Section>
          <FadeIn>
            <div className="max-w-2xl">
              <h2 className="text-[32px] font-semibold tracking-[-0.01em] text-gray-900">Client feedback</h2>
              <p className="mt-3 text-lg text-gray-500">Real results from Pittsburgh businesses we&apos;ve partnered with.</p>
            </div>
          </FadeIn>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((item, idx) => (
              <FadeIn key={item.name} delay={idx * 0.1}>
                <div className="flex h-full flex-col rounded-[14px] border border-gray-100 bg-white p-6 shadow-sm">
                  <Stars />
                  <p className="mt-4 flex-1 leading-[1.6] text-gray-700">&quot;{item.quote}&quot;</p>
                  <div className="mt-5 border-t border-gray-100 pt-4 text-sm text-gray-500">
                    <span className="font-semibold text-gray-900">{item.name}</span> &middot; {item.business}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>
      </section>

      {/* CTA */}
      <section className="bg-white py-20">
        <Section>
          <FadeIn>
            <div className="overflow-hidden rounded-[14px] bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 shadow-2xl">
              <div className="grid items-center md:grid-cols-2">
                <div className="p-10 md:p-14">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300">
                    Limited availability
                  </div>
                  <h3 className="text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-white">Stop losing leads to your competitors.</h3>
                  <p className="mt-4 max-w-md leading-[1.65] text-blue-200/80">
                    Get a free, no-obligation growth plan showing exactly how we&apos;d increase your calls, leads, and revenue. Most clients see results within 30 days.
                  </p>
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-blue-100/70"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Free website &amp; SEO audit included</div>
                    <div className="flex items-center gap-2 text-sm text-blue-100/70"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Custom strategy — not a generic template</div>
                    <div className="flex items-center gap-2 text-sm text-blue-100/70"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> No commitment required to get started</div>
                  </div>
                  <div className="mt-8">
                    <button
                      onClick={() => switchPage('book')}
                      className="group inline-flex items-center gap-2 rounded-[12px] bg-white px-7 py-3.5 font-semibold text-gray-900 shadow-lg transition-all duration-200 hover:shadow-xl hover:bg-blue-50"
                    >
                      Claim Your Free Growth Plan <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
                <div className="h-full min-h-[320px]">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80"
                    alt="Analytics dashboard and growth charts"
                    className="h-full w-full object-cover opacity-80"
                  />
                </div>
              </div>
            </div>
          </FadeIn>
        </Section>
      </section>
    </>
  );

  /* ═══════════════════════════════════ FAQs ═══════════════════════════════════ */
  const FAQPage = () => (
    <section className="bg-white py-20">
      <Section>
        <FadeIn>
          <div className="max-w-3xl">
            <h1 className="text-[48px] font-bold tracking-[-0.02em] text-gray-900">Frequently asked questions</h1>
            <p className="mt-4 text-lg leading-[1.6] text-gray-600">
              Quick answers about what we do, who we help, and how we bring in more qualified local leads.
            </p>
          </div>
        </FadeIn>
        <div className="mt-10 space-y-4">
          {faqs.map((faq, idx) => (
            <FadeIn key={faq.q} delay={idx * 0.06}>
              <div className="rounded-[14px] border border-gray-100 bg-white p-7 shadow-sm">
                <h3 className="text-[20px] font-semibold text-gray-900">{faq.q}</h3>
                <p className="mt-3 leading-[1.6] text-gray-600">{faq.a}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>
    </section>
  );

  /* ═══════════════════════════════════ BOOK ═══════════════════════════════════ */
  const BookPage = () => (
    <section className="bg-white py-20">
      <Section>
        <FadeIn>
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <h1 className="text-[48px] font-bold tracking-[-0.02em] text-gray-900">Tell us about your business</h1>
              <p className="mt-4 max-w-lg text-lg leading-[1.6] text-gray-600">
                We&apos;ll review your current website, hosting setup, Google visibility, and lead flow, then recommend practical next steps.
              </p>
              <div className="mt-8 space-y-4 text-gray-700">
                <div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" /><p className="leading-[1.6]">A clear conversation about where your business is now and where you want it to go.</p></div>
                <div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" /><p className="leading-[1.6]">We identify opportunities across Google Ads, SEO, hosting performance, and AI-assisted keyword targeting.</p></div>
                <div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" /><p className="leading-[1.6]">You leave with practical next steps even if you are still exploring your options.</p></div>
              </div>
            </div>
            <div className="rounded-[14px] border border-gray-100 bg-white p-8 shadow-lg">
              <h2 className="text-[20px] font-semibold text-gray-900">Request a time</h2>
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
                {/* Security: honeypot field — hidden from real users, traps bots */}
                <input name="honeypot" value={form.honeypot} onChange={handleInputChange} tabIndex={-1} aria-hidden="true" autoComplete="off" style={{ display: 'none' }} />
                {submitMessage && <div className="rounded-[10px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{submitMessage}</div>}
                {submitError && <div className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{submitError}</div>}
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

  /* ═══════════════════════════════════ CONTACT ═══════════════════════════════════ */
  const ContactPage = () => (
    <section className="bg-white py-20">
      <Section>
        <FadeIn>
          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* Left — info */}
            <div>
              <h1 className="text-[48px] font-bold tracking-[-0.02em] text-gray-900">Contact &amp; Support</h1>
              <p className="mt-4 max-w-lg text-lg leading-[1.6] text-gray-600">
                Have a question about your website, hosting, Google Ads + SEO strategy, or analytics setup? Reach out and we&apos;ll get back to you.
              </p>

              <div className="mt-10 space-y-4">
                {/* Email */}
                <div className="flex items-start gap-4 rounded-[14px] border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-blue-50 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email us</p>
                    <a href="mailto:hello@pittgrowthstudio.com" className="mt-0.5 block font-semibold text-gray-900 transition-colors duration-200 hover:text-blue-600">
                      hello@pittgrowthstudio.com
                    </a>
                    <p className="mt-1 text-sm text-gray-400">We typically respond within 1 business day.</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 rounded-[14px] border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-orange-50 text-orange-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Support hours</p>
                    <p className="mt-0.5 font-semibold text-gray-900">Monday – Friday</p>
                    <p className="mt-0.5 text-sm text-gray-400">9:00 AM – 6:00 PM ET</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 rounded-[14px] border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-gray-50 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Based in</p>
                    <p className="mt-0.5 font-semibold text-gray-900">Pittsburgh, PA</p>
                    <p className="mt-0.5 text-sm text-gray-400">Serving local businesses across the Pittsburgh area.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                Looking for quick answers?{' '}
                <button onClick={() => switchPage('faqs')} className="font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800 underline underline-offset-2">
                  Check our FAQs
                </button>
              </div>
            </div>

            {/* Right — form */}
            <div className="rounded-[14px] border border-gray-100 bg-white p-8 shadow-lg">
              <h2 className="text-[20px] font-semibold text-gray-900">Send us a message</h2>
              <p className="mt-2 text-sm leading-[1.6] text-gray-500">Fill out the form and we&apos;ll follow up by email.</p>
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
                {/* Security: honeypot field — hidden from real users, traps bots */}
                <input name="honeypot" value={form.honeypot} onChange={handleInputChange} tabIndex={-1} aria-hidden="true" autoComplete="off" style={{ display: 'none' }} />
                {submitMessage && <div className="rounded-[10px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{submitMessage}</div>}
                {submitError && <div className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{submitError}</div>}
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

  /* ═══════════════════════════════════ INVOICE (admin) ═══════════════════════════════════ */
  const InvoicePage = () => (
    <section className="bg-white py-20">
      <Section>
        <div className="mx-auto max-w-lg">
          <h1 className="text-[48px] font-bold tracking-[-0.02em] text-gray-900">Send Invoice</h1>
          <p className="mt-4 text-lg leading-[1.6] text-gray-600">
            Create a Stripe payment link and email it directly to a client.
          </p>

          {!invoiceUnlocked ? (
            <form onSubmit={handleInvoiceUnlock} className="mt-10 rounded-[14px] border border-gray-100 bg-white p-8 shadow-lg">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Admin password</label>
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
                <p className="mt-2 text-sm text-red-600">{invoicePasswordError}</p>
              )}
              <button type="submit" className={`mt-4 w-full ${btnPrimary}`}>
                Unlock <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          ) : (
            <>
            <form onSubmit={handleSendInvoice} className="mt-10 rounded-[14px] border border-gray-100 bg-white p-8 shadow-lg">
              <div className="grid gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Client name <span className="text-red-500">*</span></label>
                  <input value={invoiceClientName} onChange={(e) => setInvoiceClientName(e.target.value)} className={inputClass} placeholder="e.g. Smith Roofing" required />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Client email <span className="text-red-500">*</span></label>
                  <input type="email" value={invoiceClientEmail} onChange={(e) => setInvoiceClientEmail(e.target.value)} className={inputClass} placeholder="client@example.com" required />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Service description</label>
                  <input value={invoiceService} onChange={(e) => setInvoiceService(e.target.value)} className={inputClass} placeholder="e.g. Website + Google Ads + SEO Package" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Upfront fee ($)</label>
                  <input type="number" min="0" step="0.01" value={invoiceUpfront} onChange={(e) => setInvoiceUpfront(e.target.value)} className={inputClass} placeholder="0.00" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Monthly fee ($)</label>
                  <input type="number" min="0" step="0.01" value={invoiceMonthly} onChange={(e) => setInvoiceMonthly(e.target.value)} className={inputClass} placeholder="0.00" />
                </div>
                {(parseFloat(invoiceUpfront) > 0 || parseFloat(invoiceMonthly) > 0) && (
                  <div className="rounded-[10px] border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-600 space-y-1">
                    {parseFloat(invoiceUpfront) > 0 && (
                      <div>Initial deposit: <span className="font-semibold text-gray-900">${parseFloat(invoiceUpfront).toFixed(2)}</span> <span className="text-gray-400">(charged once)</span></div>
                    )}
                    {parseFloat(invoiceMonthly) > 0 && (
                      <div>Monthly retainer: <span className="font-semibold text-gray-900">${parseFloat(invoiceMonthly).toFixed(2)}/mo</span> <span className="text-gray-400">(recurring)</span></div>
                    )}
                  </div>
                )}
                {invoiceError && (
                  <div className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{invoiceError}</div>
                )}
                {invoiceSuccess && (
                  <div className="rounded-[10px] border border-green-200 bg-green-50 p-4 text-sm text-green-700 space-y-2">
                    <p className="font-medium">{invoiceSuccess}</p>
                    {invoiceUpfrontUrl && (
                      <p>Deposit link: <a href={invoiceUpfrontUrl} target="_blank" rel="noopener noreferrer" className="underline break-all text-blue-600">{invoiceUpfrontUrl}</a></p>
                    )}
                    {invoiceMonthlyUrl && (
                      <p>Monthly link: <a href={invoiceMonthlyUrl} target="_blank" rel="noopener noreferrer" className="underline break-all text-blue-600">{invoiceMonthlyUrl}</a></p>
                    )}
                  </div>
                )}
                <button type="submit" disabled={invoiceLoading} className={btnPrimary}>
                  {invoiceLoading ? 'Sending...' : 'Send Payment Link'} <ArrowRight className="h-4 w-4" />
                </button>
                <p className="text-center text-xs text-gray-400">A permanent Stripe payment link will be created and emailed to the client.</p>
              </div>
            </form>

            {/* Refund a payment */}
            <div className="mt-8 rounded-[14px] border border-gray-100 bg-white p-8 shadow-lg">
              <h2 className="text-[20px] font-semibold text-gray-900">Refund a Payment</h2>
              <p className="mt-2 text-sm leading-[1.6] text-gray-500">
                Issue a full refund within the 2-week guarantee window. Find the Payment Intent ID in your Stripe dashboard under Payments (starts with <span className="font-mono text-gray-700">pi_</span>).
              </p>
              <div className="mt-4 grid gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Payment Intent ID</label>
                  <input
                    value={refundPaymentId}
                    onChange={(e) => setRefundPaymentId(e.target.value)}
                    className={`${inputClass} font-mono text-sm`}
                    placeholder="pi_3..."
                  />
                </div>
                {refundError && (
                  <div className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{refundError}</div>
                )}
                {refundSuccess && (
                  <div className="rounded-[10px] border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{refundSuccess}</div>
                )}
                <button
                  onClick={handleRefund}
                  disabled={refundLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-[12px] border border-gray-200 px-6 py-3.5 font-semibold text-gray-700 transition-all duration-200 hover:border-red-300 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
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

  /* ═══════════════════════════════════ ROUTER ═══════════════════════════════════ */
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

  /* ═══════════════════════════════ SHELL ═══════════════════════════════ */
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 px-6 py-4">
          <button onClick={() => switchPage('home')} className="text-left">
            <img src="/logo.svg" alt="Pittsburgh Growth Studio" className="h-10 w-auto" />
          </button>

          <nav className="hidden items-center gap-7 lg:flex">
            {pages.map((item) => (
              <button
                key={item.key}
                onClick={() => switchPage(item.key)}
                className={`text-sm font-medium transition-colors duration-200 ${page === item.key ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => switchPage('book')}
              className="hidden rounded-[10px] bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-110 sm:inline-flex"
            >
              Get Started
            </button>
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="rounded-[10px] border border-gray-200 bg-white p-2.5 text-gray-600 lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-gray-100 bg-white lg:hidden">
            <div className="mx-auto flex max-w-[1100px] flex-col gap-1 px-6 py-3">
              {pages.map((item) => (
                <button
                  key={item.key}
                  onClick={() => switchPage(item.key)}
                  className="rounded-[8px] px-3 py-2 text-left text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => switchPage('book')}
                className="mt-2 rounded-[10px] bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-semibold text-white"
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
      <footer className="border-t border-gray-100 bg-gray-50">
        <Section className="py-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="Pittsburgh Growth Studio" className="h-8 w-auto" />
              <span className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Pittsburgh Growth Studio</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <button onClick={() => switchPage('contact')} className="transition-colors duration-200 hover:text-gray-900">Contact</button>
              <button onClick={() => switchPage('faqs')} className="transition-colors duration-200 hover:text-gray-900">FAQs</button>
              <a href="mailto:hello@pittgrowthstudio.com" className="transition-colors duration-200 hover:text-gray-900">hello@pittgrowthstudio.com</a>
            </div>
          </div>
        </Section>
      </footer>
    </div>
  );
}
