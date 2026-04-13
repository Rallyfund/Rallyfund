import { ActivityItem } from '@/types';
import { DollarSign, Activity } from 'lucide-react';

interface ActivityFeedProps {
  items: ActivityItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-[#22C55E]" />
        <div>
          <h3 className="font-bold text-[#111827]">Recent Activity</h3>
          <p className="text-sm text-[#6B7280]">Live donation feed</p>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F9FAFB] transition-colors">
            <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-4 h-4 text-[#22C55E]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#374151]">
                <span className="font-semibold">{item.donor}</span> donated{' '}
                <span className="font-bold text-[#22C55E]">${item.amount.toFixed(2)}</span> via{' '}
                <span className="font-semibold">{item.studentName}</span>
              </p>
              <p className="text-xs text-[#9CA3AF] mt-0.5">{item.timeAgo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
