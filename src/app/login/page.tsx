'use client';

import React, { useState } from 'react';
import { login, signup, resetPassword } from './actions';
import { TrendingUp, Mail, Lock, AlertCircle, User, GraduationCap, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>
}) {
  const params = React.use(searchParams);
  const [view, setView] = useState<'login' | 'signup' | 'forgot'>('login');
  const [role, setRole] = useState<'advisor' | 'student'>('advisor');

  const heading = view === 'login' ? 'Welcome Back' : view === 'signup' ? 'Create Your Account' : 'Reset Password';
  const subheading = view === 'login'
    ? 'Sign in to access your dashboard'
    : view === 'signup'
    ? 'Join thousands of programs raising more with Rallyfund'
    : 'Enter your email and we\'ll send you a reset link.';

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
          <h2 className="mt-6 text-3xl font-extrabold text-white">{heading}</h2>
          <p className="mt-2 text-sm text-white/50">{subheading}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute inset-x-0 -top-10 -z-10 transform-gpu overflow-hidden blur-3xl opacity-20 pointer-events-none">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#22C55E] to-[#1B3A6B]"></div>
          </div>

          {/* Alerts */}
          {params.error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3 mb-6">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-100">{decodeURIComponent(params.error)}</p>
            </div>
          )}
          {params.message && (
            <div className="bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-xl p-4 text-[#22C55E] text-sm font-medium mb-6">
              {decodeURIComponent(params.message)}
            </div>
          )}

          {/* Forgot password form */}
          {view === 'forgot' ? (
            <form action={resetPassword} className="space-y-5">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-[#22C55E] transition-colors" />
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all"
                />
              </div>
              <Button type="submit" variant="primary" className="w-full text-lg py-4">
                Send Reset Link
              </Button>
              <button
                type="button"
                onClick={() => setView('login')}
                className="w-full text-sm text-white/40 hover:text-white transition-colors pt-1"
              >
                ← Back to sign in
              </button>
            </form>
          ) : (
            <form action={view === 'login' ? login : signup} className="space-y-6">
              {/* Login / Signup tabs */}
              <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${view === 'login' ? 'bg-[#22C55E] text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => setView('signup')}
                  className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${view === 'signup' ? 'bg-[#22C55E] text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                >
                  Sign Up
                </button>
              </div>

              {view === 'signup' && (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('advisor')}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${role === 'advisor' ? 'bg-[#22C55E]/10 border-[#22C55E] text-[#22C55E]' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'}`}
                  >
                    <GraduationCap className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">I'm a Coach</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${role === 'student' ? 'bg-[#22C55E]/10 border-[#22C55E] text-[#22C55E]' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'}`}
                  >
                    <Trophy className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">I'm a Player</span>
                  </button>
                </div>
              )}

              <div className="space-y-4">
                {view === 'signup' && (
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-[#22C55E] transition-colors" />
                    <input
                      name="displayName"
                      type="text"
                      required
                      placeholder="Full Name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all"
                    />
                  </div>
                )}
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-[#22C55E] transition-colors" />
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email address"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all"
                  />
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-[#22C55E] transition-colors" />
                  <input
                    name="password"
                    type="password"
                    autoComplete={view === 'login' ? 'current-password' : 'new-password'}
                    required
                    placeholder="Password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all"
                  />
                </div>
                <input type="hidden" name="role" value={role} />
              </div>

              {view === 'signup' && (
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 w-4 h-4 accent-[#22C55E] flex-shrink-0"
                  />
                  <span className="text-xs text-white/40 leading-relaxed">
                    I am 13 years of age or older and agree to Rallyfund's{' '}
                    <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[#22C55E] hover:underline">Privacy Policy</a>
                    {' '}and{' '}
                    <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-[#22C55E] hover:underline">Terms of Service</a>.
                  </span>
                </label>
              )}

              {view === 'login' && (
                <div className="text-right -mt-2">
                  <button
                    type="button"
                    onClick={() => setView('forgot')}
                    className="text-sm text-white/40 hover:text-[#22C55E] transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <Button type="submit" variant="primary" className="w-full text-lg py-4 relative overflow-hidden group/btn">
                <span className="relative z-10">{view === 'login' ? 'Sign In' : 'Create Account'}</span>
              </Button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-white/30">
          <Link href="/" className="hover:text-white transition-colors">
            ← Back to Rallyfund home
          </Link>
        </p>
      </div>
    </div>
  );
}
