"use client"

import { useState } from "react"
import { ParentSidebar } from "@/components/parent-sidebar"
import { WelcomeBanner } from "@/components/welcome-banner"
import { DegreeComparison } from "@/components/degree-comparison"
import { ParentSuccessStories } from "@/components/parent-success-stories"
import { CareerOutcomeExplorer } from "@/components/career-outcome-explorer"
import { ParentResources } from "@/components/parent-resources"
import { Button } from "@/components/ui/button"

export default function ParentDashboard() {
  const [activeSection, setActiveSection] = useState("home")
  const [simplifiedMode, setSimplifiedMode] = useState(false)

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return (
          <div className="space-y-8">
            <WelcomeBanner simplifiedMode={simplifiedMode} />
            <DegreeComparison simplifiedMode={simplifiedMode} />
            <ParentSuccessStories simplifiedMode={simplifiedMode} />
          </div>
        )
      case "comparison":
        return <DegreeComparison simplifiedMode={simplifiedMode} />
      case "stories":
        return <ParentSuccessStories simplifiedMode={simplifiedMode} />
      case "explorer":
        return <CareerOutcomeExplorer simplifiedMode={simplifiedMode} />
      case "resources":
        return <ParentResources simplifiedMode={simplifiedMode} />
      default:
        return (
          <div className="space-y-8">
            <WelcomeBanner simplifiedMode={simplifiedMode} />
            <DegreeComparison simplifiedMode={simplifiedMode} />
            <ParentSuccessStories simplifiedMode={simplifiedMode} />
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <ParentSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <div className="flex-1 ml-64">
        <header className="bg-card border-b border-border p-4 flex justify-between items-center">
          <h1 className="text-2xl font-heading font-semibold text-foreground">Parent Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Simplified Mode</span>
              <Button
                variant={simplifiedMode ? "default" : "outline"}
                size="sm"
                onClick={() => setSimplifiedMode(!simplifiedMode)}
                className="h-8"
              >
                {simplifiedMode ? "ON" : "OFF"}
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
