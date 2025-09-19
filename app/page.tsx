import { LandingNavbar } from "@/components/landing-navbar"
import { LandingHero } from "@/components/landing-hero"
import { LandingFeatures } from "@/components/landing-features"
import { LandingAuth } from "@/components/landing-auth"
import { LandingTestimonials } from "@/components/landing-testimonials"
import { LandingFooter } from "@/components/landing-footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <main>
        <LandingHero />
        <LandingFeatures />
        <LandingAuth />
        <LandingTestimonials />
      </main>
      <LandingFooter />
    </div>
  )
}
