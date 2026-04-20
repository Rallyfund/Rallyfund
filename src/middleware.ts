import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    // Only run middleware on auth-protected routes.
    // Public marketing pages (/, /demo, /pricing, /get-started, etc.) bypass this entirely.
    '/advisor/:path*',
    '/student/:path*',
    '/auth/:path*',
    '/login/:path*',
    '/leader/:path*',
    '/join/:path*',
  ],
}
