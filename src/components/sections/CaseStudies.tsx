'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Code2, FileSearch, PanelsTopLeft, Route } from 'lucide-react'
import Link from 'next/link'
import SectionBadge from '@/components/ui/SectionBadge'

const proofCategories = [
  {
    icon: PanelsTopLeft,
    label: 'Self-initiated rebuild',
    title: 'My own website conversion rebuild',
    text: 'A transparent example of repositioning a portfolio-style website into one audience, one problem, one sample audit, one application path, and dashboard tracking.',
    evidence: 'Not a client result. Useful because you can inspect the live decisions.',
  },
  {
    icon: FileSearch,
    label: 'Public review',
    title: 'Independent teardown thinking',
    text: 'Publicly observable reviews show message mismatch, weak proof sequence, CTA friction, and buyer-path confusion without pretending private analytics are available.',
    evidence: 'Not a client engagement. Recommendations are framed as risks to test.',
  },
  {
    icon: Code2,
    label: 'Implementation proof',
    title: 'Frontend delivery ability',
    text: 'The work does not end as advice. I can turn the diagnosis into responsive pages, forms, CTA tracking, dashboard visibility, and launch-ready frontend implementation.',
    evidence: 'Real implementation strength. Measured client outcomes are only shown when available.',
  },
]

const ownSiteCaseStudy = {
  title: 'How I rebuilt my own website path',
  before: 'The site behaved like a portfolio: skills, sections, resources, and visuals, but no single buyer decision path.',
  problem: 'It showed what I could build, but did not consistently explain the founder-led B2B agency gap I diagnose.',
  fix: 'I repositioned the page around skeptical diagnosis, sample audit, proof categories, one sprint, and one application path.',
  after: 'Now the site supports diagnosis, confidence, and qualification before a sales conversation.',
}

export default function CaseStudies() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section ref={ref} id="proof" className="texture-band neon-orange relative overflow-hidden py-20 md:py-28">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <SectionBadge icon={Route} className="mb-4">Proof before pricing</SectionBadge>
          <h2 className="text-3xl md:text-5xl font-bebas mb-4">Proof you can inspect without inflated claims</h2>
          <p className="text-white/70 text-lg">
            I do not use imaginary client wins as proof. The current evidence is visible strategy, public teardown thinking, and implementation ability.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8 rounded-2xl border border-orange-500/25 bg-purple-950/45 p-6 md:p-8"
        >
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <div className="mb-4 inline-block rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400">
                Self-initiated rebuild - not a client result
              </div>
              <h3 className="text-2xl md:text-3xl font-bebas text-white">{ownSiteCaseStudy.title}</h3>
              <p className="mt-3 text-sm text-white/65">
                This is a transparent example of how I apply the same thinking to my own brand before stronger client evidence is available.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/3 p-4">
                <h4 className="mb-1 font-bold text-orange-400">Before</h4>
                <p className="text-sm text-white/68">{ownSiteCaseStudy.before}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/3 p-4">
                <h4 className="mb-1 font-bold text-orange-400">Problem</h4>
                <p className="text-sm text-white/68">{ownSiteCaseStudy.problem}</p>
              </div>
              <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
                <h4 className="mb-1 font-bold text-orange-400">Fix</h4>
                <p className="text-sm text-white/76">{ownSiteCaseStudy.fix}</p>
              </div>
              <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
                <h4 className="mb-1 font-bold text-orange-400">After</h4>
                <p className="text-sm text-white/76">{ownSiteCaseStudy.after}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {proofCategories.map((item, index) => (
            <motion.article
              key={item.title}

              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.12, duration: 0.5 }}
              className="glass-card p-6 md:p-7 border border-orange-500/20"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold mb-5">
                {item.label}
              </div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-orange-500/25 bg-orange-500/10 text-orange-400">
                <item.icon size={23} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-sm leading-relaxed text-white/68">{item.text}</p>

              <div className="mt-6 rounded-xl border border-orange-500/20 bg-orange-500/8 p-4">
                <div className="mb-1 text-xs uppercase tracking-wide text-orange-300">Evidence status</div>
                <p className="text-sm leading-relaxed text-white/72">{item.evidence}</p>
              </div>

            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/free-audit"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-glow-hover transition-all"
          >
            Apply for a Funnel Check <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
