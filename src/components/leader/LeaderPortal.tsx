'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Copy,
  Check,
  Trophy,
  Users,
  Target,
  Clock,
  Home,
  Share2,
} from 'lucide-react';
import { Program } from '@/lib/programStore';
import { supabase } from '@/lib/supabase';

interface Props {
  program: Program;
  programCode: string;
  onRefresh: () => void;
}

export function LeaderPortal({ program, programCode, onRefresh }: Props) {
  const [copied, setCopied] = useState(false);

  // Realtime: refresh the dashboard whenever students or donations change
  useEffect(() => {
    const channel = supabase
      .channel(`leader-portal-${programCode}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'students', filter: `program_code=eq.${programCode}` },
        () => { onRefresh(); }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'donations', filter: `program_code=eq.${programCode}` },
        () => { onRefresh(); }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programCode]);

  const copyCode = () => {
    navigator.clipboard.writeText(programCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const progress = Math.min((program.totalRaised / program.goal) * 100, 100);
  const sortedStudents = [...program.students].sort((a, b) => b.raised - a.raised);

  const rankLabel = (i: number) => {
    if (i === 0) return '🥇';
    if (i === 1) return '🥈';
    if (i === 2) return '🥉';
    return `#${i + 1}`;
  };

  const statCards = [
    {
      icon: <Target className="w-5 h-5 text-[#22C55E]" />,
      label: 'Total Raised',
      value: `$${program.totalRaised.toLocaleString()}`,
      sub: `of $${program.goal.toLocaleString()} goal`,
      color: 'text-[#22C55E]',
    },
    {
      icon: <Users className="w-5 h-5 text-[#60a5fa]" />,
      label: 'Students',
      value: program.students.length.toString(),
      sub: 'participants',
      color: 'text-[#60a5fa]',
    },
    {
      icon: <Clock className="w-5 h-5 text-[#F59E0B]" />,
      label: 'Days Left',
      value: program.daysRemaining.toString(),
      sub: `ends ${program.endDate}`,
      color: 'text-[#F59E0B]',
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-[#a78bfa]" />,
      label: 'Avg Per Student',
      value: program.students.length
        ? `$${(program.totalRaised / program.students.length).toFixed(0)}`
        : '$0',
      sub: 'per participant',
      color: 'text-[#a78bfa]',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a172e]">
      {/* Header */}
      <header className="bg-[#0f1f3d] border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#22C55E] flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-sm">Rallyfund</span>
            <span className="hidden sm:inline text-white/20 mx-1">|</span>
            <span className="hidden sm:inline text-white/50 text-sm">Leader Dashboard</span>
          </div>
          <a
            href="/"
            className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            title="Back to home"
          >
            <Home className="w-4 h-4" />
          </a>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Program title + code */}
        <div className="grid lg:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <p className="text-[#22C55E] text-xs font-bold uppercase tracking-wider">{program.schoolName}</p>
            <h1 className="text-2xl font-extrabold text-white mt-1">{program.programName}</h1>
            <p className="text-white/40 text-sm mt-1">Led by {program.leaderName}</p>
            <div className="mt-5">
              <div className="flex justify-between text-sm text-white/50 mb-2">
                <span className="font-semibold text-white">${program.totalRaised.toLocaleString()} raised</span>
                <span>${program.goal.toLocaleString()} goal</span>
              </div>
              <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-2.5 bg-[#22C55E] rounded-full transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[#22C55E] text-xs font-semibold mt-2">{progress.toFixed(0)}% of goal reached</p>
            </div>
          </motion.div>

          {/* Code card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-gradient-to-br from-[#22C55E]/15 to-[#1B3A6B]/30 border border-[#22C55E]/30 rounded-2xl p-6 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-3">
              <Share2 className="w-4 h-4 text-[#22C55E]" />
              <p className="text-[#22C55E] text-sm font-bold">Your Program Code</p>
            </div>
            <p className="text-white/60 text-xs mb-4 leading-relaxed">
              Share this code with your students so they can join at{' '}
              <span className="text-white/80 font-medium">rallyfund.com/join</span>
            </p>
            <div className="flex-1 flex items-center justify-center">
              <div className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-center">
                <p className="text-4xl font-black text-white tracking-[0.25em]">{programCode}</p>
              </div>
            </div>
            <button
              onClick={copyCode}
              className={`mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-sm transition-all ${
                copied
                  ? 'bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy Code
                </>
              )}
            </button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {statCards.map((card, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                {card.icon}
                <p className="text-white/50 text-xs font-medium">{card.label}</p>
              </div>
              <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
              <p className="text-white/30 text-xs mt-0.5">{card.sub}</p>
            </div>
          ))}
        </motion.div>

        {/* Student leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#F59E0B]" />
              <h2 className="text-lg font-bold text-white">Student Leaderboard</h2>
            </div>
            <button
              onClick={onRefresh}
              className="text-white/40 hover:text-white text-xs font-medium transition-colors"
            >
              Refresh
            </button>
          </div>

          {sortedStudents.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white/20" />
              </div>
              <p className="text-white/40 text-sm">No students have joined yet.</p>
              <p className="text-white/25 text-xs mt-1">Share your code to get started!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Header row */}
              <div className="grid grid-cols-[2rem_1fr_6rem_6rem_6rem] gap-3 px-4 pb-2 border-b border-white/10">
                <span className="text-white/30 text-xs font-medium">#</span>
                <span className="text-white/30 text-xs font-medium">Student</span>
                <span className="text-white/30 text-xs font-medium text-right">Raised</span>
                <span className="text-white/30 text-xs font-medium text-right hidden sm:block">Contacts</span>
                <span className="text-white/30 text-xs font-medium text-right hidden sm:block">Joined</span>
              </div>
              {sortedStudents.map((s, i) => (
                <div
                  key={s.id}
                  className={`grid grid-cols-[2rem_1fr_6rem_6rem_6rem] gap-3 items-center rounded-xl px-4 py-3 transition-all ${
                    i < 3 ? 'bg-white/[0.04]' : ''
                  }`}
                >
                  <span className="text-base text-center">{rankLabel(i)}</span>
                  <span className="text-white font-semibold text-sm truncate">{s.name}</span>
                  <span className="text-[#22C55E] font-bold text-sm text-right">
                    ${s.raised.toLocaleString()}
                  </span>
                  <span className="text-white/50 text-sm text-right hidden sm:block">
                    {s.contacts.length}
                  </span>
                  <span className="text-white/30 text-xs text-right hidden sm:block">
                    {new Date(s.joinedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
