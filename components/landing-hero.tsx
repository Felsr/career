"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Rocket } from "lucide-react"
import { motion } from "framer-motion"

export function LandingHero() {
  const scrollToAuth = () => {
    const authSection = document.getElementById("auth")
    if (authSection) {
      authSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const handleGetStarted = () => {
    scrollToAuth()
  }

  const handleSignIn = () => {
    scrollToAuth()
  }

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 text-balance">
              Shape Your Future with the Right Guidance{" "}
              <span className="inline-block">
                <Rocket className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-secondary" />
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl">
              Personalized education and career advisor for Students, Parents, and Government. Discover your ideal path
              with AI-powered recommendations and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handleGetStarted}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={handleSignIn}>
                Sign In
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 lg:p-12">
              <img
                src="/placeholder-fjgm1.png"
                alt="Students learning"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <div className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground rounded-full p-3">
                <Rocket className="h-6 w-6" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
