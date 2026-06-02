import Hero from '@/components/sections/Hero'
import AuthorityBar from '@/components/sections/AuthorityBar'
import PainAgitation from '@/components/sections/PainAgitation'
import Services from '@/components/sections/Services'
import About from '@/components/sections/About'
import CaseStudies from '@/components/sections/CaseStudies'
import WhyChooseMe from '@/components/sections/WhyChooseMe'
import DifferentView from '@/components/sections/DifferentView'
import Packages from '@/components/sections/Packages'
import Process from '@/components/sections/Process'
import FAQ from '@/components/sections/FAQ'
import Newsletter from '@/components/sections/Newsletter'
import Contact from '@/components/sections/Contact'

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ghufran Hasan',
    jobTitle: 'LinkedIn Funnel Strategist',
    url: 'https://ghufranhasan.com',
    image: 'https://ghufranhasan.com/images/profile.png',
    sameAs: [
      'https://linkedin.com/in/ghufranhasan',
      'https://github.com/ghufranhasan',
      'https://x.com/Ghufran_Hasan',
    ],
    knowsAbout: [
      'LinkedIn funnel strategy',
      'B2B agency positioning',
      'conversion website design',
      'Next.js development',
      'client acquisition systems',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Ghufran Hasan',
    url: 'https://ghufranhasan.com',
    description: 'LinkedIn profile and website conversion strategy for B2B agency founders.',
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
        name: 'Quick Funnel Audit',
        price: '300',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        name: 'LinkedIn + Landing Page System',
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
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why do I need a website if LinkedIn is already working?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'LinkedIn creates discovery, but your website builds trust and gives warm prospects one clear next step.',
        },
      },
      {
        '@type': 'Question',
        name: 'What if I do not have a big budget yet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Start with a focused audit or LinkedIn profile fix before investing in a full website and funnel build.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does the website build take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most focused landing page and funnel projects are designed to launch in about 10 days after discovery.',
        },
      },
    ],
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
      <Services />
      <About />
      <CaseStudies />
      <WhyChooseMe />
      <Packages />
      <Process />
      <DifferentView />
      <FAQ />
      <Newsletter />
      <Contact />
    </>
  )
}
