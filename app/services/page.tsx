import React from 'react';

const SERVICES = [
  {
    name: 'Haircuts & Styling',
    description: 'Precision cuts, trims, blowouts, and styling for all hair types and ages.',
    mood: 'Clean shape, polished finish',
  },
  {
    name: 'Color & Highlights',
    description: 'Full color, root touch-ups, balayage, highlights, and lowlights using premium products.',
    mood: 'Dimension, warmth, brightness',
  },
  {
    name: 'Treatments',
    description: 'Deep conditioning, keratin treatments, and scalp massages to keep your hair healthy and vibrant.',
    mood: 'Repair and softness',
  },
  {
    name: 'Special Occasion Hair',
    description: 'Updos, curls, and elegant styles for weddings, proms, and events.',
    mood: 'Event-ready glamour',
  },
  {
    name: 'Facial Waxing',
    description: 'Brow shaping, lip, and chin waxing for a polished look.',
    mood: 'Refined finishing detail',
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen px-6 py-16 text-[var(--text-primary)] md:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="animate-rise max-w-3xl">
          <p className="editorial-kicker">Services</p>
          <h1 className="mt-4 text-6xl font-semibold tracking-[-0.05em] text-[var(--text-primary)]">Salon essentials, styled to feel elevated.</h1>
          <p className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">
            The service mix stays familiar on purpose. What changes is the way it is presented: clearer categories, stronger emotional cues, and a tone that makes each option feel intentional instead of generic.
          </p>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service, index) => (
            <article key={service.name} className={`surface-panel animate-rise delay-${Math.min(index + 1, 5)} rounded-[2rem] p-7`}>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">{service.mood}</p>
              <h2 className="mt-4 text-[2.25rem] font-semibold tracking-[-0.04em] text-[var(--text-primary)]">{service.name}</h2>
              <p className="mt-4 text-[15px] leading-7 text-[var(--text-secondary)]">{service.description}</p>
            </article>
          ))}
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="surface-panel animate-rise delay-2 rounded-[2.2rem] p-8">
            <p className="editorial-kicker">Why this works</p>
            <p className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[var(--text-primary)]">
              People decide faster when the choices feel curated, not crowded.
            </p>
            <p className="mt-5 text-[16px] leading-8 text-[var(--text-secondary)]">
              Grouping services into emotionally legible categories improves scanability and reduces decision fatigue. That makes the page easier to use and the salon feel more premium.
            </p>
          </div>
          <div className="animate-rise delay-3 rounded-[2.2rem] border border-[var(--border-subtle)] bg-[linear-gradient(180deg,rgba(255,240,231,0.82),rgba(255,255,255,0.7))] p-8 shadow-[var(--shadow-card)]">
            <p className="editorial-kicker">Booking cue</p>
            <p className="mt-4 text-[16px] leading-8 text-[var(--text-secondary)]">
              When clients know the service they want, they are more likely to reach out confidently. When they do not, the descriptions still give them enough clarity to start a conversation.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
