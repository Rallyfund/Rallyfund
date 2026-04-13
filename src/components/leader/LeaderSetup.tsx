'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { TrendingUp, Plus, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { createProgram, getProgram, seedDemoProgram } from '@/lib/programStore';
import { createClient } from '@/utils/supabase/client';

type Tab = 'create' | 'access';

export function LeaderSetup() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('create');
  const [form, setForm] = useState({
    programName: '',
    schoolName: '',
    leaderName: '',
    goal: '',
    daysRemaining: '30',
  });
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    seedDemoProgram();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const goalNum = parseInt(form.goal.replace(/,/g, ''), 10);
    if (!goalNum || goalNum < 100) {
      setError('Please enter a valid fundraising goal (minimum $100).');
      return;
    }
    setSubmitting(true);
    try {
      const days = parseInt(form.daysRemaining, 10) || 30;
      const endDate = new Date(Date.now() + days * 86400000).toISOString().split('T')[0];
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      const program = await createProgram({
        programName: form.programName,
        schoolName: form.schoolName,
        leaderName: form.leaderName,
        goal: goalNum,
        endDate,
      }, session?.user?.id);
      router.push(`/leader/${program.code}`);
    } catch {
      setError('Failed to create program. Please try again.');
      setSubmitting(false);
    }
  };

  const handleAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!/^\d{8}$/.test(accessCode)) {
      setError('Please enter a valid 8-digit program code.');
      return;
    }
    setSubmitting(true);
    const program = await getProgram(accessCode);
    setSubmitting(false);
    if (!program) {
      setError('Program not found. Double-check your code.');
      return;
    }
    router.push(`/leader/${accessCode}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#22C55E] flex items-center justify-center shadow-lg">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold text-white tracking-tight">Rallyfund</span>
      </div>

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-2xl font-bold text-white mb-6">Program Leader Portal</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white/5 p-1 rounded-xl">
          <button
            onClick={() => { setTab('create'); setError(''); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
              tab === 'create'
                ? 'bg-[#22C55E] text-white shadow'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <Plus className="w-3.5 h-3.5" /> Create Program
          </button>
          <button
            onClick={() => { setTab('access'); setError(''); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
              tab === 'access'
                ? 'bg-white/20 text-white shadow'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" /> Access Existing
          </button>
        </div>

        {/* Create Program form */}
        {tab === 'create' && (
          <form onSubmit={handleCreate} className="space-y-3">
            <input
              required
              placeholder="Program name (e.g., Varsity Basketball)"
              value={form.programName}
              onChange={(e) => setForm((p) => ({ ...p, programName: e.target.value }))}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#22C55E] text-sm transition-all"
            />
            <input
              required
              placeholder="School name"
              value={form.schoolName}
              onChange={(e) => setForm((p) => ({ ...p, schoolName: e.target.value }))}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#22C55E] text-sm transition-all"
            />
            <input
              required
              placeholder="Your name (coach / advisor)"
              value={form.leaderName}
              onChange={(e) => setForm((p) => ({ ...p, leaderName: e.target.value }))}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#22C55E] text-sm transition-all"
            />
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-sm font-semibold">$</span>
                <input
                  required
                  placeholder="Goal amount"
                  value={form.goal}
                  onChange={(e) => setForm((p) => ({ ...p, goal: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-7 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#22C55E] text-sm transition-all"
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="90"
                  placeholder="Duration (days)"
                  value={form.daysRemaining}
                  onChange={(e) => setForm((p) => ({ ...p, daysRemaining: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#22C55E] text-sm transition-all"
                />
              </div>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button variant="primary" size="lg" fullWidth type="submit" disabled={submitting}>
              {submitting ? 'Creating...' : 'Create & Get My Code'}
            </Button>
          </form>
        )}

        {/* Access existing */}
        {tab === 'access' && (
          <form onSubmit={handleAccess} className="space-y-4">
            <p className="text-white/50 text-sm">Enter your 8-digit program code to access your dashboard.</p>
            <input
              type="text"
              inputMode="numeric"
              maxLength={8}
              autoFocus
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value.replace(/\D/g, '').slice(0, 8))}
              placeholder="12345678"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white text-center text-3xl font-bold tracking-[0.3em] placeholder:text-white/20 focus:outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/30 transition-all"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button variant="primary" size="lg" fullWidth type="submit" disabled={submitting}>
              {submitting ? 'Looking up...' : 'Access Dashboard'}
            </Button>
          </form>
        )}
      </div>

      <p className="text-center text-white/30 text-sm mt-6">
        Have a student code?{' '}
        <a href="/join" className="text-[#22C55E] hover:underline font-medium">
          Join a fundraiser →
        </a>
      </p>
    </motion.div>
  );
}
