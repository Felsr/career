"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Brain, Palette, Heart, Users, ArrowRight, RefreshCw, Download, Share2, Home } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

const careerProfiles = {
  analytical: {
    title: "The Analytical Thinker",
    icon: Brain,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    description: "You excel at problem-solving, research, and logical thinking.",
    careers: ["Software Engineer", "Data Scientist", "Research Scientist", "Financial Analyst", "Engineer"],
    strengths: ["Problem Solving", "Critical Thinking", "Research Skills", "Attention to Detail"],
    percentage: 0,
  },
  creative: {
    title: "The Creative Innovator",
    icon: Palette,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    description: "You thrive on creativity, innovation, and artistic expression.",
    careers: ["Graphic Designer", "Content Creator", "Architect", "Marketing Specialist", "Writer"],
    strengths: ["Creativity", "Innovation", "Visual Thinking", "Communication"],
    percentage: 0,
  },
  social: {
    title: "The People Helper",
    icon: Heart,
    color: "text-green-600",
    bgColor: "bg-green-100",
    description: "You are passionate about helping others and making a difference.",
    careers: ["Teacher", "Doctor", "Social Worker", "Counselor", "Nurse"],
    strengths: ["Empathy", "Communication", "Patience", "Teamwork"],
    percentage: 0,
  },
  leadership: {
    title: "The Natural Leader",
    icon: Users,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    description: "You excel at leading teams, making decisions, and driving results.",
    careers: ["Business Manager", "Entrepreneur", "Project Manager", "Sales Director", "CEO"],
    strengths: ["Leadership", "Decision Making", "Strategic Thinking", "Communication"],
    percentage: 0,
  },
}

interface QuizResultsProps {
  answers: Record<number, string>
  onRestart: () => void
}

export function QuizResults({ answers, onRestart }: QuizResultsProps) {
  const router = useRouter()
  const [isDownloading, setIsDownloading] = useState(false)

  // Calculate personality scores
  const scores = Object.values(answers).reduce(
    (acc, answer) => {
      acc[answer] = (acc[answer] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Calculate percentages
  const totalAnswers = Object.keys(answers).length
  Object.keys(careerProfiles).forEach((key) => {
    careerProfiles[key as keyof typeof careerProfiles].percentage = Math.round(
      ((scores[key] || 0) / totalAnswers) * 100,
    )
  })

  // Find primary profile
  const primaryProfile = Object.entries(careerProfiles).sort(([, a], [, b]) => b.percentage - a.percentage)[0]

  const [primaryKey, primary] = primaryProfile
  const PrimaryIcon = primary.icon

  const handleDownloadResults = async () => {
    setIsDownloading(true)
    toast.success("Preparing your career report for download...")

    // Simulate download preparation
    setTimeout(() => {
      toast.success("Career report downloaded successfully!")
      setIsDownloading(false)
      // In a real app, this would generate and download a PDF
      console.log("[v0] Downloading career results PDF")
    }, 2000)
  }

  const handleShareResults = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `My Career Profile: ${primary.title}`,
          text: `I just completed a career assessment and discovered I'm ${primary.title} with ${primary.percentage}% match!`,
          url: window.location.href,
        })
        .then(() => {
          toast.success("Results shared successfully!")
        })
        .catch(() => {
          handleCopyLink()
        })
    } else {
      handleCopyLink()
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast.success("Link copied to clipboard!")
      })
      .catch(() => {
        toast.error("Failed to copy link")
      })
  }

  const handleViewRecommendations = () => {
    // Store quiz results for recommendations page
    localStorage.setItem("quizResults", JSON.stringify({ answers, primaryProfile: primaryKey }))
    router.push("/recommendations")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">Your Career Profile</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Based on your responses, we've identified your career personality and recommended paths
            </p>
          </div>

          {/* Primary Result */}
          <Card className="mb-8 border-border/50 shadow-lg overflow-hidden">
            <CardHeader className={`${primary.bgColor} text-center py-8`}>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <PrimaryIcon className={`w-8 h-8 ${primary.color}`} />
              </div>
              <CardTitle className="font-heading text-2xl sm:text-3xl text-foreground mb-2">{primary.title}</CardTitle>
              <p className="text-muted-foreground text-lg">{primary.description}</p>
              <Badge variant="secondary" className="mt-4 text-lg px-4 py-2">
                {primary.percentage}% Match
              </Badge>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-heading font-semibold text-xl mb-4">Recommended Careers</h3>
                  <div className="space-y-2">
                    {primary.careers.map((career, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="font-medium">{career}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl mb-4">Your Strengths</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {primary.strengths.map((strength, index) => (
                      <Badge key={index} variant="outline" className="justify-center py-2">
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* All Profiles Breakdown */}
          <Card className="mb-8 border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="font-heading text-xl">Complete Personality Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(careerProfiles)
                .sort(([, a], [, b]) => b.percentage - a.percentage)
                .map(([key, profile]) => {
                  const Icon = profile.icon
                  return (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${profile.bgColor}`}>
                            <Icon className={`w-5 h-5 ${profile.color}`} />
                          </div>
                          <span className="font-medium">{profile.title}</span>
                        </div>
                        <span className="font-bold text-primary">{profile.percentage}%</span>
                      </div>
                      <Progress value={profile.percentage} className="h-2" />
                    </div>
                  )
                })}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="outline" className="gap-2 bg-transparent">
              <Link href="/">
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
            <Button size="lg" className="gap-2" onClick={handleViewRecommendations}>
              View Career Recommendations
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 bg-transparent"
              onClick={handleDownloadResults}
              disabled={isDownloading}
            >
              <Download className="w-4 h-4" />
              {isDownloading ? "Preparing..." : "Download Results"}
            </Button>
            <Button variant="outline" size="lg" className="gap-2 bg-transparent" onClick={handleShareResults}>
              <Share2 className="w-4 h-4" />
              Share Results
            </Button>
            <Button variant="ghost" size="lg" onClick={onRestart} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Retake Quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
