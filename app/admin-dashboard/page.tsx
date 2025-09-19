import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { EnrollmentInsights } from "@/components/enrollment-insights"
import { StudentInterestsHeatmap } from "@/components/student-interests-heatmap"
import { SupplyDemandAnalysis } from "@/components/supply-demand-analysis"
import { AdminAlerts } from "@/components/admin-alerts"
import { QuickMetrics } from "@/components/quick-metrics"

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="mb-8">
              <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Government Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Monitor enrollment trends, student interests, and educational supply-demand analytics
              </p>
            </div>

            <QuickMetrics />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EnrollmentInsights />
              <StudentInterestsHeatmap />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SupplyDemandAnalysis />
              </div>
              <AdminAlerts />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
