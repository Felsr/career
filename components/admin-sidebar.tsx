"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Users, TrendingUp, AlertTriangle, FileText, Settings, Home, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useTheme } from "next-themes"
import { AnalyticsModal } from "./analytics-modal"
import { SettingsModal } from "./settings-modal"

const navigation = [
  { name: "Dashboard", href: "/admin-dashboard", icon: BarChart3 },
  { name: "Students", href: "/admin-dashboard/students", icon: Users },
  { name: "Analytics", href: "#", icon: TrendingUp, isModal: true, modalType: "analytics" },
  { name: "Colleges", href: "/admin-dashboard/colleges", icon: GraduationCap },
  { name: "Reports", href: "/admin-dashboard/reports", icon: FileText },
  { name: "Alerts", href: "/admin-dashboard/alerts", icon: AlertTriangle },
  { name: "Settings", href: "#", icon: Settings, isModal: true, modalType: "settings" },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const { theme, setTheme } = useTheme()

  const handleNavClick = (item: any) => {
    if (item.isModal) {
      if (item.modalType === "analytics") {
        setShowAnalytics(true)
      } else if (item.modalType === "settings") {
        setShowSettings(true)
      }
    }
  }

  return (
    <>
      <div className="w-64 bg-sidebar border-r border-sidebar-border">
        <div className="flex items-center h-16 px-6 border-b border-sidebar-border">
          <Link href="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-sidebar-foreground" />
            <span className="font-heading font-semibold text-sidebar-foreground">CareerPath Admin</span>
          </Link>
        </div>

        <nav className="mt-6 px-3">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  {item.isModal ? (
                    <button
                      onClick={() => handleNavClick(item)}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors w-full text-left",
                        "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      )}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      )}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      <AnalyticsModal isOpen={showAnalytics} onClose={() => setShowAnalytics(false)} userRole="government" />

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        userRole="government"
        userEmail="admin@government.in"
        isDarkMode={theme === "dark"}
        setIsDarkMode={(mode) => setTheme(mode ? "dark" : "light")}
        language="en"
        setLanguage={() => {}}
      />
    </>
  )
}
