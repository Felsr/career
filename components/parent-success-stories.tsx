"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface ParentSuccessStoriesProps {
  simplifiedMode: boolean
}

const successStories = [
  {
    name: "Priya Sharma",
    degree: "B.Com from Government College",
    currentRole: "Senior Accountant at TCS",
    salary: "₹8.5 LPA",
    story: "Started from a small town, now working in Bangalore with a stable career in finance.",
    avatar: "/indian-woman-professional.png",
  },
  {
    name: "Rahul Kumar",
    degree: "B.Tech from State University",
    currentRole: "Software Engineer at Infosys",
    salary: "₹12 LPA",
    story: "Government college education opened doors to top IT companies.",
    avatar: "/placeholder-5hx2s.png",
  },
  {
    name: "Anjali Patel",
    degree: "BA English from Local College",
    currentRole: "Content Manager at Flipkart",
    salary: "₹9 LPA",
    story: "Proved that any degree can lead to success with the right skills.",
    avatar: "/placeholder-pucm9.png",
  },
]

export function ParentSuccessStories({ simplifiedMode }: ParentSuccessStoriesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">{simplifiedMode ? "Success Stories" : "Alumni Success Stories"}</CardTitle>
        <CardDescription>
          {simplifiedMode
            ? "Real students who studied in government colleges and got good jobs"
            : "Inspiring stories from government college graduates who built successful careers"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {successStories.map((story, index) => (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={story.avatar || "/placeholder.svg"} alt={story.name} />
                    <AvatarFallback>
                      {story.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">{story.name}</h3>
                    <p className="text-sm text-muted-foreground">{story.currentRole}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <Badge variant="secondary" className="text-xs">
                    {story.degree}
                  </Badge>
                  <Badge variant="outline" className="text-xs ml-2">
                    {story.salary}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground">
                  {simplifiedMode ? story.story.split(".")[0] + "." : story.story}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
