import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Code2, FileSearch, PanelsTopLeft } from 'lucide-react'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SectionBadge from '@/components/ui/SectionBadge'

export const metadata: Metadata = {
  title: 'Work | Strategy and Implementation Proof',
  description:
    'Work and proof assets showing website transformation thinking, implementation ability, and public teardown examples.',
  alternates: {
    canonical: '/work',
  },
}

const workItems = [
  {
    icon: PanelsTopLeft,
    title: 'Personal website conversion rebuild',
    text: 'A live example of narrowing the audience, simplifying the offer path, and creating one review application CTA.',
  },
  {
    icon: Code2,
    title: 'Frontend implementation work',
    text: 'Responsive UI, Next.js implementation, forms, tracking paths, SEO metadata, and launch-ready pages.',
  },
  {
    icon: FileSearch,
    title: 'Public comparison study',
    text: 'A detailed review of LinkedIn-led websites and how they handle positioning, trust, pricing, and CTA flow.',
  },
]

export default function WorkPage() {
  return (
    <article className="pt-20">
      <header className="texture-grid neon-deep border-b border-orange-500/20 py-16 md:py-24">
        <div className="container-custom">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/#home' },
              { label: 'Work', href: '/work' },
            ]}
          />
          <div className="mx-auto max-w-4xl text-center">
            <SectionBadge icon={Code2} className="mb-6">
              Work
            </SectionBadge>
            <h1 className="text-4xl font-bebas leading-tight text-white md:text-6xl">
              Strategy and Execution Proof
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
              This page collects the work evidence currently available while the
              client proof library is still being built.
            </p>
          </div>
        </div>
      </header>

      <section className="texture-dots neon-purple py-16 md:py-24">
        <div className="container-custom">
          <div className="grid gap-6 lg:grid-cols-3">
            {workItems.map((item) => (
              <article key={item.title} className="glass-card border-orange-500/20 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                  <item.icon size={24} />
                </div>
                <h2 className="mt-5 text-2xl font-bebas text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/68">{item.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/proof"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-orange-500 px-7 py-4 font-bold text-white transition-all hover:bg-orange-500/10"
            >
              View proof details
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
