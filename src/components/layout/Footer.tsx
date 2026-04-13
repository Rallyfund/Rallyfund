'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TrendingUp, Mail, Phone } from 'lucide-react';

const PORTAL_ROUTES = ['/join', '/fundraiser', '/leader'];

export function Footer() {
  const pathname = usePathname();
  if (PORTAL_ROUTES.some((r) => pathname.startsWith(r))) return null;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f2447] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo + tagline */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#22C55E] flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Rallyfund</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Fundraising that works for your program. Keep more of what you raise.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-full px-3 py-1.5">
              <div className="w-2 h-2 rounded-full bg-[#22C55E] pulse-green" />
              <span className="text-[#22C55E] text-xs font-semibold">Just 10% platform fee</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'How It Works', href: '/#how-it-works' },
                { label: 'Demo Portal', href: '/demo' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'Get Started', href: '/get-started' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-[#22C55E] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:hello@rallyfund.com" className="flex items-center gap-2 text-white/60 hover:text-[#22C55E] text-sm transition-colors">
                  <Mail className="w-4 h-4" />
                  hello@rallyfund.com
                </a>
              </li>
              <li>
                <a href="tel:+18005551234" className="flex items-center gap-2 text-white/60 hover:text-[#22C55E] text-sm transition-colors">
                  <Phone className="w-4 h-4" />
                  (800) 555-1234
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-white/40 text-xs">Based in Texas, serving programs nationwide.</p>
            </div>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-[#22C55E] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">© {currentYear} Rallyfund. All rights reserved.</p>
          <p className="text-white/40 text-xs">
            Empowering school programs, one fundraiser at a time.
          </p>
        </div>
      </div>
    </footer>
  );
}
