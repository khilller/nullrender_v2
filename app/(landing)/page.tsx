import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import LandingNav from '@/components/landing/LandingNav'
import LandingHero from '@/components/landing/LandingHero'
import LandingContent from '@/components/landing/LandingContent'
import LandingFeatures from '@/components/landing/LandingFeatures'
import FAQ from '@/components/landing/FAQ'
import ContactUs from '@/components/landing/ContactUs'
import Footer from '@/components/landing/Footer'

const LandingPage = () => {
  return (
    <div className='h-full'>
      <LandingNav />
      <LandingHero />
      <LandingFeatures />
      <FAQ />
      <ContactUs />
      <Footer />

    </div>
  )
}

export default LandingPage