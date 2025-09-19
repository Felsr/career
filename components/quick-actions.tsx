import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, BookOpen, MapPin, TrendingUp, Users, Award } from "lucide-react"
import Link from "next/link"

const quickActions = [
  {
    icon: Brain,
    title: "Career Quiz",
    description: "Discover your ideal career path",
    color: "text-primary",
    bgColor: "bg-primary/10",
    href: "/quiz",
  },
  {
    icon: BookOpen,
    title: "Course Finder",
    description: "Find the perfect courses for you",
    color: "text-accent",
    bgColor: "bg-accent/10",
    href: "/recommendations",
  },
  {
    icon: MapPin,
    title: "College Locator",
    description: "Discover nearby institutions",
    color: "text-chart-2",
    bgColor: "bg-orange-100",
    href: "/recommendations",
  },
  {
    icon: TrendingUp,
    title: "Career Trends",
    description: "Explore growing industries",
    color: "text-chart-3",
    bgColor: "bg-red-100",
    href: "/path-visualizer",
  },
  {
    icon: Users,
    title: "Mentorship",
    description: "Connect with industry experts",
    color: "text-chart-4",
    bgColor: "bg-pink-100",
    href: "/recommendations",
  },
  {
    icon: Award,
    title: "Success Stories",
    description: "Get inspired by alumni",
    color: "text-primary",
    bgColor: "bg-primary/10",
    href: "#success-stories",
  },
]

export function QuickActions() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">Start Your Journey</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our comprehensive tools to explore your career options
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/20"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-3 rounded-lg ${action.bgColor} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`w-6 h-6 ${action.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{action.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{action.description}</p>
                      <Link href={action.href}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-auto font-medium text-primary hover:text-primary/80"
                        >
                          Get Started &rarr;
                        </Button>
                      </Link>
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
