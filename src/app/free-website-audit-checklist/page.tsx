import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  FileSearch,
  Linkedin,
  Route,
  ShieldCheck,
  Smartphone,
  Target,
} from 'lucide-react'
import ChecklistSignup from '@/components/resources/ChecklistSignup'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SectionBadge from '@/components/ui/SectionBadge'
import { websiteChecklistItems } from '@/data/websiteChecklist'

const pageTitle = 'Free Website Audit Checklist for LinkedIn Creators'
const pageDescription = 'Use this free 10-point website funnel checklist to find positioning, trust, offer, CTA, mobile, and conversion-path leaks before warm LinkedIn visitors leave.'
const pageUrl = 'https://ghufranhasan.com/free-website-audit-checklist'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/free-website-audit-checklist',
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    type: 'website',
    images: [
      {
        url: '/images/brand-logo-checklist.png',
        width: 1200,
        height: 630,
        alt: '10-Point Website Funnel Checklist by Ghufran Hasan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: ['/images/brand-logo-checklist.png'],
  },
}

const webpageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: pageTitle,
  description: pageDescription,
  url: pageUrl,
  dateModified: '2026-06-06',
  author: {
    '@type': 'Person',
    name: 'Ghufran Hasan',
    url: 'https://ghufranhasan.com',
  },
  mainEntity: {
    '@type': 'DigitalDocument',
    name: '10-Point Website Funnel Checklist',
    description: 'A free website audit checklist for reviewing a LinkedIn-to-website conversion path.',
  },
}

const reviewAreas = [
  { icon: Target, label: 'Positioning and headline clarity' },
  { icon: ShieldCheck, label: 'Trust proof and objection handling' },
  { icon: Route, label: 'Offer, CTA, and decision path' },
  { icon: Smartphone, label: 'Mobile experience and contact friction' },
]

export default function FreeWebsiteAuditChecklistPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webpageSchema).replace(/</g, '\\u003c'),
        }}
      />

      <article className="pt-20">
        <header className="texture-grid neon-deep relative overflow-hidden border-b border-orange-500/20 py-16 md:py-24">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-orange-500/70 to-transparent" />
          <div className="container-custom relative z-10">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/#home' },
                { label: 'Resources', href: '/resources' },
                { label: 'Free Website Audit Checklist', href: '/free-website-audit-checklist' },
              ]}
            />
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <SectionBadge icon={ClipboardCheck} className="mb-6">Free website audit resource</SectionBadge>
                <h1 className="text-4xl font-bebas leading-tight text-white md:text-6xl lg:text-7xl">
                  Free Website Audit Checklist
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
                  Use this 10-point website funnel checklist to find where your LinkedIn traffic is leaking before visitors book, message, or request an audit.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {reviewAreas.map((area) => (
                    <div key={area.label} className="flex items-center gap-3 rounded-xl border border-orange-500/20 bg-orange-500/8 p-4">
                      <area.icon size={18} className="shrink-0 text-orange-400" />
                      <span className="text-sm font-medium text-white/75">{area.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-white/55">
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-orange-400" />
                    Free download
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-orange-400" />
                    Takes about 10 minutes
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-orange-400" />
                    Built for LinkedIn-led websites
                  </span>
                </div>
              </div>

              <aside className="glass-card border-orange-500/30 p-6 shadow-glow md:p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">Lead magnet name</p>
                <h2 className="mt-3 text-3xl font-bebas text-white">10-Point Website Funnel Checklist</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  Find whether your website has a positioning leak, trust leak, CTA leak, or offer-clarity leak.
                </p>
                <div className="my-6 border-y border-orange-500/15 py-6">
                  <ChecklistSignup />
                </div>
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-orange-300 transition-colors hover:text-orange-200"
                >
                  Explore all resources
                  <ArrowRight size={16} />
                </Link>
              </aside>
            </div>
          </div>
        </header>

        <section className="texture-dots neon-purple py-20 md:py-24">
          <div className="container-custom">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <SectionBadge icon={Eye} className="mb-5">What you will review</SectionBadge>
              <h2 className="text-3xl font-bebas text-white md:text-5xl">Ten checks before warm visitors leave</h2>
              <p className="mt-4 text-white/68">
                The checklist follows the same path a LinkedIn visitor takes when deciding whether your website feels clear, credible, and worth responding to.
              </p>
            </div>

            <ol className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
              {websiteChecklistItems.map((item, index) => (
                <li key={item.title} className="glass-card flex gap-4 border-orange-500/20 p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-orange-500/25 bg-orange-500/10 text-sm font-bold text-orange-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/62">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="texture-band neon-deep py-20 md:py-24">
          <div className="container-custom">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <div className="overflow-hidden rounded-2xl border border-orange-500/25 bg-white shadow-glow">
                <iframe
                  src="/resources/website-funnel-checklist.html"
                  title="Preview of the 10-Point Website Funnel Checklist"
                  loading="lazy"
                  tabIndex={-1}
                  className="pointer-events-none aspect-[4/5] w-full border-0"
                />
              </div>

              <div>
                <SectionBadge icon={FileSearch} className="mb-5">Checklist preview</SectionBadge>
                <h2 className="text-3xl font-bebas text-white md:text-5xl">A simple diagnosis before a redesign</h2>
                <p className="mt-5 leading-relaxed text-white/68">
                  Use the checklist to identify the first high-priority issue before changing your design, rewriting every section, or investing in a full funnel build.
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    'Mark each check as clear, weak, or missing.',
                    'Choose the three gaps most likely to block action.',
                    'Fix the journey before adding more traffic.',
                  ].map((step) => (
                    <div key={step} className="flex items-start gap-3 rounded-xl border border-orange-500/20 bg-orange-500/7 p-4">
                      <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-orange-400" />
                      <p className="text-sm leading-relaxed text-white/72">{step}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href="/free-audit"
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg border-2 border-orange-500 px-6 py-3 font-bold text-white transition-all hover:bg-orange-500/10 hover:shadow-glow"
                >
                  Request a Free Funnel Audit
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="texture-grid neon-magenta py-20 md:py-24">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl rounded-2xl border border-orange-500/30 bg-purple-950/50 p-7 text-center shadow-glow md:p-10">
              <Linkedin size={25} className="mx-auto text-orange-400" />
              <h2 className="mt-5 text-3xl font-bebas text-white md:text-5xl">LinkedIn creates attention. Your website should continue the conversation.</h2>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/68">
                Download the branded 10-Point Website Funnel Checklist and find the clearest next improvement in your website path.
              </p>
              <div className="mx-auto mt-7 max-w-md text-left">
                <ChecklistSignup />
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  )
}
