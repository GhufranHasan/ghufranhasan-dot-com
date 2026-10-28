import { createPageMetadata } from '@/lib/seo/metadata'
import Link from 'next/link'
import { ArrowRight, BookOpenText } from 'lucide-react'
import ResourcePageHeader from '@/components/resources/ResourcePageHeader'
import ResourceCards from '@/components/resources/ResourceCards'
import ResourceCollectionSchema from '@/components/resources/ResourceCollectionSchema'
import { guideSocialImage, resourceGuides, resourceTools, websiteGuide } from '@/data/resourceGuides'

export const metadata = createPageMetadata({
  title: 'Blog | LinkedIn-to-Website Conversion Resources',
  description: 'Practical guides to LinkedIn profile positioning, website conversion strategy, and CTA clarity, plus a free funnel checklist and website comparison study.',
  path: "/blog",
  image: guideSocialImage(websiteGuide),
})

export default function BlogPage() {
  return (
    <article className="pt-20">
      <ResourceCollectionSchema name="LinkedIn-to-Website Conversion Blog" path="/blog" items={[...resourceGuides, ...resourceTools]} />
      <ResourcePageHeader
        title="LinkedIn-to-website field notes."
        description="Practical field notes on what happens between a LinkedIn profile visit and a website enquiry. Start with the part of your journey that needs attention."
        badge="Blog and resources"
        icon={BookOpenText}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }]}
        image={resourceTools[1].headerImage}
        imageAlt="Transparent 3D website panels and a magnifying glass illustrating practical website analysis."
      >
            <Link href="/resources/linkedin-website-funnel-checklist" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-orange-300 hover:underline">
              Not sure where to start? Use the free checklist <ArrowRight size={17} aria-hidden="true" />
            </Link>
      </ResourcePageHeader>

      <section className="texture-dots neon-purple py-12 md:py-16" aria-labelledby="practical-guides">
        <div className="container-custom">
          <p className="text-sm font-semibold text-orange-300">The three handoffs</p>
          <h2 id="practical-guides" className="mb-7 mt-2 text-2xl font-medium text-white md:text-3xl">Profile. Website. Next step.</h2>
          <ResourceCards items={resourceGuides} eagerImages={3} />
        </div>
      </section>
      <section className="neon-deep border-t border-white/10 py-12 md:py-16" aria-labelledby="practical-tools">
        <div className="container-custom">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <h2 id="practical-tools" className="text-2xl font-medium text-white md:text-3xl">Put the ideas into practice</h2>
            <Link href="/resources" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-orange-300 hover:underline">All resources <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          <ResourceCards items={resourceTools} />
        </div>
      </section>
    </article>
  )
}
