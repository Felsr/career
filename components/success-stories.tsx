import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Quote, Star } from "lucide-react"

const stories = [
  {
    name: "Priya Sharma",
    role: "Software Engineer at Google",
    image: "/young-indian-woman-professional-headshot.png",
    story: "CareerPath helped me discover my passion for coding. The AI recommendations were spot-on!",
    rating: 5,
    badge: "Tech Success",
  },
  {
    name: "Arjun Patel",
    role: "Doctor at AIIMS",
    image: "/young-indian-man-doctor-professional-headshot.jpg",
    story: "The career path visualizer showed me exactly what steps to take. Now I'm living my dream!",
    rating: 5,
    badge: "Medical Field",
  },
  {
    name: "Sneha Gupta",
    role: "Environmental Scientist",
    image: "/young-indian-woman-scientist-professional-headshot.jpg",
    story: "I never knew environmental science was perfect for me until I took the career quiz.",
    rating: 5,
    badge: "Science",
  },
]

export function SuccessStories() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">Success Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how CareerPath has transformed the lives of thousands of students
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Quote className="w-5 h-5 text-primary" />
                  <Badge variant="secondary" className="text-xs">
                    {story.badge}
                  </Badge>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">"{story.story}"</p>

                <div className="flex items-center gap-4">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-heading font-semibold text-foreground">{story.name}</h4>
                    <p className="text-sm text-muted-foreground">{story.role}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
