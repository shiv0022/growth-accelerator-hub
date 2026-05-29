import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ADMIN_SESSION_COOKIE, ADMIN_USERS_TABLE } from "@/app/lib/admin-auth";

export async function GET(req: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ ok: false, message: "Supabase is not configured." }, { status: 500 });
  }

  const cookieHeader = req.headers.get("cookie") || "";
  const cookieMap = new Map<string, string>();
  cookieHeader.split(";").forEach((part) => {
    const [k, ...rest] = part.trim().split("=");
    if (!k) return;
    cookieMap.set(k, decodeURIComponent(rest.join("=")));
  });
  const accessToken = cookieMap.get(ADMIN_SESSION_COOKIE);

  if (!accessToken) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

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

  const { data: userData, error: userError } = await authScopedClient.auth.getUser(accessToken);
  if (userError || !userData.user) {
    return NextResponse.json({ ok: false, message: "Session expired. Please login again." }, { status: 401 });
  }

  const { data: adminRow, error: adminError } = await authScopedClient
    .from(ADMIN_USERS_TABLE)
    .select("user_id,is_active")
    .eq("user_id", userData.user.id)
    .eq("is_active", true)
    .maybeSingle();

  if (adminError) {
    return NextResponse.json(
      { ok: false, message: "Admin role check failed. Verify admin_users table and policies." },
      { status: 500 }
    );
  }

  if (!adminRow) {
    return NextResponse.json({ ok: false, message: "Access denied." }, { status: 403 });
  }

  return NextResponse.json({
    ok: true,
    user: {
      id: userData.user.id,
      email: userData.user.email,
    },
  });
}

