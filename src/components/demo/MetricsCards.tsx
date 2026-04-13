'use client';

import { Fundraiser } from '@/types';
import { DollarSign, Target, Users, Clock } from 'lucide-react';

interface MetricsCardsProps {
  totalRaised: number;
  goal: number;
  activeStudents: number;
  daysRemaining: number;
}

export function MetricsCards({ totalRaised, goal, activeStudents, daysRemaining }: MetricsCardsProps) {
  const progress = (totalRaised / goal) * 100;
  const circumference = 2 * Math.PI * 40;
  const dashOffset = circumference - (progress / 100) * circumference;

  const cards = [
    {
      icon: DollarSign,
      label: 'Total Raised',
      value: `$${totalRaised.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      subtext: `Goal: $${goal.toLocaleString()}`,
      color: 'text-[#22C55E]',
      bg: 'bg-green-50',
      iconColor: 'text-[#22C55E]',
    },
    {
      icon: Users,
      label: 'Active Students',
      value: activeStudents.toString(),
      subtext: 'All participating',
      color: 'text-[#1B3A6B]',
      bg: 'bg-blue-50',
      iconColor: 'text-[#1B3A6B]',
    },
    {
      icon: Clock,
      label: 'Days Remaining',
      value: daysRemaining.toString(),
      subtext: 'estimated', // We don't have duration here anymore, simplified
      color: 'text-[#F59E0B]',
      bg: 'bg-amber-50',
      iconColor: 'text-[#F59E0B]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Progress card with circular ring */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5">
        <div className="relative flex-shrink-0">
          <svg width="88" height="88" className="-rotate-90">
            <circle cx="44" cy="44" r="40" fill="none" stroke="#E5E7EB" strokeWidth="8" />
            <circle
              cx="44" cy="44" r="40"
              fill="none"
              stroke="#22C55E"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ transition: 'stroke-dashoffset 1s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-extrabold text-[#111827]">{progress.toFixed(1)}%</span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-1">
            <Target className="w-4 h-4 text-[#22C55E]" />
            <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Goal Progress</span>
          </div>
          <p className="text-2xl font-extrabold text-[#111827]">{progress.toFixed(1)}%</p>
          <p className="text-xs text-[#6B7280]">of ${goal.toLocaleString()}</p>
        </div>
      </div>

      {/* Other metric cards */}
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${card.iconColor}`} />
              </div>
              <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">{card.label}</span>
            </div>
            <p className={`text-3xl font-extrabold ${card.color} mb-1`}>{card.value}</p>
            <p className="text-xs text-[#6B7280]">{card.subtext}</p>
          </div>
        );
      })}
    </div>
  );
}
