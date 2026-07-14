import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Linkedin } from 'lucide-react'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SectionBadge from '@/components/ui/SectionBadge'

export const metadata: Metadata = {
  title: 'LinkedIn Profile Optimization for Website Conversions',
  description:
    'How LinkedIn profile positioning, headline, About section, Featured section, and CTA should connect to your website conversion path.',
  alternates: {
    canonical: '/linkedin-profile-optimization',
  },
}

const checks = [
  'Does the headline make the buyer and outcome clear?',
  'Does the About section build trust before sending visitors away?',
  'Does the Featured section point to the right website or review page?',
  'Does the profile CTA match what the website asks visitors to do next?',
]

export default function LinkedInProfileOptimizationPage() {
  return (
    <article className="pt-20">
      <header className="texture-grid neon-deep border-b border-orange-500/20 py-16 md:py-24">
        <div className="container-custom">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/#home' },
              { label: 'Resources', href: '/resources' },
              { label: 'LinkedIn Profile Optimization', href: '/linkedin-profile-optimization' },
            ]}
          />
          <div className="mx-auto max-w-4xl text-center">
            <SectionBadge icon={Linkedin} className="mb-6">
              LinkedIn profile optimization
            </SectionBadge>
            <h1 className="text-4xl font-bebas leading-tight text-white md:text-6xl">
              Your LinkedIn Profile Should Prepare Visitors for the Website
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
              Profile optimization is not just making the profile look polished.
              It should create the right expectation before the visitor clicks.
            </p>
          </div>
        </div>
      </header>

      <section className="texture-dots neon-purple py-16 md:py-24">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl space-y-4">
            {checks.map((check) => (
              <div key={check} className="flex gap-3 rounded-xl border border-orange-500/15 bg-orange-500/5 p-4">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-orange-400" />
                <p className="text-sm leading-relaxed text-white/72">{check}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/free-audit#request-audit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-7 py-4 font-bold text-white transition-all hover:shadow-glow-hover"
            >
              Review my profile-to-website path
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
