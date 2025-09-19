"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Building2,
  Home,
  Settings,
  Moon,
  Sun,
  Globe,
  ChevronDown,
  Heart,
  BarChart3,
  LogOut,
  Lock,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { useTheme } from "next-themes"
import { AnalyticsModal } from "./analytics-modal"
import { SettingsModal } from "./settings-modal"

interface UnifiedSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  isDarkMode: boolean
  setIsDarkMode: (mode: boolean) => void
  language: string
  setLanguage: (lang: string) => void
  userEmail: string
  onLogout: () => void
  onGoHome: () => void
}

export function UnifiedSidebar({
  activeTab,
  setActiveTab,
  isDarkMode,
  setIsDarkMode,
  language,
  setLanguage,
  userEmail,
  onLogout,
  onGoHome,
}: UnifiedSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [userRole, setUserRole] = useState<string>("")
  const [allowedRoles, setAllowedRoles] = useState<string[]>([])
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [mounted, setMounted] = useState(false)

  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") || ""
    setUserRole(storedRole)

    const roleAccessMap: Record<string, string[]> = {
      student: ["student"],
      parent: ["parent"],
      government: ["government"],
      admin: ["government"],
    }

    setAllowedRoles(roleAccessMap[storedRole] || [])
    setMounted(true)
  }, [])

  const tabs = [
    { id: "student", label: "Student", icon: GraduationCap, color: "bg-blue-500" },
    { id: "parent", label: "Parent", icon: Heart, color: "bg-green-500" },
    { id: "government", label: "Government", icon: Building2, color: "bg-orange-500" },
  ]

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "ur", name: "اردو" },
    { code: "ks", name: "کٲشُر" },
  ]

  const handleTabSwitch = (tabId: string) => {
    if (!allowedRoles.includes(tabId)) {
      toast.error(`Access denied. You don't have permission to access the ${tabId} dashboard.`)
      return
    }
    setActiveTab(tabId)
  }

  const isTabAccessible = (tabId: string) => {
    return allowedRoles.includes(tabId)
  }

  const handleAnalyticsClick = () => {
    setShowAnalytics(true)
  }

  const handleSettingsClick = () => {
    setShowSettings(true)
  }

  const handleThemeToggle = () => {
    if (!mounted) return
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <>
      <motion.div
        className={`bg-card border-r border-border h-screen flex flex-col ${
          isCollapsed ? "w-16" : "w-64"
        } transition-all duration-300`}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
      >
        {/* Logo */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="font-bold text-sm font-poppins">Career Advisor</h1>
                <p className="text-xs text-muted-foreground">One-Stop Platform</p>
              </div>
            )}
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>{userEmail ? userEmail.charAt(0).toUpperCase() : "U"}</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1">
                <p className="font-medium text-sm">{userEmail || "User"}</p>
                <p className="text-xs text-muted-foreground">
                  {userRole ? `${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Access` : "Limited Access"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex-1 p-4">
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isAccessible = isTabAccessible(tab.id)
              const isActive = activeTab === tab.id

              return (
                <Button
                  key={tab.id}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 ${isActive ? tab.color : ""} ${
                    !isAccessible ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => handleTabSwitch(tab.id)}
                  disabled={!isAccessible}
                >
                  <Icon className="w-5 h-5" />
                  {!isCollapsed && (
                    <>
                      <span>{tab.label}</span>
                      {!isAccessible && <Lock className="w-3 h-3 ml-auto" />}
                      {isActive && isAccessible && (
                        <Badge variant="secondary" className="ml-auto">
                          Active
                        </Badge>
                      )}
                    </>
                  )}
                </Button>
              )
            })}
          </div>

          {!isCollapsed && (
            <div className="mt-8 space-y-2">
              <Button variant="ghost" className="w-full justify-start gap-3" onClick={onGoHome}>
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3" onClick={handleAnalyticsClick}>
                <BarChart3 className="w-5 h-5" />
                <span>Analytics</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3" onClick={handleSettingsClick}>
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={onLogout}
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </Button>
            </div>
          )}
        </div>

        {/* Bottom Controls */}
        <div className="p-4 border-t border-border space-y-2">
          {!isCollapsed && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between bg-transparent">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span className="text-sm">{languages.find((l) => l.code === language)?.name}</span>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)}>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Button
            variant="outline"
            className="w-full justify-start gap-3 bg-transparent relative"
            onClick={handleThemeToggle}
            aria-label="Toggle theme"
          >
            {mounted ? (
              <>
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute left-3 h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
                {!isCollapsed && <span className="ml-1">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>}
              </>
            ) : (
              <>
                <Sun className="h-4 w-4" />
                {!isCollapsed && <span className="ml-1">Theme</span>}
              </>
            )}
          </Button>
        </div>
      </motion.div>

      <AnalyticsModal isOpen={showAnalytics} onClose={() => setShowAnalytics(false)} userRole={userRole} />

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        userRole={userRole}
        userEmail={userEmail}
        isDarkMode={theme === "dark"}
        setIsDarkMode={(mode) => setTheme(mode ? "dark" : "light")}
        language={language}
        setLanguage={setLanguage}
      />
    </>
  )
}
