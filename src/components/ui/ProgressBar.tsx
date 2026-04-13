interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  color?: 'green' | 'blue' | 'gold';
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

export function ProgressBar({ value, max = 100, color = 'green', size = 'md', showLabel = false }: ProgressBarProps) {
  const pct = Math.min(100, (value / max) * 100);

  const colors = {
    green: 'bg-[#22C55E]',
    blue: 'bg-[#1B3A6B]',
    gold: 'bg-[#F59E0B]',
  };

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 bg-gray-100 rounded-full overflow-hidden ${heights[size]}`}>
        <div
          className={`${heights[size]} ${colors[color]} rounded-full transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-semibold text-[#6B7280] w-10 text-right">{Math.round(pct)}%</span>
      )}
    </div>
  );
}
