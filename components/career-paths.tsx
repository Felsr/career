"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Clock, Users, ArrowRight } from "lucide-react"

const careerPaths = [
  {
    title: "Software Engineer",
    icon: "💻",
    salaryRange: "₹6-25 LPA",
    experience: "Entry to Senior",
    growth: "+18%",
    demand: "Very High",
    description: "Design and develop software applications and systems",
    skills: ["Programming", "Problem Solving", "System Design", "Testing"],
    companies: ["Google", "Microsoft", "Amazon", "Flipkart", "TCS"],
    education: "B.Tech/B.Sc. Computer Science",
    workStyle: "Hybrid/Remote friendly",
  },
  {
    title: "Data Scientist",
    icon: "📊",
    salaryRange: "₹8-30 LPA",
    experience: "Mid to Senior",
    growth: "+35%",
    demand: "Extremely High",
    description: "Analyze complex data to help companies make better decisions",
    skills: ["Statistics", "Python/R", "Machine Learning", "Data Visualization"],
    companies: ["Netflix", "Uber", "Swiggy", "Paytm", "IBM"],
    education: "B.Sc. Data Science/Statistics",
    workStyle: "Mostly Remote",
  },
  {
    title: "Research Scientist",
    icon: "🔬",
    salaryRange: "₹5-20 LPA",
    experience: "PhD preferred",
    growth: "+12%",
    demand: "High",
    description: "Conduct research to advance scientific knowledge",
    skills: ["Research Methods", "Critical Thinking", "Technical Writing", "Analysis"],
    companies: ["ISRO", "DRDO", "IITs", "Pharma Companies", "R&D Labs"],
    education: "M.Sc./PhD in relevant field",
    workStyle: "Lab/Office based",
  },
  {
    title: "Product Manager",
    icon: "🚀",
    salaryRange: "₹12-40 LPA",
    experience: "Mid to Senior",
    growth: "+25%",
    demand: "Very High",
    description: "Lead product development from conception to launch",
    skills: ["Strategy", "Communication", "Analytics", "Leadership"],
    companies: ["Zomato", "Ola", "PhonePe", "Razorpay", "Byju's"],
    education: "Any Bachelor's + MBA preferred",
    workStyle: "Hybrid",
  },
]

export function CareerPaths() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-4">Possible Career Paths</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore exciting career opportunities that match your profile and interests
        </p>
      </div>

      <div className="grid gap-6">
        {careerPaths.map((career, index) => (
          <Card key={index} className="border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{career.icon}</div>
                  <div>
                    <CardTitle className="font-heading text-xl text-foreground mb-2">{career.title}</CardTitle>
                    <p className="text-muted-foreground text-sm leading-relaxed">{career.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-primary mb-1">{career.salaryRange}</div>
                  <div className="text-sm text-muted-foreground">Salary Range</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{career.experience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">{career.growth} growth</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{career.demand} demand</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-heading font-semibold text-sm mb-2">Key Skills</h4>
                  <div className="space-y-1">
                    {career.skills.map((skill, idx) => (
                      <div key={idx} className="text-xs text-muted-foreground">
                        • {skill}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-heading font-semibold text-sm mb-2">Top Companies</h4>
                  <div className="flex flex-wrap gap-1">
                    {career.companies.slice(0, 3).map((company, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {company}
                      </Badge>
                    ))}
                    {career.companies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{career.companies.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-heading font-semibold text-sm mb-2">Requirements</h4>
                  <div className="text-xs text-muted-foreground mb-2">{career.education}</div>
                  <div className="text-xs text-muted-foreground">{career.workStyle}</div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="gap-2"
                  onClick={() => window.alert(`${career.title} career path details coming soon!`)}
                >
                  View Career Path
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="outline" onClick={() => window.alert(`${career.title} courses coming soon!`)}>
                  Find Courses
                </Button>
                <Button variant="ghost" onClick={() => window.alert(`${career.title} salary insights coming soon!`)}>
                  Salary Insights
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
