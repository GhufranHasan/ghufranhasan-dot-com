# Ghufran Hasan Personal Brand Website

Last updated: October 28, 2026

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

Unknown URLs return a genuine HTTP 404 using the helpful `src/app/not-found.tsx`
page. Only explicitly configured legacy redirects should resolve old URLs to a
replacement; missing pages must not return a successful response.

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
DASHBOARD_2FA_EMAIL=
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
- `DASHBOARD_2FA_EMAIL` is the single owner inbox for required dashboard login codes. This can be Gmail; it is never accepted from a public form.
- `DASHBOARD_PASSWORD` must be a unique password of 16 to 256 characters.
- `DASHBOARD_SESSION_SECRET` must contain at least 32 random characters and be independent of the Supabase service-role key.
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

Run the server regression tests:

```bash
npm test
```

After a production build, run the non-destructive browser release suite:

```bash
npm run build
npm run test:e2e
npm run test:e2e:report
```

The browser suite starts a production preview on port 3002 and uses installed
Chrome locally. In CI, install Playwright Chromium with `npx playwright install
--with-deps chromium`. It covers public routes and anchors, responsive overflow,
WCAG accessibility checks, intake error/success UI, dropdown keyboards, mobile
navigation, social-modal focus, checklist scoring/print styles, and unauthenticated
dashboard API protection. Signup responses are intercepted in UI tests and site
analytics are intercepted so these checks do not create live leads or fake visits.
These tests do not claim to verify live email delivery or a real database insert.

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
- Apply `20260720000000_add_audit_diagnostic_fields.sql` before using the latest
  intake form. It adds `traffic_snapshot`, `desired_website_action`, and `what_tried`
  without removing records. A missing-column error means the form is not ready.
- Confirm `audit_requests`, `newsletter_subscribers`, and `site_events` exist.
- Confirm service role grants are applied.
- Verify Resend sender domain before enabling email notifications.
- Apply `20261027000000_harden_dashboard_auth.sql` and configure the owner inbox,
  a strong dashboard password, and verified Resend sender. Login remains locked
  if any required security dependency is unavailable. There is no password-only fallback.
- Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` if Google Analytics is needed.
- Verify `/robots.txt` returns plain robots text and references `/sitemap.xml`.
- Run `npm run lint`.
- Run `npm run build`.
- Test `/free-audit` form submission.
- Test `/dashboard` login and table connection status.

## Technical SEO and Rendering

- Route-level titles, descriptions, canonicals, Open Graph, and Twitter cards are
  generated through `src/lib/seo/metadata.ts`. Keep new pages on this helper.
- `/social-preview` is a build-time-generated 1200 x 630 PNG, not a resized logo
  with incorrect metadata dimensions.
- The hero headline, introduction, portrait, and CTAs render without JavaScript.
- Three.js decoration loads after the page load event and browser idle time on
  capable desktop devices only. Reduced motion, data saving, slow connections,
  low-memory/CPU devices, and mobile/coarse pointers retain the CSS background.
  The optional desktop canvas renders at no more than 30 frames per second.
- `www.ghufranhasan.com` permanently redirects to the non-www host, preserving
  paths and queries. Both hostnames must be attached to the Vercel project.
- Unmatched URLs use `src/app/not-found.tsx`, return HTTP 404 and noindex, and
  have no homepage canonical. Do not restore a successful catch-all route.
- The footer provides ordinary crawlable links to detailed interior pages.
- SEO and mobile regressions are covered by `tests/e2e/technical-seo.spec.ts`.

## Security Notes

### Owner-Only Dashboard

The public `/dashboard` URL can display a login screen, but the server checks the
owner session before returning dashboard records or permitting any admin mutation.
Knowing the URL does not grant access. This is not a guarantee against every attack.

Activation steps:

1. Run `supabase/migrations/20261027000000_harden_dashboard_auth.sql` in the
   Supabase SQL Editor. It creates three isolated auth tables and service-only
   functions without changing application, subscriber, or analytics records.
2. Set `DASHBOARD_2FA_EMAIL` to your owner inbox. The local owner inbox is configured;
   add the same variable separately to the Vercel environment.
3. Replace `DASHBOARD_PASSWORD` with a unique password of at least 16 characters.
   Keep a separate randomly generated `DASHBOARD_SESSION_SECRET` of at least 32 characters.
4. Verify `RESEND_FROM_EMAIL`'s sending domain in Resend. Codes cannot be delivered
   from an unverified sender; failures never unlock the dashboard.
5. Restart development or redeploy Vercel, then test the complete password/code/login/logout flow.

Security policy:

- Password plus a six-digit owner email code is mandatory in every environment.
- Codes expire after five minutes, allow five incorrect attempts, and are atomically
  consumed once. Replaying or concurrently resubmitting a code cannot create another session.
- Login limits are stored atomically in Supabase across Vercel instances: 15 attempts
  per trusted client network per 15 minutes, plus owner-wide password/code budgets.
  Limits apply to all attempts, not just errors, and return `Retry-After` when exceeded.
- Raw IPs, passwords, codes, and session tokens are not stored in the security tables.
  Tokens and codes use keyed digests. Browser cookies contain 256-bit random tokens.
- Production cookies use `__Host-` names, Secure, HttpOnly, SameSite=Strict, and no Domain.
- Database sessions expire after 30 minutes without server activity or two hours
  absolutely. The UI also conceals records on inactivity and locks immediately on logout.
- Logout revokes the session in the database. Changing the dashboard password,
  owner inbox, or session secret invalidates earlier sessions and challenges.
- Authentication tables have RLS enabled and no public/anon/authenticated grants.
  Only the server's service role can call the narrowly scoped auth functions.
- Existing dashboard record tables also have direct public access revoked while
  retaining all server-role CRUD privileges and existing records.
- Database or mail failures deny access; no in-memory or local-file auth fallback exists.
- Dashboard documents use a fresh per-response CSP script nonce; arbitrary inline
  scripts and production `eval` are blocked. Public pages retain their existing caching.

For incident recovery, rotate the dashboard password and independent session secret
and redeploy. Protect your Gmail, Vercel, Supabase and Resend accounts with their own MFA.
To prevent visitors from reaching even the login screen, add an edge access rule or
identity-aware gateway for both `/dashboard` and `/api/dashboard/*`. Cover every
deployment hostname, not only the custom domain, and keep this app authentication enabled.

`npm test` runs real migration, permission, expiry, rate-limit and replay checks in
an isolated embedded PostgreSQL instance. Email delivery is simulated in those tests;
they do not send owner codes or modify the live database.

- The Supabase service role key is server-side only.
- Dashboard session cookies are HTTP-only and strict same-site.
- Dashboard and API routes send no-store cache headers.
- Dashboard and API routes are marked noindex.
- Security headers are configured in `next.config.ts`.
- Public forms validate same-origin requests, content type, payload size, and rate limits.
- Honeypot fields help ignore basic bot submissions.
- JSON payloads are byte-limited and must be objects; malformed input is rejected
  without invoking the database.
- Local JSON lead storage is development-only. Production requires a confirmed
  Supabase write and does not silently accept a lead into temporary server files.
- Supabase and transactional-email network requests have bounded timeouts.
- Keep `data/*.json` private; never commit populated development lead files.

## Illustrated Resource Library

The educational guides at `/linkedin-profile-optimization`, `/website-conversion-strategy`,
and `/cta-funnel-clarity` use `src/data/resourceGuides.ts` for their content, examples,
questions, related links, and editorial update date. Update the date only when the
content is meaningfully revised. Reading times are calculated from the article text.

`ResourceGuidePage` is a Server Component with native contents links and `<details>`
questions, so the educational content remains usable without JavaScript. `/blog`
and `/resources` share the same illustrated resource cards to keep destinations and
descriptions consistent. Existing checklist, study, application, and dashboard data
are unchanged. The guides all use `/free-audit` as their primary review destination.

The five resource covers are realistic, pre-rendered 3D illustrations created with
the built-in image-generation tool. Final artwork is stored as compressed 1200x720
WebP files in `public/images/resources/`, each below a 200 KB source-image budget.
They are static images: no additional Three.js, WebGL, canvas, animation, or client
library is loaded for them. The earlier SVGs are preserved but no longer used by
these resource cards or guides. The image-generation prompts and source filenames
are recorded in `design/resource-visuals/prompts.json`.

Responsive Next Image variants and explicit `sizes` avoid downloading full-width
images for small cards. The first visible row in each collection loads eagerly;
lower sections and related-resource thumbnails remain lazy. `ResourcePageHeader`
uses a single transparent 3D cutout on the right at desktop sizes and below the
introductory text on smaller screens. These cutouts load eagerly with high fetch
priority. The three guides no longer repeat a full-width cover beneath the header.
The five `*-header.webp` assets preserve real alpha transparency; their edit prompts
are recorded in `design/resource-visuals/header-cutouts.json`. Intrinsic dimensions
reserve layout space. These are
conceptual illustrations, not client screenshots, performance evidence, or claims
about the contents of the downloadable PDF.

To compress new outputs from the built-in image tool, without invoking an image API:

```bash
node scripts/prepare-resource-visuals.mjs "<generated-image-directory>"
```

Article and collection metadata use matching 1200x630 JPEGs for social previews.
Regenerate these committed derivative assets after replacing a WebP master:

```bash
node scripts/generate-resource-social-images.mjs
```

The scripts use the `sharp` installation provided by Next.js. They preserve the whole
composition using containment, rather than cropping important objects. Each guide includes Article
JSON-LD with a stable author ID, and both hubs include CollectionPage/ItemList markup.
Updated resource URLs and guide images are included in the sitemap. These changes
support discovery and comprehension; they do not guarantee search rankings.

Run the focused browser checks after building:

```bash
npm run build
npm run test:e2e -- tests/e2e/resource-pages.spec.ts
```

The checks cover image delivery, real social-image dimensions, responsive variants,
image transfer budgets, metadata, article markup,
keyboard interaction, no-JavaScript reading, accessibility, and layouts at 360, 390,
412, 820, and 1440 pixels. They intercept analytics so QA does not populate lead or
visit records. SEO references: [Google image guidance](https://developers.google.com/search/docs/appearance/google-images)
and [Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article).

## GPU Fallback and Action Links

The decorative homepage scene checks actual WebGL 2 context creation before loading
Three.js, then passes that context into the renderer. Merely exposing a browser
WebGL API does not prove the GPU can be used. Failed creation is remembered for the
current document, and the CSS hero stays visible without a renderer error. A lost
context or a new reduced-motion, network, or device constraint stops rendering and
cleans up observers and GPU resources. Application console errors are not globally
suppressed. See the [Three.js renderer documentation](https://threejs.org/docs/pages/WebGLRenderer.html).

The footer review card sizes to its content instead of stretching with the link
columns. The footer uses two columns on tablet and four on larger screens. Its
single review action still points to `/free-audit#request-audit`.
Secondary footer menus and informational sprint/handoff cards disable automatic
prefetch, so scrolling past them does not eagerly load every linked page.

All six sprint cards and four handoff cards are keyboard-accessible links to
existing educational pages and precise sections. The process page exposes stable
`diagnosis`, `strategy`, `implementation`, and `launch` anchors. The CTA guide has a
dedicated `confirmation-follow-up` section; it separates existing content instead
of duplicating the same explanation in several places. Diagram connectors remain
visual relationships, not fake controls.

`npm test` includes denied, throwing, lost, and successful WebGL-context tests in
addition to existing server/security regressions. The focused browser suite is
`tests/e2e/ui-polish.spec.ts`: GPU-denial fallback, real alpha transparency, image
loading, working anchors, compact footer, responsive headers, and accessibility.
Use `--reporter=list` for a quick local check without generating an HTML report.

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

