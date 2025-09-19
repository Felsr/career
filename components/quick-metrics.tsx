import { Card, CardContent } from "@/components/ui/card"
import { Users, GraduationCap, TrendingUp, BookOpen } from "lucide-react"

const metrics = [
  {
    title: "Total Students",
    value: "24,567",
    change: "+12%",
    icon: Users,
    color: "text-chart-1",
  },
  {
    title: "Total Colleges",
    value: "156",
    change: "+3%",
    icon: GraduationCap,
    color: "text-chart-2",
  },
  {
    title: "Enrollment Rate",
    value: "87.3%",
    change: "+5.2%",
    icon: TrendingUp,
    color: "text-chart-3",
  },
  {
    title: "Top Demanded Course",
    value: "Computer Science",
    change: "70% interest",
    icon: BookOpen,
    color: "text-chart-4",
  },
]

export function QuickMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.title} className="border border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{metric.value}</p>
                <p className={`text-sm mt-1 ${metric.color}`}>{metric.change}</p>
              </div>
              <div className={`p-3 rounded-lg bg-muted ${metric.color}`}>
                <metric.icon className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
