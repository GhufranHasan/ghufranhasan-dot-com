create extension if not exists pgcrypto;

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  source text,
  resource_slug text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint newsletter_subscribers_status_check
    check (status in ('active', 'unsubscribed', 'bounced'))
);

create table if not exists public.site_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  event_name text not null,
  path text,
  section_id text,
  resource_slug text,
  visitor_id text,
  session_id text,
  referrer text,
  user_agent text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint site_events_event_type_check
    check (event_type in ('page_view', 'section_view', 'cta_click', 'download', 'form_submission', 'system'))
);

alter table public.newsletter_subscribers
  add column if not exists name text,
  add column if not exists source text,
  add column if not exists resource_slug text,
  add column if not exists status text not null default 'active',
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

alter table public.site_events
  add column if not exists path text,
  add column if not exists section_id text,
  add column if not exists resource_slug text,
  add column if not exists visitor_id text,
  add column if not exists session_id text,
  add column if not exists referrer text,
  add column if not exists user_agent text,
  add column if not exists metadata jsonb not null default '{}'::jsonb,
  add column if not exists created_at timestamptz not null default now();

create index if not exists newsletter_subscribers_created_at_idx
  on public.newsletter_subscribers (created_at desc);

create index if not exists newsletter_subscribers_status_idx
  on public.newsletter_subscribers (status);

create index if not exists site_events_created_at_idx
  on public.site_events (created_at desc);

create index if not exists site_events_type_created_at_idx
  on public.site_events (event_type, created_at desc);

create index if not exists site_events_path_created_at_idx
  on public.site_events (path, created_at desc);

create index if not exists site_events_section_created_at_idx
  on public.site_events (section_id, created_at desc);

alter table public.newsletter_subscribers enable row level security;
alter table public.site_events enable row level security;

comment on table public.newsletter_subscribers is
  'Newsletter subscribers captured from first-party website forms. Server-side service role access only.';

comment on table public.site_events is
  'First-party website interaction events for the private dashboard. Server-side service role access only.';

grant usage on schema public to service_role;

grant select, insert, update on public.newsletter_subscribers to service_role;
grant select, insert, update on public.site_events to service_role;

notify pgrst, 'reload schema';
