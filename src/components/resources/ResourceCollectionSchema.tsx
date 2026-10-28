import type { ResourceCard } from '@/data/resourceGuides'
import { siteUrl } from '@/lib/seo/metadata'

export default function ResourceCollectionSchema({ name, path, items }: { name: string; path: string; items: ResourceCard[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${siteUrl}${path}#collection`,
    name,
    url: `${siteUrl}${path}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.title,
        url: `${siteUrl}${item.href}`,
      })),
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
}
