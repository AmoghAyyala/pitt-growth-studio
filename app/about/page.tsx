import React from 'react';

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 py-16 text-[var(--text-primary)] md:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-rise">
            <p className="editorial-kicker">About the salon</p>
            <h1 className="mt-4 max-w-3xl text-6xl font-semibold tracking-[-0.05em] text-[var(--text-primary)]">A neighborhood salon with a warmer point of view.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
              A Cut Above The Rest is built around an idea that still feels rare online and in person: beauty services should feel inviting, personal, and easy to trust. Our Bellevue salon brings classic salon care into a setting that feels calm, human, and refreshingly straightforward.
            </p>
          </div>
          <div className="surface-panel animate-rise delay-2 rounded-[2.2rem] p-8">
            <p className="editorial-kicker">What makes it feel different</p>
            <ul className="mt-6 space-y-4 text-[15px] leading-7 text-[var(--text-secondary)]">
              <li>Thoughtful consultations before service begins</li>
              <li>Current techniques without a rushed or trend-chasing atmosphere</li>
              <li>Practical beauty advice that fits everyday life, not just salon day</li>
              <li>A location that feels convenient and low-stress for repeat visits</li>
            </ul>
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Quality',
              body: 'The work should look polished immediately and still feel wearable when you head back into the rest of your day.',
              delay: 'delay-2',
            },
            {
              title: 'Comfort',
              body: 'Clients respond to environments that reduce tension. Warm color, clean structure, and clear communication matter.',
              delay: 'delay-3',
            },
            {
              title: 'Community',
              body: 'Being local is part of the value. Familiarity lowers friction and increases trust over time.',
              delay: 'delay-4',
            },
          ].map((item) => (
            <div key={item.title} className={`surface-panel animate-rise ${item.delay} rounded-[2rem] p-7`}>
              <h2 className="text-[2.2rem] font-semibold tracking-[-0.04em] text-[var(--text-primary)]">{item.title}</h2>
              <p className="mt-4 text-[15px] leading-7 text-[var(--text-secondary)]">{item.body}</p>
            </div>
          ))}
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="surface-panel animate-rise delay-2 rounded-[2.2rem] p-8">
            <p className="editorial-kicker">Our mission</p>
            <p className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[var(--text-primary)]">
              To deliver salon experiences that leave every client feeling confident, refreshed, and unmistakably a cut above the rest.
            </p>
          </div>
          <div className="animate-rise delay-3 rounded-[2.2rem] border border-[var(--border-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(255,240,231,0.82))] p-8 shadow-[var(--shadow-card)]">
            <p className="text-[16px] leading-8 text-[var(--text-secondary)]">
              The new site design mirrors that mission. It uses a brighter palette to signal openness and cleanliness, expressive typography to create memorability, and restrained motion to guide attention without feeling mechanical. The result is meant to feel more like a boutique editorial experience than a generic salon template.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
