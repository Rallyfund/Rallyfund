'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const navLinks = [
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Demo', href: '/demo' },
  { label: 'Pricing', href: '/pricing' },
];

const PORTAL_ROUTES = ['/join', '/fundraiser', '/leader'];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const isPortal = PORTAL_ROUTES.some((r) => pathname.startsWith(r));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isPortal) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" id="navbar-logo">
              <div className="w-9 h-9 rounded-xl bg-[#22C55E] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xl font-bold tracking-tight transition-colors ${isScrolled ? 'text-[#111827]' : 'text-white'}`}>
                Rallyfund
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 hover:bg-white/10 ${
                    isScrolled ? 'text-[#374151] hover:bg-gray-100 hover:text-[#1B3A6B]' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link 
                href="/login" 
                className={`text-sm font-bold px-4 py-2 hover:bg-white/10 rounded-lg transition-all ${isScrolled ? 'text-[#374151]' : 'text-white'}`}
              >
                Log In
              </Link>
              <Button href="/login" variant="primary" size="sm" id="navbar-cta">
                Sign Up
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'text-[#111827]' : 'text-white'}`}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 md:hidden ${
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileOpen(false)} />
        <div
          className={`absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl transition-transform duration-300 ${
            isMobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 pt-20">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-[#374151] font-semibold hover:bg-gray-100 hover:text-[#1B3A6B] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
              <Button href="/login" variant="outline" size="md" className="w-full text-gray-700" id="mobile-login">
                Log In
              </Button>
              <Button href="/login" variant="primary" size="md" className="w-full" id="mobile-cta">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
