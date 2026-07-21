export type FAQAnswerBlock =
  | { kind: 'paragraph'; text: string }
  | { kind: 'list'; items: string[] }

export type FAQItem = {
  category: string
  question: string
  answer: FAQAnswerBlock[]
}

export const faqs: FAQItem[] = [
  {
    category: 'Audit',
    question: 'What is the difference between the Selective Funnel Check and Conversion Audit?',
    answer: [
      {
        kind: 'paragraph',
        text: 'The Selective Funnel Check starts with a short application where you share your LinkedIn profile, website, service, lead source, traffic signal, desired action, average client value, budget range, and what you already tried. I use that context to spot one observable LinkedIn-to-website risk and recommend the right next step.',
      },
      {
        kind: 'paragraph',
        text: 'The Conversion Audit is the deeper paid diagnosis. You receive a recorded breakdown, copy recommendations, CTA fixes, and a practical roadmap you can implement yourself or use before a conversion sprint.',
      },
      {
        kind: 'paragraph',
        text: 'Best for: founder-led B2B service agencies that want clarity before investing in implementation.',
      },
    ],
  },
  {
    category: 'Strategy',
    question: 'Why do I need a website if LinkedIn is already working?',
    answer: [
      {
        kind: 'paragraph',
        text: 'LinkedIn creates attention, but your website turns that attention into structured trust. A strong profile may make people curious, but your website should explain your offer, proof, process, and next step in one clear path.',
      },
      {
        kind: 'paragraph',
        text: 'Without a website that continues the same conversation, warm visitors may leave without messaging, applying for a check, or taking the next qualified action.',
      },
    ],
  },
  {
    category: 'Leak',
    question: 'What if my LinkedIn is getting views but no inquiries?',
    answer: [
      {
        kind: 'paragraph',
        text: 'That usually means there is a gap between attention and conversion.',
      },
      {
        kind: 'paragraph',
        text: 'The issue may not be your content. It could be your positioning, profile promise, website headline, weak CTA, unclear offer, or missing trust proof.',
      },
      {
        kind: 'paragraph',
        text: 'The funnel check and paid audit help identify where that gap is happening.',
      },
    ],
  },
  {
    category: 'Budget',
    question: 'What if my budget is tight?',
    answer: [
      {
        kind: 'paragraph',
        text: 'Start with the Selective Funnel Check first. It gives you a quick view of one observable conversion risk without committing to a paid project.',
      },
      {
        kind: 'paragraph',
        text: 'If the issue is deeper, the Conversion Audit gives you a clear roadmap before you invest in the full LinkedIn-to-Website Conversion Sprint.',
      },
    ],
  },
  {
    category: 'Timeline',
    question: 'How long does a focused build take?',
    answer: [
      {
        kind: 'paragraph',
        text: 'A focused LinkedIn-to-website implementation sprint is planned around 10 business days, depending on your content, feedback speed, access, and scope.',
      },
      {
        kind: 'paragraph',
        text: 'The process includes audit, strategy, copy structure, design, development, QA, and launch support.',
      },
    ],
  },
  {
    category: 'Prep',
    question: 'What do I need to provide before the check, audit, or sprint starts?',
    answer: [
      {
        kind: 'paragraph',
        text: 'You need to share your LinkedIn profile, current website if you have one, target audience, offer details, and the main action you want visitors to take.',
      },
      {
        kind: 'paragraph',
        text: 'You do not need perfect copy or perfect branding before starting. Those can be improved during the process.',
      },
    ],
  },
  {
    category: 'Copy',
    question: 'Will you write the copy too, or only design/build the website?',
    answer: [
      {
        kind: 'paragraph',
        text: 'Yes, I help with the website copy structure.',
      },
      {
        kind: 'paragraph',
        text: 'I do not only build the page visually. I help shape the headline, offer section, proof section, CTA flow, FAQ, and section order so the page supports conversion, not just design.',
      },
    ],
  },
  {
    category: 'Trust',
    question: 'Do I need testimonials before this can work?',
    answer: [
      {
        kind: 'paragraph',
        text: 'No, but testimonials help.',
      },
      {
        kind: 'paragraph',
        text: 'If you do not have testimonials yet, we can use other trust signals such as your experience, process, portfolio, LinkedIn proof, content, project screenshots, personal story, or audit examples.',
      },
      {
        kind: 'paragraph',
        text: 'The goal is to build enough trust before asking visitors to take action.',
      },
    ],
  },
  {
    category: 'Approach',
    question: 'What makes this different from a normal developer portfolio?',
    answer: [
      {
        kind: 'paragraph',
        text: 'A normal developer portfolio usually shows skills, tools, and projects.',
      },
      {
        kind: 'paragraph',
        text: 'This approach builds a conversion path from LinkedIn attention to website trust to a clear next step. The focus is not only design or code. The focus is positioning, offer clarity, trust, CTA flow, and business action.',
      },
    ],
  },
  {
    category: 'LinkedIn',
    question: 'Can you only optimize my LinkedIn profile first?',
    answer: [
      {
        kind: 'paragraph',
        text: 'Yes, if your website is not ready yet, we can start by reviewing your LinkedIn profile promise, headline, featured section, CTA, and how it connects to your offer.',
      },
      {
        kind: 'paragraph',
        text: 'But the full system works best when your LinkedIn profile and website both send visitors toward the same next step.',
      },
    ],
  },
  {
    category: 'Guarantee',
    question: 'Do you guarantee booked calls?',
    answer: [
      {
        kind: 'paragraph',
        text: 'No. I do not guarantee booked calls because results depend on your offer, audience quality, LinkedIn activity, pricing, follow-up, and market demand.',
      },
      {
        kind: 'paragraph',
        text: 'What I improve is the conversion path: clarity, trust, CTA strength, offer explanation, and the journey from profile visit to inquiry.',
      },
    ],
  },
  {
    category: 'Fit',
    question: 'Do you work with people who do not post on LinkedIn?',
    answer: [
      {
        kind: 'paragraph',
        text: 'Yes, but this system works best if you already get LinkedIn attention or plan to drive traffic from LinkedIn.',
      },
      {
        kind: 'paragraph',
        text: 'If you are not posting yet, I can still help you build the website foundation, but the page will perform better when you have a traffic source behind it.',
      },
    ],
  },
  {
    category: 'Build',
    question: 'Can you redesign my existing website instead of building from scratch?',
    answer: [
      {
        kind: 'paragraph',
        text: 'Yes.',
      },
      {
        kind: 'paragraph',
        text: 'If your current website has a decent structure, I can improve the messaging, CTA flow, section order, and conversion path.',
      },
      {
        kind: 'paragraph',
        text: 'If the current structure is too confusing, outdated, or hard to scale, I may recommend rebuilding it with a cleaner funnel structure.',
      },
    ],
  },
  {
    category: 'Next step',
    question: 'What happens after I apply for the Selective Funnel Check?',
    answer: [
      {
        kind: 'paragraph',
        text: 'After you submit the funnel check application, I review your LinkedIn profile, website, and CTA path using the context you provided.',
      },
      {
        kind: 'paragraph',
        text: 'You then reach a thank-you page where booking a short clarity call is optional. I identify your biggest conversion leak and suggest the next practical step. If the issue is small, you may only need copy or CTA changes. If it is deeper, I may recommend the paid Conversion Audit or Conversion Sprint.',
      },
    ],
  },
  {
    category: 'Audience',
    question: 'Is this only for founders?',
    answer: [
      {
        kind: 'paragraph',
        text: 'The public positioning is focused on founder-led B2B service agencies because that keeps the offer clear and specific.',
      },
      {
        kind: 'paragraph',
        text: 'If you are an established consultant, creator, or service provider with a high-value offer and an active LinkedIn-to-website path, you can still apply. The fit depends on your offer, audience, and conversion problem.',
      },
    ],
  },
]

export const homepageFaqs: FAQItem[] = [
  {
    category: 'Diagnosis',
    question: 'How do you know whether the website is the real problem?',
    answer: [
      {
        kind: 'paragraph',
        text: 'I do not assume the website is the problem first. I compare the LinkedIn promise, audience, offer clarity, website message, proof sequence, CTA, form path, and available tracking signals.',
      },
      {
        kind: 'paragraph',
        text: 'If the issue looks like traffic quality, offer validation, sales follow-up, or pricing instead of the website handoff, I say that. The sprint only makes sense when the profile-to-website journey is the constraint worth fixing.',
      },
    ],
  },
  {
    category: 'Scope',
    question: 'What exactly changes during the sprint?',
    answer: [
      {
        kind: 'paragraph',
        text: 'The sprint focuses on one primary offer and one conversion page. It includes a journey audit, friction map, messaging alignment, page structure, conversion copy, responsive frontend implementation, one primary application or booking path, basic tracking, and launch walkthrough.',
      },
      {
        kind: 'paragraph',
        text: 'It does not include a full multi-page redesign, brand identity development, ongoing LinkedIn content management, SEO content production, advanced CRM automation, unlimited revisions, or guaranteed enquiries.',
      },
    ],
  },
  {
    category: 'Outcome',
    question: 'What result is under your control?',
    answer: [
      {
        kind: 'paragraph',
        text: 'The controllable result is message alignment, page clarity, proof sequence, CTA flow, mobile experience, implementation quality, and tracking for important actions.',
      },
      {
        kind: 'paragraph',
        text: 'I do not guarantee booked calls or enquiries because those also depend on market demand, traffic quality, offer strength, pricing, sales follow-up, and your overall acquisition system.',
      },
    ],
  },
  {
    category: 'Build',
    question: 'Can you improve my current site instead of rebuilding it?',
    answer: [
      {
        kind: 'paragraph',
        text: 'Yes. If your current site has a usable foundation, I can improve the messaging, section order, CTA flow, proof sequence, and conversion path.',
      },
      {
        kind: 'paragraph',
        text: 'If the structure is too confusing, outdated, or hard to scale, I may recommend rebuilding the focused conversion page instead of patching a weak foundation.',
      },
    ],
  },
  {
    category: 'Timeline',
    question: 'What do you need from me and how long does it take?',
    answer: [
      {
        kind: 'paragraph',
        text: 'I need your LinkedIn URL, website URL, core service, typical client value, current lead source, target action, budget range, and what you already tried. For implementation, I also need timely feedback, access, and approvals.',
      },
      {
        kind: 'paragraph',
        text: 'The paid audit usually takes 2-3 business days. A focused implementation sprint is planned around approximately 10 business days after inputs, scope, and approvals are clear.',
      },
    ],
  },
]

export function getFaqPlainAnswer(faq: FAQItem) {
  return faq.answer
    .map((block) => {
      if (block.kind === 'list') return block.items.join('; ')
      return block.text
    })
    .join(' ')
}
