'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, LayoutTemplate, Map, MessageSquareText, MousePointerClick, PenLine, Route, SearchCheck } from 'lucide-react'
import Link from 'next/link'
import SectionBadge from '@/components/ui/SectionBadge'

const services = [
  {
    icon: SearchCheck,
    title: 'Positioning diagnosis',
    description: 'Find whether the gap is traffic, offer clarity, sales follow-up, or the LinkedIn-to-website handoff.',
  },
  {
    icon: MessageSquareText,
    title: 'Conversion copy',
    description: 'Continue the buyer context from LinkedIn into the hero, offer, proof, objections, and CTA.',
  },
  {
    icon: Route,
    title: 'Buyer path structure',
    description: 'Put information in the order a skeptical buyer needs before applying, booking, or requesting the next step.',
  },
  {
    icon: LayoutTemplate,
    title: 'Website implementation',
    description: 'Turn the strategy into a fast, mobile-friendly page instead of leaving you with another document waiting to be used.',
  },
  {
    icon: MousePointerClick,
    title: 'CTA and form path',
    description: 'Make the next step clear, qualified, and measurable with an application-first journey.',
  },
  {
    icon: PenLine,
    title: 'Tracking',
    description: 'Observe sample-audit views, CTA clicks, form starts, submissions, and the actions that matter.',
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
          <SectionBadge icon={Map} className="mb-4">Specialist sprint</SectionBadge>
          <h2 className="text-3xl md:text-5xl font-bebas mb-4">What this engagement combines</h2>
          <p className="text-white/70 text-lg">
            This is not a full-service agency menu. It is one focused sprint for one primary offer, one conversion page, and one measurable next step.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
