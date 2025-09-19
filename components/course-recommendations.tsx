"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Clock, Users, TrendingUp, ExternalLink, BookmarkPlus, Compass as Compare } from "lucide-react"
import { toast } from "sonner"

const courses = [
  {
    title: "B.Sc. Computer Science",
    university: "Delhi University",
    duration: "3 years",
    rating: 4.8,
    students: "2.5k",
    growth: "+15%",
    description: "Comprehensive program covering programming, algorithms, and software development",
    skills: ["Programming", "Data Structures", "Web Development", "AI/ML"],
    fees: "₹45,000/year",
    isPopular: true,
  },
  {
    title: "B.Tech. Information Technology",
    university: "IIT Delhi",
    duration: "4 years",
    rating: 4.9,
    students: "1.8k",
    growth: "+22%",
    description: "Advanced engineering program with focus on modern IT solutions",
    skills: ["Software Engineering", "Database Systems", "Networks", "Cloud Computing"],
    fees: "₹2,50,000/year",
    isPopular: false,
  },
  {
    title: "B.Sc. Data Science",
    university: "Jawaharlal Nehru University",
    duration: "3 years",
    rating: 4.7,
    students: "1.2k",
    growth: "+35%",
    description: "Emerging field combining statistics, programming, and domain expertise",
    skills: ["Statistics", "Python", "Machine Learning", "Data Visualization"],
    fees: "₹65,000/year",
    isPopular: true,
  },
  {
    title: "B.Sc. Biotechnology",
    university: "University of Mumbai",
    duration: "3 years",
    rating: 4.6,
    students: "950",
    growth: "+18%",
    description: "Interdisciplinary field combining biology with technology",
    skills: ["Molecular Biology", "Genetics", "Bioinformatics", "Research Methods"],
    fees: "₹55,000/year",
    isPopular: false,
  },
]

export function CourseRecommendations() {
  const router = useRouter()
  const [savedCourses, setSavedCourses] = useState<string[]>([])
  const [compareList, setCompareList] = useState<string[]>([])

  const handleViewDetails = (courseTitle: string, university: string) => {
    toast.success(`Opening detailed information for ${courseTitle}`)
    // Store course details for detailed view
    localStorage.setItem("selectedCourse", JSON.stringify({ title: courseTitle, university }))
    console.log(`[v0] Viewing course details: ${courseTitle} at ${university}`)
  }

  const handleEnrollNow = (courseTitle: string, university: string) => {
    toast.success(`Starting enrollment process for ${courseTitle}`)
    // In a real app, this would navigate to enrollment form
    console.log(`[v0] Starting enrollment for ${courseTitle} at ${university}`)
  }

  const handleFindColleges = (courseTitle: string) => {
    toast.success(`Finding colleges offering ${courseTitle}`)
    // Store course preference for college search
    localStorage.setItem("coursePreference", courseTitle)
    router.push("/recommendations?tab=colleges")
  }

  const handleSaveCourse = (courseTitle: string) => {
    setSavedCourses((prev) => {
      const newSaved = prev.includes(courseTitle)
        ? prev.filter((title) => title !== courseTitle)
        : [...prev, courseTitle]

      const action = newSaved.includes(courseTitle) ? "saved" : "removed from saved"
      toast.success(`${courseTitle} ${action}`)
      return newSaved
    })
  }

  const handleCompareCourse = (courseTitle: string) => {
    setCompareList((prev) => {
      if (prev.includes(courseTitle)) {
        const newList = prev.filter((title) => title !== courseTitle)
        toast.success(`${courseTitle} removed from comparison`)
        return newList
      } else if (prev.length < 3) {
        const newList = [...prev, courseTitle]
        toast.success(`${courseTitle} added to comparison (${newList.length}/3)`)
        return newList
      } else {
        toast.error("You can only compare up to 3 courses at once")
        return prev
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-4">Best Courses for You</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Curated list of courses that align with your career goals and interests
        </p>
        {compareList.length > 0 && (
          <div className="mt-4">
            <Badge variant="secondary" className="gap-2">
              <Compare className="w-4 h-4" />
              {compareList.length} courses selected for comparison
            </Badge>
            {compareList.length >= 2 && (
              <Button
                variant="outline"
                size="sm"
                className="ml-2 bg-transparent"
                onClick={() => toast.success("Opening course comparison view")}
              >
                Compare Now
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="grid gap-6">
        {courses.map((course, index) => (
          <Card key={index} className="border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="font-heading text-xl text-foreground">{course.title}</CardTitle>
                    {course.isPopular && <Badge className="bg-accent text-accent-foreground">Popular</Badge>}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSaveCourse(course.title)}
                      className={`p-1 ${savedCourses.includes(course.title) ? "text-primary" : "text-muted-foreground"}`}
                    >
                      <BookmarkPlus
                        className={`w-4 h-4 ${savedCourses.includes(course.title) ? "fill-current" : ""}`}
                      />
                    </Button>
                  </div>
                  <p className="text-primary font-medium mb-2">{course.university}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{course.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary mb-1">{course.fees}</div>
                  <div className="text-sm text-muted-foreground">Annual Fees</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">{course.rating}/5</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{course.students} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">{course.growth} growth</span>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h4 className="font-heading font-semibold text-lg mb-3">Key Skills You'll Learn</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.skills.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 flex-wrap">
                <Button className="gap-2" onClick={() => handleViewDetails(course.title, course.university)}>
                  View Details
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button variant="secondary" onClick={() => handleEnrollNow(course.title, course.university)}>
                  Enroll Now
                </Button>
                <Button variant="outline" onClick={() => handleFindColleges(course.title)}>
                  Find Colleges
                </Button>
                <Button
                  variant={compareList.includes(course.title) ? "default" : "ghost"}
                  onClick={() => handleCompareCourse(course.title)}
                  className="gap-2"
                >
                  <Compare className="w-4 h-4" />
                  {compareList.includes(course.title) ? "Added" : "Compare"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
