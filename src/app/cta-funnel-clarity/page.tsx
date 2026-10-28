import ResourceGuidePage, { resourceGuideMetadata } from '@/components/resources/ResourceGuidePage'
import { ctaGuide } from '@/data/resourceGuides'

export const metadata = resourceGuideMetadata(ctaGuide)

export default function CTAFunnelClarityPage() {
  return <ResourceGuidePage guide={ctaGuide} />
}
