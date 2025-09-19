import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, TrendingUp, Users, GraduationCap } from "lucide-react"

const alerts = [
  {
    id: 1,
    type: "urgent",
    icon: AlertTriangle,
    title: "High Demand Alert",
    message: "Computer Science has 70% student interest but only 45% capacity. Consider adding more seats.",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "warning",
    icon: TrendingUp,
    title: "Enrollment Spike",
    message: "Medicine applications increased by 25% this month. Review admission criteria.",
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "info",
    icon: Users,
    title: "Capacity Utilization",
    message: "Arts and Commerce have excess capacity. Consider reallocation strategies.",
    time: "1 day ago",
  },
  {
    id: 4,
    type: "success",
    icon: GraduationCap,
    title: "Target Achievement",
    message: "Overall enrollment target exceeded by 12% this quarter.",
    time: "2 days ago",
  },
]

export function AdminAlerts() {
  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="font-heading text-xl font-semibold text-foreground">System Alerts</CardTitle>
        <p className="text-sm text-muted-foreground">Important notifications and recommendations</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
              <div
                className={`p-2 rounded-full ${
                  alert.type === "urgent"
                    ? "bg-destructive/10 text-destructive"
                    : alert.type === "warning"
                      ? "bg-yellow-100 text-yellow-600"
                      : alert.type === "info"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                }`}
              >
                <alert.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-foreground">{alert.title}</h4>
                  <Badge
                    variant={
                      alert.type === "urgent"
                        ? "destructive"
                        : alert.type === "warning"
                          ? "default"
                          : alert.type === "info"
                            ? "secondary"
                            : "outline"
                    }
                    className="text-xs"
                  >
                    {alert.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                <p className="text-xs text-muted-foreground">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
