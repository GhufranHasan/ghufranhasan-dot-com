import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

type BreadcrumbItem = {
  label: string
  href: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
}

const siteUrl = 'https://ghufranhasan.com'

function toAbsoluteUrl(href: string) {
  const path = href.split('#')[0] || '/'
  return new URL(path, siteUrl).toString()
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: toAbsoluteUrl(item.href),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c'),
        }}
      />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-white/55">
          {items.map((item, index) => {
            const isCurrent = index === items.length - 1

            return (
              <li key={item.href} className="flex min-w-0 items-center gap-2">
                {index > 0 && <ChevronRight size={14} aria-hidden="true" className="shrink-0 text-orange-400/70" />}
                {isCurrent ? (
                  <span aria-current="page" className="truncate font-semibold text-white/80">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-orange-300"
                  >
                    {index === 0 && <Home size={14} aria-hidden="true" />}
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
