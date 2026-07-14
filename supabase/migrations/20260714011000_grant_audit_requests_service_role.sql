grant usage on schema public to service_role;

grant select, insert, update on public.audit_requests to service_role;

notify pgrst, 'reload schema';
