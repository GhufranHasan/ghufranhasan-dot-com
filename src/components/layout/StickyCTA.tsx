'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Linkedin, X } from 'lucide-react'

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!isMobile || !isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="bg-linear-to-r from-purple-900 to-purple-950 border border-orange-500/30 rounded-xl p-3 shadow-glow backdrop-blur-sm">
        <div className="flex items-center justify-between gap-2">
          <Link
            href="#contact"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm"
          >
            <Calendar size={16} />
            Free Audit
          </Link>
          <a
            href="https://linkedin.com/in/ghufranhasan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-orange-500/30 text-white font-semibold text-sm"
          >
            <Linkedin size={16} />
            DM AUDIT
          </a>
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Hide sticky call to action"
            className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-white/60 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
