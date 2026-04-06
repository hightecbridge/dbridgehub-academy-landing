// src/pages/landing/index.tsx
import Hero from './Hero'
import { FeaturesSection, HowSection, PricingSection, TestimonialsSection, FaqSection, ContactSection, CtaBanner } from './Sections'

export default function LandingPage() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <HowSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
      <CtaBanner />
    </>
  )
}
