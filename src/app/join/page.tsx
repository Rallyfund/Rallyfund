import { Suspense } from 'react';
import { JoinForm } from '@/components/join/JoinForm';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Join a Fundraiser | Rallyfund',
};

export default function JoinPage() {
  return (
    <main className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <Suspense>
        <JoinForm />
      </Suspense>
    </main>
  );
}
