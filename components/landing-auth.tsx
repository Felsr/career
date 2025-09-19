"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { toast } from "sonner"

export function LandingAuth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent, userType: string) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (authMode === "signup" && password !== confirmPassword) {
        toast.error("Passwords do not match!")
        setIsLoading(false)
        return
      }

      console.log(`[v0] Starting ${authMode} for:`, userType)

      // Simulate authentication delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store user role in localStorage for dashboard access
      localStorage.setItem("userRole", userType)
      localStorage.setItem("userEmail", email)

      console.log("[v0] Stored user data:", { userType, email })

      const successMessage =
        authMode === "signup"
          ? `Account created! Welcome to your ${userType} dashboard...`
          : `Welcome back! Redirecting to your ${userType} dashboard...`

      toast.success(successMessage)

      setTimeout(() => {
        router.push(`/dashboard?role=${userType}`)
      }, 1500)
    } catch (error) {
      console.log("[v0] Authentication error:", error)
      toast.error(`${authMode === "signup" ? "Sign up" : "Sign in"} failed. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = (userType: string) => {
    setIsLoading(true)
    console.log(`[v0] Google ${authMode} for:`, userType)

    setTimeout(() => {
      localStorage.setItem("userRole", userType)
      localStorage.setItem("userEmail", "user@gmail.com")

      const successMessage =
        authMode === "signup"
          ? `Account created with Google! Welcome to your ${userType} dashboard...`
          : `Welcome back! Redirecting to your ${userType} dashboard...`

      toast.success(successMessage)

      setTimeout(() => {
        router.push(`/dashboard?role=${userType}`)
      }, 1000)
    }, 1000)
  }

  return (
    <section className="py-20" id="auth">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Get Started Today</h2>
            <p className="text-muted-foreground">Choose your role and begin your journey</p>
          </div>

          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
            <CardHeader className="relative">
              <CardTitle className="text-center">
                <div className="flex gap-2 mb-4">
                  <Button
                    variant={authMode === "signin" ? "default" : "outline"}
                    onClick={() => setAuthMode("signin")}
                    className="flex-1"
                  >
                    Sign In
                  </Button>
                  <Button
                    variant={authMode === "signup" ? "default" : "outline"}
                    onClick={() => setAuthMode("signup")}
                    className="flex-1"
                  >
                    Sign Up
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <Tabs defaultValue="student" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="student">Student</TabsTrigger>
                  <TabsTrigger value="parent">Parent</TabsTrigger>
                  <TabsTrigger value="admin">Govt Admin</TabsTrigger>
                </TabsList>

                {[
                  { value: "student", label: "Student" },
                  { value: "parent", label: "Parent" },
                  { value: "admin", label: "Government Admin" },
                ].map((userType) => (
                  <TabsContent key={userType.value} value={userType.value}>
                    <form onSubmit={(e) => handleSubmit(e, userType.value)} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`${userType.value}-email`}>Email</Label>
                        <Input
                          id={`${userType.value}-email`}
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${userType.value}-password`}>Password</Label>
                        <Input
                          id={`${userType.value}-password`}
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          disabled={isLoading}
                        />
                      </div>
                      {authMode === "signup" && (
                        <div className="space-y-2">
                          <Label htmlFor={`${userType.value}-confirm-password`}>Confirm Password</Label>
                          <Input
                            id={`${userType.value}-confirm-password`}
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={isLoading}
                          />
                        </div>
                      )}
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading
                          ? `${authMode === "signup" ? "Creating Account..." : "Signing In..."}`
                          : `${authMode === "signup" ? "Create Account" : "Sign In"} as ${userType.label}`}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => handleGoogleSignIn(userType.value)}
                        disabled={isLoading}
                      >
                        {isLoading
                          ? `${authMode === "signup" ? "Creating Account..." : "Signing In..."}`
                          : `${authMode === "signup" ? "Sign Up" : "Continue"} with Google`}
                      </Button>
                    </form>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
