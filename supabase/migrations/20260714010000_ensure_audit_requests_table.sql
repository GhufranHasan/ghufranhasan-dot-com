create extension if not exists pgcrypto;

create table if not exists public.audit_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  linkedin_url text not null,
  website_url text not null,
  agency_service text,
  business_type text not null,
  average_client_value text,
  current_lead_source text,
  main_problem text not null,
  desired_outcome text not null,
  timeline text not null,
  implementation_budget text,
  engagement_intent text,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint audit_requests_status_check
    check (status in ('new', 'reviewed', 'audit_sent', 'call_booked', 'converted', 'not_fit'))
);

alter table public.audit_requests
  add column if not exists agency_service text,
  add column if not exists average_client_value text,
  add column if not exists current_lead_source text,
  add column if not exists implementation_budget text,
  add column if not exists engagement_intent text,
  add column if not exists updated_at timestamptz not null default now();

create index if not exists audit_requests_created_at_idx
  on public.audit_requests (created_at desc);

create index if not exists audit_requests_status_idx
  on public.audit_requests (status);

alter table public.audit_requests enable row level security;

comment on table public.audit_requests is
  'LinkedIn-to-website funnel review applications. Server-side service role access only.';

comment on column public.audit_requests.agency_service is
  'Short description of the applicant service or agency offer.';

comment on column public.audit_requests.average_client_value is
  'Self-reported average client value range used to qualify review fit.';

comment on column public.audit_requests.current_lead_source is
  'Current primary source of leads or inquiries.';

comment on column public.audit_requests.implementation_budget is
  'Self-reported budget range for paid audit or implementation work.';

comment on column public.audit_requests.engagement_intent is
  'Whether the applicant wants diagnosis only, paid audit, or implementation.';

grant usage on schema public to service_role;

grant select, insert, update on public.audit_requests to service_role;

notify pgrst, 'reload schema';
