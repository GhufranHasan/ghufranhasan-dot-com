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

const pageTitle = 'Apply for a Free LinkedIn-to-Website Funnel Review'
const pageDescription =
  'Apply for a limited LinkedIn-to-website funnel review for founder-led B2B service agencies with an active offer and working website.'
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
        alt: 'Free LinkedIn-to-Website Funnel Review with Ghufran Hasan',
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
    audienceType: 'Founder-led B2B service agencies',
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
                { label: 'Funnel Review', href: '/free-audit' },
              ]}
            />

            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start xl:gap-12">
              <div className="lg:sticky lg:top-28">
                <SectionBadge icon={FileSearch} emphasis="strong" className="mb-5">
                  Qualified funnel review intake
                </SectionBadge>

                <h1 className="hero-headline max-w-xl text-4xl font-bebas font-semibold leading-[1.04] text-white md:text-5xl xl:text-6xl">
                  Apply for a Free
                  <span className="hero-gradient-text mt-1 block">
                    Funnel Review
                  </span>
                </h1>

                <p className="mt-5 max-w-xl leading-relaxed text-white/72">
                  Share your LinkedIn profile, website, service, lead source,
                  average client value, and budget. I review a limited number of
                  established B2B service businesses each week.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    'One major leak in the LinkedIn-to-website path',
                    'One practical next-step recommendation',
                    'A clear signal on whether audit or sprint makes sense',
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
                    Takes about 3 minutes
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <BadgeCheck size={15} className="text-orange-400" />
                    Established B2B service businesses only
                  </span>
                </div>
                <p className="mt-6 rounded-lg border border-orange-500/20 bg-orange-500/8 p-4 text-sm font-semibold text-white/75">
                  This is not a free full strategy session. It is a short fit-based review for businesses with a real offer, a website, and a reason to improve the path now.
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
