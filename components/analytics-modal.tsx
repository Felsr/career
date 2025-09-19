"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Users, Clock, Target, Download, Eye } from "lucide-react"

interface AnalyticsModalProps {
  isOpen: boolean
  onClose: () => void
  userRole: string
}

export function AnalyticsModal({ isOpen, onClose, userRole }: AnalyticsModalProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("7d")

  // Sample analytics data based on user role
  const getAnalyticsData = () => {
    switch (userRole) {
      case "student":
        return {
          overview: [
            { title: "Quiz Completion", value: "85%", change: "+12%", icon: Target },
            { title: "Time Spent", value: "2.5h", change: "+30min", icon: Clock },
            { title: "Recommendations Viewed", value: "24", change: "+8", icon: Eye },
            { title: "Career Paths Explored", value: "6", change: "+2", icon: TrendingUp },
          ],
          activityData: [
            { date: "Mon", quizzes: 2, recommendations: 5, pathViews: 1 },
            { date: "Tue", quizzes: 1, recommendations: 8, pathViews: 2 },
            { date: "Wed", quizzes: 3, recommendations: 6, pathViews: 1 },
            { date: "Thu", quizzes: 2, recommendations: 9, pathViews: 3 },
            { date: "Fri", quizzes: 4, recommendations: 7, pathViews: 2 },
            { date: "Sat", quizzes: 1, recommendations: 4, pathViews: 1 },
            { date: "Sun", quizzes: 2, recommendations: 6, pathViews: 2 },
          ],
          interestData: [
            { name: "Technology", value: 35, color: "#3B82F6" },
            { name: "Science", value: 25, color: "#10B981" },
            { name: "Arts", value: 20, color: "#F59E0B" },
            { name: "Business", value: 15, color: "#EF4444" },
            { name: "Other", value: 5, color: "#8B5CF6" },
          ],
        }
      case "parent":
        return {
          overview: [
            { title: "Child's Progress", value: "78%", change: "+15%", icon: TrendingUp },
            { title: "Resources Accessed", value: "18", change: "+5", icon: Eye },
            { title: "Comparisons Made", value: "12", change: "+3", icon: Target },
            { title: "Time on Platform", value: "1.8h", change: "+25min", icon: Clock },
          ],
          activityData: [
            { date: "Mon", resources: 3, comparisons: 2, timeSpent: 25 },
            { date: "Tue", resources: 4, comparisons: 1, timeSpent: 30 },
            { date: "Wed", resources: 2, comparisons: 3, timeSpent: 20 },
            { date: "Thu", resources: 5, comparisons: 2, timeSpent: 35 },
            { date: "Fri", resources: 3, comparisons: 4, timeSpent: 28 },
            { date: "Sat", resources: 6, comparisons: 1, timeSpent: 40 },
            { date: "Sun", resources: 2, comparisons: 2, timeSpent: 22 },
          ],
          interestData: [
            { name: "Career Guidance", value: 40, color: "#3B82F6" },
            { name: "College Info", value: 30, color: "#10B981" },
            { name: "Success Stories", value: 20, color: "#F59E0B" },
            { name: "Financial Planning", value: 10, color: "#EF4444" },
          ],
        }
      case "government":
        return {
          overview: [
            { title: "Total Students", value: "45,230", change: "+1,250", icon: Users },
            { title: "Active Colleges", value: "156", change: "+3", icon: Target },
            { title: "Enrollment Rate", value: "87%", change: "+5%", icon: TrendingUp },
            { title: "Platform Usage", value: "92%", change: "+8%", icon: Eye },
          ],
          activityData: [
            { date: "Jan", students: 42000, colleges: 150, enrollment: 82 },
            { date: "Feb", students: 42800, colleges: 152, enrollment: 84 },
            { date: "Mar", students: 43500, colleges: 153, enrollment: 85 },
            { date: "Apr", students: 44200, colleges: 154, enrollment: 86 },
            { date: "May", students: 44800, colleges: 155, enrollment: 86 },
            { date: "Jun", students: 45230, colleges: 156, enrollment: 87 },
          ],
          interestData: [
            { name: "Computer Science", value: 35, color: "#3B82F6" },
            { name: "Engineering", value: 25, color: "#10B981" },
            { name: "Commerce", value: 20, color: "#F59E0B" },
            { name: "Arts", value: 15, color: "#EF4444" },
            { name: "Science", value: 5, color: "#8B5CF6" },
          ],
        }
      default:
        return {
          overview: [],
          activityData: [],
          interestData: [],
        }
    }
  }

  const data = getAnalyticsData()

  const handleExport = () => {
    // Create CSV data
    const csvData = [
      ["Metric", "Value", "Change"],
      ...data.overview.map((item) => [item.title, item.value, item.change]),
    ]

    const csvContent = csvData.map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `analytics-${userRole}-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Analytics Dashboard - {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
          </DialogTitle>
          <DialogDescription>Detailed insights and performance metrics for your platform usage</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Period Selector */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {["7d", "30d", "90d", "1y"].map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period)}
                >
                  {period === "7d" ? "7 Days" : period === "30d" ? "30 Days" : period === "90d" ? "90 Days" : "1 Year"}
                </Button>
              ))}
            </div>
            <Button onClick={handleExport} className="gap-2">
              <Download className="w-4 h-4" />
              Export Data
            </Button>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.overview.map((metric, index) => {
              const Icon = metric.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{metric.title}</p>
                          <p className="text-2xl font-bold">{metric.value}</p>
                          <p className="text-sm text-green-600">{metric.change}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Charts */}
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="activity">Activity Trends</TabsTrigger>
              <TabsTrigger value="interests">Interest Distribution</TabsTrigger>
              <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Over Time</CardTitle>
                  <CardDescription>Your platform usage patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data.activityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        {userRole === "student" && (
                          <>
                            <Line type="monotone" dataKey="quizzes" stroke="#3B82F6" name="Quizzes" />
                            <Line type="monotone" dataKey="recommendations" stroke="#10B981" name="Recommendations" />
                            <Line type="monotone" dataKey="pathViews" stroke="#F59E0B" name="Path Views" />
                          </>
                        )}
                        {userRole === "parent" && (
                          <>
                            <Line type="monotone" dataKey="resources" stroke="#3B82F6" name="Resources" />
                            <Line type="monotone" dataKey="comparisons" stroke="#10B981" name="Comparisons" />
                            <Line type="monotone" dataKey="timeSpent" stroke="#F59E0B" name="Time (min)" />
                          </>
                        )}
                        {userRole === "government" && (
                          <>
                            <Line type="monotone" dataKey="students" stroke="#3B82F6" name="Students" />
                            <Line type="monotone" dataKey="colleges" stroke="#10B981" name="Colleges" />
                            <Line type="monotone" dataKey="enrollment" stroke="#F59E0B" name="Enrollment %" />
                          </>
                        )}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="interests" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Interest Distribution</CardTitle>
                  <CardDescription>Breakdown of your areas of focus</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data.interestData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {data.interestData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Key performance indicators and achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.overview.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <metric.icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{metric.title}</h4>
                            <p className="text-sm text-muted-foreground">Current performance</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">{metric.value}</p>
                          <Badge variant="secondary" className="text-green-600">
                            {metric.change}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
