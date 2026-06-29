import type { Metadata } from 'next'
import {
  BadgeCheck,
  CheckCircle2,
  Clock3,
  FileSearch,
} from 'lucide-react'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SectionBadge from '@/components/ui/SectionBadge'
import AuditIntakeForm from '@/components/audit/AuditIntakeForm'

const pageTitle = 'Free LinkedIn-to-Website Conversion Audit'
const pageDescription =
  'Find the clarity, trust, and CTA gaps stopping warm LinkedIn visitors from becoming booked conversations with Funnel Align by Ghufran Hasan.'
const pageUrl = 'https://ghufranhasan.com/free-audit'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/free-audit',
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    type: 'website',
    images: [
      {
        url: '/images/profile.png',
        width: 1200,
        height: 630,
        alt: 'Free LinkedIn-to-Website Conversion Audit with Ghufran Hasan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: ['/images/profile.png'],
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: pageTitle,
  description: pageDescription,
  url: pageUrl,
  provider: {
    '@type': 'Person',
    name: 'Ghufran Hasan',
    url: 'https://ghufranhasan.com',
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'B2B founders, coaches, and creators',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
}

export default function FreeAuditPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c'),
        }}
      />

      <article className="pt-20">
        <section
          id="request-audit"
          className="relative min-h-[calc(100svh-5rem)] scroll-mt-20 overflow-hidden border-b border-orange-500/20 py-10 md:py-14"
        >
          <div className="hero-premium-bg" aria-hidden="true">
            <div className="hero-silk" />
            <div className="hero-scanline" />
            <div className="hero-vignette" />
          </div>

          <div className="container-custom relative z-10">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/#home' },
                { label: 'Free Audit', href: '/free-audit' },
              ]}
            />

            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start xl:gap-12">
              <div className="lg:sticky lg:top-28">
                <SectionBadge icon={FileSearch} emphasis="strong" className="mb-5">
                  Funnel Align audit intake
                </SectionBadge>

                <h1 className="hero-headline max-w-xl text-4xl font-bebas font-semibold leading-[1.04] text-white md:text-5xl xl:text-6xl">
                  Request Your Free
                  <span className="hero-gradient-text mt-1 block">
                    LinkedIn-to-Website Audit
                  </span>
                </h1>

                <p className="mt-5 max-w-xl leading-relaxed text-white/72">
                  Share your LinkedIn profile and website. I&apos;ll identify the
                  clearest gaps in your positioning, page journey, and CTA path.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    '3 clarity issues affecting action',
                    '3 practical conversion fixes',
                    '1 clear priority recommendation',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-white/70">
                      <CheckCircle2 size={17} className="shrink-0 text-orange-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 border-t border-orange-500/20 pt-5 text-xs text-white/58">
                  <span className="inline-flex items-center gap-2">
                    <Clock3 size={15} className="text-orange-400" />
                    Takes about 2 minutes
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <BadgeCheck size={15} className="text-orange-400" />
                    No pitch or pressure
                  </span>
                </div>
                <p className="mt-6 rounded-lg border border-orange-500/20 bg-orange-500/8 p-4 text-sm font-semibold text-white/75">
                  No generic advice. No pressure. Just clear conversion feedback.
                </p>
              </div>

              <AuditIntakeForm />
            </div>
          </div>
        </section>
      </article>
    </>
  )
}
