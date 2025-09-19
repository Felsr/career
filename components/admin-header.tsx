"use client"

import { Button } from "@/components/ui/button"
import { Download, FileText, Bell } from "lucide-react"

export function AdminHeader() {
  const handleExportPDF = () => {
    // Placeholder for PDF export functionality
    alert("Exporting data as PDF...")
  }

  const handleExportExcel = () => {
    // Placeholder for Excel export functionality
    alert("Exporting data as Excel...")
  }

  return (
    <header className="h-16 bg-primary border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h2 className="font-heading text-lg font-semibold text-primary-foreground">Education Analytics Portal</h2>
      </div>

      <div className="flex items-center space-x-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleExportPDF}
          className="bg-white/10 hover:bg-white/20 text-primary-foreground border-white/20"
        >
          <FileText className="h-4 w-4 mr-2" />
          Export PDF
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleExportExcel}
          className="bg-white/10 hover:bg-white/20 text-primary-foreground border-white/20"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Excel
        </Button>

        <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/10">
          <Bell className="h-5 w-5" />
        </Button>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary-foreground">GA</span>
          </div>
          <span className="text-sm text-primary-foreground">Gov Admin</span>
        </div>
      </div>
    </header>
  )
}
