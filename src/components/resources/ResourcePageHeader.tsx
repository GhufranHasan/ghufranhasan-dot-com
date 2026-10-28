import Image from 'next/image'
import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SectionBadge from '@/components/ui/SectionBadge'

type Props = {
  title: string
  description: string
  badge: string
  icon: LucideIcon
  breadcrumbs: { label: string; href: string }[]
  image: string
  imageAlt: string
  caption?: string
  children?: ReactNode
}

export default function ResourcePageHeader({ title, description, badge, icon, breadcrumbs, image, imageAlt, caption = 'Conceptual 3D illustration', children }: Props) {
  return (
    <header className="resource-page-header texture-grid neon-deep relative overflow-hidden border-b border-orange-500/20 py-8 md:py-12">
      <div className="container-custom">
        <Breadcrumbs items={breadcrumbs} />
        <div className="relative isolate lg:min-h-112 lg:py-5">
          <div className="relative z-10 lg:max-w-[52%]">
            <SectionBadge icon={icon} className="mb-4 md:mb-6">{badge}</SectionBadge>
            <h1 className="text-3xl font-medium leading-[1.15] text-white md:text-5xl">{title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 md:text-lg md:leading-8">{description}</p>
          </div>
          <figure className="mx-auto mt-4 w-full max-w-88 lg:absolute lg:inset-y-0 lg:right-0 lg:m-0 lg:flex lg:w-[46%] lg:max-w-none lg:flex-col lg:justify-center">
            <Image
              src={image}
              alt={imageAlt}
              width={1200}
              height={960}
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1280px) 560px, (min-width: 1024px) 46vw, (min-width: 384px) 352px, calc(100vw - 32px)"
              className="h-auto w-full object-contain lg:min-h-0 lg:flex-1"
              data-resource-header-art
            />
            <figcaption className="mt-1 text-center text-xs leading-6 text-white/60">{caption}</figcaption>
          </figure>
          {children && <div className="relative z-10 mt-5 lg:max-w-[52%]">{children}</div>}
        </div>
      </div>
    </header>
  )
}
