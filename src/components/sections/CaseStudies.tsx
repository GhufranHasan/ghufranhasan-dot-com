'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const caseStudies = [
  {
    tag: 'SaaS Founder',
    title: 'From zero leads to 12 qualified calls',
    problem: 'The founder had strong LinkedIn engagement but no system to convert profile visits into conversations.',
    solution: 'I built a conversion-focused landing page with a clear audit CTA, aligned the messaging with their LinkedIn profile, and added a lead magnet.',
    result: '12 qualified discovery calls in the first 60 days.',
    metric: '+12 calls',
    image: '/images/profile.png',
  },
  {
    tag: 'Business Coach',
    title: 'Turning content views into consultation bookings',
    problem: 'Daily LinkedIn content was getting views, but the website was a generic "learn more" dead end.',
    solution: 'Redesigned the website around one clear offer, added social proof above the fold, and created a direct path from content to booking.',
    result: 'Consultation bookings increased by 42% within 90 days.',
    metric: '+42%',
    image: '/images/profile.png',
  },
  {
    tag: 'Agency Owner',
    title: 'From brochure to client acquisition machine',
    problem: 'The website looked professional but didn\'t generate inquiries. Visitors landed and left.',
    solution: 'Reorganized content to answer "who, what, why" in 3 seconds, added a free audit lead magnet, and clarified the CTA.',
    result: 'Average of 5-7 qualified leads per month from organic LinkedIn traffic.',
    metric: '5-7 leads/month',
    image: '/images/profile.png',
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
                  <div className="text-[#22c55e] text-xs uppercase tracking-wide mb-1">Result</div>
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
