import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Code2, FileSearch, PanelsTopLeft, ShieldCheck } from 'lucide-react'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SectionBadge from '@/components/ui/SectionBadge'

export const metadata: Metadata = {
  title: 'Proof | Conversion Thinking and Website Execution',
  description:
    'Proof assets, public teardown examples, website transformation logic, and implementation evidence behind Ghufran Hasan’s LinkedIn-to-website conversion work.',
  alternates: {
    canonical: '/proof',
  },
}

const proofItems = [
  {
    icon: PanelsTopLeft,
    title: 'This website transformation',
    text: 'The current site itself shows the conversion logic: one audience, one problem, one funnel check path, a simplified pricing ladder, and clear objection handling.',
  },
  {
    icon: FileSearch,
    title: 'Public teardown thinking',
    text: 'Public website reviews show how I identify positioning mismatch, weak trust sequence, CTA confusion, and page-flow friction without claiming private client results.',
  },
  {
    icon: Code2,
    title: 'Implementation ability',
    text: 'The work is not only advice. I can turn the strategy into responsive UI, Next.js pages, forms, tracking paths, and launch-ready frontends.',
  },
]

export default function ProofPage() {
  return (
    <article className="pt-20">
      <header className="texture-grid neon-deep border-b border-orange-500/20 py-16 md:py-24">
        <div className="container-custom">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/#home' },
              { label: 'Proof', href: '/proof' },
            ]}
          />
          <div className="mx-auto max-w-4xl text-center">
            <SectionBadge icon={ShieldCheck} className="mb-6">
              Proof
            </SectionBadge>
            <h1 className="text-4xl font-bebas leading-tight text-white md:text-6xl">
              Proof You Can Inspect Before You Buy
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
              This page keeps proof honest: visible strategy, public teardown
              thinking, and real implementation ability without pretending to have
              client testimonials that are not available yet.
            </p>
          </div>
        </div>
      </header>

      <section className="texture-dots neon-purple py-16 md:py-24">
        <div className="container-custom">
          <div className="grid gap-6 lg:grid-cols-3">
            {proofItems.map((item) => (
              <article key={item.title} className="glass-card border-orange-500/20 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                  <item.icon size={24} />
                </div>
                <h2 className="mt-5 text-2xl font-bebas text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/68">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-orange-500/25 bg-purple-950/50 p-7 text-center md:p-10">
            <h2 className="text-3xl font-bebas text-white md:text-5xl">
              Want a deeper comparison study?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/68">
              Review the LinkedIn personal brand website comparison page to see
              how different websites handle positioning, proof, pricing, and CTA flow.
            </p>
            <Link
              href="/linkedin-website-examples"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg border border-orange-500 px-7 py-4 font-bold text-white transition-all hover:bg-orange-500/10"
            >
              Read the comparison study
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
