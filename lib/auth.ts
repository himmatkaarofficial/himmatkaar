import { supabase } from './supabase';

export interface User {
  id: string;
  email: string;
  role: string;
}

function setAuthCookies(accessToken: string, refreshToken: string) {
  if (typeof document === "undefined") return;

  document.cookie = `sb-access-token=${encodeURIComponent(accessToken)}; Path=/; Max-Age=3600; SameSite=Lax`;
  document.cookie = `sb-refresh-token=${encodeURIComponent(refreshToken)}; Path=/; Max-Age=2592000; SameSite=Lax`;
}

function clearAuthCookies() {
  if (typeof document === "undefined") return;

  document.cookie = "sb-access-token=; Path=/; Max-Age=0; SameSite=Lax";
  document.cookie = "sb-refresh-token=; Path=/; Max-Age=0; SameSite=Lax";
}

function getAdminAllowlist() {
  return (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

// Simple auth helper functions
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    const userId = data.user?.id;
    if (!userId) {
      throw new Error("Unable to find signed-in user.");
    }

    const adminAllowlist = getAdminAllowlist();
    const signedInEmail = data.user?.email?.toLowerCase() || "";

    // Ensure a profile row exists for every signed-in account.
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .upsert(
        {
          id: userId,
          email: data.user?.email || email,
        },
        { onConflict: "id" }
      )
      .select("role")
      .single();

    if (profileError) {
      await supabase.auth.signOut();
      throw new Error("Profile setup failed. Please contact support.");
    }

    const isAdminByRole = profile?.role === "admin";
    const isAdminByAllowlist =
      adminAllowlist.length > 0 && adminAllowlist.includes(signedInEmail);

    // Enforce admin-only login for the dashboard.
    if (!isAdminByRole && !isAdminByAllowlist) {
      await supabase.auth.signOut();
      clearAuthCookies();
      throw new Error("Only admin accounts can sign in.");
    }

    if (data.session?.access_token && data.session?.refresh_token) {
      setAuthCookies(data.session.access_token, data.session.refresh_token);
    }

    return data;
  } catch (error: any) {
    // Provide more helpful error messages
    if (error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to authentication service. Please check your internet connection and try again.');
    }
    throw error;
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }

  clearAuthCookies();
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    throw error;
  }

  return user;
}

export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    throw error;
  }

  return session;
}

// Check if user is authenticated
export async function isAuthenticated() {
  const session = await getSession();
  return !!session;
}
