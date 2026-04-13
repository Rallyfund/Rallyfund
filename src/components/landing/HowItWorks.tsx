'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { UserPlus, Send, Trophy } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Students Create Accounts & Add Contacts',
    description: 'Students sign up through your program\'s unique link and add the contact information for family, friends, and supporters they\'d like to reach.',
    color: 'bg-[#1B3A6B]',
    lightColor: 'bg-blue-50',
    textColor: 'text-[#1B3A6B]',
  },
  {
    number: '02',
    icon: Send,
    title: 'We Handle the Outreach',
    description: 'Our platform sends personalized fundraising messages to each contact throughout the duration of your fundraiser. Students don\'t have to chase down donations — we do the work.',
    color: 'bg-[#22C55E]',
    lightColor: 'bg-green-50',
    textColor: 'text-[#16a34a]',
  },
  {
    number: '03',
    icon: Trophy,
    title: 'Your Program Collects the Profits',
    description: 'When the fundraiser ends, your program receives the funds raised. No upfront costs. No hidden fees. Just results.',
    color: 'bg-[#F59E0B]',
    lightColor: 'bg-amber-50',
    textColor: 'text-[#d97706]',
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-it-works" className="section-padding bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#22C55E] font-bold text-sm uppercase tracking-widest mb-3">Simple Process</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#111827] mb-4">How It Works</h2>
          <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
            Get your fundraiser off the ground in three simple steps. We handle the heavy lifting.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-14 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-[#1B3A6B] via-[#22C55E] to-[#F59E0B] opacity-20" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full card-hover">
                  {/* Step number + icon */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className={`text-5xl font-extrabold ${step.textColor} opacity-20`}>{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#111827] mb-3">{step.title}</h3>
                  <p className="text-[#6B7280] leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
