import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabase, supabaseAdmin } from '@/lib/supabase';

function getAdminAllowlist() {
  return (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

function getCookieValue(cookieHeader: string, key: string) {
  const parts = cookieHeader.split(';').map((part) => part.trim());
  const match = parts.find((part) => part.startsWith(`${key}=`));
  if (!match) return '';
  return decodeURIComponent(match.substring(key.length + 1));
}

async function isAdminRequest(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const accessToken = getCookieValue(cookieHeader, 'sb-access-token');

  if (!accessToken) return false;

  const { data, error } = await supabase.auth.getUser(accessToken);
  if (error || !data.user) return false;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const roleClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });

  const adminAllowlist = getAdminAllowlist();
  const signedInEmail = data.user.email?.toLowerCase() || '';
  if (adminAllowlist.length > 0 && adminAllowlist.includes(signedInEmail)) {
    return true;
  }

  const { data: profile } = await roleClient
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .maybeSingle();

  return profile?.role === 'admin';
}

export async function GET(request: Request) {
  try {
    const isAdmin = await isAdminRequest(request);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: subscribers, error } = await supabaseAdmin
      .from('newsletter_subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ subscribers: subscribers || [] });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email: body.email }]);

    if (error) {
      // Check if it's a duplicate email error
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Email already subscribed' }, { status: 400 });
      }
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
