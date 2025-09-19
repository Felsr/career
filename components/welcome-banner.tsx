"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Sprout } from "lucide-react"

interface WelcomeBannerProps {
  simplifiedMode: boolean
}

export function WelcomeBanner({ simplifiedMode }: WelcomeBannerProps) {
  return (
    <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
      <CardContent className="p-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Sprout className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              Guidance for Your Child's Future 🌱
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {simplifiedMode
                ? "Help your child choose the right path for their future. We make it simple to understand different career options."
                : "Welcome to your comprehensive guide for supporting your child's educational and career journey. Explore data-driven insights, success stories, and resources to make informed decisions together."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
