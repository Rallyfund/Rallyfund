'use client';

import { fundraiserData } from '@/data/mockFundraiser';
import { DemoBanner } from '@/components/demo/DemoBanner';
import { MetricsCards } from '@/components/demo/MetricsCards';
import { ProgressChart } from '@/components/demo/ProgressChart';
import { BreakdownChart } from '@/components/demo/BreakdownChart';
import { StudentTable } from '@/components/demo/StudentTable';
import { ActivityFeed } from '@/components/demo/ActivityFeed';
import { motion } from 'framer-motion';

export default function DemoPage() {
  const { title, organization, goal, totalRaised, dailyProgress, students, recentActivity } = fundraiserData;

  return (
    <main className="min-h-screen pt-24 pb-12 bg-gray-50/50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Banner */}
        <div className="mb-8">
          <DemoBanner />
        </div>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-[#1B3A6B] font-bold text-sm uppercase tracking-wider mb-2">{organization}</p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827]">{title}</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#6B7280] font-medium p-2 px-3 bg-white rounded-lg border border-gray-100 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live Dashboard
            </div>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="mb-10">
          <MetricsCards 
            totalRaised={totalRaised} 
            goal={goal} 
            activeStudents={students.length} 
            daysRemaining={14} 
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Charts & Table */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <ProgressChart data={dailyProgress} goal={goal} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <StudentTable students={students} />
            </motion.div>
          </div>

          {/* Right Column - Secondary Charts & Activity */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <BreakdownChart students={students} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <ActivityFeed items={recentActivity} />
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
