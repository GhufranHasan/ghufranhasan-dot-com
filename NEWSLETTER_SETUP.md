# Supabase and Resend Setup

Last updated: July 23, 2026

This guide covers the backend pieces used by the website:

- Funnel Review applications
- Newsletter subscribers
- First-party dashboard tracking
- Resend notification and confirmation emails
- Optional Resend newsletter audience sync

## 1. Supabase Project

Create or open a Supabase project, then copy:

- Project URL
- Service role key

Add them to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Keep `SUPABASE_SERVICE_ROLE_KEY` private. It is only used in server-side files.

## 2. Run Database Migrations

The schema lives in:

```text
supabase/migrations
```

Run the migrations in Supabase SQL Editor or through the Supabase CLI.

Required tables:

- `audit_requests`
- `newsletter_subscribers`
- `site_events`

The migrations also enable row level security and grant the required service role permissions.

If Supabase returns a schema cache error after creating a table, run:

```sql
notify pgrst, 'reload schema';
```

## 3. Audit Requests Table

Table name:

```text
audit_requests
```

Purpose:

Stores Funnel Review applications from `/free-audit`.

Important fields:

- `name`
- `email`
- `linkedin_url`
- `website_url`
- `agency_service`
- `business_type`
- `average_client_value`
- `current_lead_source`
- `traffic_snapshot`
- `desired_website_action`
- `main_problem`
- `desired_outcome`
- `timeline`
- `implementation_budget`
- `engagement_intent`
- `what_tried`
- `status`
- `created_at`
- `updated_at`

Allowed status values:

```text
new
reviewed
audit_sent
call_booked
converted
not_fit
```

## 4. Newsletter Subscribers Table

Table name:

```text
newsletter_subscribers
```

Purpose:

Stores newsletter and resource subscriber emails before optional sync to Resend.

Important fields:

- `email`
- `name`
- `source`
- `resource_slug`
- `status`
- `created_at`
- `updated_at`

Allowed status values:

```text
active
unsubscribed
bounced
```

The app uses an upsert on email, so repeat signups update the existing subscriber instead of throwing a duplicate email error.

## 5. Site Events Table

Table name:

```text
site_events
```

Purpose:

Stores first-party dashboard tracking.

Tracked event types:

```text
page_view
section_view
cta_click
download
form_submission
system
```

This powers the private dashboard metrics for visits, CTA clicks, downloads, section views, and recent events.

## 6. Dashboard Login

Add:

```bash
DASHBOARD_PASSWORD=your-private-dashboard-password
DASHBOARD_SESSION_SECRET=use-32-or-more-random-characters
```

Open:

```text
http://localhost:3000/dashboard
```

The dashboard checks Supabase connectivity and shows whether the key tables are readable.

## 7. Resend Email Setup

Create a Resend account and API key, then add:

```bash
RESEND_API_KEY=re_your_api_key
RESEND_FROM_EMAIL=Ghufran Hasan <hello@your-verified-domain.com>
AUDIT_NOTIFICATION_EMAIL=your-inbox@example.com
```

Important:

- Do not use a normal `gmail.com` address as `RESEND_FROM_EMAIL`.
- Resend requires the sending domain to be allowed or verified.
- `AUDIT_NOTIFICATION_EMAIL` can be your Gmail inbox. The sender is what must be valid in Resend.

Audit application email flow:

```text
User submits /free-audit form
-> application saved in Supabase
-> notification email sent to AUDIT_NOTIFICATION_EMAIL
-> confirmation email sent to the applicant
-> user redirects to /thank-you
```

If `RESEND_FROM_EMAIL` is missing or invalid, the application can still be saved in Supabase, but email delivery will fail or be skipped.

## 8. Optional Resend Newsletter Audience Sync

If you want newsletter subscribers to also appear in a Resend audience, create an audience in Resend and add:

```bash
RESEND_SUBSCRIBER_LIST_ID=your-resend-audience-id
```

Newsletter signup flow:

```text
User submits newsletter form
-> email upserted into Supabase
-> email optionally synced to Resend audience
-> user receives a clear success message
```

If the Resend audience sync is not configured, Supabase storage still works.

## 9. Google Analytics

For Google Analytics, add:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

The code also accepts these public aliases:

```bash
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTAG_ID=G-XXXXXXXXXX
```

This loads Google Analytics with `lazyOnload`.

Google Analytics is separate from the private dashboard:

- Google Analytics: external analytics dashboard.
- Supabase `site_events`: private first-party dashboard inside the website.

## 10. Local Testing

Start the website:

```bash
npm run dev
```

Test audit form:

```text
http://localhost:3000/free-audit
```

Test dashboard:

```text
http://localhost:3000/dashboard
```

Expected audit form result:

- A new row appears in `audit_requests`.
- The dashboard shows the new application.
- Email notification is sent if Resend is configured correctly.

Expected newsletter result:

- A row appears or updates in `newsletter_subscribers`.
- Resend audience sync succeeds only if `RESEND_API_KEY` and `RESEND_SUBSCRIBER_LIST_ID` are valid.

## 11. Common Errors

### Could not find the table in the schema cache

The table does not exist yet or Supabase REST has not refreshed.

Fix:

- Run the migrations.
- Run `notify pgrst, 'reload schema';`.

### Permission denied for table

The service role grants are missing.

Fix:

- Run the grant migration.
- Confirm the request uses `SUPABASE_SERVICE_ROLE_KEY`, not the anon key.

### Supabase fetch failed or ENOTFOUND

The Supabase URL is wrong, the project ref is wrong, or the network cannot resolve the host.

Fix:

- Confirm `NEXT_PUBLIC_SUPABASE_URL` uses `https://PROJECT_REF.supabase.co`.
- Confirm the project still exists.
- Restart the local website server after editing `.env.local`.

### The gmail.com domain is not verified

The sender email is invalid for Resend.

Fix:

- Use a verified sender/domain for `RESEND_FROM_EMAIL`.
- Keep your Gmail address as `AUDIT_NOTIFICATION_EMAIL` if you want to receive notifications there.

### Dashboard says needs setup

The required environment variables are missing or the server was not restarted.

Fix:

- Add `NEXT_PUBLIC_SUPABASE_URL`.
- Add `SUPABASE_SERVICE_ROLE_KEY`.
- Restart the local website server.

## 12. Production Checklist

Before production:

- Add all environment variables in Vercel.
- Run all Supabase migrations.
- Confirm dashboard login works.
- Submit a test Funnel Review application.
- Delete test rows from the dashboard after testing.
- Confirm Resend notification and confirmation emails.
- Confirm Google Analytics appears in the Google dashboard.
- Confirm `/robots.txt` returns plain robots text and includes the sitemap URL.
- Run `npm run lint`.
- Run `npm run build`.

