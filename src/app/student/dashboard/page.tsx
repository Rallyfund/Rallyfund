import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { getStudentPrograms, joinProgramWithUser } from '@/lib/programStore';
import { TrendingUp, Plus, LayoutDashboard, Trophy, User, LogOut, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { logout } from '@/app/login/actions';

export default async function StudentDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const userPrograms = await getStudentPrograms(user.id);
  const totalRaised = userPrograms.reduce((sum, item) => sum + item.student.raised, 0);

  return (
    <div className="min-h-screen bg-[#0a172e] flex flex-col">
      {/* Mobile-friendly header */}
      <header className="bg-[#0f1f3d] border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#22C55E] flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">Rallyfund</span>
          </Link>
          <div className="flex items-center gap-4">
             <span className="text-white/40 text-xs hidden sm:block">{user.email?.split('@')[0]} (Player)</span>
             <form action={logout}>
                <button type="submit" className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-all" title="Log Out">
                  <LogOut className="w-4 h-4" />
                </button>
             </form>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-10 space-y-10">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-white leading-tight">My Fundraisers</h1>
            <p className="text-white/50 mt-2 text-lg">Manage your active programs and track your progress</p>
          </div>
          <Button href="/join" variant="primary" size="lg" className="shadow-lg shadow-[#22C55E]/10">
            <Plus className="w-5 h-5 mr-2" /> Join Another Team
          </Button>
        </header>

        {/* Big Status Cards (Mobile-first grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-8 bg-gradient-to-br from-[#22C55E]/30 to-[#0f1f3d] border border-[#22C55E]/30 rounded-3xl relative overflow-hidden group">
            <div className="relative z-10">
               <p className="text-white/60 text-sm font-bold uppercase tracking-widest mb-3">Total You've Raised</p>
               <h2 className="text-5xl font-black text-white">${totalRaised.toLocaleString()}</h2>
               <div className="mt-6 flex items-center gap-2 text-[#22C55E]">
                  <Trophy className="w-5 h-5" />
                  <span className="text-sm font-bold">Keep it up! Each dollar counts.</span>
               </div>
            </div>
            {/* Glow */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#22C55E]/20 blur-3xl rounded-full" />
          </div>
          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
             <p className="text-white/40 text-sm font-bold uppercase tracking-widest mb-3">Active Programs</p>
             <h2 className="text-5xl font-black text-white">{userPrograms.length}</h2>
          </div>
        </div>

        {/* Program Cards */}
        <section className="space-y-6">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Active Campaigns</h3>
           </div>
           
           <div className="grid grid-cols-1 gap-4">
             {userPrograms.length === 0 ? (
                <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl px-6">
                   <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <LayoutDashboard className="w-8 h-8 text-white/20" />
                   </div>
                   <h4 className="text-xl font-bold text-white mb-2">You haven't joined any teams yet.</h4>
                   <p className="text-white/40 mb-8 max-w-sm mx-auto">Get your program's join code from your coach to start raising money!</p>
                   <Button href="/join" variant="primary" size="md">
                      Enter Join Code
                   </Button>
                </div>
             ) : (
                userPrograms.map((item) => (
                  <Link 
                    key={item.program.code} 
                    href={`/fundraiser/${item.program.code}?student=${encodeURIComponent(item.student.name)}&id=${item.student.id}`}
                    className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#22C55E]/30 rounded-3xl transition-all group"
                  >
                    <div className="w-14 h-14 bg-[#22C55E]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                       <Trophy className="w-7 h-7 text-[#22C55E]" />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                       <p className="text-[#22C55E] text-xs font-bold tracking-widest uppercase mb-1">{item.program.schoolName}</p>
                       <h4 className="text-2xl font-extrabold text-white">{item.program.programName}</h4>
                    </div>
                    <div className="px-6 py-2 bg-white/5 rounded-2xl border border-white/10">
                       <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider mb-0.5">You Raised</p>
                       <p className="text-2xl font-black text-white">${item.student.raised.toLocaleString()}</p>
                    </div>
                    <ArrowRight className="w-6 h-6 text-white/20 group-hover:text-[#22C55E] group-hover:translate-x-1 transition-all hidden sm:block" />
                  </Link>
                ))
             )}
           </div>
        </section>

        <footer className="pt-10 text-center">
           <p className="text-white/20 text-xs uppercase tracking-widest font-bold font-mono">Powered by Rallyfund ·Texas 2026</p>
        </footer>
      </main>
    </div>
  );
}
