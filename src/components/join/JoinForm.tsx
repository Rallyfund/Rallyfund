'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getProgram, joinProgram, seedDemoProgram, joinProgramWithUser } from '@/lib/programStore';
import { createClient } from '@/utils/supabase/client';

type Step = 'code' | 'role' | 'name';

export function JoinForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [code, setCode] = useState(searchParams.get('code') || '');
  const [step, setStep] = useState<Step>('code');
  const [programName, setProgramName] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    seedDemoProgram();
  }, []);

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!/^\d{8}$/.test(code)) {
      setError('Please enter a valid 8-digit program code.');
      return;
    }
    setSubmitting(true);
    const program = await getProgram(code);
    setSubmitting(false);
    if (!program) {
      setError('Program not found. Double-check your code and try again.');
      return;
    }
    setProgramName(`${program.programName} — ${program.schoolName}`);
    setStep('role');
  };

  const handleRoleSelect = (role: 'student' | 'leader') => {
    if (role === 'leader') {
      router.push(`/leader/${code}`);
    } else {
      setStep('name');
    }
  };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    setSubmitting(true);

    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (session?.user) {
      const student = await joinProgramWithUser(code, name.trim(), session.user.id);
      if (student) {
        router.push(`/fundraiser/${code}?student=${encodeURIComponent(name.trim())}&id=${student.id}`);
        return;
      }
    }

    const student = await joinProgram(code, name.trim());
    if (!student) {
      setError('Failed to join. Please try again.');
      setSubmitting(false);
      return;
    }
    router.push(
      `/fundraiser/${code}?student=${encodeURIComponent(name.trim())}&id=${student.id}`
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      {/* Logo */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#22C55E] flex items-center justify-center shadow-lg">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold text-white tracking-tight">Rallyfund</span>
      </div>

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
        {/* Step: Code entry */}
        {step === 'code' && (
          <>
            <h1 className="text-2xl font-bold text-white mb-2">Join a Fundraiser</h1>
            <p className="text-white/60 mb-6 text-sm">
              Enter the 8-digit code your program leader gave you.
            </p>
            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <input
                type="text"
                inputMode="numeric"
                maxLength={8}
                autoFocus
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 8))}
                placeholder="12345678"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white text-center text-3xl font-bold tracking-[0.3em] placeholder:text-white/20 focus:outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/30 transition-all"
              />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <Button variant="primary" size="lg" fullWidth type="submit" disabled={submitting}>
                {submitting ? 'Looking up...' : 'Find My Program'}
              </Button>
            </form>
          </>
        )}

        {/* Step: Role selection */}
        {step === 'role' && (
          <>
            <button
              onClick={() => setStep('code')}
              className="flex items-center gap-1 text-white/40 hover:text-white/70 text-sm mb-5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <div className="mb-6">
              <p className="text-[#22C55E] text-sm font-semibold mb-1">Program found!</p>
              <h2 className="text-xl font-bold text-white">{programName}</h2>
            </div>
            <p className="text-white/60 text-sm mb-5">Who are you joining as?</p>
            <div className="space-y-3">
              <button
                onClick={() => handleRoleSelect('student')}
                className="w-full flex items-center gap-4 bg-white/5 hover:bg-white/15 border border-white/20 hover:border-[#22C55E]/60 rounded-xl p-4 transition-all text-left group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#22C55E]/20 flex items-center justify-center group-hover:bg-[#22C55E]/30 transition-colors flex-shrink-0">
                  <Users className="w-5 h-5 text-[#22C55E]" />
                </div>
                <div>
                  <p className="text-white font-semibold">I&apos;m a Student</p>
                  <p className="text-white/50 text-sm">Join and track your fundraising</p>
                </div>
              </button>
              <button
                onClick={() => handleRoleSelect('leader')}
                className="w-full flex items-center gap-4 bg-white/5 hover:bg-white/15 border border-white/20 hover:border-[#F59E0B]/60 rounded-xl p-4 transition-all text-left group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/20 flex items-center justify-center group-hover:bg-[#F59E0B]/30 transition-colors flex-shrink-0">
                  <Shield className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <div>
                  <p className="text-white font-semibold">I&apos;m a Program Leader</p>
                  <p className="text-white/50 text-sm">View your program dashboard</p>
                </div>
              </button>
            </div>
          </>
        )}

        {/* Step: Name entry */}
        {step === 'name' && (
          <>
            <button
              onClick={() => setStep('role')}
              className="flex items-center gap-1 text-white/40 hover:text-white/70 text-sm mb-5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <h2 className="text-2xl font-bold text-white mb-2">What&apos;s your name?</h2>
            <p className="text-white/60 text-sm mb-6">
              Your name will appear on the fundraiser leaderboard.
            </p>
            <form onSubmit={handleJoin} className="space-y-4">
              <input
                type="text"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/30 transition-all"
              />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <Button variant="primary" size="lg" fullWidth type="submit" disabled={submitting}>
                {submitting ? 'Joining...' : 'Enter My Portal'}
              </Button>
            </form>
          </>
        )}
      </div>

      <p className="text-center text-white/30 text-sm mt-6">
        Program leader?{' '}
        <a href="/leader" className="text-[#22C55E] hover:underline font-medium">
          Set up your program →
        </a>
      </p>
    </motion.div>
  );
}
