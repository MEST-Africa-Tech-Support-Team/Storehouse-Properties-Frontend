import React from 'react'
import AboutUsBanner from '../components/ui/aboutUsBanner.jsx'
import AboutContent from '../components/ui/aboutContent.jsx'
import MissionVisionSection from '../components/ui/visonsMissions.jsx'
import CardFeatures from '../components/property/aboutCardsFeatures.jsx'
import CTA from '../components/property/cta.jsx'

export default function about() {
  return (
    <div>
      <AboutUsBanner />
      <AboutContent />
      <MissionVisionSection />
      <CardFeatures />
      <CTA />
    </div>
  )
}
