"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Microscope, Calculator, Palette, CheckCircle, ArrowRight } from "lucide-react"
import { toast } from "sonner"

const streams = [
  {
    name: "Science",
    icon: Microscope,
    compatibility: 92,
    description: "Perfect for analytical minds who love problem-solving and research",
    subjects: ["Physics", "Chemistry", "Biology", "Mathematics"],
    careers: ["Doctor", "Engineer", "Research Scientist", "Data Analyst"],
    color: "text-primary",
    bgColor: "bg-primary/10",
    isRecommended: true,
  },
  {
    name: "Commerce",
    icon: Calculator,
    compatibility: 78,
    description: "Ideal for those interested in business, finance, and economics",
    subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
    careers: ["CA", "Business Analyst", "Financial Advisor", "Entrepreneur"],
    color: "text-accent",
    bgColor: "bg-accent/10",
    isRecommended: false,
  },
  {
    name: "Arts",
    icon: Palette,
    compatibility: 65,
    description: "Great for creative minds and those interested in humanities",
    subjects: ["History", "Political Science", "Psychology", "Literature"],
    careers: ["Teacher", "Journalist", "Psychologist", "Civil Servant"],
    color: "text-chart-4",
    bgColor: "bg-pink-100",
    isRecommended: false,
  },
]

export function RecommendedStream() {
  const router = useRouter()

  const handleViewDetailedPath = (streamName: string) => {
    toast.success(`Opening detailed ${streamName} stream pathway`)
    // Store selected stream for path visualizer
    localStorage.setItem("selectedStream", streamName.toLowerCase())
    router.push("/path-visualizer")
  }

  const handleFindColleges = (streamName: string) => {
    toast.success(`Finding colleges for ${streamName} stream`)
    // Store stream preference for college search
    localStorage.setItem("streamPreference", streamName.toLowerCase())
    router.push("/recommendations?tab=colleges")
  }

  const handleExploreCareer = (career: string) => {
    toast.success(`Exploring ${career} career path`)
    // Store career interest for detailed exploration
    localStorage.setItem("careerInterest", career)
    router.push("/recommendations?tab=careers")
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-4">
          Recommended Academic Stream
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Based on your interests and aptitude, here are the best academic streams for you
        </p>
      </div>

      <div className="grid gap-6">
        {streams.map((stream, index) => {
          const Icon = stream.icon
          return (
            <Card
              key={index}
              className={`border-border/50 shadow-lg transition-all duration-300 hover:shadow-xl ${
                stream.isRecommended ? "ring-2 ring-primary/20 bg-primary/5" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${stream.bgColor}`}>
                      <Icon className={`w-8 h-8 ${stream.color}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <CardTitle className="font-heading text-xl text-foreground">{stream.name} Stream</CardTitle>
                        {stream.isRecommended && (
                          <Badge className="gap-1 bg-primary text-primary-foreground">
                            <CheckCircle className="w-3 h-3" />
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mt-1">{stream.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{stream.compatibility}%</div>
                    <div className="text-sm text-muted-foreground">Match</div>
                  </div>
                </div>
                <Progress value={stream.compatibility} className="mt-4" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-heading font-semibold text-lg mb-3">Core Subjects</h4>
                    <div className="space-y-2">
                      {stream.subjects.map((subject, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span className="text-sm">{subject}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-lg mb-3">Career Options</h4>
                    <div className="flex flex-wrap gap-2">
                      {stream.careers.map((career, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="text-xs cursor-pointer hover:bg-primary/10"
                          onClick={() => handleExploreCareer(career)}
                        >
                          {career}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button className="gap-2" onClick={() => handleViewDetailedPath(stream.name)}>
                    View Detailed Path
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" onClick={() => handleFindColleges(stream.name)}>
                    Find Colleges
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
