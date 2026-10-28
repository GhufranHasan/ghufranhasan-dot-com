import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { ResourceCard } from '@/data/resourceGuides'

export default function ResourceCards({ items, eagerImages = 0 }: { items: ResourceCard[]; eagerImages?: number }) {
  return (
    <div className={`grid gap-6 ${items.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-3'}`}>
      {items.map((item, index) => (
        <article key={item.href} className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-white/12 bg-purple-950/60 transition-colors hover:border-orange-500/50 focus-within:border-orange-400">
          <Link href={item.href} className="flex h-full flex-col focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-orange-400">
            <div className="aspect-5/3 overflow-hidden border-b border-white/10 bg-[#0a1026]">
              <Image
                src={item.image}
                alt={item.imageAlt}
                width={1200}
                height={720}
                loading={index < eagerImages ? 'eager' : 'lazy'}
                sizes={items.length === 2
                  ? '(min-width: 1280px) 596px, (min-width: 768px) calc(50vw - 44px), calc(100vw - 32px)'
                  : '(min-width: 1280px) 390px, (min-width: 768px) calc(50vw - 44px), calc(100vw - 32px)'}
                className="h-full w-full object-contain transition-transform duration-300 motion-safe:group-hover:scale-[1.025] motion-reduce:transition-none"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs font-semibold text-orange-300">{item.category}</p>
              <h3 className="mt-3 text-2xl font-medium leading-snug text-white">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-white/70">{item.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-300">
                Explore resource <ArrowUpRight size={17} aria-hidden="true" />
              </span>
            </div>
          </Link>
        </article>
      ))}
    </div>
  )
}
