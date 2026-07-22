import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Route,
} from 'lucide-react'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SectionBadge from '@/components/ui/SectionBadge'

const calendlyUrl = 'https://calendly.com/ghufranhasan/1-1-consultation-call'

export const metadata: Metadata = {
  title: 'Funnel Review Application Received',
  description:
    'Your LinkedIn-to-website Funnel Review application has been received. Book an optional clarity call or explore conversion resources while you wait.',
  robots: {
    index: false,
    follow: true,
  },
}

const nextSteps = [
  'I review your LinkedIn positioning and profile promise.',
  'I compare that promise with your website and offer path.',
  'I identify the highest-priority clarity and conversion fixes.',
]

export default function ThankYouPage() {
  return (
    <article className="min-h-screen pt-20">
      <section className="texture-grid neon-deep relative overflow-hidden py-14 md:py-20">
        <div className="container-custom relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/#home' },
              { label: 'Funnel Review', href: '/free-audit' },
              { label: 'Application Received', href: '/thank-you' },
            ]}
          />

          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10 text-orange-400 shadow-glow">
              <CheckCircle2 size={31} />
            </div>
            <SectionBadge icon={ClipboardCheck} className="mt-6">
              Funnel Review application received
            </SectionBadge>
            <h1 className="mt-6 text-4xl font-bebas text-white md:text-6xl">
              Your Funnel Review Application Has Been Received
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/72">
              I&apos;ll check your LinkedIn profile, website, and CTA flow, then
              share the most important fit-based next step.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="glass-card border-orange-500/25 p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">
                What happens next
              </p>
              <div className="mt-5 space-y-4">
                {nextSteps.map((step, index) => (
                  <div
                    key={step}
                    className="flex gap-4 rounded-xl border border-orange-500/15 bg-orange-500/5 p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-white/72">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-2xl border border-orange-500/30 bg-purple-950/55 p-6 text-center shadow-glow md:p-8">
              <CalendarCheck size={30} className="mx-auto text-orange-400" />
              <h2 className="mt-4 text-2xl font-bebas text-white">
                Discuss the review live
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                While you wait, you can book a short clarity call if you want to
                discuss the journey live. Booking is optional, not required.
              </p>
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-6 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-glow-hover"
              >
                Book a Free Clarity Call
                <ArrowRight size={18} />
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section className="texture-dots neon-magenta py-16 md:py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <SectionBadge icon={Route} className="mb-5">
              Useful while you wait
            </SectionBadge>
            <h2 className="text-3xl font-bebas text-white md:text-5xl">
              See how the LinkedIn-to-website path works
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link
                href="/resources/linkedin-website-funnel-checklist"
                className="glass-card border-orange-500/20 p-6 text-left transition-colors hover:border-orange-500/45"
              >
                <ClipboardCheck size={24} className="text-orange-400" />
                <h3 className="mt-4 font-bold text-white">
                  LinkedIn-to-Website Funnel Checklist
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  Review your LinkedIn profile, website, and CTA path without an email gate.
                </p>
              </Link>
              <Link
                href="/linkedin-website-examples"
                className="glass-card border-orange-500/20 p-6 text-left transition-colors hover:border-orange-500/45"
              >
                <FileSearch size={24} className="text-orange-400" />
                <h3 className="mt-4 font-bold text-white">
                  Website Comparison Study
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  See how different personal-brand websites guide visitors.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
