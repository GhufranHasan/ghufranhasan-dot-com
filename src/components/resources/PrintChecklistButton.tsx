'use client'

import { Printer } from 'lucide-react'
import { trackSiteEvent } from '@/lib/siteEventClient'

type PrintChecklistButtonProps = {
  className?: string
}

export default function PrintChecklistButton({
  className,
}: PrintChecklistButtonProps) {
  return (
    <button
      type="button"
      onClick={() => {
        trackSiteEvent({
          eventType: 'download',
          eventName: 'Print / Save LinkedIn-to-Website Funnel Checklist',
          resourceSlug: 'linkedin-website-funnel-checklist',
          metadata: {
            format: 'pdf_print',
          },
        })
        window.print()
      }}
      className={
        className ??
        'inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-6 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-glow-hover'
      }
    >
      <Printer size={17} />
      Print / Save as PDF
    </button>
  )
}
