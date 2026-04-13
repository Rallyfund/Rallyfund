import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { getAdvisorPrograms } from '@/lib/programStore';
import { TrendingUp, Plus, LayoutDashboard, Settings, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { logout } from '@/app/login/actions';

export default async function AdvisorDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const programs = await getAdvisorPrograms(user.id);
  const totalRaised = programs.reduce((sum, p) => sum + p.totalRaised, 0);
  const totalGoal = programs.reduce((sum, p) => sum + p.goal, 0);
  const progressPercent = totalGoal > 0 ? (totalRaised / totalGoal) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#0a172e]">
      {/* Sidebar - Desktop Only */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0f1f3d] border-r border-white/10 hidden lg:block">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-[#22C55E] flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">Rallyfund</span>
          </Link>
          
          <nav className="space-y-1">
            <Link href="/advisor/dashboard" className="flex items-center gap-3 px-4 py-3 bg-[#22C55E]/10 text-[#22C55E] rounded-xl font-semibold">
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all">
              <User className="w-5 h-5" />
              Settings
            </Link>
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <form action={logout}>
             <button className="flex items-center gap-3 px-4 py-3 text-white/40 hover:text-red-400 transition-all w-full text-left">
               <LogOut className="w-5 h-5" />
               Log Out
             </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-6 lg:p-10">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Coach Dashboard</h1>
            <p className="text-white/40 mt-1">Welcome back, {user.email?.split('@')[0]}</p>
          </div>
          <Button href="/demo" variant="primary" size="md">
            <Plus className="w-4 h-4 mr-2" /> Create New Program
          </Button>
        </header>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-white/40 text-sm font-medium mb-1">Total Raised</p>
            <p className="text-3xl font-bold text-[#22C55E]">${totalRaised.toLocaleString()}</p>
            <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
               <div className="h-full bg-[#22C55E] transition-all" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-white/40 text-sm font-medium mb-1">Active Programs</p>
            <p className="text-3xl font-bold text-white">{programs.length}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-white/40 text-sm font-medium mb-1">Total Goal</p>
            <p className="text-3xl font-bold text-white">${totalGoal.toLocaleString()}</p>
          </div>
        </div>

        {/* Programs List */}
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Your Programs</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-white/40 text-xs font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Program Name</th>
                  <th className="px-6 py-4">Join Code</th>
                  <th className="px-6 py-4">Students</th>
                  <th className="px-6 py-4">Raised</th>
                  <th className="px-6 py-4">Goal</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {programs.length === 0 ? (
                   <tr>
                     <td colSpan={6} className="px-6 py-12 text-center text-white/20">
                       You haven't created any programs yet.
                     </td>
                   </tr>
                ) : (
                  programs.map((p) => (
                    <tr key={p.code} className="hover:bg-white/5 transition-all group">
                      <td className="px-6 py-4 font-semibold text-white">{p.programName}</td>
                      <td className="px-6 py-4">
                        <code className="bg-[#22C55E]/10 text-[#22C55E] px-2 py-1 rounded text-sm font-mono">{p.code}</code>
                      </td>
                      <td className="px-6 py-4 text-white/60">{p.students.length} players</td>
                      <td className="px-6 py-4 font-bold text-[#22C55E]">${p.totalRaised.toLocaleString()}</td>
                      <td className="px-6 py-4 text-white/60">${p.goal.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className="bg-[#22C55E]/15 text-[#22C55E] text-[10px] font-bold px-2 py-1 rounded-full uppercase">Active</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
