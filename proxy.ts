import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getAdminAllowlist() {
  return (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function proxy(req: NextRequest) {
  // Check if accessing admin routes
  if (req.nextUrl.pathname.startsWith('/dashboard/admin')) {
    // Get Supabase session from cookies
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

    // Create a Supabase client with the request cookies
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
    });

    // Get session from cookies
    const accessToken = req.cookies.get('sb-access-token')?.value;
    const refreshToken = req.cookies.get('sb-refresh-token')?.value;

    // If no tokens, redirect to login
    if (!accessToken && !refreshToken) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/login';
      redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    if (accessToken) {
      const { data, error } = await supabase.auth.getUser(accessToken);

      if (error || !data.user) {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = '/login';
        redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
      }

      const adminAllowlist = getAdminAllowlist();
      const currentEmail = data.user.email?.toLowerCase() || '';

      // Enforce admin-only dashboard access when allowlist is configured.
      if (adminAllowlist.length > 0 && !adminAllowlist.includes(currentEmail)) {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = '/login';
        redirectUrl.searchParams.set('error', 'admin_only');
        return NextResponse.redirect(redirectUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/admin/:path*'],
};