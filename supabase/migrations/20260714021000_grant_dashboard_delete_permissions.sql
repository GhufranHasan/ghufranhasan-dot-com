grant usage on schema public to service_role;

grant select, insert, update, delete on public.audit_requests to service_role;
grant select, insert, update, delete on public.newsletter_subscribers to service_role;
grant select, insert, update, delete on public.site_events to service_role;

notify pgrst, 'reload schema';
