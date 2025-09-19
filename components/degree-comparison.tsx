"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface DegreeComparisonProps {
  simplifiedMode: boolean
}

const comparisonData = [
  { category: "Average Salary", withDegree: 65000, withoutDegree: 35000 },
  { category: "Job Security", withDegree: 85, withoutDegree: 60 },
  { category: "Career Growth", withDegree: 80, withoutDegree: 45 },
  { category: "Job Satisfaction", withDegree: 75, withoutDegree: 65 },
]

export function DegreeComparison({ simplifiedMode }: DegreeComparisonProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">
          {simplifiedMode ? "College vs No College" : "Degree vs No-Degree Comparison"}
        </CardTitle>
        <CardDescription>
          {simplifiedMode
            ? "See how college education can help your child earn more and have better job security"
            : "Compare career outcomes and opportunities between degree holders and non-degree holders"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            withDegree: {
              label: simplifiedMode ? "With College" : "With Degree",
              color: "hsl(var(--chart-1))",
            },
            withoutDegree: {
              label: simplifiedMode ? "Without College" : "Without Degree",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="withDegree"
                fill="var(--color-withDegree)"
                name={simplifiedMode ? "With College" : "With Degree"}
              />
              <Bar
                dataKey="withoutDegree"
                fill="var(--color-withoutDegree)"
                name={simplifiedMode ? "Without College" : "Without Degree"}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
