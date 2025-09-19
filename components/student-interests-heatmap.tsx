"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const interestData = [
  { course: "Computer Science", interest: 70, capacity: 45 },
  { course: "Commerce", interest: 50, capacity: 60 },
  { course: "Engineering", interest: 65, capacity: 40 },
  { course: "Arts", interest: 35, capacity: 55 },
  { course: "Science", interest: 45, capacity: 50 },
  { course: "Medicine", interest: 80, capacity: 25 },
]

export function StudentInterestsHeatmap() {
  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="font-heading text-xl font-semibold text-foreground">Student Interest Analysis</CardTitle>
        <p className="text-sm text-muted-foreground">Course demand vs available capacity (%)</p>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            interest: {
              label: "Student Interest",
              color: "hsl(var(--chart-1))",
            },
            capacity: {
              label: "Available Capacity",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={interestData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="course"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="interest" fill="var(--color-interest)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="capacity" fill="var(--color-capacity)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
