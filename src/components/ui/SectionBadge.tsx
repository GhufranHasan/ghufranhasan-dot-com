import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SectionBadgeProps = {
  children: ReactNode
  icon: LucideIcon
  emphasis?: 'standard' | 'strong'
  className?: string
}

export default function SectionBadge({
  children,
  icon: Icon,
  emphasis = 'standard',
  className,
}: SectionBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold text-orange-400',
        emphasis === 'strong'
          ? 'border-orange-500/40 bg-orange-500/15 uppercase tracking-wider shadow-[0_0_28px_rgba(255,132,3,0.12)]'
          : 'border-orange-500/25 bg-orange-500/10',
        className
      )}
    >
      <Icon size={16} className="shrink-0" />
      <span>{children}</span>
    </span>
  )
}
