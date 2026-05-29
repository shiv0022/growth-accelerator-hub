import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ADMIN_SESSION_COOKIE, ADMIN_USERS_TABLE } from "@/app/lib/admin-auth";

type LoginPayload = {
  email?: string;
  password?: string;
};

export async function POST(req: Request) {
  let payload: LoginPayload = {};

  try {
    payload = await req.json();
  } catch (_) {
    return NextResponse.json(
      { ok: false, message: "Invalid request payload." },
      { status: 400 }
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      { ok: false, message: "Supabase credentials are missing in environment variables." },
      { status: 500 }
    );
  }

  const email = payload.email?.trim().toLowerCase() || "";
  const password = payload.password || "";
  if (!email || !password) {
    return NextResponse.json(
      { ok: false, message: "Email and password are required." },
      { status: 400 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });

  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError || !loginData.session || !loginData.user) {
    return NextResponse.json(
      { ok: false, message: "Invalid Supabase email or password." },
      { status: 401 }
    );
  }

  const accessToken = loginData.session.access_token;
  const userId = loginData.user.id;

  const authScopedClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });

  const { data: adminRow, error: adminError } = await authScopedClient
    .from(ADMIN_USERS_TABLE)
    .select("user_id,is_active")
    .eq("user_id", userId)
    .eq("is_active", true)
    .maybeSingle();

  if (adminError) {
    return NextResponse.json(
      { ok: false, message: "Admin role check failed. Verify admin_users table and RLS policies." },
      { status: 500 }
    );
  }

  if (!adminRow) {
    return NextResponse.json(
      { ok: false, message: "Access denied. This account does not have admin rights." },
      { status: 403 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: loginData.session.expires_in || 60 * 60,
  });

  return response;
}
