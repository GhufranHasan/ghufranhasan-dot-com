create extension if not exists pgcrypto;

create table if not exists public.audit_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  linkedin_url text not null,
  website_url text not null,
  business_type text not null,
  main_problem text not null,
  desired_outcome text not null,
  timeline text not null,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  constraint audit_requests_status_check
    check (status in ('new', 'reviewed', 'audit_sent', 'call_booked', 'converted', 'not_fit'))
);

create index if not exists audit_requests_created_at_idx
  on public.audit_requests (created_at desc);

create index if not exists audit_requests_status_idx
  on public.audit_requests (status);

alter table public.audit_requests enable row level security;

comment on table public.audit_requests is
  'Free LinkedIn-to-website audit intake requests. Server-side service role access only.';
