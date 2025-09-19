"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Download, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"

interface DashboardHeaderProps {
  activeTab: string
  isDarkMode: boolean
  setIsDarkMode: (mode: boolean) => void
  language: string
  setLanguage: (lang: string) => void
}

export function DashboardHeader({ activeTab }: DashboardHeaderProps) {
  const getHeaderTitle = () => {
    switch (activeTab) {
      case "student":
        return "Student Dashboard"
      case "parent":
        return "Parent Dashboard"
      case "government":
        return "Government Dashboard"
      default:
        return "Dashboard"
    }
  }

  const getHeaderDescription = () => {
    switch (activeTab) {
      case "student":
        return "Discover your career path and educational opportunities"
      case "parent":
        return "Guide your child's educational journey"
      case "government":
        return "Monitor educational trends and analytics"
      default:
        return "Welcome to your dashboard"
    }
  }

  return (
    <header className="bg-card border-b border-border p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-poppins">{getHeaderTitle()}</h1>
          <p className="text-muted-foreground">{getHeaderDescription()}</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-10 w-64" />
          </div>

          {/* Notifications */}
          <Button variant="outline" size="icon" className="relative bg-transparent">
            <Bell className="w-4 h-4" />
            <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs">3</Badge>
          </Button>

          {/* Export (for government dashboard) */}
          {activeTab === "government" && (
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export
            </Button>
          )}

          {/* Filter */}
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
