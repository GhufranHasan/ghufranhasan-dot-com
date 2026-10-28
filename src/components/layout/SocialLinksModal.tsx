'use client'

import { useEffect, useId, useRef, useState } from 'react'
import {
  BookOpenText,
  Grid3X3,
  Mail,
  Music2,
  Newspaper,
  Radio,
  X as XIcon,
} from 'lucide-react'
import { useModal } from '@/contexts/ModalContext'

const extraLinks = [
  {
    label: 'Email',
    description: 'Direct questions, collaborations, and project conversations',
    href: 'mailto:ghufran@ghufranhasan.com',
    icon: Mail,
  },
  {
    label: 'X (Twitter)',
    description: 'Quick thoughts on LinkedIn, funnels, and building online',
    href: 'https://x.com/Ghufran_Hasan',
    icon: XIcon,
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
]

type SocialLinksModalProps = {
  className?: string
  label?: string
  iconOnly?: boolean
}

export default function SocialLinksModal({ className, label = 'Connect', iconOnly = false }: SocialLinksModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const titleId = useId()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { openModal, closeModal } = useModal()

  useEffect(() => {
    if (!isOpen) return

    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const keepFocusInDialog = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !dialog) return
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]'))
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    dialog?.showModal()
    dialog?.addEventListener('keydown', keepFocusInDialog)
    openModal()
    document.body.style.overflow = 'hidden'

    return () => {
      dialog?.removeEventListener('keydown', keepFocusInDialog)
      dialog?.close()
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
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
        <dialog
          ref={dialogRef}
          className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border border-orange-500/30 bg-purple-950 p-0 text-white shadow-glow backdrop:bg-black/70 backdrop:backdrop-blur-sm"
          aria-labelledby={titleId}
          onCancel={() => {
            setIsOpen(false)
            closeModal()
          }}
          onClick={(event) => {
            if (event.target !== event.currentTarget) return
            const rect = event.currentTarget.getBoundingClientRect()
            if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
              setIsOpen(false)
              closeModal()
            }
          }}
        >
          <div className="relative p-5">
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
                <XIcon size={18} />
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
        </dialog>
      )}
    </>
  )
}
