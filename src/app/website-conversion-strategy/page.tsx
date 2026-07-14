import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Route } from 'lucide-react'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SectionBadge from '@/components/ui/SectionBadge'

export const metadata: Metadata = {
  title: 'Website Conversion Strategy for LinkedIn Visitors',
  description:
    'Why a founder-led B2B agency website should act as the decision room after LinkedIn creates attention.',
  alternates: {
    canonical: '/website-conversion-strategy',
  },
}

const points = [
  'The hero should continue the same promise created on LinkedIn.',
  'The page should prove fit before asking for a call or form submission.',
  'The CTA should guide one clear action instead of offering too many choices.',
  'The mobile path should make the offer, proof, and next step easy to scan.',
]

export default function WebsiteConversionStrategyPage() {
  return (
    <article className="pt-20">
      <header className="texture-grid neon-deep border-b border-orange-500/20 py-16 md:py-24">
        <div className="container-custom">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/#home' },
              { label: 'Resources', href: '/resources' },
              { label: 'Website Conversion Strategy', href: '/website-conversion-strategy' },
            ]}
          />
          <div className="mx-auto max-w-4xl text-center">
            <SectionBadge icon={Route} className="mb-6">
              Website strategy
            </SectionBadge>
            <h1 className="text-4xl font-bebas leading-tight text-white md:text-6xl">
              Your Website Is the Decision Room After LinkedIn Creates Attention
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
              LinkedIn can create curiosity. Your website should turn that
              curiosity into clarity, trust, and one logical next step.
            </p>
          </div>
        </div>
      </header>

      <section className="texture-dots neon-purple py-16 md:py-24">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl space-y-4">
            {points.map((point) => (
              <div key={point} className="flex gap-3 rounded-xl border border-orange-500/15 bg-orange-500/5 p-4">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-orange-400" />
                <p className="text-sm leading-relaxed text-white/72">{point}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/free-audit#request-audit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-7 py-4 font-bold text-white transition-all hover:shadow-glow-hover"
            >
              Apply for a Funnel Review
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
