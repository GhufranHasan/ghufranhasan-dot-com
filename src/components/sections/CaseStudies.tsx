'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const caseStudies = [
  {
    pattern: 'Pattern 01',
    title: 'Active on LinkedIn, generic website',
    problem: 'The founder was getting profile visits, but the website sounded like every other agency site.',
    gap: 'No specific ICP, no offer clarity, and no audit-focused CTA.',
    fix: 'Rebuild the hero, sharpen the offer, and guide visitors toward a single audit request.',
    result: 'Expected outcome: clearer positioning and fewer dead-end website visits.',
  },
  {
    pattern: 'Pattern 02',
    title: 'Strong posts, weak demo path',
    problem: 'Content created attention, but the profile and website did not explain what should happen next.',
    gap: 'The journey from post to profile to website felt disconnected.',
    fix: 'Align profile promise, website headline, and CTA language around one conversion path.',
    result: 'Expected outcome: more qualified conversations from the same content effort.',
  },
  {
    pattern: 'Pattern 03',
    title: 'Good design, unclear conversion',
    problem: 'The website looked polished but did not make the visitor feel diagnosed or understood.',
    gap: 'Proof, problem framing, and process were buried below generic service cards.',
    fix: 'Move trust, pain, process, and offer ladder into a clearer decision sequence.',
    result: 'Expected outcome: stronger trust before the visitor reaches the booking section.',
  },
]

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
          <span className="inline-block px-4 py-2 rounded-full bg-orange-500/10 text-orange-500 text-sm font-semibold mb-4">
            Common funnel patterns
          </span>
          <h2 className="text-3xl md:text-5xl font-bebas mb-4">How I diagnose the leak</h2>
          <p className="text-white/70 text-lg">
            These are anonymized strategy patterns, not inflated client claims. The format is simple: problem, gap, fix, and expected business impact.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.pattern}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.12, duration: 0.5 }}
              className="glass-card p-6 md:p-7 border border-orange-500/20"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold mb-5">
                {study.pattern}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-5">{study.title}</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-bold text-orange-500 mb-1">Problem</h4>
                  <p className="text-white/70">{study.problem}</p>
                </div>
                <div>
                  <h4 className="font-bold text-orange-500 mb-1">Gap</h4>
                  <p className="text-white/70">{study.gap}</p>
                </div>
                <div>
                  <h4 className="font-bold text-orange-500 mb-1">Fix</h4>
                  <p className="text-white/70">{study.fix}</p>
                </div>
                <div className="rounded-xl bg-orange-500/5 border border-orange-500/20 p-4">
                  <h4 className="font-bold text-white mb-1">Result target</h4>
                  <p className="text-white/70">{study.result}</p>
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
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-glow-hover transition-all"
          >
            Find your leak <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
