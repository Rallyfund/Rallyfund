'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Student } from '@/types';
import { BarChart2 } from 'lucide-react';

interface BreakdownChartProps {
  students: Student[];
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{value: number}>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-xl text-sm">
        <p className="font-semibold text-[#111827] mb-1">{label}</p>
        <p className="text-[#1B3A6B] font-bold">${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
      </div>
    );
  }
  return null;
}

export function BreakdownChart({ students }: BreakdownChartProps) {
  const data = [...students]
    .sort((a, b) => b.raised - a.raised)
    .map(s => ({
      name: s.name.split(' ')[0],
      raised: s.raised,
    }));

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <BarChart2 className="w-5 h-5 text-[#1B3A6B]" />
        <div>
          <h3 className="font-bold text-[#111827]">Individual Contributions</h3>
          <p className="text-sm text-[#6B7280]">Amount raised per student</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1B3A6B" />
              <stop offset="100%" stopColor="#2a5298" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9CA3AF' }} tickLine={false} axisLine={false} />
          <YAxis
            tick={{ fontSize: 11, fill: '#9CA3AF' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `$${v}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F9FAFB' }} />
          <Bar dataKey="raised" fill="url(#barGradient)" radius={[6, 6, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
