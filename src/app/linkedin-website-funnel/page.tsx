import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  FileSearch,
  Linkedin,
  Route,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SectionBadge from '@/components/ui/SectionBadge'

const pageTitle = 'LinkedIn-to-Website Conversion Sprint'
const pageDescription =
  'Ghufran Hasan helps founder-led B2B agencies identify and fix the gaps between LinkedIn positioning, website messaging, proof, and CTA.'
const pageUrl = 'https://ghufranhasan.com/linkedin-website-funnel'

export const metadata: Metadata = {
  title: `${pageTitle} | Ghufran Hasan`,
  description: pageDescription,
  alternates: {
    canonical: '/linkedin-website-funnel',
  },
  openGraph: {
    title: `${pageTitle} | Ghufran Hasan`,
    description: pageDescription,
    url: pageUrl,
    type: 'website',
    images: [
      {
        url: '/images/profile.png',
        width: 1200,
        height: 630,
        alt: 'Ghufran Hasan LinkedIn-to-Website Funnel Optimization',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pageTitle} | Ghufran Hasan`,
    description: pageDescription,
    images: ['/images/profile.png'],
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'LinkedIn-to-Website Funnel Optimization by Ghufran Hasan',
  serviceType: pageTitle,
  description: pageDescription,
  url: pageUrl,
  provider: {
    '@type': 'Person',
    name: 'Ghufran Hasan',
    jobTitle: 'LinkedIn-to-Website Funnel Strategist',
    url: 'https://ghufranhasan.com',
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Founder-led B2B service agencies',
  },
}

const alignmentAreas = [
  {
    title: 'LinkedIn profile',
    text: 'Your headline, About section, Featured section, and profile promise create curiosity and direction.',
    icon: Linkedin,
  },
  {
    title: 'Website path',
    text: 'Your website continues the same promise with clear positioning, trust, offer clarity, and one next step.',
    icon: Compass,
  },
  {
    title: 'CTA system',
    text: 'Your funnel check application, booking flow, and follow-up path reduce friction instead of giving visitors too many choices.',
    icon: Route,
  },
]

const phases = [
  {
    title: 'Personal brand',
    text: 'Ghufran Hasan stays the trust anchor because early buyers trust a real specialist before they trust a new agency name.',
  },
  {
    title: 'Specialist offer',
    text: 'A clear specialist offer gives the work a niche, repeatable promise, and focused path without pretending to be a large company.',
  },
  {
    title: 'Agency system',
    text: 'The audit, strategy, build, and launch process becomes more repeatable as real projects create stronger proof.',
  },
  {
    title: 'Agency brand',
    text: 'A separate agency website can come later when case studies, testimonials, and a proven process support it.',
  },
]

const notIncluded = [
  'A full-service digital agency with too many disconnected offers',
  'Generic website design without LinkedIn and CTA alignment',
  'SEO, ads, branding, content, automation, and social media all bundled together',
]

export default function LinkedinWebsiteFunnelPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c'),
        }}
      />

      <article className="pt-20">
        <header className="relative overflow-hidden border-b border-orange-500/20 py-16 md:py-24">
          <div className="hero-premium-bg" aria-hidden="true">
            <div className="hero-silk" />
            <div className="hero-scanline" />
            <div className="hero-vignette" />
          </div>

          <div className="container-custom relative z-10">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/#home' },
                { label: 'Specialist Offer', href: '/linkedin-website-funnel' },
              ]}
            />

            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <SectionBadge icon={Sparkles} emphasis="strong" className="mb-6">
                  LinkedIn-to-Website Funnel Optimization
                </SectionBadge>

                <h1 className="hero-headline max-w-4xl text-4xl font-bebas font-semibold leading-[1.04] text-white md:text-6xl">
                  LinkedIn-to-Website
                  {' '}
                  <span className="hero-gradient-text block">
                  Conversion Sprint
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/74">
                  I help founder-led B2B agencies diagnose and improve the
                  handoff between LinkedIn positioning, website messaging, proof,
                  and CTA.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/free-audit#request-audit"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-7 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-glow-hover"
                  >
                    Apply for Check
                    <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="/#packages"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-orange-500 px-7 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-orange-500/10 hover:shadow-glow"
                  >
                    View Packages
                  </Link>
                </div>
              </div>

              <aside className="glass-card border-orange-500/25 p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                    <BriefcaseBusiness size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-orange-300">
                      Current positioning
                    </p>
                    <h2 className="mt-2 text-2xl font-bebas text-white">
                      Personal brand first. Specialist system underneath.
                    </h2>
                  </div>
                </div>
                <p className="mt-5 leading-relaxed text-white/68">
                  This is the clean middle path: you get the trust of Ghufran Hasan
                  as the visible specialist and the professional perception of a named
                  system that can scale later.
                </p>
                <div className="mt-6 rounded-xl border border-orange-500/20 bg-orange-500/8 p-4">
                  <p className="text-sm font-semibold text-white">
                    Best positioning now:
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Ghufran Hasan, helping founder-led B2B agencies identify
                    and fix the gaps between LinkedIn positioning, website
                    messaging, proof, and CTA.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </header>

        <section className="texture-grid neon-deep py-20 md:py-24">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl text-center">
              <SectionBadge icon={BadgeCheck} className="mb-4">
                Focused offer
              </SectionBadge>
              <h2 className="text-3xl font-bebas text-white md:text-5xl">
                One path instead of a full-service menu
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/70">
                The offer is intentionally narrow: align the LinkedIn profile,
                website, and CTA so warm visitors know what you do, why it matters,
                and what to do next.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {alignmentAreas.map((area) => (
                <article key={area.title} className="glass-card border-orange-500/20 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                    <area.icon size={22} />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-white">{area.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{area.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="texture-dots neon-magenta py-20 md:py-24">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <SectionBadge icon={ShieldCheck} className="mb-4">
                  What this avoids
                </SectionBadge>
                <h2 className="text-3xl font-bebas text-white md:text-5xl">
                  No premature agency mask
                </h2>
                <p className="mt-4 leading-relaxed text-white/70">
                  This specialist offer creates agency-style positioning without weakening
                  the trust of your personal brand or spreading the offer across too
                  many services.
                </p>
              </div>

              <div className="grid gap-4">
                {notIncluded.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl border border-orange-500/15 bg-orange-500/5 p-4">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-orange-400" />
                    <span className="text-sm leading-relaxed text-white/72">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="texture-band neon-deep py-20 md:py-24">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl text-center">
              <SectionBadge icon={FileSearch} className="mb-4">
                Growth path
              </SectionBadge>
              <h2 className="text-3xl font-bebas text-white md:text-5xl">
                Personal brand to agency brand, in the right order
              </h2>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-4">
              {phases.map((phase, index) => (
                <article key={phase.title} className="relative rounded-2xl border border-orange-500/20 bg-purple-950/45 p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-5 font-bold text-white">{phase.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/62">{phase.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="texture-grid neon-orange py-20 md:py-24">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl rounded-2xl border border-orange-500/25 bg-purple-950/55 p-7 text-center md:p-10">
              <Route size={28} className="mx-auto text-orange-400" />
              <h2 className="mt-5 text-3xl font-bebas text-white md:text-5xl">
                Want to know where your LinkedIn-to-website path is leaking?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/68">
                Start with the funnel check application. I will review your
                profile, website, and CTA flow, then show you the clearest next
                improvement.
              </p>
              <Link
                href="/free-audit#request-audit"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-7 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-glow-hover"
              >
                Apply for Check
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  )
}
