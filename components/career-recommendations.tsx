"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Sparkles, TrendingUp, MapPin, BookOpen, Users } from "lucide-react"
import { RecommendedStream } from "./recommended-stream"
import { CourseRecommendations } from "./course-recommendations"
import { CollegeRecommendations } from "./college-recommendations"
import { CareerPaths } from "./career-paths"

export function CareerRecommendations() {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  const handleBackToHome = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-2" onClick={handleBackToHome}>
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h1 className="font-heading font-bold text-xl text-foreground">Your Personalized Recommendations</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* AI Summary Card */}
          <Card className="mb-8 border-border/50 shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="font-heading text-xl text-foreground">AI-Powered Analysis Complete</CardTitle>
                  <p className="text-muted-foreground">
                    Based on your quiz responses, here are your personalized recommendations
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Best Match</h3>
                  <p className="text-muted-foreground text-sm">Science Stream with 92% compatibility</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Top Courses</h3>
                  <p className="text-muted-foreground text-sm">15 recommended courses found</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-chart-2/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Nearby Colleges</h3>
                  <p className="text-muted-foreground text-sm">8 government colleges in your area</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-muted/50">
              <TabsTrigger value="overview" className="gap-2">
                <TrendingUp className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="courses" className="gap-2">
                <BookOpen className="w-4 h-4" />
                Courses
              </TabsTrigger>
              <TabsTrigger value="colleges" className="gap-2">
                <MapPin className="w-4 h-4" />
                Colleges
              </TabsTrigger>
              <TabsTrigger value="careers" className="gap-2">
                <Users className="w-4 h-4" />
                Careers
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <RecommendedStream />
            </TabsContent>

            <TabsContent value="courses" className="space-y-6">
              <CourseRecommendations />
            </TabsContent>

            <TabsContent value="colleges" className="space-y-6">
              <CollegeRecommendations />
            </TabsContent>

            <TabsContent value="careers" className="space-y-6">
              <CareerPaths />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
