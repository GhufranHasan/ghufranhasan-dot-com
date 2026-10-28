'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useModal } from '@/contexts/ModalContext'

const navItems = [
  { name: 'Problem', href: '/#problem', sectionId: 'problem' },
  { name: 'Sample Audit', href: '/#audit-examples', sectionId: 'audit-examples' },
  { name: 'Proof', href: '/#proof', sectionId: 'proof' },
  { name: 'Sprint', href: '/#services', sectionId: 'services' },
  { name: 'Process', href: '/#process', sectionId: 'process' },
  { name: 'Pricing', href: '/#packages', sectionId: 'packages' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const pathname = usePathname()
  const visibleActiveSection = pathname === '/' ? activeSection : null
  const { isModalOpen } = useModal()
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (pathname !== '/') {
      return
    }

    const sections = ['home', ...navItems.map((item) => item.sectionId)]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry) setActiveSection(visibleEntry.target.id)
      },
      { rootMargin: '-18% 0px -62% 0px', threshold: [0, 0.15, 0.4] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [pathname])

  if (isModalOpen) return null

  return (
    <nav
      className="site-navigation fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4"
    >
      <div className="container-custom">
        <div
          className={`nav-shell flex h-16 items-center justify-between rounded-xl border px-4 transition-all duration-300 md:px-5 ${
            scrolled || isOpen
              ? 'border-orange-500/25 bg-purple-950/90 shadow-[0_16px_50px_rgba(0,0,0,0.34)]'
              : 'border-white/10 bg-background/45'
          }`}
        >
          {/* Logo */}
          <Link href="/#home" className="inline-flex items-center gap-3 text-2xl font-bebas">
            <Image
              src="/images/brand-logo.png"
              alt="Ghufran Hasan logo"
              width={38}
              height={38}
              priority
              className="h-9 w-9 rounded-full border border-orange-500/40 object-cover"
            />
            <span>Ghufran<span className="text-orange-500">.</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-5 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                aria-current={visibleActiveSection === item.sectionId ? 'location' : undefined}
                className={`relative rounded-md px-1.5 py-1 text-sm transition-colors after:absolute after:-bottom-1 after:left-1/2 after:h-px after:-translate-x-1/2 after:bg-orange-500 after:transition-all ${
                  visibleActiveSection === item.sectionId
                    ? 'bg-orange-500/10 text-orange-200 after:w-[calc(100%-0.75rem)]'
                    : 'text-white/68 after:w-0 hover:text-white hover:after:w-[calc(100%-0.75rem)]'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button href="/free-audit" variant="primary" className="px-5 py-2.5 text-sm">Free Review</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-white transition-colors hover:bg-white/8 lg:hidden"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden lg:hidden"
            >
              <div className="mt-2 flex flex-col gap-2 rounded-xl border border-orange-500/20 bg-purple-950/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={visibleActiveSection === item.sectionId ? 'location' : undefined}
                    className={`rounded-lg px-3 py-2.5 transition-colors ${
                      visibleActiveSection === item.sectionId
                        ? 'bg-orange-500/12 text-orange-200'
                        : 'text-white/80 hover:bg-orange-500/10 hover:text-orange-300'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button href="/free-audit" variant="primary" className="w-full" onClick={() => setIsOpen(false)}>Request Free Review</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
