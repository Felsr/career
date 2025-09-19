"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, Users, School, BookOpen, Download, AlertTriangle, CheckCircle, Clock, Target } from "lucide-react"

export function GovernmentDashboard() {
  const enrollmentData = [
    { month: "Jan", enrolled: 1200, target: 1000 },
    { month: "Feb", enrolled: 1350, target: 1100 },
    { month: "Mar", enrolled: 1500, target: 1200 },
    { month: "Apr", enrolled: 1800, target: 1400 },
    { month: "May", enrolled: 2100, target: 1600 },
    { month: "Jun", enrolled: 2400, target: 1800 },
  ]

  const interestData = [
    { course: "Computer Science", demand: 70, capacity: 40 },
    { course: "Commerce", demand: 50, capacity: 60 },
    { course: "Engineering", demand: 65, capacity: 35 },
    { course: "Arts", demand: 30, capacity: 50 },
    { course: "Science", demand: 55, capacity: 45 },
  ]

  const supplyDemandData = [
    {
      course: "Computer Science",
      demand: 2500,
      supply: 1200,
      gap: 1300,
      priority: "High",
      action: "Add 3 new sections",
    },
    {
      course: "Engineering",
      demand: 2000,
      supply: 1000,
      gap: 1000,
      priority: "High",
      action: "Increase faculty",
    },
    {
      course: "Commerce",
      demand: 1500,
      supply: 1800,
      gap: -300,
      priority: "Low",
      action: "Optimize resources",
    },
    {
      course: "Arts",
      demand: 800,
      supply: 1200,
      gap: -400,
      priority: "Low",
      action: "Reallocate seats",
    },
  ]

  const alerts = [
    {
      type: "high",
      title: "High demand for Computer Science",
      message: "Consider adding more seats and faculty for CS programs",
      action: "Add 300 seats across 5 colleges",
      status: "pending",
    },
    {
      type: "medium",
      title: "Engineering enrollment target exceeded",
      message: "150% of target enrollment achieved in engineering programs",
      action: "Review infrastructure capacity",
      status: "in-progress",
    },
    {
      type: "low",
      title: "Arts stream underutilized",
      message: "Only 60% capacity utilization in arts programs",
      action: "Promote arts career opportunities",
      status: "completed",
    },
  ]

  const metrics = [
    {
      title: "Total Students",
      value: "45,230",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Total Colleges",
      value: "156",
      change: "+3",
      icon: School,
      color: "text-green-600",
    },
    {
      title: "Enrollment Rate",
      value: "87%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-orange-600",
    },
    {
      title: "Top Demanded Course",
      value: "Computer Science",
      change: "70% demand",
      icon: BookOpen,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.title}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className={`text-sm ${metric.color}`}>{metric.change}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${metric.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </motion.div>

      {/* Enrollment Insights */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Enrollment Insights
                </CardTitle>
                <CardDescription>Student enrollment trends vs targets across government colleges</CardDescription>
              </div>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="enrolled" stroke="#1D4ED8" strokeWidth={3} name="Actual Enrollment" />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#10B981"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Target"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Student Interests Heatmap */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Student Interests Analysis
            </CardTitle>
            <CardDescription>Course demand vs available capacity comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={interestData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="course" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      `${value}%`,
                      name === "demand" ? "Student Demand" : "Available Capacity",
                    ]}
                  />
                  <Bar dataKey="demand" fill="#F97316" name="demand" />
                  <Bar dataKey="capacity" fill="#10B981" name="capacity" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Supply vs Demand Analysis */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Supply-Demand Analysis
                </CardTitle>
                <CardDescription>Course availability vs student interest with recommended actions</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Excel
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supplyDemandData.map((item, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                    <div>
                      <h4 className="font-medium">{item.course}</h4>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Demand</p>
                      <p className="font-medium">{item.demand.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Supply</p>
                      <p className="font-medium">{item.supply.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Gap</p>
                      <p className={`font-medium ${item.gap > 0 ? "text-red-600" : "text-green-600"}`}>
                        {item.gap > 0 ? "+" : ""}
                        {item.gap.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center">
                      <Badge
                        variant={
                          item.priority === "High"
                            ? "destructive"
                            : item.priority === "Medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {item.priority}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm">{item.action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Alerts and Notifications */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              System Alerts & Recommendations
            </CardTitle>
            <CardDescription>Important notifications and suggested actions for policy makers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`border-l-4 p-4 rounded-r-lg ${
                    alert.type === "high"
                      ? "border-red-500 bg-red-50"
                      : alert.type === "medium"
                        ? "border-orange-500 bg-orange-50"
                        : "border-green-500 bg-green-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{alert.title}</h4>
                        <Badge
                          variant={
                            alert.status === "pending"
                              ? "destructive"
                              : alert.status === "in-progress"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {alert.status === "pending" ? (
                            <Clock className="w-3 h-3 mr-1" />
                          ) : alert.status === "completed" ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <Target className="w-3 h-3 mr-1" />
                          )}
                          {alert.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                      <p className="text-sm font-medium">Recommended Action: {alert.action}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Take Action
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
