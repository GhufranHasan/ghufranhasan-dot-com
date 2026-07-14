import Hero from '@/components/sections/Hero'
import PainAgitation from '@/components/sections/PainAgitation'
import Services from '@/components/sections/Services'
import FitCheck from '@/components/sections/FitCheck'
import AuditExamples from '@/components/sections/AuditExamples'
import Packages from '@/components/sections/Packages'
import Process from '@/components/sections/Process'
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
      'https://github.com/ghufranhasan',
      'https://x.com/Ghufran_Hasan',
    ],
    knowsAbout: [
      'LinkedIn funnel strategy',
      'B2B founder positioning',
      'founder-led B2B agency websites',
      'conversion website design',
      'Next.js development',
      'client acquisition systems',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Ghufran Hasan - LinkedIn-to-Website Funnel Optimization',
    url: 'https://ghufranhasan.com',
    description: 'LinkedIn-to-website conversion strategy and implementation for founder-led B2B service agencies.',
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
      <Services />
      <Process />
      <AuditExamples />
      <Packages />
      <FitCheck />
      <FAQ />
      <Contact />
    </>
  )
}
