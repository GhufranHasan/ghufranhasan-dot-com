'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Route } from 'lucide-react'
import Link from 'next/link'
import SectionBadge from '@/components/ui/SectionBadge'

const caseStudies = [
  {
    tag: 'B2B Agency Founder',
    title: 'Strong LinkedIn attention, no booking path',
    problem: 'The founder had strong LinkedIn engagement but no system to convert profile visits into conversations.',
    solution: 'I built a conversion-focused landing page with a clear audit CTA, aligned the messaging with their LinkedIn profile, and added a lead magnet.',
    result: 'Visitors get one clear reason to continue from profile curiosity into a business conversation.',
    metric: 'Audit CTA',
    image: '/images/profile.png',
  },
  {
    tag: 'Consulting Agency',
    title: 'Content views landing on a generic page',
    problem: 'Daily LinkedIn content was getting views, but the website was a generic "learn more" dead end.',
    solution: 'Redesigned the website around one clear offer, added social proof above the fold, and created a direct path from content to booking.',
    result: 'The page now explains the offer, proof, and next step without forcing visitors to figure it out themselves.',
    metric: 'Offer clarity',
    image: '/images/profile.png',
  },
  {
    tag: 'Service Agency Owner',
    title: 'A polished brochure with no conversion path',
    problem: 'The website looked professional but didn\'t generate inquiries. Visitors landed and left.',
    solution: 'Reorganized content to answer "who, what, why" in 3 seconds, added a free audit lead magnet, and clarified the CTA.',
    result: 'The page becomes a decision path: problem, offer, proof, process, objection handling, and CTA.',
    metric: 'Trust sequence',
    image: '/images/profile.png',
  },
]

const ownSiteCaseStudy = {
  title: 'How I rebuilt my own website funnel',
  before: 'The site behaved like a portfolio: skills, sections, and visuals, but no clear client journey.',
  problem: 'It showed what I could build, but did not clearly explain the LinkedIn-to-website conversion gap I solve.',
  fix: 'I repositioned the page around LinkedIn attention, website clarity, free audit CTA, offer ladder, and one conversion path.',
  after: 'Now the site works as a lead-generation path, not just a showcase.',
}

export default function CaseStudies() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section ref={ref} id="case-studies" className="texture-band neon-orange relative overflow-hidden py-20 md:py-28">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <SectionBadge icon={Route} className="mb-4">Funnel examples</SectionBadge>
          <h2 className="text-3xl md:text-5xl font-bebas mb-4">How I diagnose the leak</h2>
          <p className="text-white/70 text-lg">
            These are strategy patterns, not inflated client-result claims. The format is simple: problem, gap, fix, and likely business impact.
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
                My own site
              </div>
              <h3 className="text-2xl md:text-3xl font-bebas text-white">{ownSiteCaseStudy.title}</h3>
              <p className="mt-3 text-sm text-white/65">
                This is not a client-result claim. It is a transparent example of how I apply the same thinking to my own brand.
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
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.title}

              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.12, duration: 0.5 }}
              className="glass-card p-6 md:p-7 border border-orange-500/20"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold mb-5">
                {study.tag}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-5">{study.title}</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-bold text-orange-500 mb-1">Before</h4>
                  <p className="text-white/70">{study.problem}</p>
                </div>
                <div>
                  <h4 className="font-bold text-orange-500 mb-1">During</h4>
                  <p className="text-white/70">{study.solution}</p>
                </div>
                <div>
                  <h4 className="font-bold text-orange-500 mb-1">After</h4>
                  <p className="text-white/70">{study.result}</p>
                </div>

                <div className="bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)] rounded-xl p-5 mb-6">
                  <div className="text-[#22c55e] text-xs uppercase tracking-wide mb-1">Fix focus</div>
                  <div className="text-[#22c55e] text-xl font-bold">{study.metric}</div>
                </div>
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
            Request Free Audit <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
