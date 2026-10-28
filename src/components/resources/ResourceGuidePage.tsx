import Link from 'next/link'
import { ArrowDown, ArrowRight, Check, ChevronDown, Clock3 } from 'lucide-react'
import ResourcePageHeader from '@/components/resources/ResourcePageHeader'
import ResourceCards from '@/components/resources/ResourceCards'
import {
  guideSocialImage,
  resourceGuides,
  resourceUpdatedDate,
  resourceUpdatedLabel,
  type ResourceGuide,
} from '@/data/resourceGuides'
import { createPageMetadata, personId, siteUrl } from '@/lib/seo/metadata'

export function resourceGuideMetadata(guide: ResourceGuide) {
  return createPageMetadata({
    title: guide.seoTitle,
    description: guide.description,
    path: guide.href,
    type: 'article',
    image: guideSocialImage(guide),
  })
}

export default function ResourceGuidePage({ guide }: { guide: ResourceGuide }) {
  const words = [guide.intro, ...guide.sections.flatMap((section) => [
    section.title, ...section.paragraphs,
    ...(section.checks?.map((check) => `${check.title} ${check.text}`) ?? []),
    section.takeaway ?? '',
    ...(section.example ? Object.values(section.example) : []),
  ]), ...guide.questions.flatMap(({ question, answer }) => [question, answer])].join(' ').split(/\s+/).length
  const readingMinutes = Math.max(1, Math.ceil(words / 200))
  const articleUrl = `${siteUrl}${guide.href}`
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${articleUrl}#article`,
    headline: guide.headline,
    description: guide.description,
    url: articleUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    dateModified: `${resourceUpdatedDate}T00:00:00+05:00`,
    author: { '@type': 'Person', '@id': personId, name: 'Ghufran Hasan', url: siteUrl },
    publisher: { '@id': personId },
    image: { '@type': 'ImageObject', url: `${siteUrl}${guideSocialImage(guide).url}`, width: 1200, height: 630 },
    inLanguage: 'en',
    articleSection: guide.category,
    wordCount: words,
  }
  const related = guide.related.flatMap((href) => resourceGuides.filter((item) => item.href === href))

  return (
    <article className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <ResourcePageHeader
        title={guide.headline}
        description={guide.intro}
        badge={guide.category}
        icon={guide.icon}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: guide.title, href: guide.href },
        ]}
        image={guide.headerImage}
        imageAlt={guide.imageAlt}
        caption={guide.caption}
      >
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/60">
              <Link href="/" rel="author" className="font-medium text-white/85 underline decoration-orange-500/50 underline-offset-4 hover:text-orange-300">By Ghufran Hasan</Link>
              <span>Updated <time dateTime={resourceUpdatedDate}>{resourceUpdatedLabel}</time></span>
              <span className="inline-flex items-center gap-1.5"><Clock3 size={15} aria-hidden="true" />{readingMinutes} min read</span>
            </div>
            <a href={`#${guide.sections[0].id}`} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-orange-300 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-orange-400 md:mt-7">
              Read the guide <ArrowDown size={17} aria-hidden="true" />
            </a>
      </ResourcePageHeader>

      <div className="texture-dots neon-purple border-t border-white/10 py-12 md:py-16">
        <div className="container-custom grid items-start gap-10 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="On this page" className="border-y border-white/12 py-5 lg:sticky lg:top-28">
            <p className="mb-3 text-xs font-semibold uppercase text-orange-300">On this page</p>
            <ol className="space-y-1">
              {guide.sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="flex min-h-11 items-start gap-3 py-2 text-sm leading-6 text-white/70 transition-colors hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-orange-400">
                    <span className="text-orange-300/70">0{index + 1}</span>{section.title}
                  </a>
                </li>
              ))}
              <li><a href="#questions" className="inline-flex min-h-11 items-center text-sm text-white/70 hover:text-orange-300">Common questions</a></li>
            </ol>
          </nav>

          <div className="min-w-0 max-w-3xl">
            {guide.sections.map((section, index) => (
              <section key={section.id} id={section.id} className="scroll-mt-28 border-b border-white/12 pb-10 not-first:pt-10 md:pb-14 md:not-first:pt-14">
                <p className="mb-3 text-sm font-semibold text-orange-300">0{index + 1}</p>
                <h2 className="text-2xl font-medium leading-snug text-white md:text-3xl">{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-5 text-base leading-8 text-white/75">{paragraph}</p>)}
                {section.checks && (
                  <ul className="mt-7 divide-y divide-white/10">
                    {section.checks.map((check) => (
                      <li key={check.title} className="flex gap-4 py-5">
                        <Check size={20} className="mt-1 shrink-0 text-orange-400" aria-hidden="true" />
                        <div><h3 className="font-semibold leading-7 text-white">{check.title}</h3><p className="mt-1 text-base leading-8 text-white/70">{check.text}</p></div>
                      </li>
                    ))}
                  </ul>
                )}
                {section.example && (
                  <div className="mt-7 border-y border-white/12 py-6">
                    <p className="text-xs font-semibold uppercase text-orange-300">A clearer message, in practice</p>
                    <dl className="mt-5 grid gap-6 sm:grid-cols-2">
                      <div><dt className="text-sm text-white/55">Vague</dt><dd className="mt-2 text-lg leading-8 text-white/65">{section.example.before}</dd></div>
                      <div className="border-l-2 border-orange-500/65 pl-5"><dt className="text-sm text-orange-300">More specific</dt><dd className="mt-2 text-lg leading-8 text-white">{section.example.after}</dd></div>
                    </dl>
                    <p className="mt-5 text-sm leading-7 text-white/55">{section.example.note}</p>
                  </div>
                )}
                {section.takeaway && <p className="mt-7 border-l-2 border-orange-400 bg-orange-500/5 px-5 py-4 text-base font-medium leading-8 text-white/90">{section.takeaway}</p>}
              </section>
            ))}

            <section id="questions" className="scroll-mt-28 pt-10 md:pt-14">
              <h2 className="mb-6 text-2xl font-medium text-white md:text-3xl">Common questions</h2>
              <div className="divide-y divide-white/12 border-y border-white/12">
                {guide.questions.map(({ question, answer }) => (
                  <details key={question} className="group py-5">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 font-medium leading-7 text-white marker:content-none focus-visible:outline-2 focus-visible:outline-orange-400 [&::-webkit-details-marker]:hidden">
                      {question}<ChevronDown size={18} className="shrink-0 text-orange-300 group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <p className="mt-4 pr-5 text-base leading-8 text-white/70">{answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <section className="texture-band neon-deep border-y border-orange-500/20 py-12 md:py-16">
        <div className="container-custom flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-orange-300">Apply it to your own business</p>
            <h2 className="mt-3 text-2xl font-medium text-white md:text-3xl">Where is your visitor journey losing clarity?</h2>
            <p className="mt-3 leading-7 text-white/70">Share your LinkedIn profile and website for a focused review. One application, one clear next step. No pressure.</p>
          </div>
          <Link href="/free-audit" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 self-start rounded-lg bg-orange-500 px-6 py-3 text-center font-semibold text-purple-950 transition-colors hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300">
            Request Free Review <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="neon-deep py-12 md:py-16" aria-labelledby="related-resources">
        <div className="container-custom">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <h2 id="related-resources" className="text-2xl font-medium text-white md:text-3xl">Continue the journey</h2>
            <Link href="/resources" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-orange-300 hover:underline">All resources <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <ResourceCards items={related} />
        </div>
      </section>
    </article>
  )
}
