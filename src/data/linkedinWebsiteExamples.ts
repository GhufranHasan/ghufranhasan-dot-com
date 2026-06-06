export type WebsiteExample = {
  name: string
  url: string
  positioning: string
  audience: string
  offer: string
  strongestAdvantage: string
  opportunity: string
  lesson: string
  scores: WebsiteScores
}

export type WebsiteScores = {
  positioningClarity: number
  audienceSpecificity: number
  heroStrength: number
  offerClarity: number
  proofSocialProof: number
  pricingClarity: number
  ctaClarity: number
  faqObjectionHandling: number
  funnelStructure: number
  ownedAssetAngle: number
  visualPortfolioProof: number
  overall: number
}

export const websiteExamples: WebsiteExample[] = [
  {
    name: 'Ghufran Hasan',
    url: 'https://ghufranhasan.com',
    positioning: 'LinkedIn-to-website conversion strategy',
    audience: 'B2B founders, coaches, creators, and service providers',
    offer: 'Audits, focused landing pages, and full funnel systems',
    strongestAdvantage: 'A clear bridge between LinkedIn attention, an owned website asset, and qualified conversations.',
    opportunity: 'Strengthen belief with more real client proof and transformation examples as they become available.',
    lesson: 'A specific conversion path can differentiate a website from a general developer or personal-brand portfolio.',
    scores: {
      positioningClarity: 9.5,
      audienceSpecificity: 9.0,
      heroStrength: 9.3,
      offerClarity: 9.3,
      proofSocialProof: 8.4,
      pricingClarity: 9.2,
      ctaClarity: 9.2,
      faqObjectionHandling: 9.0,
      funnelStructure: 9.3,
      ownedAssetAngle: 9.4,
      visualPortfolioProof: 7.8,
      overall: 9.2,
    },
  },
  {
    name: 'Nikolett Jaksa',
    url: 'https://www.nikolettjaksa.com/',
    positioning: 'Build a LinkedIn personal brand that gets people seen, trusted, and paid',
    audience: 'Personal brands, creators, and professionals',
    offer: 'LinkedIn coaching, ghostwriting, partnerships, and free training',
    strongestAdvantage: 'A memorable transformation promise supported by visible audience authority.',
    opportunity: 'A broad offer mix gives visitors several paths to evaluate before choosing a next step.',
    lesson: 'An emotionally clear promise can make a personal-brand offer easier to remember.',
    scores: {
      positioningClarity: 9.1,
      audienceSpecificity: 8.4,
      heroStrength: 9.2,
      offerClarity: 8.4,
      proofSocialProof: 9.0,
      pricingClarity: 6.5,
      ctaClarity: 8.6,
      faqObjectionHandling: 8.3,
      funnelStructure: 8.4,
      ownedAssetAngle: 7.5,
      visualPortfolioProof: 8.8,
      overall: 8.8,
    },
  },
  {
    name: 'Mentoria Digitals',
    url: 'https://www.mentoriadigitals.com/',
    positioning: 'LinkedIn as a predictable B2B client-acquisition channel',
    audience: 'B2B founders and executives',
    offer: 'Premium LinkedIn acquisition systems',
    strongestAdvantage: 'Strong revenue and client-volume proof creates immediate authority.',
    opportunity: 'The premium acquisition framing may feel less approachable to early-stage visitors.',
    lesson: 'Specific business-result proof makes a strategic offer feel more credible.',
    scores: {
      positioningClarity: 9.6,
      audienceSpecificity: 9.5,
      heroStrength: 9.5,
      offerClarity: 9.2,
      proofSocialProof: 9.7,
      pricingClarity: 6.5,
      ctaClarity: 9.2,
      faqObjectionHandling: 8.7,
      funnelStructure: 9.6,
      ownedAssetAngle: 8.2,
      visualPortfolioProof: 9.0,
      overall: 9.3,
    },
  },
  {
    name: 'Nehal Anees',
    url: 'https://sites.google.com/view/nehal-anees/home',
    positioning: 'SEO expertise, WordPress development, and mentoring',
    audience: 'Students, bloggers, and website owners',
    offer: 'SEO, WordPress, content, and mentoring',
    strongestAdvantage: 'Large achievement numbers communicate experience and reach quickly.',
    opportunity: 'The conversion path could be more focused around one primary audience and action.',
    lesson: 'Concrete achievement metrics can build trust even before a visitor reviews the full offer.',
    scores: {
      positioningClarity: 7.5,
      audienceSpecificity: 7.4,
      heroStrength: 7.2,
      offerClarity: 7.5,
      proofSocialProof: 8.8,
      pricingClarity: 7.0,
      ctaClarity: 7.0,
      faqObjectionHandling: 6.5,
      funnelStructure: 6.8,
      ownedAssetAngle: 7.2,
      visualPortfolioProof: 7.2,
      overall: 7.5,
    },
  },
  {
    name: 'Lead With Muneeba',
    url: 'https://leadwithmuneeba.com/',
    positioning: 'Personal-brand growth through LinkedIn design and content',
    audience: 'LinkedIn creators and personal brands',
    offer: 'LinkedIn design, writing, and profile optimization',
    strongestAdvantage: 'Visual examples make the service quality easy to inspect.',
    opportunity: 'The buyer journey can be strengthened by connecting visual work more directly to business outcomes.',
    lesson: 'For visual services, examples often communicate quality faster than descriptive copy.',
    scores: {
      positioningClarity: 8.2,
      audienceSpecificity: 8.2,
      heroStrength: 8.2,
      offerClarity: 8.2,
      proofSocialProof: 8.8,
      pricingClarity: 6.5,
      ctaClarity: 7.8,
      faqObjectionHandling: 7.0,
      funnelStructure: 7.8,
      ownedAssetAngle: 7.5,
      visualPortfolioProof: 9.4,
      overall: 8.1,
    },
  },
  {
    name: 'Webrahim',
    url: 'https://webrahim.com/',
    positioning: 'A focused page that sells instead of a large website',
    audience: 'Service businesses and founders',
    offer: 'Design, copy, and development in a focused sprint',
    strongestAdvantage: 'A direct, easy-to-remember landing-page promise.',
    opportunity: 'The positioning is less specific to LinkedIn-led buyer journeys.',
    lesson: 'A narrow deliverable and clear timeline reduce uncertainty around buying a website.',
    scores: {
      positioningClarity: 9.2,
      audienceSpecificity: 8.5,
      heroStrength: 9.2,
      offerClarity: 9.5,
      proofSocialProof: 8.7,
      pricingClarity: 8.5,
      ctaClarity: 9.2,
      faqObjectionHandling: 7.2,
      funnelStructure: 9.2,
      ownedAssetAngle: 8.0,
      visualPortfolioProof: 8.8,
      overall: 9.0,
    },
  },
  {
    name: 'Literally Academy',
    url: 'https://www.literallyacademy.com/',
    positioning: 'LinkedIn content-to-conversion education',
    audience: 'Entrepreneurs, creators, and students',
    offer: 'Course and academy membership',
    strongestAdvantage: 'Large scale and results proof make the education offer feel established.',
    opportunity: 'A product-led education funnel solves a different need than a hands-on service.',
    lesson: 'Scale proof works best when it is connected clearly to the result the buyer wants.',
    scores: {
      positioningClarity: 8.8,
      audienceSpecificity: 8.4,
      heroStrength: 9.0,
      offerClarity: 9.0,
      proofSocialProof: 9.8,
      pricingClarity: 9.0,
      ctaClarity: 9.0,
      faqObjectionHandling: 8.8,
      funnelStructure: 9.0,
      ownedAssetAngle: 8.0,
      visualPortfolioProof: 9.0,
      overall: 9.2,
    },
  },
  {
    name: 'Link Up by Jasmin',
    url: 'https://www.linkupbyjasmin.com/',
    positioning: 'Visibility and client growth through coaching and community',
    audience: 'Serious LinkedIn creators and business owners',
    offer: 'Premium annual community membership',
    strongestAdvantage: 'Strong trust, support depth, and qualification make the premium offer feel complete.',
    opportunity: 'The annual commitment naturally requires a higher level of buyer readiness.',
    lesson: 'A premium offer becomes easier to understand when support, fit, proof, and expectations are explicit.',
    scores: {
      positioningClarity: 9.4,
      audienceSpecificity: 9.1,
      heroStrength: 9.4,
      offerClarity: 9.3,
      proofSocialProof: 9.8,
      pricingClarity: 9.0,
      ctaClarity: 9.5,
      faqObjectionHandling: 9.5,
      funnelStructure: 9.5,
      ownedAssetAngle: 8.2,
      visualPortfolioProof: 9.3,
      overall: 9.5,
    },
  },
  {
    name: 'Hristo Butchvarov',
    url: 'https://hristobutchvarov.vercel.app/',
    positioning: 'Turn a DIY LinkedIn profile into a premium visual brand',
    audience: 'B2B founders, consultants, and coaches',
    offer: 'LinkedIn banners, featured sections, rebrands, and visual content',
    strongestAdvantage: 'Clear productized design packages make scope and pricing easy to understand.',
    opportunity: 'The offer focuses more on visual brand execution than the full conversion journey.',
    lesson: 'Productized services feel easier to buy when deliverables and entry pricing are specific.',
    scores: {
      positioningClarity: 8.8,
      audienceSpecificity: 9.0,
      heroStrength: 8.8,
      offerClarity: 9.0,
      proofSocialProof: 8.8,
      pricingClarity: 9.4,
      ctaClarity: 8.8,
      faqObjectionHandling: 8.6,
      funnelStructure: 8.2,
      ownedAssetAngle: 7.8,
      visualPortfolioProof: 9.3,
      overall: 8.8,
    },
  },
]

export const comparisonCriteria = [
  {
    title: 'Positioning clarity',
    description: 'Can a visitor understand the promise and category quickly?',
  },
  {
    title: 'Audience specificity',
    description: 'Is it clear who the offer is designed for?',
  },
  {
    title: 'Hero strength',
    description: 'Does the first screen communicate a compelling promise and next step?',
  },
  {
    title: 'Offer clarity',
    description: 'Can visitors understand what they can buy and what happens next?',
  },
  {
    title: 'Proof / social proof',
    description: 'Does the page give visitors a reason to believe the promise?',
  },
  {
    title: 'Pricing clarity',
    description: 'Can visitors understand the investment or buying path?',
  },
  {
    title: 'CTA clarity',
    description: 'Is there one clear, relevant next action?',
  },
  {
    title: 'FAQ / objection handling',
    description: 'Does the page answer the questions that could stop a good-fit buyer?',
  },
  {
    title: 'Funnel structure',
    description: 'Does the page move visitors from attention to trust and action?',
  },
  {
    title: 'Owned asset angle',
    description: 'Does the website create a business path beyond dependence on social platforms?',
  },
  {
    title: 'Visual portfolio / proof',
    description: 'Can visitors inspect examples, transformations, or visual evidence?',
  },
]

export const scoreCriteria: Array<{
  key: Exclude<keyof WebsiteScores, 'overall'>
  label: string
}> = [
  { key: 'positioningClarity', label: 'Positioning clarity' },
  { key: 'audienceSpecificity', label: 'Audience specificity' },
  { key: 'heroStrength', label: 'Hero strength' },
  { key: 'offerClarity', label: 'Offer clarity' },
  { key: 'proofSocialProof', label: 'Proof / social proof' },
  { key: 'pricingClarity', label: 'Pricing clarity' },
  { key: 'ctaClarity', label: 'CTA clarity' },
  { key: 'faqObjectionHandling', label: 'FAQ / objection handling' },
  { key: 'funnelStructure', label: 'Funnel structure' },
  { key: 'ownedAssetAngle', label: 'Owned asset angle' },
  { key: 'visualPortfolioProof', label: 'Visual portfolio / proof' },
]

export const practicalLessons = [
  'Lead with one memorable promise before explaining every service.',
  'Connect proof to a buyer outcome instead of displaying numbers without context.',
  'Make the primary CTA match the visitor’s current level of commitment.',
  'Use a clear offer ladder when buyers may need to start small.',
  'Treat the website as the conversion layer after LinkedIn discovery.',
  'Build an owned lead path through forms, email capture, and booking options.',
]
