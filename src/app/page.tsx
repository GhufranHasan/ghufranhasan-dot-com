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

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ghufran Hasan',
    jobTitle: 'LinkedIn-to-Website Funnel Strategist',
    url: 'https://ghufranhasan.com',
    image: 'https://ghufranhasan.com/images/profile.png',
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
    '@type': 'ProfessionalService',
    name: 'Ghufran Hasan - LinkedIn-to-Website Funnel Optimization',
    url: 'https://ghufranhasan.com',
    description: 'LinkedIn-to-website conversion strategy and website implementation for LinkedIn-active service businesses.',
    areaServed: 'Worldwide',
    founder: {
      '@type': 'Person',
      name: 'Ghufran Hasan',
    },
    serviceType: [
      'LinkedIn funnel audit',
      'LinkedIn profile optimization',
      'conversion website strategy',
      'LinkedIn-to-website funnel build',
    ],
    offers: [
      {
        '@type': 'Offer',
        name: 'Conversion Audit',
        price: '300',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        name: 'LinkedIn-to-Website Conversion Sprint',
        price: '1200',
        priceCurrency: 'USD',
      },
    ],
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
