'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, Compass, X } from 'lucide-react'
import SectionBadge from '@/components/ui/SectionBadge'

const comparisons = [
  {
    common: 'Treats the website like a portfolio gallery',
    better: 'Treats the website like the conversion layer after LinkedIn discovery',
  },
  {
    common: 'Lists services, tools, and generic claims',
    better: 'Names the buyer, the business problem, and the next action',
  },
  {
    common: 'Measures polish and animations',
    better: 'Measures clarity, trust, CTA strength, form starts, and qualified actions',
  },
  {
    common: 'Lets LinkedIn and website messaging drift apart',
    better: 'Keeps the same promise across profile, content, website, and CTA',
  },
]

export default function DifferentView() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      ref={ref}
      id="different-view"
      className="texture-grid neon-orange relative overflow-hidden py-20 md:py-28"
    >
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <SectionBadge icon={Compass} className="mb-4">A different view</SectionBadge>
          <h2 className="text-3xl md:text-5xl font-bebas mb-4">
            Most developers focus on design. I focus on the path to action.
          </h2>
          <p className="text-white/70 text-lg">
            Design still matters. But for a founder driving traffic from LinkedIn, clarity and conversion matter more.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {comparisons.map((item, index) => (
            <motion.div
              key={item.common}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.08 }}
              className="glass-card p-6 border border-orange-500/20"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <X size={18} className="text-red-400 mt-1 shrink-0" />
                  <p className="text-white/60">{item.common}</p>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-orange-500/5 border border-orange-500/20 p-4">
                  <Check size={18} className="text-orange-500 mt-1 shrink-0" />
                  <p className="text-white/85 font-medium">{item.better}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
