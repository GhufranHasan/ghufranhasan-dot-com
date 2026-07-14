'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Map, MessageSquareText, MousePointerClick } from 'lucide-react'
import Link from 'next/link'
import SectionBadge from '@/components/ui/SectionBadge'

const services = [
  {
    icon: MessageSquareText,
    title: 'LinkedIn profile alignment',
    description: 'Your headline, About section, Featured section, and profile promise point toward one clear website action.',
  },
  {
    icon: MousePointerClick,
    title: 'Website conversion path',
    description: 'Your page stops acting like a brochure and starts guiding warm LinkedIn visitors through clarity, trust, and action.',
  },
  {
    icon: Map,
    title: 'CTA and intake system',
    description: 'Your audit request, booking flow, and follow-up path become one focused journey instead of competing next steps.',
  },
]

export default function Services() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} id="services" className="texture-grid neon-deep relative overflow-hidden py-20 md:py-28">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <SectionBadge icon={Map} className="mb-4">Specialist system</SectionBadge>
          <h2 className="text-3xl md:text-5xl font-bebas mb-4">One specialist offer under the personal brand</h2>
          <p className="text-white/70 text-lg">
            This is not a full-service agency menu. It is a focused LinkedIn-to-Website Funnel Optimization system.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.12 }}
              className="glass-card p-6 md:p-8 h-full border border-orange-500/20 hover:border-orange-500/50 transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6">
                <service.icon size={28} className="text-orange-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-white/70 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.45 }}
          className="text-center mt-12 md:mt-16"
        >
          <Link
            href="/linkedin-website-funnel"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-glow-hover transition-all"
          >
            Explore the specialist offer <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
