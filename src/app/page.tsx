import Hero from '@/components/sections/Hero'
import CredibilityRibbon from '@/components/sections/CredibilityRibbon'
import PainAgitation from '@/components/sections/PainAgitation'
import Services from '@/components/sections/Services'
import AfterClickPath from '@/components/sections/AfterClickPath'
import FitCheck from '@/components/sections/FitCheck'
import AuditExamples from '@/components/sections/AuditExamples'
import CaseStudies from '@/components/sections/CaseStudies'
import Packages from '@/components/sections/Packages'
import Process from '@/components/sections/Process'
import DeliverablesPreview from '@/components/sections/DeliverablesPreview'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'
import { getFaqPlainAnswer, homepageFaqs } from '@/data/faqs'
import { createPageMetadata, personId, siteUrl } from '@/lib/seo/metadata'

export const metadata = createPageMetadata({
  title: 'LinkedIn-to-Website Conversion for Service Businesses',
  description: 'Ghufran Hasan helps LinkedIn-active service businesses diagnose and improve the handoff between LinkedIn positioning, website messaging, proof, and CTA.',
  path: '/',
})

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId,
    name: 'Ghufran Hasan',
    jobTitle: 'LinkedIn-to-Website Funnel Strategist',
    url: 'https://ghufranhasan.com',
    image: 'https://ghufranhasan.com/images/ghufran-portrait.png',
    sameAs: [
      'https://linkedin.com/in/ghufranhasan',
      'https://instagram.com/ghufranhasan_com',
      'https://facebook.com/GhufranHasanDotCom',
      'https://x.com/Ghufran_Hasan',
    ],
    knowsAbout: [
      'LinkedIn funnel strategy',
      'service business website conversion',
      'B2B consultant positioning',
      'conversion website design',
      'CTA path optimization',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteUrl}/#conversion-service`,
    name: 'Ghufran Hasan - LinkedIn-to-Website Funnel Optimization',
    url: 'https://ghufranhasan.com',
    description: 'LinkedIn-to-website conversion strategy and website implementation for LinkedIn-active service businesses.',
    areaServed: 'Worldwide',
    provider: { '@id': personId },
    serviceType: [
      'LinkedIn funnel audit',
      'LinkedIn profile optimization',
      'conversion website strategy',
      'LinkedIn-to-website funnel build',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      '@id': `${siteUrl}/#conversion-offers`,
      name: 'LinkedIn-to-Website Conversion Services',
      itemListElement: [
      {
        '@type': 'Offer',
        '@id': `${siteUrl}/#conversion-audit-offer`,
        name: 'Conversion Audit',
        price: '300',
        priceCurrency: 'USD',
        url: `${siteUrl}/pricing`,
        itemOffered: {
          '@type': 'Service',
          '@id': `${siteUrl}/#conversion-audit`,
          name: 'Conversion Audit',
          serviceType: 'LinkedIn-to-website conversion audit',
          provider: { '@id': personId },
        },
      },
      {
        '@type': 'Offer',
        '@id': `${siteUrl}/#conversion-sprint-offer`,
        name: 'LinkedIn-to-Website Conversion Sprint',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '1200',
          priceCurrency: 'USD',
        },
        url: `${siteUrl}/linkedin-website-funnel`,
        itemOffered: {
          '@type': 'Service',
          '@id': `${siteUrl}/#conversion-sprint`,
          name: 'LinkedIn-to-Website Conversion Sprint',
          serviceType: 'LinkedIn-to-website conversion sprint',
          provider: { '@id': personId },
        },
      },
      ],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homepageFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: getFaqPlainAnswer(faq),
      },
    })),
  },
]

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Hero />
      <PainAgitation />
      <CredibilityRibbon />
      <AuditExamples />
      <CaseStudies />
      <Services />
      <AfterClickPath />
      <Process />
      <DeliverablesPreview />
      <Packages />
      <FitCheck />
      <FAQ />
      <Contact />
    </>
  )
}
