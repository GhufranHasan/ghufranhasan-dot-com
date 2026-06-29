import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://ghufranhasan.com',
      lastModified: '2026-06-25',
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://ghufranhasan.com/free-audit',
      lastModified: '2026-06-28',
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://ghufranhasan.com/linkedin-website-funnel',
      lastModified: '2026-06-28',
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: 'https://ghufranhasan.com/linkedin-website-examples',
      lastModified: '2026-06-06',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://ghufranhasan.com/free-website-audit-checklist',
      lastModified: '2026-06-06',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://ghufranhasan.com/resources',
      lastModified: '2026-06-06',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
