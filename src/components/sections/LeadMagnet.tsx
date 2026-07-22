'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, FileText } from 'lucide-react'

export default function LeadMagnet() {
  return (
    <motion.div
      whileHover={{ y: -4, borderColor: 'rgba(255, 132, 3, 0.42)' }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="glass-card p-5 border border-orange-500/20 hover:border-orange-500/40 transition-all text-left"
    >
      <div className="flex items-center gap-2 mb-2">
        <FileText size={18} className="text-orange-500" />
        <h3 className="font-bold text-white text-sm">Free Funnel Review</h3>
      </div>
      <p className="text-white/60 text-xs mb-4">
        Apply with your profile, website, and business context so I can spot one observable conversion risk.
      </p>
      <Link
        href="/free-audit#request-audit"
        className="inline-flex items-center gap-2 text-orange-500 text-xs font-semibold hover:text-orange-400"
      >
        Request free review <ArrowRight size={14} />
      </Link>
    </motion.div>
  )
}
