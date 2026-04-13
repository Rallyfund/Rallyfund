'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { generateCode } from '@/lib/programStore';

export async function createProgramAction(
  data: { programName: string; schoolName: string; leaderName: string; goal: number; endDate: string }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  // 1. Verify user role is advisor (or leader)
  // For now, we trust the login session, but in production we'd check a `profiles` or `users` table
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'advisor') {
    throw new Error('Only advisors can create programs.');
  }

  // 2. Generate a unique code
  let code = generateCode();
  let exists = true;
  while (exists) {
    const { data: check } = await supabase.from('programs').select('code').eq('code', code).single();
    exists = !!check;
    if (exists) code = generateCode();
  }

  // 3. Create the program
  const { error } = await supabase.from('programs').insert({
    code,
    program_name: data.programName,
    school_name: data.schoolName,
    leader_name: data.leaderName,
    leader_email: user.email,
    leader_id: user.id,
    goal: data.goal,
    end_date: data.endDate,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/advisor/dashboard');
  return { code };
}
