import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const bodyFont = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta' });
const headingFont = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-cormorant', weight: ['400', '500', '600', '700'] });


export const metadata: Metadata = {
  title: 'A Cut Above The Rest Salon',
  description: 'Salon services in Bellevue, PA. Haircuts, color, styling, and more. Located inside Monda & Weiss Family Dentistry.',
};

export const viewport: Viewport = {
  themeColor: '#fff7f0',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <body className={bodyFont.className}>
        <header className="sticky top-0 z-30 border-b border-[var(--border-subtle)] bg-[rgba(255,247,240,0.84)] backdrop-blur-xl">
          <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-8">
            <Link href="/" className="text-2xl font-bold tracking-[-0.04em] text-[var(--text-primary)] md:text-3xl">
              A Cut <span className="text-[var(--accent)]">Above</span> The Rest
            </Link>
            <div className="flex flex-wrap items-center gap-5 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
              <Link href="/about" className="transition hover:text-[var(--accent)]">About</Link>
              <Link href="/services" className="transition hover:text-[var(--accent)]">Services</Link>
              <Link href="/contact" className="transition hover:text-[var(--accent)]">Contact</Link>
            </div>
          </nav>
        </header>
        <div>{children}</div>
        <footer className="border-t border-[var(--border-subtle)] bg-[linear-gradient(180deg,rgba(255,241,231,0.8),rgba(255,247,240,0.98))]">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-[var(--text-secondary)] md:flex-row md:items-center md:justify-between md:px-8">
            <p>A Cut Above The Rest Salon</p>
            <p>534 Lincoln Avenue, Bellevue, PA 15202</p>
            <a href="tel:4124038392" className="transition hover:text-[var(--accent)]">(412) 403-8392</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
