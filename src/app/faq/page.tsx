import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, HelpCircle, MessageCircle } from 'lucide-react'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SectionBadge from '@/components/ui/SectionBadge'
import { faqs, getFaqPlainAnswer } from '@/data/faqs'

export const metadata: Metadata = {
  title: 'FAQ | LinkedIn-to-Website Funnel Optimization',
  description:
    'Full FAQ for founder-led B2B agencies considering a LinkedIn-to-website funnel review, conversion audit, or implementation sprint.',
  alternates: {
    canonical: '/faq',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: getFaqPlainAnswer(faq),
    },
  })),
}

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c'),
        }}
      />

      <article className="pt-20">
        <header className="texture-grid neon-deep border-b border-orange-500/20 py-16 md:py-24">
          <div className="container-custom">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/#home' },
                { label: 'FAQ', href: '/faq' },
              ]}
            />
            <div className="mx-auto max-w-4xl text-center">
              <SectionBadge icon={HelpCircle} className="mb-6">
                Full FAQ
              </SectionBadge>
              <h1 className="text-4xl font-bebas leading-tight text-white md:text-6xl">
                Questions Before You Apply for a Funnel Review
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
                The homepage shows only the five most important questions. This page
                gives the full answer set so serious buyers can understand the offer,
                scope, fit, timeline, and next step.
              </p>
            </div>
          </div>
        </header>

        <section className="texture-dots neon-purple py-16 md:py-24">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl space-y-5">
              {faqs.map((faq, index) => (
                <article
                  key={faq.question}
                  className="rounded-2xl border border-orange-500/20 bg-purple-950/45 p-5 md:p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10 text-sm font-bold text-orange-300">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <span className="inline-flex rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-300">
                        {faq.category}
                      </span>
                      <h2 className="mt-3 text-xl font-bold leading-snug text-white">
                        {faq.question}
                      </h2>
                      <div className="mt-4 space-y-3 text-sm leading-relaxed text-white/70">
                        {faq.answer.map((block, blockIndex) =>
                          block.kind === 'paragraph' ? (
                            <p key={`${faq.question}-${blockIndex}`}>{block.text}</p>
                          ) : (
                            <ul key={`${faq.question}-${blockIndex}`} className="space-y-2 pl-5">
                              {block.items.map((item) => (
                                <li key={item} className="list-disc marker:text-orange-400">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="texture-band neon-deep py-16 md:py-20">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl rounded-2xl border border-orange-500/25 bg-purple-950/55 p-7 text-center md:p-10">
              <MessageCircle size={26} className="mx-auto text-orange-400" />
              <h2 className="mt-5 text-3xl font-bebas text-white md:text-5xl">
                Still want a direct read on your own path?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/68">
                Apply for the free funnel review and I will look at your profile,
                website, and CTA flow with your actual business context.
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
    </>
  )
}
