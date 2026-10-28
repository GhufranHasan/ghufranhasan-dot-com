import type { Metadata } from 'next'

export const siteUrl = 'https://ghufranhasan.com'
export const personId = `${siteUrl}/#person`

type PageMetadata = {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  robots?: Metadata['robots']
  image?: { url: string; width: number; height: number; alt: string }
}

export function createPageMetadata({ title, description, path, type = 'website', robots, image: pageImage }: PageMetadata): Metadata {
  const socialTitle = title.includes('Ghufran Hasan') ? title : `${title} | Ghufran Hasan`
  const image = pageImage ? { ...pageImage, url: new URL(pageImage.url, siteUrl).href } : {
    url: `${siteUrl}/social-preview`,
    width: 1200,
    height: 630,
    alt: 'Ghufran Hasan - LinkedIn-to-Website Conversion',
  }

  return {
    title: { absolute: socialTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: new URL(path, siteUrl).href,
      siteName: 'Ghufran Hasan',
      locale: 'en_US',
      type,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [image],
    },
    ...(robots ? { robots } : {}),
  }
}
