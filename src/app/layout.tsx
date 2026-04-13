import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rallyfund — School Fundraising That Works For You',
  description: 'Rallyfund helps school sports teams and extracurricular programs raise thousands with just a 10% platform fee — compared to 30–35% charged by competitors. No upfront costs. No hidden fees.',
  keywords: ['school fundraising', 'sports team fundraising', 'extracurricular fundraising', 'low fee fundraising', 'Texas fundraising'],
  openGraph: {
    title: 'Rallyfund — Fundraising at Just 10%',
    description: 'Keep more of every dollar your program raises. Rallyfund charges just 10% — competitors take 30–35%.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="antialiased" style={{ fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, system-ui, sans-serif' }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
