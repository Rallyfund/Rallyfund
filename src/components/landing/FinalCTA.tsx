'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden gradient-hero rounded-3xl px-8 py-20 text-center"
        >
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#22C55E]/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#F59E0B]/10 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-[#22C55E]/15 border border-[#22C55E]/30 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#22C55E] pulse-green" />
              <span className="text-[#22C55E] font-semibold text-sm">No upfront cost · Just 10% · Results guaranteed</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 max-w-3xl mx-auto">
              Ready to Raise More and Keep More?
            </h2>
            <p className="text-xl text-white/70 max-w-xl mx-auto mb-10">
              Join programs across Texas that are keeping 90 cents of every dollar raised. Get started today — it's free.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/get-started" variant="primary" size="lg" id="final-cta-button">
                Get Your Program Started <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button href="/demo" variant="outline" size="lg" id="final-cta-demo" className="border-white/30 text-white hover:bg-white/10 hover:text-white focus:ring-white">
                View Live Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
