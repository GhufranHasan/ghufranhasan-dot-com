begin;

-- Separate authentication storage; existing leads, subscribers and events are untouched.
create table if not exists public.dashboard_auth_rate_limits (
  key_hash text primary key check (key_hash ~ '^[a-f0-9]{64}$'),
  attempts integer not null default 1,
  window_ends_at timestamptz not null
);

create table if not exists public.dashboard_login_challenges (
  token_hash text primary key check (token_hash ~ '^[a-f0-9]{64}$'),
  code_hash text not null check (code_hash ~ '^[a-f0-9]{64}$'),
  attempts integer not null default 0,
  expires_at timestamptz not null default (now() + interval '5 minutes')
);

create table if not exists public.dashboard_sessions (
  token_hash text primary key check (token_hash ~ '^[a-f0-9]{64}$'),
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '2 hours')
);

create index if not exists dashboard_rate_limit_expiry on public.dashboard_auth_rate_limits (window_ends_at);
create index if not exists dashboard_challenge_expiry on public.dashboard_login_challenges (expires_at);
create index if not exists dashboard_session_expiry on public.dashboard_sessions (expires_at);

alter table public.dashboard_auth_rate_limits enable row level security;
alter table public.dashboard_login_challenges enable row level security;
alter table public.dashboard_sessions enable row level security;

revoke all on public.dashboard_auth_rate_limits, public.dashboard_login_challenges, public.dashboard_sessions
  from public, anon, authenticated;
grant select, insert, update, delete on public.dashboard_auth_rate_limits, public.dashboard_login_challenges, public.dashboard_sessions
  to service_role;
grant usage on schema public to service_role;

-- Dashboard records are private even when someone calls Supabase directly.
do $$
declare table_name text;
begin
  foreach table_name in array array['audit_requests', 'newsletter_subscribers', 'site_events'] loop
    if to_regclass(format('public.%I', table_name)) is not null then
      execute format('alter table public.%I enable row level security', table_name);
      execute format('revoke all on public.%I from public, anon, authenticated', table_name);
      execute format('grant select, insert, update, delete on public.%I to service_role', table_name);
    end if;
  end loop;
end;
$$;

-- Atomic upsert works across concurrent requests, server restarts, and Vercel instances.
create or replace function public.dashboard_consume_rate_limit(
  p_key_hash text, p_limit integer, p_window_seconds integer
) returns integer
language plpgsql security definer set search_path = '' as $$
declare
  entry public.dashboard_auth_rate_limits%rowtype;
begin
  if p_key_hash is null or p_limit is null or p_window_seconds is null
    or p_key_hash !~ '^[a-f0-9]{64}$' or p_limit not between 1 and 1000
    or p_window_seconds not between 1 and 3600 then
    raise exception 'Invalid rate limit arguments';
  end if;

  delete from public.dashboard_auth_rate_limits where window_ends_at < now() - interval '1 day';
  delete from public.dashboard_login_challenges where expires_at < now();
  delete from public.dashboard_sessions where expires_at < now();

  insert into public.dashboard_auth_rate_limits as limits (key_hash, attempts, window_ends_at)
    values (p_key_hash, 1, now() + make_interval(secs => p_window_seconds))
  on conflict (key_hash) do update set
    attempts = case when limits.window_ends_at <= now() then 1 else least(limits.attempts + 1, 1000000) end,
    window_ends_at = case when limits.window_ends_at <= now()
      then now() + make_interval(secs => p_window_seconds) else limits.window_ends_at end
  returning * into entry;

  if entry.attempts > p_limit then
    return greatest(1, ceil(extract(epoch from entry.window_ends_at - now()))::integer);
  end if;
  return 0;
end;
$$;

-- Row locking makes a challenge single-use even if the same code is submitted concurrently.
create or replace function public.dashboard_complete_login(
  p_challenge_hash text, p_code_hash text, p_session_hash text
) returns boolean
language plpgsql security definer set search_path = '' as $$
declare
  challenge public.dashboard_login_challenges%rowtype;
begin
  if p_challenge_hash is null or p_code_hash is null or p_session_hash is null
    or p_challenge_hash !~ '^[a-f0-9]{64}$' or p_code_hash !~ '^[a-f0-9]{64}$'
    or p_session_hash !~ '^[a-f0-9]{64}$' then return false; end if;

  select * into challenge from public.dashboard_login_challenges
    where token_hash = p_challenge_hash for update;
  if not found then return false; end if;

  if challenge.expires_at <= now() or challenge.attempts >= 5 then
    delete from public.dashboard_login_challenges where token_hash = p_challenge_hash;
    return false;
  end if;

  if challenge.code_hash <> p_code_hash then
    if challenge.attempts >= 4 then
      delete from public.dashboard_login_challenges where token_hash = p_challenge_hash;
    else
      update public.dashboard_login_challenges set attempts = attempts + 1
        where token_hash = p_challenge_hash;
    end if;
    return false;
  end if;

  delete from public.dashboard_login_challenges where token_hash = p_challenge_hash;
  insert into public.dashboard_sessions (token_hash) values (p_session_hash);
  return true;
end;
$$;

create or replace function public.dashboard_validate_session(p_token_hash text) returns boolean
language plpgsql security definer set search_path = '' as $$
begin
  update public.dashboard_sessions set last_seen_at = now()
    where token_hash = p_token_hash and expires_at > now()
      and last_seen_at > now() - interval '30 minutes';
  return found;
end;
$$;

-- Functions must never be callable with the public browser/anonymous API key.
revoke all on function public.dashboard_consume_rate_limit(text, integer, integer) from public, anon, authenticated;
revoke all on function public.dashboard_complete_login(text, text, text) from public, anon, authenticated;
revoke all on function public.dashboard_validate_session(text) from public, anon, authenticated;
grant execute on function public.dashboard_consume_rate_limit(text, integer, integer) to service_role;
grant execute on function public.dashboard_complete_login(text, text, text) to service_role;
grant execute on function public.dashboard_validate_session(text) to service_role;

notify pgrst, 'reload schema';
commit;
