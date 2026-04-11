import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const syne = Syne({ subsets: ['latin'], variable: '--font-syne' });

export const metadata: Metadata = {
  title: 'Pittsburgh Growth Studio',
  description: 'Websites and Google Ads + SEO for local businesses.',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
  themeColor: '#070d1a',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
