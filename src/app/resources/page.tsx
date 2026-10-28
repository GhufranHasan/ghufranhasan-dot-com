import { createPageMetadata } from '@/lib/seo/metadata'
import Link from 'next/link'
import { ArrowRight, Library } from 'lucide-react'
import ResourcePageHeader from '@/components/resources/ResourcePageHeader'
import ResourceCards from '@/components/resources/ResourceCards'
import ResourceCollectionSchema from '@/components/resources/ResourceCollectionSchema'
import { resourceGuides, resourceTools } from '@/data/resourceGuides'

const pageTitle = 'LinkedIn-to-Website Conversion Resources'
const pageDescription = 'Practical resources for auditing your website, studying LinkedIn personal brand websites, and turning LinkedIn attention into qualified website leads.'

export const metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/resources",
  image: { url: '/images/resources/funnel-checklist-cover-3d-social.jpg', width: 1200, height: 630, alt: resourceTools[0].imageAlt },
})

export default function ResourcesPage() {
  return (
    <article className="pt-20">
      <ResourceCollectionSchema name={pageTitle} path="/resources" items={[...resourceTools, ...resourceGuides]} />
      <ResourcePageHeader
        title="LinkedIn-to-website conversion resources."
        description="A focused library for LinkedIn-active service businesses. Diagnose the journey with a checklist, study public examples, or explore one of the three practical guides."
        badge="Resources"
        icon={Library}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Resources', href: '/resources' }]}
        image={resourceTools[0].headerImage}
        imageAlt="Transparent 3D workbook, checklist clipboard, and orange pen for the resource library."
      />

      <section className="texture-dots neon-purple py-12 md:py-16" aria-labelledby="resource-tools">
        <div className="container-custom">
          <p className="text-sm font-semibold text-orange-300">Start with a diagnosis</p>
          <h2 id="resource-tools" className="mb-7 mt-2 text-2xl font-medium text-white md:text-3xl">See the journey with fresh eyes</h2>
          <ResourceCards items={resourceTools} eagerImages={2} />
        </div>
      </section>
      <section className="neon-deep border-t border-white/10 py-12 md:py-16" aria-labelledby="resource-guides">
        <div className="container-custom">
          <p className="text-sm font-semibold text-orange-300">Go deeper, one handoff at a time</p>
          <h2 id="resource-guides" className="mb-7 mt-2 text-2xl font-medium text-white md:text-3xl">From first impression to enquiry</h2>
          <ResourceCards items={resourceGuides} />
        </div>
      </section>
      <section className="texture-band neon-deep border-t border-orange-500/20 py-12 md:py-16">
        <div className="container-custom flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-medium text-white md:text-3xl">Want a review of your own website?</h2>
            <p className="mt-3 leading-7 text-white/70">Share your LinkedIn profile and website. I will look for the first conversion gap worth fixing.</p>
          </div>
          <Link href="/free-audit" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-orange-500 px-6 py-3 font-semibold text-purple-950 hover:bg-orange-600">
            Request Free Review <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </article>
  )
}
