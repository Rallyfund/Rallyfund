'use client';

import React from 'react';
import { updatePassword } from '../actions';
import { TrendingUp, Lock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function UpdatePasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = React.use(searchParams);

  return (
    <div className="min-h-screen bg-[#0a172e] flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#22C55E] flex items-center justify-center shadow-lg shadow-[#22C55E]/20">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-extrabold text-2xl tracking-tight">Rallyfund</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white">Set New Password</h2>
          <p className="mt-2 text-sm text-white/50">Enter your new password below.</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
          <form action={updatePassword} className="space-y-5">
            {params.error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-100">{decodeURIComponent(params.error)}</p>
              </div>
            )}

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-[#22C55E] transition-colors" />
              <input
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                placeholder="New password"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all"
              />
            </div>

            <Button type="submit" variant="primary" className="w-full text-lg py-4">
              Update Password
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-white/30">
          <Link href="/login" className="hover:text-white transition-colors">
            ← Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
