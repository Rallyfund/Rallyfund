'use client';

import { useEffect, useState, Suspense } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { TrendingUp } from 'lucide-react';
import { StudentPortal } from '@/components/student/StudentPortal';
import { getProgram, seedDemoProgram, Program } from '@/lib/programStore';

function FundraiserContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = params.code as string;
  const studentName = searchParams.get('student') || '';
  const studentId = searchParams.get('id') || '';
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      await seedDemoProgram();
      const p = await getProgram(code);
      if (!p) {
        router.push('/join');
        return;
      }
      if (!studentName) {
        router.push(`/join?code=${code}`);
        return;
      }
      setProgram(p);
      setLoading(false);
    }
    load();
  }, [code, studentName, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1f3d] flex items-center justify-center">
        <div className="flex items-center gap-3 text-white/50">
          <TrendingUp className="w-5 h-5 animate-pulse" />
          <span>Loading your portal...</span>
        </div>
      </div>
    );
  }

  if (!program) return null;

  return (
    <StudentPortal
      program={program}
      studentName={studentName}
      studentId={studentId}
      programCode={code}
    />
  );
}

export default function FundraiserPage() {
  return (
    <Suspense>
      <FundraiserContent />
    </Suspense>
  );
}
