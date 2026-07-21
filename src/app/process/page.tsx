import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ChartLine, ClipboardList, Pen, Rocket } from 'lucide-react'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SectionBadge from '@/components/ui/SectionBadge'

export const metadata: Metadata = {
  title: 'Process | LinkedIn-to-Website Conversion Sprint',
  description:
    'A detailed look at the audit, strategy, design, build, launch, and tracking process behind the LinkedIn-to-Website Conversion Sprint.',
  alternates: {
    canonical: '/process',
  },
}

const steps = [
  {
    icon: ClipboardList,
    title: 'Audit the current path',
    timeline: '1 day',
    description:
      'I review the profile promise, website hero, offer explanation, trust sequence, CTA path, form friction, and mobile scan experience.',
    output: 'A clear diagnosis of the biggest leak and the first fixes.',
  },
  {
    icon: ChartLine,
    title: 'Map the conversion strategy',
    timeline: '1-2 days',
    description:
      'We define the ideal visitor, page promise, section order, objection flow, CTA action, and what the page must prove before asking for action.',
    output: 'A practical page-flow and messaging direction.',
  },
  {
    icon: Pen,
    title: 'Write, design, and build',
    timeline: '5-7 days',
    description:
      'I turn the strategy into conversion copy, responsive layout, branded UI, and a maintainable Next.js implementation.',
    output: 'A focused page or homepage path ready for review.',
  },
  {
    icon: Rocket,
    title: 'Launch and refine',
    timeline: '1-2 days',
    description:
      'I handle QA, mobile checks, CTA tracking, launch support, and a walkthrough so you understand how the path works.',
    output: 'A live conversion path with clearer next steps.',
  },
]

export default function ProcessPage() {
  return (
    <article className="pt-20">
      <header className="texture-grid neon-deep border-b border-orange-500/20 py-16 md:py-24">
        <div className="container-custom">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/#home' },
              { label: 'Process', href: '/process' },
            ]}
          />
          <div className="mx-auto max-w-4xl text-center">
            <SectionBadge icon={ClipboardList} className="mb-6">
              Process
            </SectionBadge>
            <h1 className="text-4xl font-bebas leading-tight text-white md:text-6xl">
              How the LinkedIn-to-Website Path Gets Fixed
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
              The homepage shows the short version. This page explains the full
              process from diagnosis to launch.
            </p>
          </div>
        </div>
      </header>

      <section className="texture-dots neon-purple py-16 md:py-24">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl space-y-6">
            {steps.map((step, index) => (
              <article key={step.title} className="glass-card border-orange-500/20 p-6 md:p-7">
                <div className="flex flex-col gap-5 md:flex-row">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                    <step.icon size={26} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">
                        Step {index + 1}
                      </p>
                      <span className="rounded-full border border-orange-500/25 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-200">
                        {step.timeline}
                      </span>
                    </div>
                    <h2 className="mt-2 text-2xl font-bebas text-white">{step.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">{step.description}</p>
                    <div className="mt-5 rounded-xl border border-orange-500/15 bg-orange-500/5 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">
                        Output
                      </p>
                      <p className="mt-1 text-sm text-white/72">{step.output}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="texture-band neon-deep py-16 md:py-20">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bebas text-white md:text-5xl">
            Start with the funnel check application
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/68">
            The form gives enough context to decide whether this process is the
            right fit before a paid project begins.
          </p>
          <Link
            href="/free-audit#request-audit"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-7 py-4 font-bold text-white transition-all hover:shadow-glow-hover"
          >
            Apply for a Funnel Check
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </article>
  )
}
