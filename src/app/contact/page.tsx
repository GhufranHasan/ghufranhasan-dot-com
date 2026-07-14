import type { Metadata } from 'next'
import { ClipboardCheck, FileSearch } from 'lucide-react'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SectionBadge from '@/components/ui/SectionBadge'
import AuditIntakeForm from '@/components/audit/AuditIntakeForm'

export const metadata: Metadata = {
  title: 'Contact | Apply for a Funnel Review',
  description:
    'Contact Ghufran Hasan by applying for a LinkedIn-to-website funnel review using a focused intake form.',
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  return (
    <article className="pt-20">
      <section className="relative overflow-hidden border-b border-orange-500/20 py-12 md:py-16">
        <div className="hero-premium-bg" aria-hidden="true">
          <div className="hero-silk" />
          <div className="hero-scanline" />
          <div className="hero-vignette" />
        </div>

        <div className="container-custom relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/#home' },
              { label: 'Contact', href: '/contact' },
            ]}
          />
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start xl:gap-12">
            <div className="lg:sticky lg:top-28">
              <SectionBadge icon={FileSearch} emphasis="strong" className="mb-5">
                Contact through the review form
              </SectionBadge>
              <h1 className="text-4xl font-bebas leading-tight text-white md:text-6xl">
                Apply for a LinkedIn-to-Website Funnel Review
              </h1>
              <p className="mt-5 max-w-xl leading-relaxed text-white/72">
                Instead of a generic contact form, this intake collects the exact
                context needed to review your LinkedIn profile, website, and CTA path.
              </p>
              <div className="mt-6 rounded-xl border border-orange-500/20 bg-orange-500/8 p-4">
                <div className="flex items-start gap-3">
                  <ClipboardCheck size={20} className="mt-0.5 shrink-0 text-orange-400" />
                  <p className="text-sm leading-relaxed text-white/72">
                    Use this page when you want a business-focused next step, not a
                    casual message thread.
                  </p>
                </div>
              </div>
            </div>

            <AuditIntakeForm />
          </div>
        </div>
      </section>
    </article>
  )
}
