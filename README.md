# Ghufran Hasan Personal Brand Website

Last updated: July 23, 2026

This is the production website for Ghufran Hasan. The site positions Ghufran as a LinkedIn-to-website conversion specialist for LinkedIn-active service businesses, with founder-led B2B agencies as the primary niche and consultants, coaches, and fractional leaders as adjacent fit.

The main business goal is simple: turn warm LinkedIn profile visits into clearer website trust, stronger CTA paths, qualified enquiries, and Funnel Review applications.

## Current Positioning

Primary public message:

```text
Your LinkedIn gets attention.
Your website should turn it into enquiries.
```

Core offer path:

```text
LinkedIn profile
-> website
-> free Funnel Review page
-> audit intake form
-> thank-you page
-> optional clarity call
```

Current pricing model:

- Free Funnel Review: free application-based review.
- Conversion Audit: $300 deeper diagnosis.
- LinkedIn-to-Website Conversion Sprint: starts from $1,200.
- Optional add-ons: custom lead magnet, capture, form, confirmation, and follow-up setup.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React icons
- Supabase REST API for server-side storage
- Resend for email delivery and optional newsletter audience sync
- Google Analytics for external analytics
- First-party Supabase event tracking for the private dashboard

Before editing Next.js code, read the local guidance in `AGENTS.md` and the relevant docs under `node_modules/next/dist/docs/` because this project uses a newer Next.js version with breaking changes.

## Main Routes

- `/` - homepage and primary brand overview.
- `/free-audit` - short Funnel Review landing page and audit intake form.
- `/thank-you` - confirmation page after audit request submission.
- `/services` - service explanation.
- `/process` - process details.
- `/pricing` - pricing ladder.
- `/proof` - proof, comparison, and ranking content.
- `/work` - work and implementation proof.
- `/resources` - resource hub.
- `/resources/linkedin-website-funnel-checklist` - checklist resource page.
- `/free-website-audit-checklist` - SEO-friendly checklist page.
- `/faq` - full FAQ page.
- `/contact` - contact path without duplicating the full audit form.
- `/dashboard` - private admin dashboard.

Additional educational routes:

- `/linkedin-website-funnel`
- `/linkedin-website-examples`
- `/linkedin-profile-optimization`
- `/website-conversion-strategy`
- `/cta-funnel-clarity`
- `/case-studies`
- `/blog`

The catch-all route at `/[...slug]` prevents unwanted public 404 dead ends by handling legacy or missing paths.

## API Routes

- `POST /api/audit-requests`
  - Stores Funnel Review applications in Supabase.
  - Sends an admin notification email and applicant confirmation email when Resend is configured.
  - Validates origin, payload size, email, LinkedIn URL, website URL, and all select field values.
  - Applies a lightweight in-memory rate limit.

- `POST /api/newsletter/subscribe`
  - Upserts newsletter subscribers into Supabase.
  - Optionally syncs the email to a Resend audience.
  - Uses duplicate-safe upsert behavior.

- `POST /api/site-events`
  - Stores first-party analytics events such as page views, section views, CTA clicks, downloads, and form submissions.

- `/api/dashboard/*`
  - Private dashboard login/logout and admin data actions.
  - Supports updating lead statuses and deleting test records.

## Dashboard

The private dashboard at `/dashboard` helps track:

- Visits
- Unique visitors
- Funnel Review applications
- Checklist downloads
- CTA clicks
- Newsletter subscribers
- Section views
- Top pages
- Top sections
- Recent events
- Lead status distribution
- Supabase table connection status

Supported dashboard time windows:

- 1 day
- 7 days
- 14 days
- 30 days
- 90 days
- 180 days
- 365 days

The dashboard uses first-party records stored in Supabase. Google Analytics is separate and is used for the Google dashboard.

## Database Tables

Supabase migrations live in `supabase/migrations`.

Main tables:

- `audit_requests`
  - Funnel Review applications.
  - Status values: `new`, `reviewed`, `audit_sent`, `call_booked`, `converted`, `not_fit`.

- `newsletter_subscribers`
  - Newsletter and resource subscriber records.
  - Status values: `active`, `unsubscribed`, `bounced`.

- `site_events`
  - First-party dashboard events.
  - Event types: `page_view`, `section_view`, `cta_click`, `download`, `form_submission`, `system`.

Row level security is enabled. Server-side access uses the Supabase service role key only. Never expose `SUPABASE_SERVICE_ROLE_KEY` to browser code.

## Environment Variables

Create `.env.local` in the project root for local development. This file is ignored by Git.

Required for Supabase-backed forms and dashboard data:

```bash
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

Required for dashboard login:

```bash
DASHBOARD_PASSWORD=
DASHBOARD_SESSION_SECRET=
```

Recommended for audit request emails:

```bash
RESEND_API_KEY=
RESEND_FROM_EMAIL=
AUDIT_NOTIFICATION_EMAIL=
```

Optional for newsletter audience sync:

```bash
RESEND_SUBSCRIBER_LIST_ID=
```

Optional for Google Analytics:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

Accepted aliases:

```bash
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
NEXT_PUBLIC_GTAG_ID=
```

Notes:

- `RESEND_FROM_EMAIL` must use a sender that Resend allows. A normal `gmail.com` address cannot be used as the sending domain.
- `AUDIT_NOTIFICATION_EMAIL` is where new Funnel Review notifications are sent. If omitted, the app falls back to `ghufran@ghufranhasan.com`.
- `DASHBOARD_SESSION_SECRET` should be at least 32 random characters.
- Google Analytics only appears on the deployed site after the public measurement ID is added to Vercel and the site is redeployed.

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Common local pages:

```text
http://localhost:3000/free-audit
http://localhost:3000/dashboard
http://localhost:3000/resources/linkedin-website-funnel-checklist
```

## Validation

Run linting:

```bash
npm run lint
```

Run a production build:

```bash
npm run build
```

Start the production build locally:

```bash
npm run start
```

## Deployment Checklist

Before deploying:

- Add all required environment variables in Vercel.
- Run Supabase migrations.
- Confirm `audit_requests`, `newsletter_subscribers`, and `site_events` exist.
- Confirm service role grants are applied.
- Verify Resend sender domain before enabling email notifications.
- Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` if Google Analytics is needed.
- Verify `/robots.txt` returns plain robots text and references `/sitemap.xml`.
- Run `npm run lint`.
- Run `npm run build`.
- Test `/free-audit` form submission.
- Test `/dashboard` login and table connection status.

## Security Notes

- The Supabase service role key is server-side only.
- Dashboard session cookies are HTTP-only and strict same-site.
- Dashboard and API routes send no-store cache headers.
- Dashboard and API routes are marked noindex.
- Security headers are configured in `next.config.ts`.
- Public forms validate same-origin requests, content type, payload size, and rate limits.
- Honeypot fields help ignore basic bot submissions.

## Important Files

- `src/app/page.tsx` - homepage composition and homepage structured data.
- `src/components/sections/Hero.tsx` - homepage hero and primary CTA.
- `src/components/audit/AuditIntakeForm.tsx` - Funnel Review application form.
- `src/app/api/audit-requests/route.ts` - audit application API route.
- `src/app/api/newsletter/subscribe/route.ts` - newsletter API route.
- `src/components/dashboard/DashboardView.tsx` - private dashboard interface.
- `src/lib/supabase/admin.ts` - server-side Supabase REST helper.
- `src/lib/supabase/dashboard.ts` - dashboard aggregation logic.
- `src/data/auditOptions.ts` - allowed values for audit form select fields.
- `src/data/faqs.ts` - FAQ content.
- `src/app/globals.css` - theme, textures, motion, print styles, and global UI utilities.
- `next.config.ts` - security and cache headers.
- `supabase/migrations` - database schema and grants.

