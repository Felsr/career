"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface CareerOutcomeExplorerProps {
  simplifiedMode: boolean
}

const careerData = [
  {
    degree: "B.Tech Computer Science",
    avgSalary: "₹12-15 LPA",
    jobAvailability: "High",
    growthTrend: "up",
    topJobs: ["Software Engineer", "Data Analyst", "Product Manager"],
  },
  {
    degree: "B.Com",
    avgSalary: "₹4-8 LPA",
    jobAvailability: "Medium",
    growthTrend: "stable",
    topJobs: ["Accountant", "Financial Analyst", "Tax Consultant"],
  },
  {
    degree: "BA English",
    avgSalary: "₹3-7 LPA",
    jobAvailability: "Medium",
    growthTrend: "up",
    topJobs: ["Content Writer", "Teacher", "Journalist"],
  },
  {
    degree: "B.Sc Mathematics",
    avgSalary: "₹5-10 LPA",
    jobAvailability: "Medium",
    growthTrend: "up",
    topJobs: ["Data Scientist", "Actuary", "Research Analyst"],
  },
]

export function CareerOutcomeExplorer({ simplifiedMode }: CareerOutcomeExplorerProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-yellow-600" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">
          {simplifiedMode ? "Career Options by Degree" : "Career Outcome Explorer"}
        </CardTitle>
        <CardDescription>
          {simplifiedMode
            ? "See what jobs your child can get with different college degrees"
            : "Compare career opportunities and outcomes across different degree programs"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">{simplifiedMode ? "College Degree" : "Degree Program"}</TableHead>
                <TableHead className="font-semibold">{simplifiedMode ? "Salary Range" : "Average Salary"}</TableHead>
                <TableHead className="font-semibold">{simplifiedMode ? "Job Chances" : "Job Availability"}</TableHead>
                <TableHead className="font-semibold">Growth Trend</TableHead>
                <TableHead className="font-semibold">
                  {simplifiedMode ? "Popular Jobs" : "Top Career Options"}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {careerData.map((career, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{career.degree}</TableCell>
                  <TableCell>{career.avgSalary}</TableCell>
                  <TableCell>
                    <Badge
                      variant={career.jobAvailability === "High" ? "default" : "secondary"}
                      className={career.jobAvailability === "High" ? "bg-green-100 text-green-800" : ""}
                    >
                      {career.jobAvailability}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(career.growthTrend)}
                      <span className="capitalize">{career.growthTrend}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {career.topJobs.slice(0, simplifiedMode ? 2 : 3).map((job, jobIndex) => (
                        <Badge key={jobIndex} variant="outline" className="text-xs">
                          {job}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline" onClick={() => alert("Detailed career comparison coming soon!")}>
            {simplifiedMode ? "See More Options" : "View Detailed Comparison"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
