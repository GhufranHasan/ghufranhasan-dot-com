'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ClipboardCheck, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function StickyCTA() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [hasLeftHero, setHasLeftHero] = useState(false)
  const [isContactVisible, setIsContactVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => {
      setIsMobile(window.innerWidth < 768)
      setHasLeftHero(window.scrollY > window.innerHeight * 0.75)
    }
    updateVisibility()
    window.addEventListener('resize', updateVisibility)
    window.addEventListener('scroll', updateVisibility, { passive: true })
    return () => {
      window.removeEventListener('resize', updateVisibility)
      window.removeEventListener('scroll', updateVisibility)
    }
  }, [])

  useEffect(() => {
    const contactSection = document.getElementById('contact')

    if (!contactSection) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsContactVisible(entry.isIntersecting),
      { threshold: 0.12 }
    )

    observer.observe(contactSection)
    return () => observer.disconnect()
  }, [pathname])

  if (
    !isMobile ||
    !isVisible ||
    !hasLeftHero ||
    (pathname === '/' && isContactVisible) ||
    pathname === '/free-audit' ||
    pathname === '/thank-you'
  ) {
    return null
  }

  return (
    <div className="site-sticky-cta fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="bg-linear-to-r from-purple-900 to-purple-950 border border-orange-500/30 rounded-xl p-3 shadow-glow backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Button href="/free-audit#request-audit" variant="primary" className="flex-1 whitespace-nowrap">
            <ClipboardCheck size={16} />
            Apply for Review
          </Button>
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
