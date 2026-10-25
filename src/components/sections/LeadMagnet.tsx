'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, FileText } from 'lucide-react'

export default function LeadMagnet() {
  return (
    <motion.div
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="glass-card rounded-xl border border-orange-500/20 p-5 text-left transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-glow motion-reduce:hover:translate-y-0"
    >
      <div className="flex items-center gap-2 mb-2">
        <FileText size={18} className="text-orange-500" />
        <h3 className="font-bold text-white text-sm">Free Funnel Review</h3>
      </div>
      <p className="mb-4 text-xs text-white/68">
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
