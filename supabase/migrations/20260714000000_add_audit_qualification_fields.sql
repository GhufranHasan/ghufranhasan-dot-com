alter table public.audit_requests
  add column if not exists agency_service text,
  add column if not exists average_client_value text,
  add column if not exists current_lead_source text,
  add column if not exists implementation_budget text,
  add column if not exists engagement_intent text;

comment on column public.audit_requests.agency_service is
  'Short description of the applicant service or agency offer.';

comment on column public.audit_requests.average_client_value is
  'Self-reported average client value range used to qualify audit fit.';

comment on column public.audit_requests.current_lead_source is
  'Current primary source of leads or inquiries.';

comment on column public.audit_requests.implementation_budget is
  'Self-reported budget range for paid audit or implementation work.';

comment on column public.audit_requests.engagement_intent is
  'Whether the applicant wants diagnosis only, paid audit, or implementation.';
