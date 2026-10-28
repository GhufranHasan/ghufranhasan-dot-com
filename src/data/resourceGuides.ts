import { Globe2, Linkedin, MousePointerClick } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const resourceUpdatedDate = '2026-10-28'
export const resourceUpdatedLabel = 'October 28, 2026'

export type ResourceCard = {
  href: string
  category: string
  title: string
  description: string
  image: string
  headerImage: string
  imageAlt: string
}

type GuideSection = {
  id: string
  title: string
  paragraphs: string[]
  checks?: { title: string; text: string }[]
  example?: { before: string; after: string; note: string }
  takeaway?: string
}

export type ResourceGuide = ResourceCard & {
  icon: LucideIcon
  seoTitle: string
  headline: string
  intro: string
  caption: string
  sections: GuideSection[]
  questions: { question: string; answer: string }[]
  related: string[]
}

export const profileGuide: ResourceGuide = {
  href: '/linkedin-profile-optimization',
  category: 'LinkedIn positioning',
  icon: Linkedin,
  title: 'LinkedIn Profile Optimization',
  seoTitle: 'LinkedIn Profile Optimization for Website Enquiries',
  headline: 'LinkedIn profile optimization, with a clearer next step.',
  description: 'A practical LinkedIn profile optimization guide: align your headline, banner, About section, Featured links, and website CTA for clearer enquiries.',
  intro: 'Earn the right click with a clear profile. Then make your website deliver on the promise that brought visitors there.',
  image: '/images/resources/linkedin-profile-blueprint-3d.webp',
  headerImage: '/images/resources/linkedin-profile-blueprint-header.webp',
  imageAlt: 'Realistic 3D glass LinkedIn profile connected by an orange path to a website with one clear action.',
  caption: 'The profile earns the click. The destination should continue the same conversation. Conceptual 3D illustration, not a client profile.',
  sections: [
    {
      id: 'positioning',
      title: 'Make your audience and outcome easy to understand',
      paragraphs: [
        'Start with a real buyer, not a list of everything you can do. A useful headline helps someone recognize who the work is for, the problem it addresses, and the kind of change you help create. Your job title can support that message; it should not be the whole message.',
        'Treat your banner as supporting context. It can reinforce the problem, offer, or next step without repeating your headline word for word. Check the crop on a phone so the profile photo does not cover essential words.',
      ],
      example: {
        before: 'Consultant | Strategist | Helping businesses grow',
        after: 'Helping B2B service businesses clarify their offer and turn warm website visits into qualified enquiries',
        note: 'An illustrative rewrite, not a promise of a specific conversion result. Use an outcome you can genuinely support.',
      },
    },
    {
      id: 'profile-sections',
      title: 'Give each profile section a distinct job',
      paragraphs: ['A profile becomes repetitive when the headline, banner, and About section all make the same broad claim. Use the extra space to answer the next question a potential buyer is likely to have.'],
      checks: [
        { title: 'Headline: establish relevance', text: 'Name the audience and the problem you work on. Choose plain language your buyer would use in a conversation.' },
        { title: 'About: explain the approach', text: 'Describe the situation you help with, your process, and who is a good fit. End with a specific next step rather than a vague invitation to connect.' },
        { title: 'Experience: make the work concrete', text: 'Explain your contribution, deliverables, and context. Only include numerical results when you can substantiate them.' },
        { title: 'Featured: support the decision', text: 'Lead with a relevant review page, a useful sample, or genuine project evidence. Avoid making visitors choose between several unrelated offers.' },
      ],
      takeaway: 'A visitor should be able to describe your offer in one sentence before leaving your profile.',
    },
    {
      id: 'message-match',
      title: 'Match the Featured link to its destination',
      paragraphs: [
        'If the Featured item offers a free funnel review, the linked page should immediately explain that review and how to request it. Sending the same visitor to a generic homepage makes them look for the offer again. That extra search is avoidable friction.',
        'Keep the audience, offer name, and next step consistent across the profile, link preview, and website heading. The words do not need to be identical, but they should describe the same service. A useful check is to open the profile and landing page side by side and read them as one continuous introduction.',
        'Use a public destination that works without a login, check the link on mobile, and verify that its preview image and title describe the page. If you track the source of visits, use a campaign label rather than adding names, email addresses, or other personal information to the URL.',
      ],
    },
    {
      id: 'profile-review',
      title: 'Review the handoff, not just the profile appearance',
      paragraphs: [
        'A polished banner and a high profile-view count do not tell you whether the right people understand your offer. Review the complete path from the profile to the website and then to the enquiry step. You are looking for a clear continuation, not a different pitch on every screen.',
        'Ask someone unfamiliar with your work to identify the audience, service, and next action without your explanation. Their uncertainty is useful feedback. Fix the message before adding more design elements or another link.',
      ],
      checks: [
        { title: 'Relevance', text: 'Can the intended buyer recognize their situation in the headline and opening About lines?' },
        { title: 'Evidence', text: 'Can visitors inspect your work or process without relying on unsupported claims?' },
        { title: 'Continuity', text: 'Does the linked page deliver the offer that the profile introduced?' },
      ],
      takeaway: 'Improve the weakest handoff first. More profile traffic cannot repair a confusing destination.',
    },
  ],
  questions: [
    { question: 'Should my LinkedIn profile link to my homepage or a focused page?', answer: 'Use the page that fulfills the specific promise beside the link. A free-review invitation should lead to the review page. A broad introduction can lead to the homepage if it makes the relevant next step obvious.' },
    { question: 'Do I need testimonials before improving my profile?', answer: 'No. Explain your process, show genuine work you can discuss, and make the scope clear. Label samples as samples. Do not replace missing testimonials with invented results or implied client relationships.' },
  ],
  related: ['/website-conversion-strategy', '/cta-funnel-clarity'],
}

export const websiteGuide: ResourceGuide = {
  href: '/website-conversion-strategy',
  category: 'Website strategy',
  icon: Globe2,
  title: 'Website Conversion Strategy',
  seoTitle: 'Website Conversion Strategy for LinkedIn Visitors',
  headline: 'Website conversion strategy for warm LinkedIn visitors.',
  description: 'Build a clearer website conversion strategy for LinkedIn visitors with message matching, offer clarity, credible evidence, mobile usability, and a focused CTA.',
  intro: 'LinkedIn creates interest. Help visitors understand your offer, trust your approach, and take one confident next step.',
  image: '/images/resources/website-decision-path-3d.webp',
  headerImage: '/images/resources/website-decision-path-header.webp',
  imageAlt: 'Realistic 3D laptop and connected glass symbols representing website relevance, trust, and the next action.',
  caption: 'A useful page answers three different questions: relevance, confidence, and action. Conceptual 3D illustration, not a client website or measured result.',
  sections: [
    {
      id: 'message-match',
      title: 'Continue the promise that brought the visitor here',
      paragraphs: [
        'A visitor arriving from LinkedIn is not starting from zero. They may have read a post, scanned a profile, or clicked an offer in the Featured section. Your opening section should confirm that they reached the right place instead of making them decode a new positioning statement.',
        'Make the audience, problem, and service visible near the top. If your profile talks about improving enquiries, a heading about beautiful digital experiences can feel disconnected. Good design supports the commercial message; it does not have to replace it with abstract language.',
      ],
      example: {
        before: 'We create innovative digital experiences for ambitious brands.',
        after: 'A clearer website enquiry path for service businesses already attracting attention on LinkedIn.',
        note: 'A message-matching example. The right wording depends on your actual audience and service.',
      },
    },
    {
      id: 'decision-sequence',
      title: 'Build the page around the buyer\'s questions',
      paragraphs: ['Page length is not the first decision. Decide which questions must be answered for this particular offer, then give each section one job. Keep the main path concise and link to deeper resources for readers who need them.'],
      checks: [
        { title: 'Relevance: is this for me?', text: 'Identify the audience and recognizable problem. Explain the outcome without promising a result you cannot control.' },
        { title: 'Offer: what am I buying?', text: 'Describe the service, expected process, starting investment where appropriate, and important scope boundaries.' },
        { title: 'Confidence: why this approach?', text: 'Use genuine work, a labeled sample, or a visible explanation of your decisions. Evidence should be close to the claim it supports.' },
        { title: 'Action: what happens next?', text: 'Explain the review or enquiry step, what information is needed, and what the visitor can expect afterward.' },
      ],
      takeaway: 'Remove repeated explanations before removing useful detail. A focused page can still answer serious buying questions.',
    },
    {
      id: 'credible-evidence',
      title: 'Make your evidence inspectable and specific',
      paragraphs: [
        'A claim such as conversion-focused is difficult to evaluate on its own. A before-and-after message, an annotated page, or a clear walkthrough gives the visitor something they can inspect. Explain the business context and the decisions you made rather than relying on visual polish alone.',
        'Keep sample audits separate from client results. State whether an example is independent analysis, your own website, or paid client work. If you do not have measured outcomes, explain the improvement in the journey without attaching an invented percentage to it.',
        'Place evidence where it resolves uncertainty. A relevant example next to the service explanation may be more useful than a large portfolio at the bottom of the page. Link to the detailed work for visitors who want to examine it further.',
      ],
    },
    {
      id: 'mobile-measurement',
      title: 'Check the mobile journey and measure useful actions',
      paragraphs: [
        'Open the page on a narrow screen and follow the same path a prospect would take. Check that the offer is understandable, the main button is easy to reach, text does not spill outside its container, and the form works with the on-screen keyboard. Important content should not depend on a hover effect.',
        'Reserve space for images, keep essential text visible before animation, and avoid loading decorative effects before the message. A visually impressive page is not useful if the visitor waits for the offer to appear or loses their place when media loads.',
        'Measure the stages separately: relevant landing-page visits, main CTA clicks, successful form submissions, and qualified conversations. A click is not a completed enquiry. Treat your saved applications as the operational record, and analytics as a way to understand patterns; consent settings and blockers can affect analytics totals.',
      ],
      takeaway: 'Change one meaningful part of the journey at a time and compare similar traffic sources. Low-volume data is a clue, not proof of a guaranteed lift.',
    },
  ],
  questions: [
    { question: 'Do I need to rebuild my website to improve conversions?', answer: 'Not necessarily. Start with the weakest part of the journey: the message, service explanation, evidence, CTA, or form. Improving an existing page may be enough when the underlying site is usable and reliable.' },
    { question: 'Should a LinkedIn landing page be shorter than my homepage?', answer: 'It can be, especially when it serves one offer. A focused review page can collect an application while the homepage provides a broader introduction. Shorter is useful when it reduces repeated decisions, not when it hides essential information.' },
  ],
  related: ['/linkedin-profile-optimization', '/cta-funnel-clarity'],
}

export const ctaGuide: ResourceGuide = {
  href: '/cta-funnel-clarity',
  category: 'CTA and enquiry flow',
  icon: MousePointerClick,
  title: 'CTA Funnel Clarity',
  seoTitle: 'CTA Funnel Clarity: From Website Visit to Enquiry',
  headline: 'CTA funnel clarity, from first click to enquiry.',
  description: 'Improve CTA funnel clarity with specific button copy, a focused intake form, useful confirmation, optional booking, and meaningful conversion tracking.',
  intro: 'Give visitors one clear invitation, a focused form, and a useful confirmation. The experience after the click matters.',
  image: '/images/resources/cta-enquiry-flow-3d.webp',
  headerImage: '/images/resources/cta-enquiry-flow-header.webp',
  imageAlt: 'Realistic 3D website button, intake form, and confirmation panel connected by an orange enquiry path.',
  caption: 'One clear request, useful context, then confirmation. A call can remain optional after the application. Conceptual 3D illustration, not an application screenshot.',
  sections: [
    {
      id: 'primary-action',
      title: 'Choose the action that fits the buyer\'s stage',
      paragraphs: [
        'A visitor who is still diagnosing the problem may not be ready for a sales call. A focused review request can be a more natural starting point. Someone who already understands the scope may be ready to discuss implementation. The primary CTA should match the job of the page.',
        'Keep one primary destination for the same offer. Repeating a review button further down a long page can be useful; sending those buttons to different forms, email, direct messages, and booking tools creates an inconsistent expectation. Secondary resources can remain available without competing visually with the main action.',
      ],
      example: {
        before: 'Get started',
        after: 'Request my free review',
        note: 'Use specific wording only when the linked page really offers that action. Clarity comes from the destination as well as the label.',
      },
    },
    {
      id: 'button-context',
      title: 'Answer the small questions around the button',
      paragraphs: ['Button copy should describe the action or request. The surrounding sentence can explain the benefit and the level of commitment. Do not make a small button carry an entire sales argument.'],
      checks: [
        { title: 'What am I requesting?', text: 'Name the review, audit, or conversation consistently. Make free and paid offers easy to distinguish.' },
        { title: 'What will I need?', text: 'Tell visitors if they need their LinkedIn profile and website links before opening the form.' },
        { title: 'What happens afterward?', text: 'Explain how the request is reviewed and how you will respond. Only publish a response time you can reliably meet.' },
        { title: 'Am I committing to a call?', text: 'If booking is optional, say so. Do not disguise a mandatory sales call as an immediate downloadable review.' },
      ],
      takeaway: 'A clear CTA reduces uncertainty. It does not need false urgency, a countdown, or a guaranteed outcome.',
    },
    {
      id: 'intake-confirmation',
      title: 'Make the form and confirmation part of the same promise',
      paragraphs: [
        'Ask for information you will actually use to review or qualify the request. Contact details, profile and website links, the main problem, and implementation context can be useful. Remove questions that have no role in your next decision; a longer application needs a clear reason for each field.',
        'Use visible labels, understandable options, and specific validation messages. Preserve the visitor\'s answers if a submission fails. On mobile, check that dropdowns and error messages stay visible and that the submit button remains reachable. Do not collect confidential client information in an initial enquiry.',
      ],
    },
    {
      id: 'confirmation-follow-up',
      title: 'Continue the promise after the form is complete',
      paragraphs: [
        'Only show success after the server accepts the application. The confirmation page should acknowledge receipt, explain the next step, and offer an optional conversation where appropriate. A notification email can support that process, but a failed notification should not silently erase a request that was already saved.',
        'Tell the visitor how you will respond and what to expect from the review. Only publish a response time you can meet. Keep the follow-up relevant to their request; an enquiry is not automatic permission to add someone to a marketing newsletter.',
        'If a clarity call is optional, offer it after confirmation and make that choice explicit. The visitor should not need to complete another mandatory step to make the original application count.',
      ],
      takeaway: 'The confirmation and follow-up should feel like the continuation of the request, not a new sales funnel with a different promise.',
    },
    {
      id: 'measure-the-path',
      title: 'Track the complete path without collecting unnecessary personal data',
      paragraphs: [
        'Start with a simple sequence: landing-page view, primary CTA click, accepted form submission, and optional booking. Use stable event names and the page or button location to understand where visitors act. Do not send names, email addresses, profile URLs, or free-text answers to Google Analytics.',
        'Keep submission records in your secured database. Analytics events help explain behavior, but they are not a substitute for the actual application record. Ad blockers, consent choices, and repeated visits can make analytics totals different from the number of leads you receive.',
        'If many visitors click but few complete the form, inspect the form before changing the headline again. If the form completes but enquiries are unsuitable, review qualification and offer wording. Use the stage that is underperforming to decide what to improve next.',
      ],
      takeaway: 'Test the complete journey after every meaningful change, including validation, successful submission, confirmation, and notification handling.',
    },
  ],
  questions: [
    { question: 'Can I keep email and social links alongside my main CTA?', answer: 'Yes. Keep them available as supporting contact options, for example in the footer or Contact page. The same review offer should still have one clear primary application path.' },
    { question: 'Should the thank-you page force a Calendly booking?', answer: 'Not when the promise is an application or review request. Confirm the request first, then offer a call as an optional next step. That keeps the original action clear and lets interested visitors continue.' },
  ],
  related: ['/linkedin-profile-optimization', '/website-conversion-strategy'],
}

export const resourceGuides = [profileGuide, websiteGuide, ctaGuide]

export const resourceTools: ResourceCard[] = [
  {
    href: '/resources/linkedin-website-funnel-checklist',
    category: 'Interactive checklist',
    title: '10-Point Website Funnel Checklist',
    description: 'Review your profile, website, and CTA. Score the journey and identify the next issue to work on, with no email gate.',
    image: '/images/resources/funnel-checklist-cover-3d.webp',
    headerImage: '/images/resources/funnel-checklist-cover-header.webp',
    imageAlt: 'Realistic 3D workbook, ten-point checklist clipboard, and orange pen on a dark studio surface.',
  },
  {
    href: '/linkedin-website-examples',
    category: 'Comparison study',
    title: 'LinkedIn Personal Brand Website Examples',
    description: 'Compare public-facing positioning, proof, offers, and CTA structure across nine LinkedIn-led websites.',
    image: '/images/resources/website-comparison-cover-3d.webp',
    headerImage: '/images/resources/website-comparison-cover-header.webp',
    imageAlt: 'Realistic 3D website panels and magnifying glass illustrating a review of different page layouts.',
  },
]

export function guideSocialImage(guide: ResourceGuide) {
  return {
    url: guide.image.replace('.webp', '-social.jpg'),
    width: 1200,
    height: 630,
    alt: guide.imageAlt,
  }
}
