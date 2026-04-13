'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { TrendingUp, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await fetch('/api/checkout/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });
        
        if (res.ok) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (e) {
        setStatus('error');
      }
    };

    verifyPayment();
    // Intentionally running once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#0a172e] flex flex-col">
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

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-8 text-center relative overflow-hidden">
          <div className="absolute inset-x-0 -top-10 -z-10 transform-gpu blur-3xl sm:-top-20" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#22C55E] to-transparent opacity-20" />
          </div>

          {status === 'verifying' && (
            <div className="py-8">
              <Loader2 className="w-12 h-12 text-[#22C55E] animate-spin mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Verifying Payment...</h1>
              <p className="text-white/60">Please don't close this window.</p>
            </div>
          )}

          {status === 'success' && (
            <div className="py-2">
              <div className="w-16 h-16 bg-[#22C55E]/20 text-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-extrabold text-white mb-4">Donation Successful!</h1>
              <p className="text-white/70 mb-8 max-w-sm mx-auto">
                Thank you for your generous support! Your donation has been securely processed and credited to the student's fundraiser.
              </p>
              <Link href="/" className="inline-block bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-colors">
                Return Home
              </Link>
            </div>
          )}

          {status === 'error' && (
            <div className="py-6">
              <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">!</span>
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">Something went wrong</h1>
              <p className="text-white/70 mb-8 max-w-sm mx-auto">
                We couldn't verify this transaction automatically. If you were charged, please contact the program coordinator.
              </p>
              <Link href="/" className="inline-block bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-colors">
                Return Home
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
