import { getStudentById } from '@/lib/programStore';
import { notFound } from 'next/navigation';
import DonateClient from './DonateClient';
import { TrendingUp } from 'lucide-react';

export default async function DonatePage({ params }: { params: Promise<{ studentId: string }> }) {
  const resolvedParams = await params;
  const data = await getStudentById(resolvedParams.studentId);
  
  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0a172e]">
      <header className="bg-[#0f1f3d] border-b border-white/10">
        <div className="max-w-xl mx-auto px-4 py-4 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#22C55E] flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-lg">Rallyfund</span>
          </div>
        </div>
      </header>

      <main className="py-12 px-4">
        <div className="max-w-md mx-auto relative">
          {/* Subtle glow effect behind the card */}
          <div className="absolute inset-x-0 -top-10 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-20" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#22C55E] to-[#1B3A6B] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
          </div>
          
          <DonateClient student={data.student} program={data.program} />
        </div>
      </main>
    </div>
  );
}
