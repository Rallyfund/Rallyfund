import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next')

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // If next is explicitly set (e.g. password reset), use it
      if (next) {
        return NextResponse.redirect(`${origin}${next}`)
      }

      // Otherwise this is an email confirmation — redirect based on role
      const userId = data.session?.user?.id
      if (userId) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', userId)
          .single()

        if (profile?.role === 'advisor') {
          return NextResponse.redirect(`${origin}/leader`)
        }
      }

      // Default: student or unknown role → join flow
      return NextResponse.redirect(`${origin}/join`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=` + encodeURIComponent('Invalid or expired reset link. Please try again.'))
}
