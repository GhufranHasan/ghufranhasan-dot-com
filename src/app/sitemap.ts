import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://ghufranhasan.com',
      lastModified: '2026-06-06',
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://ghufranhasan.com/linkedin-website-examples',
      lastModified: '2026-06-06',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
