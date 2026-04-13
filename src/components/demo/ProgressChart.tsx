'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { DailyDataPoint } from '@/types';
import { TrendingUp } from 'lucide-react';

interface ProgressChartProps {
  data: DailyDataPoint[];
  goal: number;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{value: number}>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-xl text-sm">
        <p className="font-semibold text-[#111827] mb-1">{label}</p>
        <p className="text-[#22C55E] font-bold">${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
      </div>
    );
  }
  return null;
}

export function ProgressChart({ data, goal }: ProgressChartProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-[#22C55E]" />
            <h3 className="font-bold text-[#111827]">Fundraising Progress</h3>
          </div>
          <p className="text-sm text-[#6B7280]">Cumulative amount raised over time</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
            <span className="text-[#6B7280]">Raised</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-0.5 bg-[#F59E0B] border-dashed border-t-2 border-[#F59E0B]" />
            <span className="text-[#6B7280]">Goal</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22C55E" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#22C55E" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: '#9CA3AF' }}
            tickLine={false}
            axisLine={false}
            interval={2}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#9CA3AF' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={goal}
            stroke="#F59E0B"
            strokeDasharray="6 4"
            strokeWidth={2}
            label={{ value: `Goal $${(goal / 1000).toFixed(0)}k`, fill: '#F59E0B', fontSize: 11, position: 'right' }}
          />
          <Area
            type="monotone"
            dataKey="raised"
            stroke="#22C55E"
            strokeWidth={3}
            fill="url(#greenGradient)"
            dot={false}
            activeDot={{ r: 5, fill: '#22C55E', stroke: 'white', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
