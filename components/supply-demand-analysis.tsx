import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const supplyDemandData = [
  {
    course: "Computer Science",
    demand: 70,
    supply: 45,
    gap: 25,
    status: "High Demand",
    priority: "urgent",
  },
  {
    course: "Medicine",
    demand: 80,
    supply: 25,
    gap: 55,
    status: "Critical Gap",
    priority: "urgent",
  },
  {
    course: "Engineering",
    demand: 65,
    supply: 40,
    gap: 25,
    status: "High Demand",
    priority: "high",
  },
  {
    course: "Commerce",
    demand: 50,
    supply: 60,
    gap: -10,
    status: "Oversupply",
    priority: "low",
  },
  {
    course: "Science",
    demand: 45,
    supply: 50,
    gap: -5,
    status: "Balanced",
    priority: "normal",
  },
  {
    course: "Arts",
    demand: 35,
    supply: 55,
    gap: -20,
    status: "Oversupply",
    priority: "low",
  },
]

export function SupplyDemandAnalysis() {
  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="font-heading text-xl font-semibold text-foreground">Supply-Demand Analysis</CardTitle>
        <p className="text-sm text-muted-foreground">Course availability vs student interest comparison</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 font-medium text-foreground">Course</th>
                <th className="text-center py-3 px-2 font-medium text-foreground">Demand (%)</th>
                <th className="text-center py-3 px-2 font-medium text-foreground">Supply (%)</th>
                <th className="text-center py-3 px-2 font-medium text-foreground">Gap</th>
                <th className="text-center py-3 px-2 font-medium text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {supplyDemandData.map((item) => (
                <tr key={item.course} className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium text-foreground">{item.course}</td>
                  <td className="text-center py-3 px-2 text-foreground">{item.demand}%</td>
                  <td className="text-center py-3 px-2 text-foreground">{item.supply}%</td>
                  <td className="text-center py-3 px-2">
                    <span
                      className={`font-medium ${
                        item.gap > 0 ? "text-destructive" : item.gap < 0 ? "text-chart-2" : "text-foreground"
                      }`}
                    >
                      {item.gap > 0 ? "+" : ""}
                      {item.gap}%
                    </span>
                  </td>
                  <td className="text-center py-3 px-2">
                    <Badge
                      variant={
                        item.priority === "urgent"
                          ? "destructive"
                          : item.priority === "high"
                            ? "default"
                            : item.priority === "normal"
                              ? "secondary"
                              : "outline"
                      }
                    >
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
