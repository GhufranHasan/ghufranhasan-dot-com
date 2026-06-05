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
    question: 'What is the difference between the Free Audit and Starter Audit?',
    answer: [
      {
        kind: 'paragraph',
        text: 'Free Audit is a quick 15-minute review of your LinkedIn-to-website path. I check your headline, CTA, offer clarity, and the biggest conversion leak.',
      },
      {
        kind: 'paragraph',
        text: 'Starter Audit is a deeper paid audit where you receive a Loom breakdown, copy recommendations, CTA fixes, and a practical roadmap you can implement yourself or use before a full website build.',
      },
      {
        kind: 'paragraph',
        text: 'Best for: founders who want clarity before investing in a full website.',
      },
    ],
  },
  {
    category: 'Strategy',
    question: 'Why do I need a website if LinkedIn is already working?',
    answer: [
      {
        kind: 'paragraph',
        text: 'LinkedIn creates attention, but your website builds structured trust.',
      },
      {
        kind: 'paragraph',
        text: 'A post can start curiosity. A profile can build interest. But your website should continue the sales conversation with a clear offer, proof, CTA, and next step.',
      },
      {
        kind: 'paragraph',
        text: 'Without that bridge, warm visitors often leave without taking action.',
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
        text: 'My audit helps identify where that gap is happening.',
      },
    ],
  },
  {
    category: 'Budget',
    question: 'What if my budget is tight?',
    answer: [
      {
        kind: 'paragraph',
        text: 'Start with the Free Audit first.',
      },
      {
        kind: 'paragraph',
        text: 'If you need deeper clarity, the Starter Audit gives you a roadmap before you commit to a build. This helps you avoid spending money on a website that only looks good but does not support your offer.',
      },
    ],
  },
  {
    category: 'Timeline',
    question: 'How long does a focused build take?',
    answer: [
      {
        kind: 'paragraph',
        text: 'A focused landing page or LinkedIn-to-website funnel usually takes around 7-10 days, depending on scope, content readiness, feedback speed, and required sections.',
      },
      {
        kind: 'paragraph',
        text: 'A full funnel system may take longer if we need to refine positioning, offer structure, lead magnet, and follow-up journey.',
      },
    ],
  },
  {
    category: 'Guarantee',
    question: 'Do you guarantee booked calls or leads?',
    answer: [
      {
        kind: 'paragraph',
        text: 'No. I do not guarantee booked calls because results depend on your offer, LinkedIn activity, audience quality, pricing, and follow-up.',
      },
      {
        kind: 'paragraph',
        text: 'What I do is improve the path between attention and action by making your website clearer, more trustworthy, and easier to respond to.',
      },
      {
        kind: 'paragraph',
        text: 'This gives your existing LinkedIn attention a better chance of turning into qualified conversations.',
      },
    ],
  },
  {
    category: 'Fit',
    question: 'Do you work with people who do not post on LinkedIn?',
    answer: [
      {
        kind: 'paragraph',
        text: 'Yes, but this system works best when you already have LinkedIn activity or plan to drive traffic from LinkedIn.',
      },
      {
        kind: 'paragraph',
        text: 'If you are not posting yet, I can still help you build a strong website foundation, but the website will perform better when there is consistent traffic coming from your content, profile, or outreach.',
      },
    ],
  },
  {
    category: 'Prep',
    question: 'What do I need before starting?',
    answer: [
      {
        kind: 'paragraph',
        text: 'You need at least:',
      },
      {
        kind: 'list',
        items: [
          'A clear offer or service idea',
          'A target audience',
          'Basic LinkedIn presence',
          'Existing website, landing page, or profile link',
          'Willingness to clarify your positioning',
        ],
      },
      {
        kind: 'paragraph',
        text: 'You do not need perfect branding or final copy. That can be improved during the process.',
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
    question: 'What happens after I request the Free Audit?',
    answer: [
      {
        kind: 'paragraph',
        text: 'After you request the Free Audit, I review your LinkedIn profile and website path.',
      },
      {
        kind: 'paragraph',
        text: 'Then I identify your biggest conversion leak and suggest the next practical step. If the issue is small, you may only need copy or CTA changes. If the issue is deeper, I may recommend a Starter Audit or full build.',
      },
    ],
  },
  {
    category: 'Audience',
    question: 'Is this only for founders?',
    answer: [
      {
        kind: 'paragraph',
        text: 'No.',
      },
      {
        kind: 'paragraph',
        text: 'This is also useful for service providers, coaches, consultants, creators, agency owners, and personal brands who already get attention but do not have a clear website path that converts visitors into conversations.',
      },
    ],
  },
  {
    category: 'Approach',
    question: 'What makes your approach different from a normal web developer?',
    answer: [
      {
        kind: 'paragraph',
        text: 'A normal developer usually focuses on design and development.',
      },
      {
        kind: 'paragraph',
        text: 'My approach connects:',
      },
      {
        kind: 'list',
        items: [
          'LinkedIn positioning',
          'Website messaging',
          'Offer clarity',
          'Trust-building sections',
          'CTA flow',
          'Conversion-focused development',
        ],
      },
      {
        kind: 'paragraph',
        text: 'So the website does not just look professional. It supports your business journey from attention to inquiry.',
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
