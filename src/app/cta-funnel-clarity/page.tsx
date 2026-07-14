import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, MousePointerClick } from 'lucide-react'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SectionBadge from '@/components/ui/SectionBadge'

export const metadata: Metadata = {
  title: 'CTA Funnel Clarity for LinkedIn-to-Website Visitors',
  description:
    'How CTA wording, intake forms, booking flows, and follow-up paths reduce friction for warm LinkedIn visitors.',
  alternates: {
    canonical: '/cta-funnel-clarity',
  },
}

const fixes = [
  'Use one primary CTA for the main buyer path.',
  'Use an intake form when you need context before a call.',
  'Use booking links after the visitor understands why the call matters.',
  'Track CTA clicks and form submissions so the path can be improved.',
]

export default function CTAFunnelClarityPage() {
  return (
    <article className="pt-20">
      <header className="texture-grid neon-deep border-b border-orange-500/20 py-16 md:py-24">
        <div className="container-custom">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/#home' },
              { label: 'Resources', href: '/resources' },
              { label: 'CTA Funnel Clarity', href: '/cta-funnel-clarity' },
            ]}
          />
          <div className="mx-auto max-w-4xl text-center">
            <SectionBadge icon={MousePointerClick} className="mb-6">
              CTA clarity
            </SectionBadge>
            <h1 className="text-4xl font-bebas leading-tight text-white md:text-6xl">
              Your CTA Should Reduce Decisions, Not Create More of Them
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
              If visitors can DM, email, book, download, and browse all at once,
              they may choose nothing. The CTA path should match the buyer stage.
            </p>
          </div>
        </div>
      </header>

      <section className="texture-dots neon-purple py-16 md:py-24">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl space-y-4">
            {fixes.map((fix) => (
              <div key={fix} className="flex gap-3 rounded-xl border border-orange-500/15 bg-orange-500/5 p-4">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-orange-400" />
                <p className="text-sm leading-relaxed text-white/72">{fix}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-7 py-4 font-bold text-white transition-all hover:shadow-glow-hover"
            >
              Open the CTA intake form
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
