'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Filter, XCircle } from 'lucide-react'
import SectionBadge from '@/components/ui/SectionBadge'

const goodFit = [
  'You get LinkedIn profile views but few inquiries',
  'Your website feels disconnected from your content',
  'You have an offer but no clear conversion path',
  'You want a focused page, not a complex website',
]

const notFit = [
  'You want only a pretty portfolio',
  'You have no offer yet',
  'You want guaranteed leads without distribution',
  'You are not ready to clarify your positioning',
]

export default function FitCheck() {
  return (
    <section id="fit-check" className="texture-band neon-deep section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <SectionBadge icon={Filter} className="mb-4">Fit check</SectionBadge>
          <h2 className="text-3xl md:text-5xl font-bebas mb-4">Know if this path is actually for you</h2>
          <p className="text-white/70 text-lg">
            The right project starts with the right fit. This is built for founders who already have attention or a plan to drive traffic.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 md:p-8 border-orange-500/25"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                <CheckCircle2 size={22} />
              </div>
              <h3 className="text-2xl font-bebas">This is for you if</h3>
            </div>
            <div className="space-y-3">
              {goodFit.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-orange-500/15 bg-orange-500/5 p-4 text-sm text-white/75">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-orange-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="glass-card p-6 md:p-8 border-white/10"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-white/55">
                <XCircle size={22} />
              </div>
              <h3 className="text-2xl font-bebas">This is not for you if</h3>
            </div>
            <div className="space-y-3">
              {notFit.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/65">
                  <XCircle size={16} className="mt-0.5 shrink-0 text-white/45" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
