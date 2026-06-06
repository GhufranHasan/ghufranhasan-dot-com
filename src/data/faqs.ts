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
        text: 'LinkedIn creates attention, but your website turns that attention into structured trust. A strong profile may make people curious, but your website should explain your offer, proof, process, and next step in one clear path.',
      },
      {
        kind: 'paragraph',
        text: 'Without a website that continues the same conversation, warm visitors may leave without booking, messaging, or requesting an audit.',
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
        text: 'Start with the Free Audit first. It gives you a quick view of your biggest conversion leak without committing to a paid project.',
      },
      {
        kind: 'paragraph',
        text: 'If the issue is deeper, the Starter Audit gives you a clear roadmap before you invest in a landing page or full funnel build.',
      },
    ],
  },
  {
    category: 'Timeline',
    question: 'How long does a focused build take?',
    answer: [
      {
        kind: 'paragraph',
        text: 'A focused LinkedIn-to-website landing page usually takes 7-10 days, depending on your content, feedback speed, and scope.',
      },
      {
        kind: 'paragraph',
        text: 'The process includes audit, strategy, copy structure, design, development, QA, and launch support.',
      },
    ],
  },
  {
    category: 'Prep',
    question: 'What do I need to provide before the audit or build starts?',
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
]

export function getFaqPlainAnswer(faq: FAQItem) {
  return faq.answer
    .map((block) => {
      if (block.kind === 'list') return block.items.join('; ')
      return block.text
    })
    .join(' ')
}
