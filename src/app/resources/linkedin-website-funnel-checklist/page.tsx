import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Linkedin,
  Route,
  ShieldCheck,
  Target,
} from 'lucide-react'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SectionBadge from '@/components/ui/SectionBadge'
import LinkedinWebsiteFunnelChecklist from '@/components/resources/LinkedinWebsiteFunnelChecklist'
import PrintChecklistButton from '@/components/resources/PrintChecklistButton'
import { linkedinWebsiteFunnelChecklist } from '@/data/linkedinWebsiteFunnelChecklist'

const pageTitle = '10-Point LinkedIn-to-Website Funnel Checklist'
const seoTitle = 'Free LinkedIn-to-Website Funnel Checklist for B2B Agency Founders'
const pageDescription =
  'Use this free 10-point checklist to find where your LinkedIn profile, website, and CTA may be leaking booked calls.'
const pageUrl = 'https://ghufranhasan.com/resources/linkedin-website-funnel-checklist'
const ogImage = '/images/brand-logo-checklist.png'
const linkedInUrl = 'https://linkedin.com/in/ghufranhasan/'
const calendlyUrl = 'https://calendly.com/ghufranhasan/1-1-consultation-call'

export const metadata: Metadata = {
  title: seoTitle,
  description: pageDescription,
  alternates: {
    canonical: '/resources/linkedin-website-funnel-checklist',
  },
  openGraph: {
    title: pageTitle,
    description:
      'Check if your profile, website, and CTA are aligned to turn LinkedIn visitors into booked conversations.',
    url: pageUrl,
    type: 'website',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: '10-Point LinkedIn-to-Website Funnel Checklist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description:
      'Check if your profile, website, and CTA are aligned to turn LinkedIn visitors into booked conversations.',
    images: [ogImage],
  },
}

const webpageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: pageTitle,
  description: pageDescription,
  url: pageUrl,
  dateModified: '2026-06-29',
  author: {
    '@type': 'Person',
    name: 'Ghufran Hasan',
    url: 'https://ghufranhasan.com',
  },
  mainEntity: {
    '@type': 'ItemList',
    name: pageTitle,
    numberOfItems: linkedinWebsiteFunnelChecklist.length,
    itemListElement: linkedinWebsiteFunnelChecklist.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      description: item.question,
    })),
  },
}

const problemPoints = [
  'LinkedIn creates interest, but the profile CTA is unclear.',
  'The website looks credible, but the message does not continue the same promise.',
  'The booking path exists, but visitors do not feel enough clarity or trust to use it.',
]

const auditBullets = [
  "I'll review your LinkedIn profile positioning",
  "I'll check your website message clarity",
  "I'll identify CTA and booking path issues",
  "I'll show you where warm visitors may be dropping",
]

export default function LinkedinWebsiteFunnelChecklistPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webpageSchema).replace(/</g, '\\u003c'),
        }}
      />

      <article className="funnel-checklist-page pt-20 print:pt-0">
        <header className="relative overflow-hidden border-b border-orange-500/20 py-16 md:py-24 print:hidden">
          <div className="hero-premium-bg" aria-hidden="true">
            <div className="hero-silk" />
            <div className="hero-scanline" />
            <div className="hero-vignette" />
          </div>

          <div className="container-custom relative z-10">
            <div className="print:hidden">
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/#home' },
                  { label: 'Resources', href: '/resources' },
                  {
                    label: 'LinkedIn Website Funnel Checklist',
                    href: '/resources/linkedin-website-funnel-checklist',
                  },
                ]}
              />
            </div>

            <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <div>
                <SectionBadge icon={ClipboardCheck} emphasis="strong" className="mb-6">
                  Free Resource for B2B Agency Founders
                </SectionBadge>
                <h1 className="hero-headline max-w-4xl text-4xl font-bebas font-semibold leading-[1.04] text-white md:text-6xl lg:text-7xl">
                  10-Point LinkedIn-to-Website Funnel Checklist
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
                  Find where your LinkedIn profile, website, and CTA may be
                  losing warm visitors before they become booked conversations.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row print:hidden">
                  <Link
                    href="#checklist"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-7 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-glow-hover"
                  >
                    Start the Checklist
                    <ArrowRight size={18} />
                  </Link>
                  <a
                    href={linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-orange-500 px-7 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-orange-500/10 hover:shadow-glow"
                  >
                    DM &quot;AUDIT&quot; on LinkedIn
                    <Linkedin size={18} />
                  </a>
                </div>

                <p className="mt-5 inline-flex rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-200">
                  No email required. No signup. Just use it.
                </p>
              </div>

              <aside className="rounded-2xl border border-orange-500/25 bg-purple-950/65 p-6 shadow-glow backdrop-blur-md md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/25">
                    <Route size={23} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-orange-300">
                      Client machine path
                    </p>
                    <h2 className="mt-2 text-2xl font-bebas text-white">
                      Profile to website to booked call
                    </h2>
                  </div>
                </div>
                <div className="mt-6 grid gap-3">
                  {[
                    'LinkedIn profile clarity',
                    'Website message match',
                    'CTA and booking friction',
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-orange-500/15 bg-orange-500/6 p-4"
                    >
                      <CheckCircle2 size={17} className="shrink-0 text-orange-400" />
                      <span className="text-sm font-medium text-white/75">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </header>

        <section className="texture-grid neon-deep py-20 md:py-24 print:py-10">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
              <div>
                <SectionBadge icon={Target} className="mb-5">
                  The problem
                </SectionBadge>
                <h2 className="text-3xl font-bebas text-white md:text-5xl">
                  Most founders do not have a visibility problem
                </h2>
                <p className="mt-5 leading-relaxed text-white/70">
                  Most B2B agency founders get views, profile visits, and
                  sometimes website clicks. The real problem is that the path from
                  LinkedIn profile to website to booked call is unclear. This
                  checklist helps you find the leaks.
                </p>
              </div>

              <div className="grid gap-4">
                {problemPoints.map((point, index) => (
                  <div
                    key={point}
                    className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-orange-500/20 bg-background-card p-5"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-white/72">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <LinkedinWebsiteFunnelChecklist />

        <section className="texture-band neon-deep py-20 md:py-24 print:hidden">
          <div className="container-custom">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <SectionBadge icon={ShieldCheck} className="mb-5">
                  Free review path
                </SectionBadge>
                <h2 className="text-3xl font-bebas text-white md:text-5xl">
                  Want me to find the leaks for you?
                </h2>
                <p className="mt-5 leading-relaxed text-white/70">
                  If you are posting on LinkedIn but not getting booked calls, I
                  can review your LinkedIn profile, website, and CTA path.
                </p>
                <div className="mt-7 flex flex-col gap-4 sm:flex-row">
                  <a
                    href={linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-7 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-glow-hover"
                  >
                    DM &quot;AUDIT&quot; on LinkedIn
                    <Linkedin size={18} />
                  </a>
                  <a
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-orange-500 px-7 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-orange-500/10 hover:shadow-glow"
                  >
                    Book a Free Funnel Audit
                    <ArrowRight size={18} />
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-orange-500/25 bg-purple-950/55 p-6 shadow-glow md:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <FileText size={24} className="text-orange-400" />
                  <h3 className="text-2xl font-bebas text-white">
                    What I will check
                  </h3>
                </div>
                <div className="grid gap-3">
                  {auditBullets.map((bullet) => (
                    <div
                      key={bullet}
                      className="flex items-start gap-3 rounded-xl border border-orange-500/15 bg-orange-500/6 p-4"
                    >
                      <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-orange-400" />
                      <span className="text-sm leading-relaxed text-white/72">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="texture-grid neon-magenta py-14 print:hidden">
          <div className="container-custom">
            <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-5 rounded-2xl border border-orange-500/25 bg-purple-950/50 p-6 text-center shadow-glow md:flex-row md:text-left">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-orange-300">
                  Optional
                </p>
                <h2 className="mt-2 text-2xl font-bebas text-white">
                  Print or save this checklist as a PDF
                </h2>
              </div>
              <PrintChecklistButton />
            </div>
          </div>
        </section>
      </article>
    </>
  )
}
