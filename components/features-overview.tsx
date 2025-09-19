import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Target, Route, MessageCircle } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "AI-Powered Recommendations",
    description:
      "Get personalized career suggestions based on your interests, skills, and goals using advanced AI algorithms.",
    badge: "Smart",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Target,
    title: "Interactive Career Quiz",
    description: "Take our comprehensive quiz to discover your strengths and find careers that match your personality.",
    badge: "Popular",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Route,
    title: "Career Path Visualizer",
    description: "See your complete journey from current education to dream career with step-by-step guidance.",
    badge: "Visual",
    color: "text-chart-2",
    bgColor: "bg-orange-100",
  },
  {
    icon: MessageCircle,
    title: "24/7 Career Advisor",
    description: "Chat with our AI advisor anytime for instant answers to your career and education questions.",
    badge: "Always On",
    color: "text-chart-4",
    bgColor: "bg-pink-100",
  },
]

export function FeaturesOverview() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools and guidance you need to make informed career decisions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-500 border-border/50 hover:border-primary/20 overflow-hidden"
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div
                      className={`p-4 rounded-xl ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-heading font-semibold text-xl text-foreground">{feature.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {feature.badge}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
