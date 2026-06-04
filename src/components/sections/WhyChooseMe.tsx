'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, XCircle } from 'lucide-react'

const comparisons = [
  {
    feature: 'Strategy Focus',
    typical: 'Write posts to generic templates, track followers & engagement',
    me: 'Positioning strategist who extracts YOUR expertise and frameworks',
  },
  {
    feature: 'What We Track',
    typical: 'Impressions, likes, follower count',
    me: 'Qualified leads, calls booked, close rate, LinkedIn-sourced revenue',
  },
  {
    feature: 'Time Required',
    typical: '5-6 hours per week of YOUR time',
    me: 'Designed to reduce founder involvement to under 90 minutes per week once the system is structured',
  },
  {
    feature: 'Outbound Strategy',
    typical: 'Content only, no outbound integration',
    me: 'Inbound authority content + warm outbound triggered by profile visits/DM intros',
  },
  {
    feature: 'Reporting & Transparency',
    typical: 'Impressions, likes, monthly vanity reports',
    me: 'Weekly updates + pipeline metrics (leads, calls booked, revenue influenced)',
  },
]

export default function WhyChooseMe() {
  return (
    <section id="why-choose" className="texture-band neon-purple section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bebas mb-4">Why Choose Ghufran Hasan?</h2>
          <p className="text-white/80 max-w-2xl mx-auto">Most LinkedIn services focus on vanity metrics. I focus on pipeline.</p>
        </motion.div>

        <div className="grid gap-5 md:hidden">
          {comparisons.map((item, index) => (
            <motion.article
              key={item.feature}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="glass-card overflow-hidden border-orange-500/20"
            >
              <div className="border-b border-orange-500/15 bg-orange-500/10 px-5 py-4">
                <p className="text-xs uppercase tracking-wider text-orange-300/80">Comparison point</p>
                <h3 className="mt-1 text-lg font-bold text-white">{item.feature}</h3>
              </div>

              <div className="grid gap-3 p-5">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white/70">
                    <XCircle size={16} className="text-white/45" />
                    Typical agencies
                  </div>
                  <p className="text-sm text-white/62">{item.typical}</p>
                </div>

                <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-orange-300">
                    <CheckCircle2 size={16} />
                    Ghufran Hasan
                  </div>
                  <p className="text-sm text-white/82">{item.me}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="hidden md:block">
          <div className="overflow-hidden rounded-2xl border border-orange-500/20">
            <div className="grid grid-cols-3 bg-linear-to-r from-orange-500/20 to-purple-800/20">
              <div className="p-5 font-bold">Feature</div>
              <div className="p-5 font-bold">Typical Agencies/Ghostwriters</div>
              <div className="p-5 font-bold text-orange-500">Ghufran Hasan</div>
            </div>
            {comparisons.map((item, index) => (
              <motion.div
                key={item.feature}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-3 border-t border-orange-500/10"
              >
                <div className="p-5 font-medium">{item.feature}</div>
                <div className="p-5 text-white/70">{item.typical}</div>
                <div className="border-l-2 border-orange-500 bg-orange-500/5 p-5 text-orange-500/90">{item.me}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
