'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden gradient-hero">
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#22C55E]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#F59E0B]/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white/3 blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#22C55E]/15 border border-[#22C55E]/30 rounded-full px-4 py-2 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-[#22C55E] pulse-green" />
            <span className="text-[#22C55E] font-semibold text-sm">Just 10% — competitors charge 30–35%</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6"
          >
            Money for Your{' '}
            <span className="text-gradient">Program</span>
            {' '}—{' '}
            At No Cost to You
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl text-white/70 leading-relaxed mb-10 max-w-2xl"
          >
            Rallyfund helps school sports teams and extracurricular programs raise thousands — with a fraction of the fees charged by other platforms.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button href="/login" variant="primary" size="lg" id="hero-signup">
              Create Your Account <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button href="/login" variant="outline" size="lg" id="hero-join" className="border-white/30 text-white hover:bg-white/10 hover:text-white focus:ring-white">
              Join Your Team
            </Button>
            <Button href="/demo" variant="outline" size="lg" id="hero-see-demo" className="border-white/30 text-white hover:bg-white/10 hover:text-white focus:ring-white">
              <Play className="w-4 h-4 mr-2" /> View Demo
            </Button>
          </motion.div>

          {/* Social proof */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-white/40 text-sm"
          >
            Trusted by programs across Texas · No upfront costs · No hidden fees
          </motion.p>
        </div>
      </div>
    </section>
  );
}
