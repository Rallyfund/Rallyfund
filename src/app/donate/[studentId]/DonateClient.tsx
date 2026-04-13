'use client';
import { useState } from 'react';
import { Program, ProgramStudent } from '@/lib/programStore';
import { Button } from '@/components/ui/Button';

export default function DonateClient({ student, program }: { student: ProgramStudent, program: Program }) {
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState(false);
  const [loading, setLoading] = useState(false);

  const presets = [25, 50, 100, 250];
  const handleCheckout = async () => {
    try {
      setLoading(true);
      const finalAmount = isCustom ? parseFloat(customAmount) : amount;
      if (!finalAmount || Number.isNaN(finalAmount) || finalAmount < 5) {
         alert('Minimum donation is $5.');
         setLoading(false);
         return;
      }


      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: student.id,
          studentName: student.name,
          programCode: program.code,
          programName: program.programName,
          amount: finalAmount,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize checkout');
      }

      const { url } = data;
      if (!url) throw new Error('No checkout URL received');

      window.location.href = url;
    } catch (err: any) {
      console.error(err);
      alert('Failed to initiate checkout: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
      <div className="text-center mb-8">
        <p className="text-[#22C55E] text-sm font-bold tracking-wider uppercase mb-2">{program.programName}</p>
        <h1 className="text-3xl font-extrabold text-white mb-4">Support {student.name}</h1>
        <p className="text-white/60 text-sm max-w-sm mx-auto">
          Your donation helps {student.name} reach their goal for the {program.schoolName} {program.programName} program!
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-3">Select Amount</label>
          <div className="grid grid-cols-2 gap-3 mb-3">
            {presets.map(p => (
              <button
                key={p}
                onClick={() => {
                  setIsCustom(false);
                  setAmount(p);
                }}
                className={`py-3 rounded-xl font-bold text-lg transition-all ${!isCustom && amount === p ? 'bg-[#22C55E] text-white shadow-lg shadow-[#22C55E]/20' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}
              >
                ${p}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsCustom(true)}
            className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${isCustom ? 'bg-[#22C55E] text-white shadow-lg shadow-[#22C55E]/20' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}
          >
            Custom Amount
          </button>
          
          {isCustom && (
             <div className="mt-4 relative">
               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-bold">$</span>
               <input
                 type="number"
                 min="5"
                 step="1"
                 placeholder="Enter amount"
                 value={customAmount}
                 onChange={(e) => setCustomAmount(e.target.value)}
                 className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-8 pr-4 text-white text-lg font-bold focus:outline-none focus:border-[#22C55E] transition-colors"
               />
             </div>
          )}
        </div>

        <Button onClick={handleCheckout} disabled={loading} className="w-full text-lg py-4">
          {loading ? 'Processing...' : 'Donate Now'}
        </Button>
      </div>
    </div>
  );
}
