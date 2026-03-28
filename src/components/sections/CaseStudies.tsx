'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Quote, TrendingUp, ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'

const caseStudies = [
  {
    id: 1,
    client: 'B2B SaaS Agency',
    metric: '+147 qualified demos',
    result: 'LinkedIn engagement up 340%, cost per lead down 62% in 90 days',
    testimonial: {
      text: "Ghufran built a system that consistently delivers qualified leads. Within 90 days, we had more demos than our sales team could handle.",
      author: "Sarah Chen, Founder",
    },
    color: 'from-orange-500/20 to-transparent',
    gradient: 'from-orange-500 to-orange-600',
  },
  {
    id: 2,
    client: 'Marketing Agency Founder',
    metric: '23 discovery calls',
    result: 'Booked 23 qualified discovery calls in the first month',
    testimonial: {
      text: "From sending 5 cold DMs a day to receiving 50+ inbound leads weekly. This system changed everything.",
      author: "Marcus Rodriguez, Agency Owner",
    },
    color: 'from-purple-500/20 to-transparent',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    client: 'Tech Consulting Firm',
    metric: '$180K closed',
    result: '$180,000 in closed deals from LinkedIn leads in 6 months',
    testimonial: {
      text: "Scaled from 2 to 15 clients in 6 months. The LinkedIn → website machine is now our primary revenue channel.",
      author: "Jennifer Walsh, Managing Partner",
    },
    color: 'from-blue-500/20 to-transparent',
    gradient: 'from-blue-500 to-cyan-500',
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
                      Case Study {String(index + 1).padStart(3, '0')}
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-orange-500 mb-2">
                      {study.metric}
                    </div>
                    <div className="text-white/60 text-sm">{study.result}</div>
                  </div>

                  {/* Right Side - Testimonial */}
                  <div className="md:w-2/3 relative">
                    <Quote size={32} className="text-orange-500/30 absolute -top-2 -left-2" />
                    <p className="text-white/80 italic mb-4 pl-6 leading-relaxed">
                      "{study.testimonial.text}"
                    </p>
                    <div className="flex items-center justify-between pl-6">
                      <div className="font-semibold text-white">{study.testimonial.author}</div>
                      <Link
                        href="#contact"
                        className="text-orange-500 hover:text-orange-400 text-sm font-semibold flex items-center gap-1"
                      >
                        See full story <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Element */}
              <div className={`absolute bottom-0 right-0 w-32 h-32 bg-linear-to-br ${study.gradient} opacity-10 rounded-full blur-2xl`} />
            </motion.div>
          ))}
        </div>

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