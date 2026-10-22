'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useModal } from '@/contexts/ModalContext'

const navItems = [
  { name: 'Problem', href: '/#problem' },
  { name: 'Sample Audit', href: '/#audit-examples' },
  { name: 'Sprint', href: '/#services' },
  { name: 'Proof', href: '/#proof' },
  { name: 'Process', href: '/#process' },
  { name: 'Pricing', href: '/#packages' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isModalOpen } = useModal()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (isModalOpen) return null

  return (
    <nav
      className="site-navigation fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4"
    >
      <div className="container-custom">
        <div
          className={`nav-shell flex h-16 items-center justify-between rounded-2xl border px-4 transition-all duration-300 md:px-5 ${
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
                className="relative text-sm text-white/68 transition-colors after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-orange-500 after:transition-all hover:text-white hover:after:w-full"
              >
                {item.name}
              </Link>
            ))}
            <Button href="/free-audit" variant="primary" className="rounded-xl px-5 py-2.5 text-sm">Free Review</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-white transition-colors hover:bg-white/8 lg:hidden"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden lg:hidden"
            >
              <div className="mt-2 flex flex-col gap-2 rounded-2xl border border-orange-500/20 bg-purple-950/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-white/80 transition-colors hover:bg-orange-500/10 hover:text-orange-300"
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
