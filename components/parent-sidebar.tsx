"use client"

import { Button } from "@/components/ui/button"
import { Home, BarChart3, Users, Search, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ParentSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function ParentSidebar({ activeSection, onSectionChange }: ParentSidebarProps) {
  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "comparison", label: "Degree Comparison", icon: BarChart3 },
    { id: "stories", label: "Success Stories", icon: Users },
    { id: "explorer", label: "Career Explorer", icon: Search },
    { id: "resources", label: "Resources & FAQ", icon: HelpCircle },
  ]

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border">
      <div className="p-6">
        <h2 className="text-xl font-heading font-semibold text-sidebar-foreground mb-8">Parent Guide</h2>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-12",
                  activeSection === item.id
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/10",
                )}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
