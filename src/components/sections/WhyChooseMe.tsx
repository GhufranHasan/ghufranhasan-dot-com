'use client'

import { motion } from 'framer-motion'

const comparisons = [
  { feature: 'Strategy Focus', typical: 'Write posts to generic templates, track followers & engagement', me: 'Positioning strategist who extracts YOUR expertise and frameworks' },
  { feature: 'What We Track', typical: 'Impressions, likes, follower count', me: 'Qualified leads, calls booked, close rate, LinkedIn-sourced revenue' },
  { feature: 'Time Required', typical: '5–6 hours per week of YOUR time', me: 'System runs on under 90 minutes per week' },
  { feature: 'Outbound Strategy', typical: 'Content only, no outbound integration', me: 'Inbound authority content + warm outbound triggered by profile visits/DM intros' },
  { feature: 'Reporting & Transparency', typical: 'Impressions, likes, monthly vanity reports', me: 'Weekly updates + pipeline metrics (leads, calls booked, revenue influenced)' },
]

export default function WhyChooseMe() {
  return (
    <section id="why-choose" className="section-padding bg-purple-950/40">
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

        <div className="overflow-x-auto">
          <div className="min-w-3xl border border-orange-500/20 rounded-2xl overflow-hidden">
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
                <div className="p-5 text-orange-500/90 border-l-2 border-orange-500 bg-orange-500/5">{item.me}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}