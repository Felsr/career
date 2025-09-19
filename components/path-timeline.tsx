import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, ArrowDown } from "lucide-react"

interface TimelineStep {
  stage: string
  title: string
  subtitle: string
  duration: string
  status: "current" | "upcoming" | "goal"
  description: string
  skills: string[]
  icon: string
}

interface PathTimelineProps {
  timeline: TimelineStep[]
}

export function PathTimeline({ timeline }: PathTimelineProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "current":
        return "bg-primary text-primary-foreground"
      case "upcoming":
        return "bg-muted text-muted-foreground"
      case "goal":
        return "bg-accent text-accent-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "current":
        return <CheckCircle className="w-5 h-5" />
      case "upcoming":
        return <Clock className="w-5 h-5" />
      case "goal":
        return <CheckCircle className="w-5 h-5" />
      default:
        return <Clock className="w-5 h-5" />
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="font-heading font-bold text-2xl text-foreground text-center mb-8">Your Step-by-Step Journey</h3>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-border h-full hidden md:block" />

        {timeline.map((step, index) => (
          <div key={index} className="relative">
            {/* Timeline Node */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 hidden md:block">
              <div
                className={`w-12 h-12 rounded-full ${getStatusColor(step.status)} flex items-center justify-center shadow-lg`}
              >
                {getStatusIcon(step.status)}
              </div>
            </div>

            {/* Content Card */}
            <div className={`grid md:grid-cols-2 gap-8 mb-8 ${index % 2 === 0 ? "" : "md:grid-flow-col-dense"}`}>
              <div className={index % 2 === 0 ? "" : "md:col-start-2"}>
                <Card className="border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{step.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {step.stage}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(step.status)}`}>{step.duration}</Badge>
                        </div>
                        <CardTitle className="font-heading text-xl text-foreground">{step.title}</CardTitle>
                        <p className="text-primary font-medium">{step.subtitle}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{step.description}</p>

                    <div>
                      <h4 className="font-heading font-semibold text-sm mb-3">Key Skills & Knowledge</h4>
                      <div className="flex flex-wrap gap-2">
                        {step.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Mobile Timeline Indicator */}
              <div className="md:hidden flex items-center justify-center">
                <div className={`w-8 h-8 rounded-full ${getStatusColor(step.status)} flex items-center justify-center`}>
                  {getStatusIcon(step.status)}
                </div>
              </div>
            </div>

            {/* Arrow for mobile */}
            {index < timeline.length - 1 && (
              <div className="flex justify-center mb-4 md:hidden">
                <ArrowDown className="w-6 h-6 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
