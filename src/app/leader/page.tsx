import { Suspense } from 'react';
import { LeaderSetup } from '@/components/leader/LeaderSetup';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Program Leader Portal | Rallyfund',
};

export default function LeaderPage() {
  return (
    <main className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <Suspense>
        <LeaderSetup />
      </Suspense>
    </main>
  );
}
