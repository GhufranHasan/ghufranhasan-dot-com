import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Eye,
  FileSearch,
  Lightbulb,
  Link2,
  ListChecks,
  Route,
  Scale,
  ShieldCheck,
  Target,
} from 'lucide-react'
import SectionBadge from '@/components/ui/SectionBadge'
import {
  comparisonCriteria,
  practicalLessons,
  scoreCriteria,
  websiteExamples,
} from '@/data/linkedinWebsiteExamples'

const pageTitle = 'Best LinkedIn Personal Brand Website Examples Compared'
const pageDescription = 'A conversion-focused comparison of LinkedIn personal brand websites, including positioning, proof, CTA flow, pricing clarity, and funnel structure.'
const pageUrl = 'https://ghufranhasan.com/linkedin-website-examples'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/linkedin-website-examples',
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    type: 'article',
    images: [
      {
        url: '/images/profile.png',
        width: 1200,
        height: 630,
        alt: 'Ghufran Hasan LinkedIn website comparison study',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: ['/images/profile.png'],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What I Learned by Studying 9 LinkedIn Personal Brand Websites',
  description: pageDescription,
  url: pageUrl,
  datePublished: '2026-06-06',
  dateModified: '2026-06-06',
  author: {
    '@type': 'Person',
    name: 'Ghufran Hasan',
    url: 'https://ghufranhasan.com',
  },
  publisher: {
    '@type': 'Person',
    name: 'Ghufran Hasan',
    url: 'https://ghufranhasan.com',
  },
  mainEntityOfPage: pageUrl,
  about: [
    'LinkedIn personal brand websites',
    'website conversion strategy',
    'LinkedIn-to-website funnels',
  ],
}

export default function LinkedInWebsiteExamplesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c'),
        }}
      />

      <article className="pt-20">
        <header className="texture-grid neon-deep relative overflow-hidden border-b border-orange-500/20 py-20 md:py-28">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-orange-500/70 to-transparent" />
          <div className="container-custom relative z-10">
            <div className="mx-auto max-w-5xl text-center">
              <SectionBadge icon={FileSearch} className="mb-6">Conversion study</SectionBadge>
              <h1 className="text-4xl font-bebas leading-tight text-white md:text-6xl lg:text-7xl">
                What I Learned by Studying 9 LinkedIn Personal Brand Websites
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/72 md:text-lg">
                A practical breakdown of how LinkedIn-led websites communicate positioning, build trust, explain offers, and move visitors toward a business conversation.
              </p>

              <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-orange-500/20 bg-orange-500/8 p-4">
                  <p className="text-2xl font-bold text-orange-400">9</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-white/60">Public websites</p>
                </div>
                <div className="rounded-xl border border-orange-500/20 bg-orange-500/8 p-4">
                  <p className="text-2xl font-bold text-orange-400">6</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-white/60">Conversion criteria</p>
                </div>
                <div className="rounded-xl border border-orange-500/20 bg-orange-500/8 p-4">
                  <p className="text-2xl font-bold text-orange-400">1</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-white/60">Practical goal</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="#comparison"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-6 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-glow-hover"
                >
                  See the comparison
                  <ArrowRight size={17} />
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-orange-500 px-6 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-orange-500/10 hover:shadow-glow"
                >
                  Audit my website path
                </Link>
              </div>

              <p className="mt-7 text-sm text-white/50">Study based on public-facing website content reviewed on June 6, 2026.</p>
            </div>
          </div>
        </header>

        <section className="texture-dots neon-purple py-20 md:py-24">
          <div className="container-custom">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div>
                <SectionBadge icon={Scale} className="mb-5">Methodology</SectionBadge>
                <h2 className="text-3xl font-bebas text-white md:text-5xl">A strategic review, not a criticism</h2>
                <p className="mt-5 leading-relaxed text-white/70">
                  I reviewed the public-facing content of these websites to understand what helps a LinkedIn visitor become a confident buyer. The study does not use private analytics, backend performance, client data, or complete interaction testing.
                </p>
                <div className="mt-6 rounded-xl border border-orange-500/25 bg-orange-500/8 p-5">
                  <div className="flex gap-3">
                    <ShieldCheck size={20} className="mt-0.5 shrink-0 text-orange-400" />
                    <p className="text-sm leading-relaxed text-white/72">
                      Each observation highlights a strength, an opportunity, and a practical lesson. The goal is to learn from different approaches, not declare one universal winner.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {comparisonCriteria.map((criterion, index) => (
                  <div key={criterion.title} className="glass-card border-orange-500/20 p-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                        <ListChecks size={18} />
                      </span>
                      <span className="text-xs font-bold text-white/35">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="font-bold text-white">{criterion.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{criterion.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="comparison" className="texture-band neon-deep scroll-mt-24 py-20 md:py-24">
          <div className="container-custom">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <SectionBadge icon={Eye} className="mb-5">Comparison overview</SectionBadge>
              <h2 className="text-3xl font-bebas text-white md:text-5xl">Nine different ways to turn attention into action</h2>
              <p className="mt-4 text-white/68">
                Each website wins attention differently. The useful question is whether its positioning, offer, proof, and CTA work together for the intended buyer.
              </p>
            </div>

            <div className="md:overflow-hidden md:rounded-2xl md:border md:border-orange-500/20">
              <table className="block w-full table-fixed border-separate border-spacing-0 md:table">
                <caption className="sr-only">Comparison of nine LinkedIn personal brand websites</caption>
                <colgroup>
                  <col className="md:w-[18%]" />
                  <col className="md:w-[25%]" />
                  <col className="md:w-[25%]" />
                  <col className="md:w-[32%]" />
                </colgroup>
                <thead className="sr-only md:not-sr-only md:table-header-group">
                  <tr className="bg-linear-to-r from-purple-900/80 to-orange-500/15">
                    <th scope="col" className="p-4 text-left text-sm font-bold text-white">Website</th>
                    <th scope="col" className="p-4 text-left text-sm font-bold text-white">Positioning</th>
                    <th scope="col" className="p-4 text-left text-sm font-bold text-white">Core offer</th>
                    <th scope="col" className="p-4 text-left text-sm font-bold text-orange-300">Strongest advantage</th>
                  </tr>
                </thead>
                <tbody className="grid gap-4 md:table-row-group">
                  {websiteExamples.map((site, index) => (
                    <tr
                      key={site.name}
                      className="glass-card block overflow-hidden border-orange-500/20 md:table-row md:overflow-visible md:rounded-none md:border-0 md:bg-transparent md:shadow-none md:backdrop-blur-none"
                    >
                      <th
                        scope="row"
                        className="block border-b border-orange-500/15 bg-orange-500/10 p-5 text-left md:table-cell md:border-t md:border-b-0 md:border-orange-500/10 md:bg-transparent md:p-4 md:align-top"
                      >
                        <span className="block text-xs font-semibold uppercase tracking-wider text-orange-300/80 md:hidden">
                          Example {String(index + 1).padStart(2, '0')}
                        </span>
                        <a
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center gap-2 font-bold text-white transition-colors hover:text-orange-300 md:mt-0"
                        >
                          {site.name}
                          <ExternalLink size={14} />
                        </a>
                      </th>
                      <td
                        data-label="Positioning"
                        className="block p-5 before:mb-2 before:block before:text-xs before:font-semibold before:uppercase before:tracking-wider before:text-white/45 before:content-[attr(data-label)] md:table-cell md:border-t md:border-orange-500/10 md:p-4 md:align-top md:before:hidden"
                      >
                        <p className="text-sm leading-relaxed text-white/68">{site.positioning}</p>
                      </td>
                      <td
                        data-label="Core offer"
                        className="block border-t border-orange-500/10 p-5 before:mb-2 before:block before:text-xs before:font-semibold before:uppercase before:tracking-wider before:text-white/45 before:content-[attr(data-label)] md:table-cell md:border-t md:border-orange-500/10 md:p-4 md:align-top md:before:hidden"
                      >
                        <p className="text-sm leading-relaxed text-white/68">{site.offer}</p>
                      </td>
                      <td
                        data-label="Strongest advantage"
                        className="block border-t border-orange-500/15 bg-orange-500/[0.06] p-5 before:mb-2 before:block before:text-xs before:font-semibold before:uppercase before:tracking-wider before:text-orange-300 before:content-[attr(data-label)] md:table-cell md:border-t md:border-l-2 md:border-orange-500 md:bg-orange-500/5 md:p-4 md:align-top md:before:hidden"
                      >
                        <p className="text-sm leading-relaxed text-white/78">{site.strongestAdvantage}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="texture-band neon-orange py-20 md:py-24">
          <div className="container-custom">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <SectionBadge icon={Scale} className="mb-5">Editorial scorecards</SectionBadge>
              <h2 className="text-3xl font-bebas text-white md:text-5xl">All conversion criteria scored out of 10</h2>
              <p className="mt-4 text-white/68">
                These scores are my editorial assessment of public-facing website content. They do not measure private analytics, client results, backend performance, or the complete customer experience.
              </p>
            </div>

            <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
              {websiteExamples.map((site) => (
                <section key={site.name} className="glass-card overflow-hidden border-orange-500/20">
                  <div className="flex items-center justify-between gap-4 border-b border-orange-500/20 bg-orange-500/8 p-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">Editorial assessment</p>
                      <h3 className="mt-1 text-2xl font-bebas text-white">{site.name}</h3>
                    </div>
                    <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl border border-orange-500/35 bg-orange-500/12">
                      <span className="text-xl font-bold text-orange-300">{site.scores.overall.toFixed(1)}</span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Overall</span>
                    </div>
                  </div>

                  <div className="grid gap-x-6 gap-y-4 p-5 sm:grid-cols-2">
                    {scoreCriteria.map((criterion) => {
                      const score = site.scores[criterion.key]

                      return (
                        <div key={criterion.key}>
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <span className="text-xs font-semibold text-white/70">{criterion.label}</span>
                            <span className="text-xs font-bold text-orange-300">{score.toFixed(1)}</span>
                          </div>
                          <div
                            className="h-1.5 overflow-hidden rounded-full bg-white/8"
                            role="meter"
                            aria-label={`${site.name} ${criterion.label} score`}
                            aria-valuemin={0}
                            aria-valuemax={10}
                            aria-valuenow={score}
                          >
                            <div
                              className="h-full rounded-full bg-linear-to-r from-orange-500 to-orange-300"
                              style={{ width: `${score * 10}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>

            <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-white/55">
              Overall scores summarize the full editorial review. They are shown for comparison clarity, not as a definitive ranking of the people, businesses, or results behind these websites.
            </p>
          </div>
        </section>

        <section className="texture-grid neon-magenta py-20 md:py-24">
          <div className="container-custom">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <SectionBadge icon={Target} className="mb-5">Individual breakdowns</SectionBadge>
              <h2 className="text-3xl font-bebas text-white md:text-5xl">What each website does especially well</h2>
              <p className="mt-4 text-white/68">A balanced look at the strength, strategic opportunity, and transferable lesson from every example.</p>
            </div>

            <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-2">
              {websiteExamples.map((site, index) => (
                <section key={site.name} className="glass-card border-orange-500/20 p-6 md:p-7">
                  <div className="flex items-start justify-between gap-4 border-b border-orange-500/15 pb-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">Example {String(index + 1).padStart(2, '0')}</p>
                      <h3 className="mt-2 text-2xl font-bebas text-white">{site.name}</h3>
                      <p className="mt-1 text-sm text-white/55">{site.audience}</p>
                    </div>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${site.name}`}
                      title={`Visit ${site.name}`}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-orange-500/25 bg-orange-500/10 text-orange-300 transition-colors hover:bg-orange-500/20 hover:text-white"
                    >
                      <ExternalLink size={17} />
                    </a>
                  </div>

                  <div className="divide-y divide-orange-500/15">
                    <div className="py-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">Strongest advantage</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/72">{site.strongestAdvantage}</p>
                    </div>
                    <div className="py-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">Strategic opportunity</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/72">{site.opportunity}</p>
                    </div>
                    <div className="pt-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">Lesson to apply</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/82">{site.lesson}</p>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="texture-dots neon-purple py-20 md:py-24">
          <div className="container-custom">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
              <div>
                <SectionBadge icon={Lightbulb} className="mb-5">Lessons learned</SectionBadge>
                <h2 className="text-3xl font-bebas text-white md:text-5xl">What founders can apply to their own website</h2>
                <p className="mt-5 leading-relaxed text-white/68">
                  Strong personal-brand websites do more than look polished. They help the right visitor understand the promise, trust the offer, and take a relevant next step.
                </p>
              </div>
              <div className="grid gap-3">
                {practicalLessons.map((lesson) => (
                  <div key={lesson} className="flex items-start gap-3 rounded-xl border border-orange-500/20 bg-orange-500/6 p-4">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-orange-400" />
                    <p className="text-sm leading-relaxed text-white/75">{lesson}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="texture-band neon-deep py-20 md:py-24">
          <div className="container-custom">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="rounded-2xl border border-orange-500/25 bg-purple-950/45 p-7 shadow-glow md:p-8">
                <div className="flex items-center gap-3 text-orange-300">
                  <Route size={21} />
                  <span className="text-xs font-semibold uppercase tracking-wider">My positioning angle</span>
                </div>
                <h2 className="mt-5 text-3xl font-bebas text-white md:text-5xl">
                  LinkedIn attention should continue into an owned conversion path.
                </h2>
                <p className="mt-5 leading-relaxed text-white/70">
                  My approach focuses specifically on the bridge between LinkedIn discovery and website action: keeping the promise consistent, organizing trust, clarifying the offer, and guiding visitors toward one useful next step.
                </p>
                <div className="mt-6 flex items-center gap-3 rounded-xl border border-orange-500/20 bg-orange-500/8 p-4 text-sm text-white/72">
                  <Link2 size={18} className="shrink-0 text-orange-400" />
                  LinkedIn creates attention. Your website protects and converts it.
                </div>
              </div>

              <div className="text-center lg:text-left">
                <SectionBadge icon={FileSearch} className="mb-5">Apply the study</SectionBadge>
                <h2 className="text-3xl font-bebas text-white md:text-5xl">Find the first conversion gap in your own path</h2>
                <p className="mt-5 max-w-xl leading-relaxed text-white/68 lg:max-w-none">
                  You do not need to copy another personal-brand website. You need to understand where your LinkedIn-to-website journey loses clarity, trust, or action.
                </p>
                <Link
                  href="/#contact"
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-7 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-glow-hover"
                >
                  Request My Free Funnel Audit
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  )
}
