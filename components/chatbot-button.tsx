"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)

  const handleQuickAction = (message: string) => {
    // In a real implementation, this would send the message to the chatbot
    console.log("[v0] Chatbot quick action:", message)
    // For now, just show an alert
    alert(`You asked: "${message}"\n\nThis would normally start a conversation with our AI career advisor!`)
  }

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 sm:w-96">
          <Card className="shadow-2xl border-border/50">
            <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
              <CardTitle className="font-heading text-lg">Career Advisor</CardTitle>
              <p className="text-sm text-primary-foreground/80">Ask me anything about careers and education!</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Hi! I'm your AI career advisor. How can I help you today?
                  </p>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left bg-transparent"
                    onClick={() => handleQuickAction("What career is right for me?")}
                  >
                    What career is right for me?
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left bg-transparent"
                    onClick={() => handleQuickAction("How do I choose a college?")}
                  >
                    How do I choose a college?
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left bg-transparent"
                    onClick={() => handleQuickAction("What skills should I develop?")}
                  >
                    What skills should I develop?
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
