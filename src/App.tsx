import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronRight,
  Monitor,
  MousePointer2,
  Menu,
  Map,
  Star,
  X,
} from 'lucide-react';

type PageKey = 'home' | 'websites' | 'google-ads' | 'seo' | 'faqs' | 'book';

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
};

const pages: { key: PageKey; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'websites', label: 'Websites' },
  { key: 'google-ads', label: 'Google Ads' },
  { key: 'seo', label: 'SEO' },
  { key: 'faqs', label: 'FAQs' },
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
    a: 'We improve your local SEO with stronger website pages, better service area targeting, and clearer Google visibility.',
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

const stats = [
  { value: '4.9/5', label: 'Average client rating' },
  { value: 'Pittsburgh', label: 'Local market focus' },
  { value: 'Lead-First', label: 'Focused on conversions' },
];

const serviceCards = [
  {
    key: 'websites' as PageKey,
    title: 'Website Creation',
    text: 'Clean websites that help your business look established and bring in more calls and inquiries.',
    icon: Monitor,
    gradient: 'from-blue-500 to-sky-400',
  },
  {
    key: 'google-ads' as PageKey,
    title: 'Google Ads',
    text: 'Targeted campaigns that put your business in front of people already searching for your services.',
    icon: MousePointer2,
    gradient: 'from-orange-500 to-amber-400',
  },
  {
    key: 'seo' as PageKey,
    title: 'Local SEO',
    text: 'Help your business show up higher on Google and Maps when local customers search for your services.',
    icon: Map,
    gradient: 'from-slate-500 to-slate-300',
  },
];

function Section({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-7xl px-6"
    >
      {children}
    </motion.div>
  );
}

function Stars() {
  return (
    <div className="flex items-center gap-1 text-amber-400">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="h-4 w-4 fill-current" />
      ))}
    </div>
  );
}

function CtaBlock({ onStart }: { onStart: () => void }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-700 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl">
      <div className="grid items-center md:grid-cols-2">
        <div className="p-8 md:p-10">
          <h3 className="text-3xl font-semibold tracking-tight text-white">Ready to get started?</h3>
          <p className="mt-4 max-w-xl leading-7 text-slate-300">
            Share a few details about your business and goals, and we’ll outline the next steps.
          </p>
          <div className="mt-6">
            <button
              onClick={onStart}
              className="rounded-2xl bg-gradient-to-r from-blue-600 via-sky-500 to-orange-400 px-6 py-3 font-semibold text-white transition hover:opacity-95"
            >
              Get Started
            </button>
          </div>
        </div>
        <div className="h-full min-h-[260px]">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80"
            alt="Analytics dashboard and growth charts"
            className="h-full w-full object-cover opacity-90"
          />
        </div>
      </div>
    </div>
  );
}

function ServicePage({ title, description, image, bullets }: ServicePageProps) {
  return (
    <Section>
      <section className="py-16 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-5xl font-semibold leading-tight tracking-tight text-white">{title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">{description}</p>
            <div className="mt-8 space-y-4">
              {bullets.map((bullet) => (
                <div key={bullet} className="flex gap-3 text-slate-200">
                  <span className="mt-[10px] h-2 w-2 shrink-0 rounded-full bg-blue-400" />
                  <p className="leading-7">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-slate-700 bg-slate-800 shadow-xl">
            <img src={image} alt={title} className="h-[500px] w-full object-cover opacity-90" />
          </div>
        </div>
      </section>
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
  });
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
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Something went wrong. Please try again.');
      }

      setSubmitMessage('Your request was sent successfully. We will be in touch soon.');
      setForm({
        name: '',
        businessName: '',
        email: '',
        service: 'Website Creation',
        message: '',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const HomePage = () => (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(251,146,60,0.10),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.10),transparent_28%)]" />
        <Section>
          <div className="relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
            <div>
              <h1 className="text-5xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
                Help your business get found and bring in more local customers
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                We help Pittsburgh businesses improve their online presence so they can get found more easily, look more professional, and bring in more business.
              </p>
              <div className="mt-8 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-700 bg-slate-800/90 p-4 shadow-sm"
                  >
                    <div className="text-xl font-semibold text-white">{item.value}</div>
                    <div className="mt-1 text-sm text-slate-400">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-blue-500/18 via-orange-400/10 to-slate-300/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-slate-700 bg-slate-800 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80"
                  alt="Local business team meeting with digital marketing reports"
                  className="h-[420px] w-full object-cover opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-slate-800/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="text-2xl font-semibold text-white md:text-3xl">Practical marketing for local businesses</h3>
                  <p className="mt-2 max-w-lg text-white/85">
                    Clean websites, better visibility on Google, and Google Ads that help bring in more calls, inquiries, and customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </section>

      <section className="py-8 md:py-12">
        <Section>
          <div className="grid gap-6 md:grid-cols-3">
            {serviceCards.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.key}
                  onClick={() => switchPage(service.key)}
                  className="group relative overflow-hidden rounded-[2rem] border border-slate-700 bg-slate-800/90 p-7 text-left shadow-sm transition hover:shadow-xl"
                >
                  <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${service.gradient}`} />
                  <div className="inline-flex text-slate-200">
                    <Icon className="h-7 w-7 stroke-[1.75]" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-3 leading-7 text-slate-300">{service.text}</p>
                  <div className="mt-5 inline-flex items-center gap-2 font-semibold text-white">
                    Learn more <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </button>
              );
            })}
          </div>
        </Section>
      </section>

      <section className="py-10 md:py-16">
        <Section>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="overflow-hidden rounded-[2rem] border border-slate-700 bg-slate-800 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80"
                alt="Marketing team reviewing business growth"
                className="h-[420px] w-full object-cover opacity-95"
              />
            </div>
            <div>
              <h2 className="text-4xl font-semibold tracking-tight text-white">Why businesses choose us</h2>
              <div className="mt-6 space-y-5 text-slate-200">
                <div className="flex gap-3"><span className="mt-[10px] h-2 w-2 shrink-0 rounded-full bg-blue-400" /><p className="leading-7">We help businesses show up higher when local customers search for the services they offer.</p></div>
                <div className="flex gap-3"><span className="mt-[10px] h-2 w-2 shrink-0 rounded-full bg-blue-400" /><p className="leading-7">We create Google Ads that are more targeted, so your budget goes toward people who are actually looking for what you do.</p></div>
                <div className="flex gap-3"><span className="mt-[10px] h-2 w-2 shrink-0 rounded-full bg-blue-400" /><p className="leading-7">We design websites that make your business look trustworthy and make it easier for visitors to reach out.</p></div>
                <div className="flex gap-3"><span className="mt-[10px] h-2 w-2 shrink-0 rounded-full bg-blue-400" /><p className="leading-7">We focus on what matters most to local businesses: better visibility, stronger reviews, and more real clients.</p></div>
              </div>
            </div>
          </div>
        </Section>
      </section>

      <section className="border-y border-slate-700 bg-slate-900/40 py-10 md:py-16">
        <Section>
          <div className="max-w-2xl">
            <h2 className="text-4xl font-semibold tracking-tight text-white">Client feedback</h2>
            <p className="mt-4 leading-7 text-slate-300">Good feedback helps show real results. These are the kinds of outcomes local businesses care about most.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="rounded-[2rem] border border-slate-700 bg-slate-800/90 p-6 shadow-sm">
                <Stars />
                <p className="mt-4 leading-7 text-slate-200">“{item.quote}”</p>
                <div className="mt-5 text-sm text-slate-400">
                  <span className="font-semibold text-white">{item.name}</span> • {item.business}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </section>

      <section className="py-12 md:py-16">
        <Section>
          <CtaBlock onStart={() => switchPage('book')} />
        </Section>
      </section>
    </>
  );

  const FAQPage = () => (
    <Section>
      <section className="py-16 md:py-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-semibold tracking-tight text-white">Frequently asked questions</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            These answers help visitors quickly understand what your business does, who it serves, and how you help bring in more qualified local leads.
          </p>
        </div>
        <div className="mt-10 space-y-5">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-[2rem] border border-slate-700 bg-slate-800/90 p-7 shadow-sm">
              <h3 className="text-xl font-semibold text-white">{faq.q}</h3>
              <p className="mt-3 leading-7 text-slate-300">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </Section>
  );

  const BookPage = () => (
    <Section>
      <section className="py-16 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-5xl font-semibold tracking-tight text-white">Tell us about your business</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              We’ll look at your current online presence, talk through your goals, and recommend practical next steps based on what your business needs.
            </p>
            <div className="mt-8 space-y-4 text-slate-200">
              <div className="flex gap-3"><span className="mt-[10px] h-2 w-2 shrink-0 rounded-full bg-blue-400" /><p className="leading-7">A clear conversation about where your business is now and where you want it to go.</p></div>
              <div className="flex gap-3"><span className="mt-[10px] h-2 w-2 shrink-0 rounded-full bg-blue-400" /><p className="leading-7">We identify opportunities to rank better on Google and bring in stronger leads.</p></div>
              <div className="flex gap-3"><span className="mt-[10px] h-2 w-2 shrink-0 rounded-full bg-blue-400" /><p className="leading-7">You leave with practical next steps even if you are still exploring your options.</p></div>
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-700 bg-slate-800/90 p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-white">Request a time</h2>
            <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
              <input
                name="name"
                value={form.name}
                onChange={handleInputChange}
                className="rounded-2xl border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-400"
                placeholder="Your name"
                required
              />
              <input
                name="businessName"
                value={form.businessName}
                onChange={handleInputChange}
                className="rounded-2xl border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-400"
                placeholder="Business name"
                required
              />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleInputChange}
                className="rounded-2xl border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-400"
                placeholder="Email address"
                required
              />
              <select
                name="service"
                value={form.service}
                onChange={handleInputChange}
                className="rounded-2xl border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-400"
              >
                <option>Website Creation</option>
                <option>Google Ads</option>
                <option>Local SEO</option>
                <option>All of the above</option>
              </select>
              <textarea
                name="message"
                value={form.message}
                onChange={handleInputChange}
                className="min-h-[130px] rounded-2xl border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-400"
                placeholder="Tell us about your business and goals"
                required
              />
              {submitMessage ? (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                  {submitMessage}
                </div>
              ) : null}
              {submitError ? (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {submitError}
                </div>
              ) : null}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-sky-500 to-orange-400 px-6 py-3.5 font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Sending...' : 'Send Request'} <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </Section>
  );

  const currentPage = () => {
    if (page === 'websites') {
      return (
        <ServicePage
          title="Websites that help your business look professional and turn visitors into leads"
          description="A strong website helps customers trust your business as soon as they land on it. We build clean websites that explain what you do clearly and make it easy for people to call, reach out, or request a quote."
          image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80"
          bullets={[
            'Mobile friendly design built for local business credibility',
            'Clear service pages that match what customers are searching for',
            'Simple layouts focused on calls, form submissions, and booked jobs',
            'A polished online presence that supports both SEO and Google Ads performance',
          ]}
        />
      );
    }

    if (page === 'google-ads') {
      return (
        <ServicePage
          title="Google Ads that put your business in front of the right people"
          description="Google Ads can put your business in front of people who are already searching for your service. We build targeted campaigns that help bring in better traffic and more real customers."
          image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=80"
          bullets={[
            'Campaigns built around buyer intent and local service searches',
            'Ad messaging designed to attract clicks from the right prospects',
            'Landing experience aligned to improve conversions',
            'A focus on calls, leads, and paying clients instead of vanity metrics',
          ]}
        />
      );
    }

    if (page === 'seo') {
      return (
        <ServicePage
          title="Show up higher on Google when local customers search for your business"
          description="Strong local SEO helps your business appear more often when people search for the services you provide. We help improve your visibility so you are easier to find and more likely to win local business."
          image="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1400&q=80"
          bullets={[
            'Local search optimization for your business categories and service areas',
            'Website improvements that support better visibility in Google results',
            'Content and page structure aligned to what customers actually search',
            'A stronger online footprint that supports long-term lead generation',
          ]}
        />
      );
    }

    if (page === 'faqs') return <FAQPage />;
    if (page === 'book') return <BookPage />;
    return <HomePage />;
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#1e293b_0%,#263244_30%,#334155_100%)] text-slate-100">
      <header className="sticky top-0 z-50 border-b border-slate-700/80 bg-slate-900/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <button onClick={() => switchPage('home')} className="text-left">
            <div className="text-xl font-semibold tracking-tight text-white md:text-2xl">Pittsburgh Growth Studio</div>
            <div className="text-sm text-slate-400">Websites, Google Ads, and SEO for local businesses</div>
          </button>

          <nav className="hidden items-center gap-6 lg:flex">
            {pages.map((item) => (
              <button
                key={item.key}
                onClick={() => switchPage(item.key)}
                className={`font-medium transition ${page === item.key ? 'text-white' : 'text-slate-300 hover:text-white'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => switchPage('book')}
              className="hidden rounded-2xl bg-gradient-to-r from-blue-600 via-sky-500 to-orange-400 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:opacity-95 sm:inline-flex"
            >
              Get Started
            </button>
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="rounded-2xl border border-slate-600 bg-slate-800 p-2.5 text-slate-100 lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-700 bg-slate-900 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4">
              {pages.map((item) => (
                <button
                  key={item.key}
                  onClick={() => switchPage(item.key)}
                  className="text-left font-medium text-slate-300"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>{currentPage()}</main>
    </div>
  );
}
