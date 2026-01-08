import React from 'react'
import AboutUsBanner from '../components/ui/aboutUsBanner.jsx'
import AboutContent from '../components/ui/aboutContent.jsx'
import MissionVisionSection from '../components/ui/visonsMissions.jsx'

export default function about() {
  return (
    <div>
      <AboutUsBanner />
      <AboutContent />
      <MissionVisionSection />
    </div>
  )
}
