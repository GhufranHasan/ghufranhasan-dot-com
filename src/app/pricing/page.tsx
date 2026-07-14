import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BadgeDollarSign, CheckCircle2 } from 'lucide-react'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SectionBadge from '@/components/ui/SectionBadge'

export const metadata: Metadata = {
  title: 'Pricing | Funnel Review, Conversion Audit, Conversion Sprint',
  description:
    'Pricing path for the Free Funnel Review, $300 Conversion Audit, and LinkedIn-to-Website Conversion Sprint from $1,200.',
  alternates: {
    canonical: '/pricing',
  },
}

const offers = [
  {
    title: 'Free Funnel Review',
    price: 'Free',
    description:
      'A selective review for established B2B service businesses with a real offer and a working website.',
    bullets: ['Qualified intake', 'One major leak', 'One practical next step'],
  },
  {
    title: 'Conversion Audit',
    price: '$300',
    description:
      'A paid diagnosis with a recorded breakdown, priority fixes, CTA recommendations, and implementation roadmap.',
    bullets: ['Recorded Loom', 'Copy and CTA fixes', 'Roadmap before implementation'],
  },
  {
    title: 'LinkedIn-to-Website Conversion Sprint',
    price: 'From $1,200',
    description:
      'A focused implementation sprint for agencies ready to align positioning, page copy, design, build, tracking, and launch.',
    bullets: ['10 business days', 'Copy, design, and Next.js build', 'CTA tracking and launch support'],
  },
]

export default function PricingPage() {
  return (
    <article className="pt-20">
      <header className="texture-grid neon-deep border-b border-orange-500/20 py-16 md:py-24">
        <div className="container-custom">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/#home' },
              { label: 'Pricing', href: '/pricing' },
            ]}
          />
          <div className="mx-auto max-w-4xl text-center">
            <SectionBadge icon={BadgeDollarSign} className="mb-6">
              Pricing
            </SectionBadge>
            <h1 className="text-4xl font-bebas leading-tight text-white md:text-6xl">
              A Clear Path From Review to Implementation
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
              No confusing low-priced build in the middle. Start with fit, move
              into diagnosis if needed, then implement only when the gap is worth fixing.
            </p>
          </div>
        </div>
      </header>

      <section className="texture-dots neon-purple py-16 md:py-24">
        <div className="container-custom">
          <div className="grid gap-6 lg:grid-cols-3">
            {offers.map((offer) => (
              <article key={offer.title} className="glass-card border-orange-500/20 p-6">
                <h2 className="text-2xl font-bebas text-white">{offer.title}</h2>
                <p className="mt-3 text-3xl font-bold text-orange-400">{offer.price}</p>
                <p className="mt-4 text-sm leading-relaxed text-white/68">{offer.description}</p>
                <ul className="mt-5 space-y-2">
                  {offer.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-white/72">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-orange-400" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/free-audit#request-audit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-7 py-4 font-bold text-white transition-all hover:shadow-glow-hover"
            >
              Apply and choose the right starting point
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
