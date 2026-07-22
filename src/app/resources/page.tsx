import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  FileSearch,
  Globe2,
  Library,
  ListChecks,
  Route,
} from 'lucide-react'
import SectionBadge from '@/components/ui/SectionBadge'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

const pageTitle = 'LinkedIn-to-Website Conversion Resources'
const pageDescription = 'Practical resources for auditing your website, studying LinkedIn personal brand websites, and turning LinkedIn attention into qualified website leads.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/resources',
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: 'https://ghufranhasan.com/resources',
    type: 'website',
  },
}

const resources = [
  {
    type: 'Public checklist',
    title: 'LinkedIn-to-Website Funnel Checklist',
    description: 'Use the public 10-point checklist to score your LinkedIn profile, website, and CTA path without entering an email.',
    href: '/resources/linkedin-website-funnel-checklist',
    cta: 'Start the checklist',
    icon: ListChecks,
  },
  {
    type: 'Comparison study',
    title: 'LinkedIn Personal Brand Website Examples',
    description: 'Study nine LinkedIn-led websites across positioning, proof, pricing, CTA clarity, funnel structure, and other conversion criteria.',
    href: '/linkedin-website-examples',
    cta: 'Read the study',
    icon: FileSearch,
  },
  {
    type: 'Strategic guide',
    title: 'Website Conversion Strategy',
    description: 'Understand why LinkedIn should create attention while your website becomes the decision room that converts the opportunity.',
    href: '/website-conversion-strategy',
    cta: 'Read the strategy',
    icon: Globe2,
  },
  {
    type: 'CTA clarity',
    title: 'CTA Funnel Clarity',
    description: 'See how one focused CTA and intake form reduce friction for warm LinkedIn visitors.',
    href: '/cta-funnel-clarity',
    cta: 'Improve the CTA path',
    icon: Route,
  },
]

export default function ResourcesPage() {
  return (
    <article className="pt-20">
      <header className="texture-grid neon-deep border-b border-orange-500/20 py-20 md:py-28">
        <div className="container-custom">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/#home' },
              { label: 'Resources', href: '/resources' },
            ]}
          />
          <div className="mx-auto max-w-4xl text-center">
            <SectionBadge icon={Library} className="mb-6">Resources</SectionBadge>
            <h1 className="text-4xl font-bebas leading-tight text-white md:text-6xl">
              Resources for Turning LinkedIn Attention Into Website Leads
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
              Practical checklists, strategic breakdowns, and examples for building a clearer path from LinkedIn discovery to website action.
            </p>
          </div>
        </div>
      </header>

      <section className="texture-dots neon-purple py-20 md:py-24">
        <div className="container-custom">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource) => (
              <article key={resource.title} className="glass-card flex flex-col border-orange-500/20 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-500/25 bg-orange-500/10 text-orange-400">
                  <resource.icon size={22} />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-orange-300">{resource.type}</p>
                <h2 className="mt-2 text-2xl font-bebas text-white">{resource.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/65">{resource.description}</p>
                <Link
                  href={resource.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-300 transition-colors hover:text-orange-200"
                >
                  {resource.cta}
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="texture-band neon-deep py-20 md:py-24">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl rounded-2xl border border-orange-500/25 bg-purple-950/45 p-7 text-center md:p-10">
            <Route size={25} className="mx-auto text-orange-400" />
            <h2 className="mt-5 text-3xl font-bebas text-white md:text-5xl">Need a diagnosis for your own website?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/68">
              I can review the path from your LinkedIn profile to your website and show you the first conversion gap worth fixing.
            </p>
            <Link
              href="/free-audit"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-7 py-4 font-bold text-white transition-all hover:shadow-glow-hover"
            >
              Request Free Review
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
