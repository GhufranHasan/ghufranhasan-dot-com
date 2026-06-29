'use client'

import Link from 'next/link'
import { ArrowRight, FileText } from 'lucide-react'

export default function LeadMagnet() {
  return (
    <div className="glass-card p-5 border border-orange-500/20 hover:border-orange-500/40 transition-all text-left">
      <div className="flex items-center gap-2 mb-2">
        <FileText size={18} className="text-orange-500" />
        <h3 className="font-bold text-white text-sm">Free LinkedIn to Website Audit</h3>
      </div>
      <p className="text-white/60 text-xs mb-4">
        Send your profile and website. I will show you the biggest leaks and the first fixes I would make.
      </p>
      <Link
        href="/free-audit#request-audit"
        className="inline-flex items-center gap-2 text-orange-500 text-xs font-semibold hover:text-orange-400"
      >
        Request the audit <ArrowRight size={14} />
      </Link>
    </div>
  )
}
