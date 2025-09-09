import { HeroSection } from '../components/sections/HeroSection'
import { OurStorySection } from '../components/sections/OurStorySection'
import { FeaturesSection } from '../components/sections/FeaturesSection'

export function HomePage() {
  return (
    <div>
      <HeroSection />
      <OurStorySection />
      <FeaturesSection />
    </div>
  )
}