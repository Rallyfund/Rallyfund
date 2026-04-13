'use client';

import { SavingsCalculator } from '@/components/pricing/SavingsCalculator';
import { PricingTable } from '@/components/pricing/PricingTable';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Heart } from 'lucide-react';

export default function PricingPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-[#1B3A6B]/5 to-transparent -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#22C55E]/5 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-[#111827] mb-6 leading-[1.1]">
              Simple, Transparent <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B3A6B] to-[#22C55E]">
                Success-Based Pricing
              </span>
            </h1>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              No setup fees, no monthly costs. We only get paid when your fundraiser succeeds. 
              Keep more of what you raise for your cause.
            </p>
          </motion.div>
        </div>

        {/* Pricing Table Section */}
        <section className="mb-24">
          <PricingTable />
        </section>

        {/* Comparison Calculator Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#111827] mb-4">Calculate Your Impact</h2>
            <p className="text-[#6B7280]">Estimate how much more you'll keep with Rallyfund compared to industry averages.</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <SavingsCalculator />
          </div>
        </section>

        {/* Why 10% Section */}
        <section className="bg-white rounded-[2.5rem] p-8 md:p-16 border border-gray-100 shadow-xl mb-24 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#1B3A6B]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-[#111827] mb-3">No Hidden Costs</h4>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                The 10% fee includes all credit card processing, platform maintenance, and customer support. No surprises on your final statement.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#22C55E]">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-[#111827] mb-3">Risk-Free Launch</h4>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                You never pay a dime upfront. If you don't raise any money, you don't owe us anything. We are fully invested in your success.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-500">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-[#111827] mb-3">Maximizing Impact</h4>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                By charging 60-70% less than traditional fundraising platforms, we help more dollars stay within schools and local communities.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-black text-[#111827] mb-8">Ready to start saving?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="px-8 flex items-center gap-2">
              Launch Fundraiser <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              View Sample Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
