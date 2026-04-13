'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { TrendingUp } from 'lucide-react';
import { LeaderPortal } from '@/components/leader/LeaderPortal';
import { getProgram, seedDemoProgram, Program } from '@/lib/programStore';

export default function LeaderCodePage() {
  const params = useParams();
  const router = useRouter();
  const code = params.code as string;
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const p = await getProgram(code);
    if (p) setProgram(p);
  };

  useEffect(() => {
    async function load() {
      await seedDemoProgram();
      const p = await getProgram(code);
      if (!p) {
        router.push('/leader');
        return;
      }
      setProgram(p);
      setLoading(false);
    }
    load();
  }, [code, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1f3d] flex items-center justify-center">
        <div className="flex items-center gap-3 text-white/50">
          <TrendingUp className="w-5 h-5 animate-pulse" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (!program) return null;

  return <LeaderPortal program={program} programCode={code} onRefresh={refresh} />;
}
