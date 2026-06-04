import Hero from '@/components/sections/Hero'
import AuthorityBar from '@/components/sections/AuthorityBar'
import PainAgitation from '@/components/sections/PainAgitation'
import Services from '@/components/sections/Services'
import About from '@/components/sections/About'
import CaseStudies from '@/components/sections/CaseStudies'
import WhyChooseMe from '@/components/sections/WhyChooseMe'
import FitCheck from '@/components/sections/FitCheck'
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
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What\'s the difference between the Free Audit and the Starter Audit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Free Audit is a 15-minute review to identify your biggest conversion opportunity with high-level feedback. The Starter Audit provides a complete conversion-focused breakdown with a recorded Loom video, detailed recommendations, copy suggestions, and a prioritized roadmap.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why do I need a website if LinkedIn is already working?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'LinkedIn creates discovery. Your website should create trust, explain the offer, and give warm prospects a clear next step. Without that bridge, attention leaks before it becomes a conversation.',
        },
      },
      {
        '@type': 'Question',
        name: 'What if my budget is tight?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Start smaller. The audit gives you a clear diagnosis and immediate fixes before you invest in a full build. You can upgrade later when the path is clearer.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does a focused build take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A focused LinkedIn-to-website landing page can usually be mapped, written, built, and polished in about 10 days after discovery.',
        },
      },
      {
        '@type': 'Question',
        name: 'What do I need to provide before the audit or build starts?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Usually just your LinkedIn profile, website link, current offer, target audience, and the main action you want visitors to take. If you already have testimonials, analytics, or examples of posts that brought good conversations, those help too.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will you write the copy too, or only design/build the website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'I help with the conversion copy direction, section flow, CTA language, offer framing, and key page messaging. The goal is not just to make the site look polished, but to make the LinkedIn-to-website path easier to understand and act on.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need testimonials before this can work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Testimonials help, but they are not the only trust signal. Clear positioning, transparent process, proof of thinking, strong examples, and a specific CTA can still reduce doubt.',
        },
      },
      {
        '@type': 'Question',
        name: 'What makes this different from a normal developer portfolio?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A normal portfolio shows work. This approach sells the visitor on one journey: who you help, what gap you fix, how the process works, and what to do next.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you only optimize my LinkedIn profile first?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. In many cases, profile positioning should come first. If the LinkedIn message is unclear, the website will inherit the same confusion. We can fix the profile, CTA, and Featured section first, then build the website path when the foundation is sharper.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you guarantee booked calls?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. I do not guarantee sales calls. I improve the path, clarity, trust, and CTA so your existing attention has a better chance of converting.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you work with people who do not post on LinkedIn?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, but the system works best when you already have some LinkedIn activity or plan to drive traffic from LinkedIn. Without distribution, even a clear website has fewer chances to convert.',
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
      <FitCheck />
      <Packages />
      <Process />
      <DifferentView />
      <FAQ />
      <Contact />
      <Newsletter />
    </>
  )
}
