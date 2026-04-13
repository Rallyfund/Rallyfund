'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Calculator, TrendingUp, Info } from 'lucide-react';

export function SavingsCalculator() {
  const [participants, setParticipants] = useState(50);
  const [avgGoal, setAvgGoal] = useState(200);
  const [totalRaised, setTotalRaised] = useState(10000);

  // Sync total raised when inputs change
  useEffect(() => {
    setTotalRaised(participants * avgGoal);
  }, [participants, avgGoal]);

  const rallyfundFee = totalRaised * 0.10;
  const traditionalFee = totalRaised * 0.35;
  const savings = traditionalFee - rallyfundFee;

  return (
    <Card className="p-0 overflow-hidden border-2 border-[#1B3A6B]/10 shadow-2xl bg-white/80 backdrop-blur-sm">
      <div className="bg-[#1B3A6B] p-6 text-white text-center">
        <div className="flex justify-center mb-2">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
            <Calculator className="w-6 h-6 text-[#22C55E]" />
          </div>
        </div>
        <h3 className="text-xl font-extrabold">Savings Calculator</h3>
        <p className="text-white/70 text-sm mt-1">See how much more you keep with Rallyfund</p>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-6">
            <Input
              label="Number of Participants"
              type="number"
              value={participants}
              onChange={(e) => setParticipants(Number(e.target.value))}
              className="bg-gray-50"
            />
            <Input
              label="Average Goal per Participant ($)"
              type="number"
              value={avgGoal}
              onChange={(e) => setAvgGoal(Number(e.target.value))}
              className="bg-gray-50"
            />
            <div className="pt-2">
              <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2 block">Total Expected Raise</label>
              <div className="text-2xl font-black text-[#111827] flex items-baseline gap-1">
                ${totalRaised.toLocaleString()}
                <span className="text-sm font-normal text-[#6B7280]">estimated</span>
              </div>
            </div>
          </div>

          <div className="bg-[#F9FAFB] rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-[#22C55E]" />
              <span className="text-xs font-bold text-[#1B3A6B] uppercase tracking-wider">The Comparison</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                <span className="text-sm text-[#6B7280]">10% Fee (Rallyfund)</span>
                <span className="font-bold text-[#22C55E]">${rallyfundFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                <span className="text-sm text-[#6B7280]">35% Fee (Competitors)</span>
                <span className="font-bold text-red-500">${traditionalFee.toLocaleString()}</span>
              </div>
              
              <div className="pt-4 border-t border-dashed border-gray-200">
                <div className="bg-[#22C55E]/10 rounded-2xl p-4 text-center">
                  <p className="text-xs font-bold text-[#22C55E] uppercase tracking-widest mb-1">Total Extra for Your Cause</p>
                  <p className="text-4xl font-black text-[#22C55E] tracking-tight">
                    ${savings.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-amber-50 p-4 rounded-xl border border-amber-100 text-amber-800 text-xs">
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p className="leading-relaxed">
            Estimates are based on average industry fees of 30-35% compared to our flat 10% fee. 
            Financial processing fees (typically ~2.9% + $0.30) are included in our 10% model.
          </p>
        </div>
      </div>
    </Card>
  );
}
