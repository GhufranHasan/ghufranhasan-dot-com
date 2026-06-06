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

        <div className="md:overflow-hidden md:rounded-2xl md:border md:border-orange-500/20">
          <table className="block w-full table-fixed border-separate border-spacing-0 md:table">
            <colgroup>
              <col className="md:w-[22%]" />
              <col className="md:w-[39%]" />
              <col className="md:w-[39%]" />
            </colgroup>
            <thead className="sr-only md:not-sr-only md:table-header-group">
              <tr className="bg-linear-to-r from-orange-500/20 to-purple-800/20">
                <th scope="col" className="p-5 text-left font-bold text-white">Comparison point</th>
                <th scope="col" className="p-5 text-left font-bold text-white">Typical agencies</th>
                <th scope="col" className="p-5 text-left font-bold text-orange-400">Ghufran Hasan</th>
              </tr>
            </thead>
            <tbody className="grid gap-5 md:table-row-group">
              {comparisons.map((item, index) => (
                <motion.tr
                  key={item.feature}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="glass-card block overflow-hidden border-orange-500/20 md:table-row md:overflow-visible md:rounded-none md:border-0 md:bg-transparent md:shadow-none md:backdrop-blur-none"
                >
                  <th
                    scope="row"
                    className="block border-b border-orange-500/15 bg-orange-500/10 px-5 py-4 text-left md:table-cell md:border-t md:border-b-0 md:border-orange-500/10 md:bg-transparent md:p-5 md:align-top"
                  >
                    <span className="block text-xs font-semibold uppercase tracking-wider text-orange-300/80 md:hidden">
                      Comparison point {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="mt-1 block text-lg font-bold text-white md:mt-0 md:text-base">{item.feature}</span>
                  </th>
                  <td
                    data-label="Typical agencies"
                    className="block p-5 pt-4 before:mb-2 before:flex before:items-center before:gap-2 before:text-sm before:font-semibold before:text-white/70 before:content-[attr(data-label)] md:table-cell md:border-t md:border-orange-500/10 md:p-5 md:align-top md:before:hidden"
                  >
                    <div className="flex gap-3 text-sm leading-relaxed text-white/62">
                      <XCircle size={16} className="mt-0.5 shrink-0 text-white/45" />
                      <span>{item.typical}</span>
                    </div>
                  </td>
                  <td
                    data-label="Ghufran Hasan"
                    className="block border-t border-orange-500/15 bg-orange-500/10 p-5 before:mb-2 before:flex before:items-center before:gap-2 before:text-sm before:font-semibold before:text-orange-300 before:content-[attr(data-label)] md:table-cell md:border-t md:border-l-2 md:border-orange-500 md:bg-orange-500/5 md:p-5 md:align-top md:before:hidden"
                  >
                    <div className="flex gap-3 text-sm leading-relaxed text-white/82 md:text-orange-100/85">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-orange-400" />
                      <span>{item.me}</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
