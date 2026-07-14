import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, FileSearch, ShieldCheck } from 'lucide-react'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SectionBadge from '@/components/ui/SectionBadge'

export const metadata: Metadata = {
  title: 'Case Studies | Conversion Examples in Progress',
  description:
    'Current case-study approach for LinkedIn-to-website conversion work, including honest proof status and public teardown examples.',
  alternates: {
    canonical: '/case-studies',
  },
}

export default function CaseStudiesPage() {
  return (
    <article className="pt-20">
      <header className="texture-grid neon-deep border-b border-orange-500/20 py-16 md:py-24">
        <div className="container-custom">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/#home' },
              { label: 'Case Studies', href: '/case-studies' },
            ]}
          />
          <div className="mx-auto max-w-4xl text-center">
            <SectionBadge icon={ShieldCheck} className="mb-6">
              Case studies
            </SectionBadge>
            <h1 className="text-4xl font-bebas leading-tight text-white md:text-6xl">
              Case Studies Without Fake Claims
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
              Full client case studies will be added when real projects, measured
              outcomes, and client permission are available. Until then, this page
              points to proof you can inspect.
            </p>
          </div>
        </div>
      </header>

      <section className="texture-dots neon-purple py-16 md:py-24">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl rounded-2xl border border-orange-500/25 bg-purple-950/50 p-7 md:p-10">
            <FileSearch size={28} className="text-orange-400" />
            <h2 className="mt-5 text-3xl font-bebas text-white md:text-5xl">
              Current proof substitutes
            </h2>
            <p className="mt-4 leading-relaxed text-white/70">
              For now, the site uses a transparent proof stack: this website
              transformation, public comparison studies, teardown thinking, and
              visible implementation quality. That is more honest than inventing
              testimonials or claiming client results that are not yet documented.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/proof"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-6 py-3 font-bold text-white transition-all hover:shadow-glow-hover"
              >
                View proof
                <ArrowRight size={17} />
              </Link>
              <Link
                href="/linkedin-website-examples"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-orange-500 px-6 py-3 font-bold text-white transition-all hover:bg-orange-500/10"
              >
                Read comparison study
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
