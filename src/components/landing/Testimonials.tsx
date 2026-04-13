'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Rallyfund made our booster fundraiser so easy. We raised more than ever before, and the parents loved the hands-off experience.",
    name: "Maria Gonzalez",
    role: "Booster Club President",
    school: "Southlake Carroll High School",
    raised: "$14,200",
  },
  {
    quote: "I was skeptical at first, but seeing 90% of every donation go directly to our program changed my mind. We'll be using Rallyfund every year.",
    name: "Coach Brian Harper",
    role: "Varsity Basketball Coach",
    school: "Flower Mound High School",
    raised: "$9,850",
  },
  {
    quote: "Our kids didn't have to door-knock or chase down donations. The automated messaging handled everything and we hit our goal in 3 weeks.",
    name: "Amanda Reyes",
    role: "Theater Program Director",
    school: "Frisco High School",
    raised: "$7,500",
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#22C55E] font-bold text-sm uppercase tracking-widest mb-3">Success Stories</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#111827] mb-4">Programs Love Rallyfund</h2>
          <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
            Coaches, advisors, and booster club leaders across Texas are raising more and keeping more.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-[#F9FAFB] border border-gray-100 rounded-2xl p-8 card-hover relative"
            >
              <Quote className="w-8 h-8 text-[#22C55E] opacity-60 mb-4" />
              <p className="text-[#374151] leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#111827]">{t.name}</p>
                  <p className="text-sm text-[#6B7280]">{t.role}</p>
                  <p className="text-xs text-[#9CA3AF]">{t.school}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#6B7280] mb-1">Raised</p>
                  <p className="text-xl font-extrabold text-[#22C55E]">{t.raised}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
