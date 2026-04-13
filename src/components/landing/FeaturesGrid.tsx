'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BarChart3, Bell, Link2, LayoutDashboard, DollarSign, Zap } from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: 'Real-Time Dashboard',
    description: 'Track every dollar raised with a live portal showing individual student contributions and overall progress toward your goal.',
    color: 'bg-blue-50 text-[#1B3A6B]',
  },
  {
    icon: Bell,
    title: 'Automated Outreach',
    description: 'Our system handles all donor communication so students and coaches can focus on what matters most.',
    color: 'bg-green-50 text-[#16a34a]',
  },
  {
    icon: Link2,
    title: 'Simple Student Onboarding',
    description: 'Students join through a unique program link, create their account, and add contacts in minutes.',
    color: 'bg-amber-50 text-[#d97706]',
  },
  {
    icon: LayoutDashboard,
    title: 'Program Leader Portal',
    description: 'Advisors get a full overview of the fundraiser — every student, every donation, every milestone.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: DollarSign,
    title: 'Lower Fees, More Money',
    description: 'At just 10%, more of every donation goes directly to your program. Competitors charge 30–35%.',
    color: 'bg-green-50 text-[#16a34a]',
  },
  {
    icon: Zap,
    title: 'No Upfront Cost',
    description: "There's nothing to pay before, during, or after. Our fee comes from the funds raised.",
    color: 'bg-blue-50 text-[#1B3A6B]',
  },
];

export function FeaturesGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#22C55E] font-bold text-sm uppercase tracking-widest mb-3">Everything You Need</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#111827] mb-4">Built for Your Program</h2>
          <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
            Every feature is designed to make fundraising effortless for coaches, advisors, students, and donors alike.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 card-hover"
              >
                <div className={`w-12 h-12 rounded-xl ${feat.color} flex items-center justify-center mb-5`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#111827] mb-2">{feat.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{feat.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
