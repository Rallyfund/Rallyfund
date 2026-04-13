import { Button } from '@/components/ui/Button';
import { Check, Info } from 'lucide-react';

const perks = [
  'Custom Branded Fundraising Page',
  'Real-time Dashboard for Admins',
  'Automated SMS & Email Outreach',
  'No Upfront Costs or Minimums',
  'Secure Credit/Debit Processing',
  'Instant Direct Deposit of Funds',
  'Mobile-Ready Donor Experience',
  'US-Based Dedicated Support',
];

export function PricingTable() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative group">
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#1B3A6B] to-[#22C55E] rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        
        <div className="relative bg-white border border-gray-100 rounded-[2rem] shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Main Pricing Side */}
            <div className="lg:col-span-3 p-8 lg:p-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1B3A6B]/5 rounded-full text-[#1B3A6B] text-xs font-bold mb-6">
                <span className="flex h-2 w-2 rounded-full bg-[#1B3A6B]"></span>
                MOST COMPETITIVE IN THE INDUSTRY
              </div>
              
              <h3 className="text-3xl font-black text-[#111827] mb-2">Flat 10% Fee</h3>
              <p className="text-lg text-[#6B7280] mb-8">No subscriptions. No hardware costs. No contracts. We only win when you win.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {perks.map((perk, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="p-1 bg-[#22C55E]/10 rounded-full mt-0.5">
                      <Check className="w-3 h-3 text-[#22C55E]" />
                    </div>
                    <span className="text-sm font-medium text-[#374151]">{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Side */}
            <div className="lg:col-span-2 bg-[#F9FAFB] p-8 lg:p-12 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-gray-100">
              <div className="mb-8">
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-5xl font-black text-[#111827]">10%</span>
                  <span className="text-lg font-bold text-[#6B7280]">flat fee</span>
                </div>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  Transparent pricing designed to maximize the impact of every donation you receive.
                </p>
              </div>

              <div className="space-y-4">
                <Button fullWidth size="lg">Get Started Now</Button>
                <div className="flex items-center justify-center gap-2 text-xs text-[#6B7280]">
                  <Info className="w-3.5 h-3.5" />
                  Includes all processing fees
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-[#1B3A6B] flex items-center justify-center text-[10px] font-bold text-white uppercase">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-[#6B7280] leading-tight">
                    Trusted by <span className="font-bold text-[#111827]">50+</span> schools and organizations nationwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
