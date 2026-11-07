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
  const { pathname } = req.nextUrl;

  // Protect admin dashboard routes
  if (pathname.startsWith('/dashboard/admin')) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

    let accessToken = req.cookies.get('sb-access-token')?.value;

    // Check for Supabase standard auth token cookies if sb-access-token is not found
    if (!accessToken) {
      for (const cookie of req.cookies.getAll()) {
        if (cookie.name.includes('-auth-token')) {
          try {
            const parsed = JSON.parse(decodeURIComponent(cookie.value));
            if (parsed.access_token) {
              accessToken = parsed.access_token;
              break;
            } else if (Array.isArray(parsed) && parsed[0]) {
              accessToken = parsed[0];
              break;
            }
          } catch {}
        }
      }
    }

    // If no access token found, redirect to login
    if (!accessToken) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/login';
      redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    });

    const { data, error } = await supabase.auth.getUser(accessToken);

    if (error || !data.user) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/login';
      redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    const adminAllowlist = getAdminAllowlist();
    const currentEmail = data.user.email?.toLowerCase() || '';

    // Enforce admin-only access when allowlist is configured
    if (adminAllowlist.length > 0 && !adminAllowlist.includes(currentEmail)) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/login';
      redirectUrl.searchParams.set('error', 'admin_only');
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/admin/:path*'],
};

export const middleware = proxy;
export default proxy;


