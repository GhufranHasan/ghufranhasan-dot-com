import ResourceGuidePage, { resourceGuideMetadata } from '@/components/resources/ResourceGuidePage'
import { websiteGuide } from '@/data/resourceGuides'

export const metadata = resourceGuideMetadata(websiteGuide)

export default function WebsiteConversionStrategyPage() {
  return <ResourceGuidePage guide={websiteGuide} />
}
