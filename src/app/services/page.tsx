import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Map,
  MessageSquareText,
  MousePointerClick,
} from 'lucide-react'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SectionBadge from '@/components/ui/SectionBadge'

export const metadata: Metadata = {
  title: 'Services | LinkedIn-to-Website Conversion for B2B Agencies',
  description:
    'Detailed service page for LinkedIn profile alignment, website conversion path, CTA system, conversion audit, and implementation sprint.',
  alternates: {
    canonical: '/services',
  },
}

const services = [
  {
    icon: MessageSquareText,
    title: 'LinkedIn profile alignment',
    description:
      'I review whether your headline, About section, Featured section, and profile promise create the right expectation before visitors reach your website.',
    includes: ['Profile promise', 'Featured section direction', 'Offer clarity', 'CTA alignment'],
  },
  {
    icon: MousePointerClick,
    title: 'Website conversion path',
    description:
      'I improve the page journey so visitors understand who you help, what you solve, why they should trust you, and what to do next.',
    includes: ['Hero clarity', 'Offer section', 'Trust sequence', 'Mobile scan path'],
  },
  {
    icon: Map,
    title: 'CTA and intake system',
    description:
      'I make the next step easier to choose by aligning the review application, booking flow, form friction, and follow-up path.',
    includes: ['CTA wording', 'Form structure', 'Booking path', 'Tracking signals'],
  },
]

const boundaries = [
  'No full-service agency menu with disconnected services.',
  'No fake lead guarantees or invented case-study numbers.',
  'No generic portfolio redesign that ignores the LinkedIn visitor journey.',
  'No paid ads, social media management, or ongoing content calendar work.',
]

export default function ServicesPage() {
  return (
    <article className="pt-20">
      <header className="texture-grid neon-deep border-b border-orange-500/20 py-16 md:py-24">
        <div className="container-custom">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/#home' },
              { label: 'Services', href: '/services' },
            ]}
          />
          <div className="mx-auto max-w-4xl text-center">
            <SectionBadge icon={Map} className="mb-6">
              Services
            </SectionBadge>
            <h1 className="text-4xl font-bebas leading-tight text-white md:text-6xl">
              LinkedIn-to-Website Conversion Services
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
              A focused service system for founder-led B2B agencies that already
              get attention on LinkedIn but need a clearer path from profile visit
              to qualified enquiry.
            </p>
          </div>
        </div>
      </header>

      <section className="texture-dots neon-purple py-16 md:py-24">
        <div className="container-custom">
          <div className="grid gap-6 lg:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="glass-card border-orange-500/20 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                  <service.icon size={24} />
                </div>
                <h2 className="mt-5 text-2xl font-bebas text-white">{service.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/68">{service.description}</p>
                <ul className="mt-5 space-y-2">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/72">
                      <CheckCircle2 size={15} className="text-orange-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="texture-band neon-deep py-16 md:py-24">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <SectionBadge icon={ClipboardCheck} className="mb-5">
                What is included
              </SectionBadge>
              <h2 className="text-3xl font-bebas text-white md:text-5xl">
                One specialist path, not a menu of random tasks
              </h2>
              <p className="mt-4 leading-relaxed text-white/70">
                The work starts with diagnosis, then moves into a paid audit or
                implementation sprint only when the path is worth fixing.
              </p>
              <Link
                href="/pricing"
                className="mt-7 inline-flex items-center gap-2 rounded-lg border border-orange-500 px-6 py-3 font-semibold text-white transition-all hover:bg-orange-500/10"
              >
                View pricing path
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="grid gap-4">
              {boundaries.map((item) => (
                <div key={item} className="rounded-xl border border-orange-500/15 bg-orange-500/5 p-4 text-sm leading-relaxed text-white/72">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="texture-grid neon-orange py-16 md:py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl rounded-2xl border border-orange-500/25 bg-purple-950/55 p-7 text-center md:p-10">
            <h2 className="text-3xl font-bebas text-white md:text-5xl">
              Want to know which service fits your current gap?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/68">
              Apply first. The review helps decide whether you need copy fixes,
              a paid audit, or the full conversion sprint.
            </p>
            <Link
              href="/free-audit#request-audit"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-7 py-4 font-bold text-white transition-all hover:shadow-glow-hover"
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
