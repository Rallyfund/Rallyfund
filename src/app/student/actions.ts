'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addContactAction(
  studentId: string,
  contact: { name: string; email?: string; phone?: string; relationship?: string }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  // 1. Verify that this student belongs to this user
  const { data: student, error: studentError } = await supabase
    .from('students')
    .select('id, user_id')
    .eq('id', studentId)
    .single();

  if (studentError || !student || student.user_id !== user.id) {
    throw new Error('You do not have permission to add contacts for this student.');
  }

  // 2. Insert the contact
  const { data, error } = await supabase
    .from('contacts')
    .insert({
      student_id: studentId,
      name: contact.name,
      email: contact.email || null,
      phone: contact.phone || null,
      relationship: contact.relationship || null,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/student/dashboard`);
  return data;
}

export async function markContactSentAction(contactId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  // 1. Verify that this contact belongs to a student owned by this user
  const { data: contact, error: contactError } = await supabase
    .from('contacts')
    .select('id, student_id, students(user_id)')
    .eq('id', contactId)
    .single();

  if (contactError || !contact) {
    throw new Error('Contact not found.');
  }

  // Handle join query result (supabase-js type safety can be tricky here)
  const studentUserId = (contact as any).students?.user_id;

  if (studentUserId !== user.id) {
    throw new Error('You do not have permission to update this contact.');
  }

  // 2. Update the contact
  const { error } = await supabase
    .from('contacts')
    .update({ last_sent_at: new Date().toISOString() })
    .eq('id', contactId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/student/dashboard`);
  return true;
}
