'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const comparisons = [
  { amount: 10000, rallyfund: 9000, competitor: 6500 },
  { amount: 25000, rallyfund: 22500, competitor: 16250 },
];

export function WhyRallyfund() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#22C55E] font-bold text-sm uppercase tracking-widest mb-3">The Rallyfund Difference</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#111827] leading-tight mb-6">
              Your Program Keeps{' '}
              <span className="text-gradient">More of Every Dollar</span>
            </h2>
            <p className="text-xl text-[#6B7280] leading-relaxed mb-8">
              Other platforms take <strong className="text-red-500">30–35%</strong> of what your donors give. We take just <strong className="text-[#22C55E]">10%</strong>. That's a massive difference when your program is counting on those funds.
            </p>

            {/* Fee highlight */}
            <div className="flex items-stretch gap-4">
              <div className="flex-1 bg-[#FEF2F2] border-2 border-red-200 rounded-2xl p-5 text-center">
                <TrendingDown className="w-7 h-7 text-red-400 mx-auto mb-2" />
                <p className="text-3xl font-extrabold text-red-500 mb-1">30–35%</p>
                <p className="text-sm text-red-400 font-semibold">Typical Competitor</p>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                  <span className="text-[#22C55E] font-bold text-xs">VS</span>
                </div>
              </div>
              <div className="flex-1 bg-[#F0FDF4] border-2 border-[#22C55E]/40 rounded-2xl p-5 text-center">
                <TrendingUp className="w-7 h-7 text-[#22C55E] mx-auto mb-2" />
                <p className="text-3xl font-extrabold text-[#22C55E] mb-1">10%</p>
                <p className="text-sm text-[#16a34a] font-semibold">Rallyfund</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Comparison cards */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6"
          >
            {comparisons.map((c, i) => (
              <motion.div
                key={c.amount}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
              >
                <p className="text-sm font-semibold text-[#6B7280] mb-4">
                  If your program raises <span className="text-[#111827] font-bold">${c.amount.toLocaleString()}</span>…
                </p>

                {/* Rallyfund bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-bold text-[#22C55E]">Rallyfund keeps $1k — you keep:</span>
                    <span className="text-lg font-extrabold text-[#111827]">${c.rallyfund.toLocaleString()}</span>
                  </div>
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${(c.rallyfund / c.amount) * 100}%` } : {}}
                      transition={{ duration: 1, delay: 0.4 + i * 0.15, ease: 'easeOut' }}
                      className="h-4 bg-gradient-to-r from-[#22C55E] to-[#16a34a] rounded-full"
                    />
                  </div>
                </div>

                {/* Competitor bar */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-medium text-[#9CA3AF]">Competitor (35%) — you keep:</span>
                    <span className="text-lg font-bold text-[#9CA3AF]">${c.competitor.toLocaleString()}</span>
                  </div>
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${(c.competitor / c.amount) * 100}%` } : {}}
                      transition={{ duration: 1, delay: 0.55 + i * 0.15, ease: 'easeOut' }}
                      className="h-4 bg-gray-300 rounded-full"
                    />
                  </div>
                </div>

                {/* Difference */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-center">
                    With Rallyfund, your program earns{' '}
                    <span className="text-[#22C55E] font-extrabold text-base">
                      +${(c.rallyfund - c.competitor).toLocaleString()} more
                    </span>
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
