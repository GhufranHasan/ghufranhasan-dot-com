import Hero from '@/components/sections/Hero'
import AuthorityBar from '@/components/sections/AuthorityBar'
import PainAgitation from '@/components/sections/PainAgitation'
import PlatformDependency from '@/components/sections/PlatformDependency'
import Services from '@/components/sections/Services'
import About from '@/components/sections/About'
import CaseStudies from '@/components/sections/CaseStudies'
import WhyChooseMe from '@/components/sections/WhyChooseMe'
import FitCheck from '@/components/sections/FitCheck'
import DifferentView from '@/components/sections/DifferentView'
import AuditExamples from '@/components/sections/AuditExamples'
import Packages from '@/components/sections/Packages'
import Process from '@/components/sections/Process'
import FAQ from '@/components/sections/FAQ'
import Newsletter from '@/components/sections/Newsletter'
import Contact from '@/components/sections/Contact'
import { faqs, getFaqPlainAnswer } from '@/data/faqs'

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ghufran Hasan',
    jobTitle: 'Founder of Marqevy',
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
      'coach and creator websites',
      'conversion website design',
      'Next.js development',
      'client acquisition systems',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Marqevy by Ghufran Hasan',
    url: 'https://ghufranhasan.com',
    description: 'LinkedIn-to-website funnel optimization for B2B founders, coaches, and creators.',
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
        name: 'Starter Audit',
        price: '300',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        name: 'LinkedIn + Landing Page',
        price: '500',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        name: 'Full Funnel System',
        price: '1200',
        priceCurrency: 'USD',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
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
      <AuthorityBar />
      <PainAgitation />
      <PlatformDependency />
      <Services />
      <About />
      <CaseStudies />
      <WhyChooseMe />
      <AuditExamples />
      <Packages />
      <FitCheck />
      <Process />
      <DifferentView />
      <FAQ />
      <Contact />
      <Newsletter />
    </>
  )
}
