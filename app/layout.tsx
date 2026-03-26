import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pittsburgh Growth Studio',
  description: 'Websites and search marketing for local businesses.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
