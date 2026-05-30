'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Quote, TrendingUp, ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'

const caseStudies = [
  {
    id: 1,
    pattern: 'Pattern A',
    title: 'Active on LinkedIn, website is generic',
    description: "Client had strong LinkedIn presence but generic website that didn't convert attention into action.",
    fix: 'LinkedIn profile optimization + custom conversion website with clear CTA flow.',
    outcome: '+40% demo requests within 30 days',
    color: 'from-orange-500/20 to-transparent',
    gradient: 'from-orange-500 to-orange-600',
  },
  {
    id: 2,
    pattern: 'Pattern B',
    title: 'Strong LinkedIn presence, no clear demo path',
    description: 'High engagement on LinkedIn but no clear path from profile to booked call.',
    fix: 'Authority positioning + LinkedIn → website funnel architecture.',
    outcome: '15 qualified leads in first month',
    color: 'from-purple-500/20 to-transparent',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    pattern: 'Pattern C',
    title: "Website is fine, LinkedIn doesn't point to it",
    description: "Good website but LinkedIn profile didn't drive traffic or set expectations.",
    fix: "LinkedIn profile rebrand + traffic-driving CTA structure.",
    outcome: "200+ clicks to site per week",
    color: "from-blue-500/20 to-transparent",
    gradient: "from-blue-500 to-cyan-500",
  },
]

export default function CaseStudies() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section ref={ref} id="case-studies" className="relative overflow-hidden py-20 md:py-28">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-orange-500/10 text-orange-500 text-sm font-semibold mb-4">
            Real Results
          </span>
          <h2 className="text-3xl md:text-5xl font-bebas mb-4">Proof, Not Promises</h2>
          <p className="text-white/70 text-lg">
            Anyone can say they get results. I let my clients' numbers do the talking.
          </p>
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className={`relative overflow-hidden rounded-2xl bg-linear-to-r ${study.color} border border-orange-500/20`}
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Left Side - Metric */}
                  <div className="md:w-1/3 text-center md:text-left">
                    <div className={`inline-block px-3 py-1 rounded-full bg-linear-to-r ${study.gradient} text-white text-xs font-bold mb-4`}>
                      {study.pattern}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{study.title}</h3>
                    <p className="text-white/70 mb-4">{study.description}</p>
                    <div className="text-orange-500 font-bold text-lg">{study.outcome}</div>
                  </div>

                  {/* Right Side - Fix */}
                  <div className="md:w-2/3">
                    <h4 className="font-bold text-orange-500 mb-3 uppercase tracking-wider text-sm">The Fix</h4>
                    <p className="text-white/80 mb-6">{study.fix}</p>
                    <Link
                      href="#contact"
                      className="text-orange-500 hover:text-orange-400 font-semibold flex items-center gap-1"
                    >
                      Book your audit <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Decorative Element */}
              <div className={`absolute bottom-0 right-0 w-32 h-32 bg-linear-to-br ${study.gradient} opacity-10 rounded-full blur-2xl`} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 italic text-white/60 text-sm"
        >
          Real client work. Names anonymized by request.
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-glow-hover transition-all"
          >
            Ready to write your success story? <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}