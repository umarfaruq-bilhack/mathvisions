import { HeroSection } from '@/components/ui/HeroSection'
import { TickerBar } from '@/components/ui/TickerBar'
import { GalleryPreview } from '@/components/ui/GalleryPreview'
import { PatronIntro } from '@/components/ui/PatronIntro'
import { AlgorithmsSection } from '@/components/ui/AlgorithmsSection'
import { FaqSection } from '@/components/ui/FaqSection'
import { CtaBanner } from '@/components/ui/CtaBanner'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TickerBar />
      <GalleryPreview />
      <PatronIntro />
      <AlgorithmsSection />
      <FaqSection />
      <CtaBanner />
    </>
  )
}
