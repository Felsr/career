"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

interface QuizQuestionProps {
  question: {
    id: number
    question: string
    options: Array<{
      id: string
      text: string
      value: string
    }>
  }
  selectedAnswer?: string
  onAnswer: (value: string) => void
}

export function QuizQuestion({ question, selectedAnswer, onAnswer }: QuizQuestionProps) {
  return (
    <div className="space-y-3">
      {question.options.map((option) => {
        const isSelected = selectedAnswer === option.value

        return (
          <Button
            key={option.id}
            variant={isSelected ? "default" : "outline"}
            className={`w-full p-6 h-auto text-left justify-start relative group transition-all duration-200 ${
              isSelected
                ? "bg-primary text-primary-foreground border-primary shadow-md"
                : "hover:border-primary/50 hover:bg-primary/5"
            }`}
            onClick={() => onAnswer(option.value)}
          >
            <div className="flex items-center gap-4 w-full">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  isSelected
                    ? "border-primary-foreground bg-primary-foreground"
                    : "border-muted-foreground group-hover:border-primary"
                }`}
              >
                <span
                  className={`text-sm font-bold ${
                    isSelected ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                  }`}
                >
                  {option.id.toUpperCase()}
                </span>
              </div>

              <span
                className={`flex-1 text-base leading-relaxed ${
                  isSelected ? "text-primary-foreground" : "text-foreground"
                }`}
              >
                {option.text}
              </span>

              {isSelected && <CheckCircle className="w-5 h-5 text-primary-foreground" />}
            </div>
          </Button>
        )
      })}
    </div>
  )
}
