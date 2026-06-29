'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Compass, Gauge, Target, Workflow } from 'lucide-react'

const trustItems = [
  {
    title: 'Specialist focus',
    text: 'Built for B2B founders, coaches, and creators who need a clearer path from attention to conversation.',
    icon: Target,
  },
  {
    title: 'Conversion first',
    text: 'Every section earns trust and moves the visitor toward one next step.',
    icon: Compass,
  },
  {
    title: 'LinkedIn to website',
    text: 'Profile, website, and CTA language stay aligned instead of feeling separate.',
    icon: Workflow,
  },
  {
    title: 'Next.js delivery',
    text: 'Fast, responsive builds that are easy to iterate after launch.',
    icon: Code2,
  },
  {
    title: '10-day structure',
    text: 'A focused sprint from audit to launch-ready funnel structure.',
    icon: Gauge,
  },
]

export default function AuthorityBar() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="texture-band neon-deep relative overflow-hidden border-y border-orange-500/20 py-12 md:py-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-center mb-8"
        >
          <p className="text-orange-500 text-sm uppercase tracking-wider font-semibold">
          Personal brand trust, specialist system
          </p>
          <div className="w-12 h-0.5 bg-orange-500 mx-auto mt-2" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {trustItems.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 rounded-xl glass-card border border-orange-500/20 hover:border-orange-500/40 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <item.icon size={20} className="text-orange-500" />
                </div>
                <h3 className="font-bold text-white text-sm">{item.title}</h3>
              </div>
              <p className="text-white/65 text-sm leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
