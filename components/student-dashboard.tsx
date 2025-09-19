"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, BookOpen, School, TrendingUp, MessageCircle, Play, CheckCircle, Clock, Star } from "lucide-react"

export function StudentDashboard() {
  const [quizProgress, setQuizProgress] = useState(65)
  const [showChatbot, setShowChatbot] = useState(false)
  const router = useRouter()

  const handleStartQuiz = () => {
    router.push("/quiz")
  }

  const handleViewRecommendations = (type: string) => {
    router.push("/recommendations")
  }

  const handleViewCareerPath = () => {
    router.push("/path-visualizer")
  }

  const recommendations = [
    {
      type: "Stream",
      title: "Computer Science",
      description: "Based on your interests in technology and problem-solving",
      match: 95,
      icon: Brain,
    },
    {
      type: "Course",
      title: "B.Tech in AI/ML",
      description: "High demand field with excellent career prospects",
      match: 88,
      icon: BookOpen,
    },
    {
      type: "College",
      title: "IIT Delhi",
      description: "Top-ranked engineering institute",
      match: 82,
      icon: School,
    },
    {
      type: "Career",
      title: "Software Engineer",
      description: "Average salary: ₹12-25 LPA",
      match: 90,
      icon: TrendingUp,
    },
  ]

  const careerPath = [
    { phase: "Class 12", status: "completed", description: "Science Stream with PCM" },
    { phase: "Entrance Exam", status: "current", description: "JEE Main & Advanced" },
    { phase: "B.Tech", status: "upcoming", description: "Computer Science Engineering" },
    { phase: "Internship", status: "upcoming", description: "Software Development" },
    { phase: "Career", status: "upcoming", description: "Software Engineer" },
  ]

  return (
    <div className="space-y-6">
      {/* Career Quiz Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-6 h-6" />
              Career Discovery Quiz
            </CardTitle>
            <CardDescription className="text-blue-100">Complete your personalized career assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Progress: {quizProgress}% Complete</span>
                <Badge variant="secondary">{Math.floor(quizProgress / 10)}/10 Questions</Badge>
              </div>
              <Progress value={quizProgress} className="bg-blue-400" />
              <Button variant="secondary" className="gap-2" onClick={handleStartQuiz}>
                <Play className="w-4 h-4" />
                Continue Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Recommendations */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle>AI Career Recommendations</CardTitle>
            <CardDescription>Personalized suggestions based on your quiz results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((rec, index) => {
                const Icon = rec.icon
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer"
                    onClick={() => handleViewRecommendations(rec.type)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {rec.type}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-green-600 font-medium">{rec.match}% match</span>
                          </div>
                        </div>
                        <h4 className="font-medium">{rec.title}</h4>
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Career Path Visualizer */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card>
          <CardHeader>
            <CardTitle>Your Career Path Timeline</CardTitle>
            <CardDescription>Visualize your journey from current status to career goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {careerPath.map((phase, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      phase.status === "completed"
                        ? "bg-green-500 text-white"
                        : phase.status === "current"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {phase.status === "completed" ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : phase.status === "current" ? (
                      <Clock className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-bold">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{phase.phase}</h4>
                    <p className="text-sm text-muted-foreground">{phase.description}</p>
                  </div>
                  <Badge
                    variant={
                      phase.status === "completed" ? "default" : phase.status === "current" ? "secondary" : "outline"
                    }
                  >
                    {phase.status}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button onClick={handleViewCareerPath} className="gap-2">
                View Detailed Career Path
                <TrendingUp className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Floating Chatbot */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          size="lg"
          className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
          onClick={() => setShowChatbot(!showChatbot)}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </motion.div>
    </div>
  )
}
