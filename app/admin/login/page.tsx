"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, LockKeyhole, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [nextTarget, setNextTarget] = useState("/admin");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const next = query.get("next");
    if (next && next.startsWith("/")) {
      setNextTarget(next);
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.message || "Login failed. Please check your credentials.");
        setLoading(false);
        return;
      }

      router.replace(nextTarget);
      router.refresh();
    } catch (_) {
      setError("Unable to login right now. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md bg-card/50 border-border/80 shadow-xl rounded-2xl">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <ShieldCheck size={22} />
          </div>
          <CardTitle className="text-2xl font-extrabold">Admin Login</CardTitle>
          <CardDescription className="text-xs font-semibold">
            Sign in using your Supabase email and password.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase">Admin Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="admin@yourdomain.com"
                  className="pl-9 bg-background/50 border-border/60"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase">Password</label>
              <div className="relative">
                <LockKeyhole size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter admin password"
                  className="pl-9 bg-background/50 border-border/60"
                />
              </div>
            </div>

            {error ? (
              <p className="text-xs font-semibold text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </p>
            ) : null}

            <Button type="submit" disabled={loading} className="w-full rounded-full font-bold text-xs">
              {loading ? "Signing In..." : "Sign In to Admin Panel"}
            </Button>

            <div className="pt-1 text-center">
              <Link href="/" className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors">
                Back to website
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
