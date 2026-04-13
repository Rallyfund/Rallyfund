'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { getStudentPrograms, getAdvisorPrograms } from '@/lib/programStore'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: authData, error } = await supabase.auth.signInWithPassword(data)

  if (error || !authData.user) {
    console.error('Login error:', error?.message)
    redirect('/login?error=' + encodeURIComponent(error?.message || 'Login failed'))
  }

  console.log('Login successful for user:', authData.user.id)

  // Get user role from profiles
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', authData.user.id)
    .single()

  if (profileError) {
    console.error('Profile fetch error:', profileError.message)
  }

  console.log('User profile role:', profile?.role)

  revalidatePath('/', 'layout')

  if (profile?.role === 'advisor') {
    const programs = await getAdvisorPrograms(authData.user.id)
    if (programs.length === 1) {
      redirect(`/leader/${programs[0].code}`)
    } else if (programs.length === 0) {
      redirect('/leader')
    } else {
      redirect('/advisor/dashboard')
    }
  } else if (profile?.role === 'student') {
    const programs = await getStudentPrograms(authData.user.id)
    if (programs.length === 1) {
      const { student, program } = programs[0]
      redirect(`/fundraiser/${program.code}?student=${encodeURIComponent(student.name)}&id=${student.id}`)
    } else if (programs.length === 0) {
      redirect('/join')
    } else {
      redirect('/student/dashboard')
    }
  } else {
    redirect('/join')
  }
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const role = formData.get('role') as string || 'student'
  const displayName = formData.get('displayName') as string || email.split('@')[0]

  console.log('Starting signup for:', email, 'as', role)

  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error || !authData.user) {
    console.error('Signup error:', error?.message)
    redirect('/login?error=' + encodeURIComponent(error?.message || 'Signup failed'))
  }

  console.log('Auth user created:', authData.user.id)

  // Create the profile
  const { error: profileError } = await supabase.from('profiles').insert({
    id: authData.user.id,
    role: role,
    display_name: displayName,
    email: email,
  })

  if (profileError) {
     console.error('Profile creation error (Table might not exist?):', profileError.message)
  } else {
    console.log('Profile created successfully')
  }

  revalidatePath('/', 'layout')

  if (authData.session) {
    // Email confirmation disabled — user is immediately authenticated
    redirect(role === 'advisor' ? '/leader' : '/join')
  }

  redirect('/login?message=Account created! Check your email to confirm.')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/auth/callback?next=/login/update-password`,
  })

  if (error) {
    redirect('/login?error=' + encodeURIComponent(error.message))
  }

  redirect('/login?message=Check your email for a password reset link.')
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()
  const password = formData.get('password') as string

  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    redirect('/login/update-password?error=' + encodeURIComponent(error.message))
  }

  await supabase.auth.signOut()
  redirect('/login?message=Password updated! Please sign in with your new password.')
}
