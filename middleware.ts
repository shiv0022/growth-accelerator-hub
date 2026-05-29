import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, ADMIN_USERS_TABLE } from "@/app/lib/admin-auth";

const isAuthorizedAdmin = async (accessToken: string) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || !accessToken) {
    return false;
  }

  const authHeaders = {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${accessToken}`,
  };

  const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: authHeaders,
    cache: "no-store",
  });

  if (!userResponse.ok) {
    return false;
  }

  const user = await userResponse.json();
  if (!user?.id) {
    return false;
  }

  const adminResponse = await fetch(
    `${supabaseUrl}/rest/v1/${ADMIN_USERS_TABLE}?select=user_id&user_id=eq.${encodeURIComponent(
      user.id
    )}&is_active=eq.true`,
    {
      headers: {
        ...authHeaders,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!adminResponse.ok) {
    return false;
  }

  const rows = await adminResponse.json();
  return Array.isArray(rows) && rows.length > 0;
};

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const accessToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value || "";
  const isLoginRoute = pathname === "/admin/login";
  const isLoggedIn = Boolean(accessToken);

  if (isLoginRoute && isLoggedIn && (await isAuthorizedAdmin(accessToken))) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!isLoginRoute && (!isLoggedIn || !(await isAuthorizedAdmin(accessToken)))) {
    const redirectTarget = `${pathname}${search || ""}`;
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", redirectTarget);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
