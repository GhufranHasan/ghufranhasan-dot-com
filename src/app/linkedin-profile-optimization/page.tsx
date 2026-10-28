import ResourceGuidePage, { resourceGuideMetadata } from '@/components/resources/ResourceGuidePage'
import { profileGuide } from '@/data/resourceGuides'

export const metadata = resourceGuideMetadata(profileGuide)

export default function LinkedInProfileOptimizationPage() {
  return <ResourceGuidePage guide={profileGuide} />
}
