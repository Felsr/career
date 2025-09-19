"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, CheckCircle, Brain, Target, Lightbulb } from "lucide-react"
import { QuizQuestion } from "./quiz-question"
import { QuizResults } from "./quiz-results"

const quizQuestions = [
  {
    id: 1,
    category: "Interests",
    icon: Brain,
    question: "What type of activities do you enjoy most?",
    options: [
      { id: "a", text: "Solving complex problems and puzzles", value: "analytical" },
      { id: "b", text: "Creating art, music, or writing", value: "creative" },
      { id: "c", text: "Helping and supporting others", value: "social" },
      { id: "d", text: "Leading teams and making decisions", value: "leadership" },
    ],
  },
  {
    id: 2,
    category: "Skills",
    icon: Target,
    question: "Which skill comes most naturally to you?",
    options: [
      { id: "a", text: "Mathematical and logical thinking", value: "analytical" },
      { id: "b", text: "Communication and presentation", value: "social" },
      { id: "c", text: "Innovation and creative thinking", value: "creative" },
      { id: "d", text: "Organization and planning", value: "leadership" },
    ],
  },
  {
    id: 3,
    category: "Work Environment",
    icon: Lightbulb,
    question: "What work environment appeals to you most?",
    options: [
      { id: "a", text: "Quiet office with focus on research", value: "analytical" },
      { id: "b", text: "Creative studio or flexible workspace", value: "creative" },
      { id: "c", text: "Community center or healthcare facility", value: "social" },
      { id: "d", text: "Corporate office or boardroom", value: "leadership" },
    ],
  },
  {
    id: 4,
    category: "Goals",
    icon: Target,
    question: "What motivates you most in your career?",
    options: [
      { id: "a", text: "Discovering new knowledge and solutions", value: "analytical" },
      { id: "b", text: "Expressing creativity and originality", value: "creative" },
      { id: "c", text: "Making a positive impact on people", value: "social" },
      { id: "d", text: "Building successful businesses or teams", value: "leadership" },
    ],
  },
  {
    id: 5,
    category: "Learning Style",
    icon: Brain,
    question: "How do you prefer to learn new things?",
    options: [
      { id: "a", text: "Through research and analysis", value: "analytical" },
      { id: "b", text: "Through hands-on experimentation", value: "creative" },
      { id: "c", text: "Through discussion and collaboration", value: "social" },
      { id: "d", text: "Through practical application and results", value: "leadership" },
    ],
  },
]

export function CareerQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const router = useRouter()

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setIsCompleted(false)
  }

  const handleBackToHome = () => {
    router.back()
  }

  if (isCompleted) {
    return <QuizResults answers={answers} onRestart={handleRestart} />
  }

  const question = quizQuestions[currentQuestion]
  const Icon = question.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" className="gap-2" onClick={handleBackToHome}>
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <Badge variant="secondary" className="gap-2">
              <Icon className="w-4 h-4" />
              {question.category}
            </Badge>
          </div>

          {/* Progress */}
          <div className="space-y-2 mb-8">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">
                {currentQuestion + 1} of {quizQuestions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-3xl mx-auto">
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="font-heading text-2xl sm:text-3xl text-foreground text-balance">
                {question.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <QuizQuestion
                question={question}
                selectedAnswer={answers[question.id]}
                onAnswer={(value) => handleAnswer(question.id, value)}
              />

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="gap-2 bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-2">
                  {quizQuestions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index <= currentQuestion ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>

                <Button onClick={handleNext} disabled={!answers[question.id]} className="gap-2">
                  {currentQuestion === quizQuestions.length - 1 ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Complete Quiz
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
