'use client'

import { useEffect, useId, useState } from 'react'
import {
  BookOpenText,
  Facebook,
  Grid3X3,
  Instagram,
  Music2,
  Newspaper,
  PenLine,
  Radio,
  X,
} from 'lucide-react'
import { useModal } from '@/contexts/ModalContext'

const extraLinks = [
  {
    label: 'Instagram',
    description: 'Behind-the-scenes and personal updates',
    href: 'https://instagram.com/ghufranhasan_com',
    icon: Instagram,
  },
  {
    label: 'Facebook',
    description: 'Community updates and personal brand posts',
    href: 'https://facebook.com/GhufranHasanDotCom',
    icon: Facebook,
  },
  {
    label: 'X (Twitter)',
    description: 'Quick thoughts on LinkedIn, funnels, and building online',
    href: 'https://x.com/Ghufran_Hasan',
    icon: X,
  },
  {
    label: 'Substack',
    description: 'Newsletter-style ideas and longer notes',
    href: 'https://ghufranhasan.substack.com',
    icon: Newspaper,
  },
  {
    label: 'TikTok',
    description: 'Short-form lessons and creator experiments',
    href: 'https://tiktok.com/@ghufranhasan_com',
    icon: Music2,
  },
  {
    label: 'Medium',
    description: 'Articles, frameworks, and deeper breakdowns',
    href: 'https://medium.com/@ghufranhasan',
    icon: BookOpenText,
  },
  {
    label: 'Threads',
    description: 'Casual thoughts and personal brand updates',
    href: 'https://threads.net/@ghufranhasan_com',
    icon: Radio,
  },
  {
    label: 'Future links',
    description: 'YouTube, podcast, and new platforms can live here later',
    href: '/#contact',
    icon: PenLine,
  },
]

type SocialLinksModalProps = {
  className?: string
  label?: string
  iconOnly?: boolean
}

export default function SocialLinksModal({ className, label = 'Connect', iconOnly = false }: SocialLinksModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const titleId = useId()
  const { openModal, closeModal } = useModal()

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        closeModal()
      }
    }

    openModal()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
      closeModal()
    }
  }, [isOpen, openModal, closeModal])

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={className ?? 'inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-white hover:border-orange-500 hover:bg-orange-500/20 transition-all'}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={iconOnly ? label : undefined}
        title={iconOnly ? label : undefined}
      >
        <Grid3X3 size={17} />
        {!iconOnly && label}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <button
            type="button"
            aria-label="Close social links"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => {
              setIsOpen(false)
              closeModal()
            }}
          />

          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-orange-500/30 bg-purple-950 p-5 shadow-glow">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="text-orange-500 text-xs uppercase tracking-wider font-bold mb-2">All links</p>
                <h2 id={titleId} className="text-3xl font-bebas">Connect with Ghufran</h2>
                <p className="text-white/60 text-sm mt-1">Choose where you want to follow, read, or reach out.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  closeModal()
                }}
                className="w-10 h-10 rounded-full border border-orange-500/20 text-white/70 hover:text-white hover:bg-orange-500/10 flex items-center justify-center"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              {extraLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('/') ? undefined : '_blank'}
                  rel={link.href.startsWith('/') ? undefined : 'noopener noreferrer'}
                  onClick={() => {
                    if (link.href.startsWith('/')) {
                      setIsOpen(false)
                      closeModal()
                    }
                  }}
                  className="flex items-center gap-4 rounded-xl border border-orange-500/20 bg-orange-500/5 p-4 text-left hover:border-orange-500 hover:bg-orange-500/10 transition-all"
                >
                  <span className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                    <link.icon size={21} className="text-orange-500" />
                  </span>
                  <span>
                    <span className="block font-bold text-white">{link.label}</span>
                    <span className="block text-sm text-white/60">{link.description}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
