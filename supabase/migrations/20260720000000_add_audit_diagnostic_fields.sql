alter table public.audit_requests
  add column if not exists traffic_snapshot text,
  add column if not exists desired_website_action text,
  add column if not exists what_tried text;

comment on column public.audit_requests.traffic_snapshot is
  'Approximate LinkedIn profile-view or website-traffic signal shared in the funnel check intake.';

comment on column public.audit_requests.desired_website_action is
  'Primary action the applicant wants website visitors to take.';

comment on column public.audit_requests.what_tried is
  'What the applicant has already tried before requesting the funnel check.';

grant select, insert, update, delete on public.audit_requests to service_role;
