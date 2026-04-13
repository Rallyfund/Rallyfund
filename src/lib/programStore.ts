import { SupabaseClient } from '@supabase/supabase-js';
import { supabase as defaultSupabase } from './supabase';

export interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  relationship?: string;
  lastSentAt?: string;
  isUnsubscribed?: boolean;
}

export interface ProgramStudent {
  id: string;
  name: string;
  raised: number;
  contacts: Contact[];
  joinedAt: string;
}

export interface Program {
  code: string;
  programName: string;
  schoolName: string;
  leaderName: string;
  leaderEmail?: string;
  leaderId?: string;
  goal: number;
  totalRaised: number;
  daysRemaining: number;
  endDate: string;
  students: ProgramStudent[];
}

export function generateCode(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

function calcDaysRemaining(endDate: string): number {
  const end = new Date(endDate);
  const now = new Date();
  const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

function rowToProgram(
  row: {
    code: string;
    program_name: string;
    school_name: string;
    leader_name: string;
    leader_email?: string | null;
    leader_id?: string | null;
    goal: number;
    end_date: string;
  },
  students: ProgramStudent[]
): Program {
  const totalRaised = students.reduce((sum, s) => sum + s.raised, 0);
  return {
    code: row.code,
    programName: row.program_name,
    schoolName: row.school_name,
    leaderName: row.leader_name,
    leaderEmail: row.leader_email ?? undefined,
    leaderId: row.leader_id ?? undefined,
    goal: row.goal,
    totalRaised,
    daysRemaining: calcDaysRemaining(row.end_date),
    endDate: row.end_date,
    students,
  };
}

async function fetchStudentsForProgram(programCode: string, supabase: SupabaseClient = defaultSupabase): Promise<ProgramStudent[]> {
  const { data: students, error } = await supabase
    .from('students')
    .select('id, name, raised, joined_at, contacts(id, name, email, phone, relationship, last_sent_at, is_unsubscribed)')
    .eq('program_code', programCode)
    .order('raised', { ascending: false });

  if (error || !students) return [];

  return students.map((s: any) => ({
    id: s.id,
    name: s.name,
    raised: s.raised,
    joinedAt: s.joined_at,
    contacts: (s.contacts ?? []).map((c: any) => ({
      id: c.id,
      name: c.name,
      email: c.email ?? undefined,
      phone: c.phone ?? undefined,
      relationship: c.relationship ?? undefined,
      lastSentAt: c.last_sent_at ?? undefined,
      isUnsubscribed: c.is_unsubscribed ?? false,
    })),
  }));
}

export async function getProgram(code: string, supabase: SupabaseClient = defaultSupabase): Promise<Program | null> {
  const { data: row, error } = await supabase
    .from('programs')
    .select('*')
    .eq('code', code)
    .single();

  if (error || !row) return null;

  const students = await fetchStudentsForProgram(code, supabase);
  return rowToProgram(row, students);
}

export async function getStudentById(subjectId: string, supabase: SupabaseClient = defaultSupabase): Promise<{ student: ProgramStudent; program: Program } | null> {
  const { data, error } = await supabase
    .from('students')
    .select('program_code')
    .eq('id', subjectId)
    .single();

  if (error || !data) return null;

  const program = await getProgram(data.program_code, supabase);
  if (!program) return null;

  const student = program.students.find(s => s.id === subjectId);
  if (!student) return null;

  return { student, program };
}

export async function getAdvisorPrograms(leaderId: string, supabase: SupabaseClient = defaultSupabase): Promise<Program[]> {
  const { data: rows, error } = await supabase
    .from('programs')
    .select('*')
    .eq('leader_id', leaderId);

  if (error || !rows) return [];

  const programs = await Promise.all(
    rows.map(async (row) => {
      const students = await fetchStudentsForProgram(row.code, supabase);
      return rowToProgram(row, students);
    })
  );

  return programs;
}

export async function getStudentPrograms(userId: string, supabase: SupabaseClient = defaultSupabase): Promise<{ student: ProgramStudent; program: Program }[]> {
  const { data: students, error } = await supabase
    .from('students')
    .select('id, program_code')
    .eq('user_id', userId);

  if (error || !students) return [];

  const results = await Promise.all(
    students.map(async (s) => {
      const data = await getStudentById(s.id, supabase);
      return data;
    })
  );

  return results.filter((r): r is { student: ProgramStudent; program: Program } => r !== null);
}

export async function refreshProgram(code: string, supabase: SupabaseClient = defaultSupabase): Promise<Program | null> {
  return getProgram(code, supabase);
}

export async function createProgram(
  data: Omit<Program, 'code' | 'students' | 'totalRaised' | 'daysRemaining'>,
  leaderId?: string
): Promise<Program> {
  let code = generateCode();
  let exists = true;
  while (exists) {
    const { data: check } = await defaultSupabase.from('programs').select('code').eq('code', code).single();
    exists = !!check;
    if (exists) code = generateCode();
  }

  const { error } = await defaultSupabase.from('programs').insert({
    code,
    program_name: data.programName,
    school_name: data.schoolName,
    leader_name: data.leaderName,
    leader_email: data.leaderEmail ?? null,
    leader_id: leaderId ?? null,
    goal: data.goal,
    end_date: data.endDate,
  });

  if (error) throw new Error(error.message);

  return {
    ...data,
    code,
    students: [],
    totalRaised: 0,
    daysRemaining: calcDaysRemaining(data.endDate),
  };
}

export async function joinProgram(code: string, name: string): Promise<ProgramStudent | null> {
  const { data: existing } = await defaultSupabase
    .from('students')
    .select('*')
    .eq('program_code', code)
    .ilike('name', name)
    .single();

  if (existing) {
    return { id: existing.id, name: existing.name, raised: existing.raised, contacts: [], joinedAt: existing.joined_at };
  }

  const { data: newStudent, error } = await defaultSupabase
    .from('students')
    .insert({ program_code: code, name, raised: 0 })
    .select()
    .single();

  if (error || !newStudent) return null;
  return { id: newStudent.id, name: newStudent.name, raised: newStudent.raised, contacts: [], joinedAt: newStudent.joined_at };
}

export async function joinProgramWithUser(code: string, name: string, userId: string): Promise<ProgramStudent | null> {
  const { data: existing } = await defaultSupabase
    .from('students')
    .select('*')
    .eq('program_code', code)
    .eq('user_id', userId)
    .single();

  if (existing) return null;

  const { data: newStudent, error } = await defaultSupabase
    .from('students')
    .insert({ program_code: code, name, user_id: userId, raised: 0 })
    .select()
    .single();

  if (error || !newStudent) return null;
  return { id: newStudent.id, name: newStudent.name, raised: newStudent.raised, contacts: [], joinedAt: newStudent.joined_at };
}

export async function addContact(
  _code: string,
  studentId: string,
  contact: Omit<Contact, 'id'>
): Promise<Contact | null> {
  const { data, error } = await defaultSupabase
    .from('contacts')
    .insert({
      student_id: studentId,
      name: contact.name,
      email: contact.email ?? null,
      phone: contact.phone ?? null,
      relationship: contact.relationship ?? null,
    })
    .select()
    .single();

  if (error || !data) return null;
  return {
    id: data.id,
    name: data.name,
    email: data.email ?? undefined,
    phone: data.phone ?? undefined,
    relationship: data.relationship ?? undefined,
  };
}

export async function markAsSent(contactId: string): Promise<boolean> {
  const { error } = await defaultSupabase
    .from('contacts')
    .update({ last_sent_at: new Date().toISOString() })
    .eq('id', contactId);
  return !error;
}

const DEMO_CODE = '12345678';

export async function seedDemoProgram() {
  const { data: existing } = await defaultSupabase
    .from('programs')
    .select('code')
    .eq('code', DEMO_CODE)
    .single();

  if (existing) return;

  await defaultSupabase.from('programs').insert({
    code: DEMO_CODE,
    program_name: 'Varsity Soccer',
    school_name: 'Grapevine High School',
    leader_name: 'Coach Martinez',
    goal: 15000,
    end_date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  const demoStudents = [
    { name: 'Mia Davis', raised: 1290 },
    { name: 'Sophia Chen', raised: 1150 },
    { name: 'Isabella Garcia', raised: 975 },
    { name: 'Ava Patel', raised: 890 },
    { name: 'Emma Johnson', raised: 785 },
    { name: 'Charlotte Wilson', raised: 725 },
    { name: 'Liam Rodriguez', raised: 620 },
    { name: 'Ethan Brown', raised: 560 },
    { name: 'Oliver Anderson', raised: 667 },
    { name: 'Noah Williams', raised: 430 },
    { name: 'Lucas Martinez', raised: 410 },
    { name: 'Mason Thompson', raised: 345 },
  ];

  for (const s of demoStudents) {
    await defaultSupabase.from('students').insert({ program_code: DEMO_CODE, name: s.name, raised: s.raised });
  }
}
