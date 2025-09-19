"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, BarChart3, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: GraduationCap,
    title: "Student Guidance",
    description: "Discover courses, colleges, and career paths tailored to your interests and goals.",
    color: "text-primary",
  },
  {
    icon: Users,
    title: "Parent Dashboard",
    description: "Track degree benefits and success stories to support your child's future.",
    color: "text-secondary",
  },
  {
    icon: BarChart3,
    title: "Government Insights",
    description: "Data-driven decisions for education policy and resource allocation.",
    color: "text-primary",
  },
]

export function LandingFeatures() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            Empowering Every Stakeholder
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Our platform serves students, parents, and government officials with tailored insights and guidance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <feature.icon className={`h-12 w-12 mx-auto ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground text-pretty">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
