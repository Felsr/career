"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer",
    company: "Tech Corp",
    image: "/young-indian-professional.png",
    quote: "The career guidance helped me choose the right engineering path. Now I'm working at my dream company!",
  },
  {
    name: "Rahul Kumar",
    role: "Data Scientist",
    company: "Analytics Inc",
    image: "/placeholder-b362l.png",
    quote: "From a government college to a top tech role - this platform showed me the possibilities.",
  },
  {
    name: "Anita Patel",
    role: "Business Analyst",
    company: "Finance Solutions",
    image: "/placeholder-adtow.png",
    quote: "The parent dashboard helped my family understand the value of higher education. Best decision ever!",
  },
  {
    name: "Vikram Singh",
    role: "Product Manager",
    company: "Innovation Labs",
    image: "/placeholder-btme0.png",
    quote: "Clear career paths and realistic expectations - exactly what students need to succeed.",
  },
]

export function LandingTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">Success Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Hear from alumni who transformed their careers with the right guidance
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative h-64 overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: index === currentIndex ? 1 : 0,
                  x: index === currentIndex ? 0 : 100,
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Card className="h-full">
                  <CardContent className="p-8 h-full flex flex-col justify-center">
                    <blockquote className="text-lg text-center text-foreground mb-6 text-pretty">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center justify-center space-x-4">
                      <Avatar>
                        <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                        <AvatarFallback>
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
