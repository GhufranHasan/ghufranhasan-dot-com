'use client'

import { motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function PainAgitation() {
  return (
    <section className="py-20 md:py-28 bg-purple-950/40">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-xl uppercase text-orange-500 font-bold tracking-wider mb-4">
            WAIT, IS THAT YOU?
          </h2>
          <p className="text-3xl md:text-4xl lg:text-5xl font-bebas mb-12">
            You&apos;re doing the work, but leads aren&apos;t following.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 md:p-8 border-l-4 border-orange-500 hover:border-orange-500/70 transition-all"
          >
            <div className="flex items-start gap-3 mb-4">
              <X size={24} className="text-orange-500 mt-0.5 shrink-0" />
              <span className="text-lg font-bold text-white">You&apos;re posting consistently on LinkedIn but your DMs are dry.</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 md:p-8 border-r-4 border-orange-500 hover:border-orange-500/70 transition-all"
          >
            <div className="flex items-start gap-3 mb-4">
              <X size={24} className="text-orange-500 mt-0.5 shrink-0" />
              <span className="text-lg font-bold text-white">Visitors hit your website and bounce without booking a call.</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 md:p-8 border-l-4 border-orange-500 hover:border-orange-500/70 transition-all"
          >
            <div className="flex items-start gap-3 mb-4">
              <X size={24} className="text-orange-500 mt-0.5 shrink-0" />
              <span className="text-lg font-bold text-white">Your LinkedIn and website feel disconnected — different tone, different messaging.</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 md:p-8 border-r-4 border-orange-500 hover:border-orange-500/70 transition-all"
          >
            <div className="flex items-start gap-3 mb-4">
              <X size={24} className="text-orange-500 mt-0.5 shrink-0" />
              <span className="text-lg font-bold text-white">You have no clear system to turn attention into pipeline.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
