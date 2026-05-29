-- ==========================================================
-- Supabase setup for inquiries + auth-based admin access
-- ==========================================================

create extension if not exists "pgcrypto";

-- ----------------------------------------
-- Admin role map (links to Supabase Auth)
-- ----------------------------------------
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc'::text, now())
);

alter table public.admin_users enable row level security;

drop policy if exists "Admin users can read own row" on public.admin_users;
create policy "Admin users can read own row"
on public.admin_users
for select
to authenticated
using ((select auth.uid()) = user_id);

-- --------------------------
-- Public lead capture table
-- --------------------------
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc'::text, now()),
  name text not null,
  email text not null,
  phone text,
  company text,
  services text,
  message text
);

create index if not exists inquiries_created_at_idx
  on public.inquiries (created_at desc);

alter table public.inquiries enable row level security;

drop policy if exists "Allow public insert to inquiries" on public.inquiries;
create policy "Allow public insert to inquiries"
on public.inquiries
for insert
to public
with check (true);

drop policy if exists "Allow admin read to inquiries" on public.inquiries;
create policy "Allow admin read to inquiries"
on public.inquiries
for select
to authenticated
using (
  exists (
    select 1
    from public.admin_users au
    where au.user_id = (select auth.uid())
      and au.is_active = true
  )
);

-- NOTE:
-- Add admin rights manually from SQL editor after creating auth users:
-- insert into public.admin_users (user_id, is_active)
-- values ('<SUPABASE_AUTH_USER_UUID>', true)
-- on conflict (user_id) do update set is_active = excluded.is_active;
