"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const enrollmentData = [
  { month: "Jan", students: 2100, target: 2000 },
  { month: "Feb", students: 2300, target: 2200 },
  { month: "Mar", students: 2800, target: 2500 },
  { month: "Apr", students: 3200, target: 2800 },
  { month: "May", students: 3600, target: 3200 },
  { month: "Jun", students: 4100, target: 3800 },
  { month: "Jul", students: 4500, target: 4200 },
  { month: "Aug", students: 4800, target: 4500 },
]

export function EnrollmentInsights() {
  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="font-heading text-xl font-semibold text-foreground">Enrollment Trends</CardTitle>
        <p className="text-sm text-muted-foreground">Monthly student enrollment in government colleges</p>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            students: {
              label: "Actual Enrollment",
              color: "hsl(var(--chart-1))",
            },
            target: {
              label: "Target Enrollment",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="students"
                stroke="var(--color-students)"
                strokeWidth={3}
                dot={{ fill: "var(--color-students)", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="var(--color-target)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "var(--color-target)", strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
