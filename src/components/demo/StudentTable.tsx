'use client';

import { useState, useMemo } from 'react';
import { Student } from '@/types';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';

interface StudentTableProps {
  students: Student[];
}

type SortKey = 'rank' | 'name' | 'raised' | 'contactsAdded' | 'messagesDelivered' | 'lastDonation';
type SortDir = 'asc' | 'desc';

export function StudentTable({ students }: StudentTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('raised');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [search, setSearch] = useState('');

  const maxRaised = Math.max(...students.map((s) => s.raised));

  const sorted = useMemo(() => {
    const filtered = students.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey as keyof Student];
      const bVal = b[sortKey as keyof Student];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return sortDir === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [students, sortKey, sortDir, search]);

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <ChevronUp className="w-3.5 h-3.5 text-gray-300" />;
    return sortDir === 'asc'
      ? <ChevronUp className="w-3.5 h-3.5 text-[#1B3A6B]" />
      : <ChevronDown className="w-3.5 h-3.5 text-[#1B3A6B]" />;
  }

  const cols: { label: string; key: SortKey }[] = [
    { label: 'Rank', key: 'rank' },
    { label: 'Student', key: 'name' },
    { label: 'Amount Raised', key: 'raised' },
    { label: 'Contacts', key: 'contactsAdded' },
    { label: 'Messages Sent', key: 'messagesDelivered' },
    { label: 'Last Donation', key: 'lastDonation' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-[#111827]">Student Leaderboard</h3>
          <p className="text-sm text-[#6B7280]">{students.length} students participating</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            id="student-search"
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] w-56"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F9FAFB]">
              {cols.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="px-4 py-3 text-left text-xs font-bold text-[#6B7280] uppercase tracking-wider cursor-pointer hover:text-[#1B3A6B] select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    <SortIcon col={col.key} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {sorted.map((student, idx) => {
              const rank = students
                .slice()
                .sort((a, b) => b.raised - a.raised)
                .findIndex(s => s.id === student.id) + 1;

              return (
                <tr key={student.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="px-4 py-4">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold ${
                      rank === 1 ? 'bg-amber-100 text-amber-600' :
                      rank === 2 ? 'bg-gray-100 text-gray-600' :
                      rank === 3 ? 'bg-orange-100 text-orange-600' :
                      'bg-gray-50 text-gray-400'
                    }`}>
                      {rank}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1B3A6B] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-semibold text-[#111827] text-sm whitespace-nowrap">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="min-w-[120px]">
                      <p className="font-bold text-[#22C55E] text-sm mb-1">
                        ${student.raised.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </p>
                      <ProgressBar value={student.raised} max={maxRaised} color="green" size="sm" />
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-[#374151] font-medium">{student.contactsAdded}</td>
                  <td className="px-4 py-4 text-sm text-[#374151] font-medium">{student.messagesDelivered}</td>
                  <td className="px-4 py-4 text-sm text-[#6B7280]">
                    {new Date(student.lastDonation).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
