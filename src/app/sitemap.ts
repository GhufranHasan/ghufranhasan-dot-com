import type { MetadataRoute } from 'next'
import { resourceUpdatedDate } from '@/data/resourceGuides'

const siteUrl = 'https://ghufranhasan.com'
const latestContentUpdate = '2026-10-27'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: latestContentUpdate,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/free-audit`,
      lastModified: latestContentUpdate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: latestContentUpdate,
      changeFrequency: 'monthly',
      priority: 0.88,
    },
    {
      url: `${siteUrl}/process`,
      lastModified: latestContentUpdate,
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    {
      url: `${siteUrl}/proof`,
      lastModified: latestContentUpdate,
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    {
      url: `${siteUrl}/pricing`,
      lastModified: latestContentUpdate,
      changeFrequency: 'monthly',
      priority: 0.84,
    },
    {
      url: `${siteUrl}/faq`,
      lastModified: latestContentUpdate,
      changeFrequency: 'monthly',
      priority: 0.76,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: latestContentUpdate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/linkedin-website-funnel`,
      lastModified: latestContentUpdate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/work`,
      lastModified: latestContentUpdate,
      changeFrequency: 'monthly',
      priority: 0.72,
    },
    {
      url: `${siteUrl}/case-studies`,
      lastModified: latestContentUpdate,
      changeFrequency: 'monthly',
      priority: 0.72,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: resourceUpdatedDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/website-conversion-strategy`,
      lastModified: resourceUpdatedDate,
      images: [`${siteUrl}/images/resources/website-decision-path-3d.webp`],
      changeFrequency: 'monthly',
      priority: 0.74,
    },
    {
      url: `${siteUrl}/linkedin-profile-optimization`,
      lastModified: resourceUpdatedDate,
      images: [`${siteUrl}/images/resources/linkedin-profile-blueprint-3d.webp`],
      changeFrequency: 'monthly',
      priority: 0.74,
    },
    {
      url: `${siteUrl}/cta-funnel-clarity`,
      lastModified: resourceUpdatedDate,
      images: [`${siteUrl}/images/resources/cta-enquiry-flow-3d.webp`],
      changeFrequency: 'monthly',
      priority: 0.74,
    },
    {
      url: `${siteUrl}/linkedin-website-examples`,
      lastModified: latestContentUpdate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/resources/linkedin-website-funnel-checklist`,
      lastModified: latestContentUpdate,
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    {
      url: `${siteUrl}/resources`,
      lastModified: resourceUpdatedDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
