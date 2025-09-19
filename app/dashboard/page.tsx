"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { UnifiedSidebar } from "@/components/unified-sidebar"
import { StudentDashboard } from "@/components/student-dashboard"
import { ParentDashboard } from "@/components/parent-dashboard-unified"
import { GovernmentDashboard } from "@/components/government-dashboard-unified"
import { DashboardHeader } from "@/components/dashboard-header"
import { toast } from "sonner"

export default function UnifiedDashboard() {
  const [activeTab, setActiveTab] = useState("student")
  const [language, setLanguage] = useState("en")
  const [userEmail, setUserEmail] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (isInitialized) return

    console.log("[v0] Dashboard useEffect triggered")
    console.log("[v0] Current URL:", window.location.href)
    console.log("[v0] Search params:", searchParams.toString())

    const roleFromUrl = searchParams.get("role")
    const storedRole = localStorage.getItem("userRole")
    const storedEmail = localStorage.getItem("userEmail")

    console.log("[v0] Dashboard loading with:", { roleFromUrl, storedRole, storedEmail })

    // Allow access if either URL role or stored role exists
    if (!storedRole && !roleFromUrl) {
      console.log("[v0] No authentication found, redirecting to home")
      toast.error("Please sign in to access the dashboard")
      setTimeout(() => {
        router.push("/")
      }, 1000)
      return
    }

    const userRole = roleFromUrl || storedRole || "student"
    const email = storedEmail || ""

    // Map admin to government for consistency
    const mappedRole = userRole === "admin" ? "government" : userRole

    console.log("[v0] Setting dashboard role:", mappedRole)

    setActiveTab(mappedRole)
    setUserEmail(email)
    setIsLoading(false)
    setIsInitialized(true)

    // Store the role if it came from URL
    if (roleFromUrl && roleFromUrl !== storedRole) {
      console.log("[v0] Updating stored role from URL:", roleFromUrl)
      localStorage.setItem("userRole", roleFromUrl)
    }

    // Welcome message
    const roleLabel =
      mappedRole === "government" ? "Government Admin" : mappedRole.charAt(0).toUpperCase() + mappedRole.slice(1)
    toast.success(`Welcome to your ${roleLabel} Dashboard!`)
  }, [searchParams, router, isInitialized])

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("userEmail")
    toast.success("Logged out successfully!")
    router.push("/")
  }

  const handleGoHome = () => {
    router.back()
  }

  const renderDashboard = () => {
    switch (activeTab) {
      case "student":
        return <StudentDashboard />
      case "parent":
        return <ParentDashboard />
      case "government":
        return <GovernmentDashboard />
      default:
        return <StudentDashboard />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <UnifiedSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDarkMode={theme === "dark"}
          setIsDarkMode={(mode) => setTheme(mode ? "dark" : "light")}
          language={language}
          setLanguage={setLanguage}
          userEmail={userEmail}
          onLogout={handleLogout}
          onGoHome={handleGoHome}
        />

        <div className="flex-1 flex flex-col">
          <DashboardHeader
            activeTab={activeTab}
            isDarkMode={theme === "dark"}
            setIsDarkMode={(mode) => setTheme(mode ? "dark" : "light")}
            language={language}
            setLanguage={setLanguage}
          />

          <main className="flex-1 p-6 overflow-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderDashboard()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  )
}
