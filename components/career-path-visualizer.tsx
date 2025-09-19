"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Route, Clock, Target, CheckCircle, ArrowRight } from "lucide-react"
import { PathTimeline } from "./path-timeline"
import { PathSelector } from "./path-selector"

const careerPaths = {
  "software-engineer": {
    title: "Software Engineer",
    icon: "💻",
    description: "Build amazing software applications and systems",
    timeline: [
      {
        stage: "Current",
        title: "Class 12th",
        subtitle: "Science Stream",
        duration: "Present",
        status: "current",
        description: "Focus on Mathematics, Physics, and Computer Science",
        skills: ["Basic Programming", "Mathematics", "Problem Solving"],
        icon: "🎓",
      },
      {
        stage: "Step 1",
        title: "Bachelor's Degree",
        subtitle: "B.Tech/B.Sc. Computer Science",
        duration: "3-4 years",
        status: "upcoming",
        description: "Learn programming, algorithms, and software development",
        skills: ["Programming Languages", "Data Structures", "Software Engineering", "Database Systems"],
        icon: "🏫",
      },
      {
        stage: "Step 2",
        title: "Internships & Projects",
        subtitle: "Gain Practical Experience",
        duration: "During college",
        status: "upcoming",
        description: "Build real-world projects and gain industry experience",
        skills: ["Web Development", "Mobile Apps", "Open Source", "Team Collaboration"],
        icon: "💼",
      },
      {
        stage: "Step 3",
        title: "Entry-Level Position",
        subtitle: "Junior Software Developer",
        duration: "1-2 years",
        status: "upcoming",
        description: "Start your professional career in software development",
        skills: ["Code Reviews", "Version Control", "Testing", "Debugging"],
        icon: "🚀",
      },
      {
        stage: "Goal",
        title: "Senior Software Engineer",
        subtitle: "Lead Developer",
        duration: "5+ years",
        status: "goal",
        description: "Lead projects and mentor junior developers",
        skills: ["System Design", "Architecture", "Leadership", "Mentoring"],
        icon: "🏆",
      },
    ],
  },
  "data-scientist": {
    title: "Data Scientist",
    icon: "📊",
    description: "Analyze data to drive business decisions",
    timeline: [
      {
        stage: "Current",
        title: "Class 12th",
        subtitle: "Science Stream",
        duration: "Present",
        status: "current",
        description: "Strong foundation in Mathematics and Statistics",
        skills: ["Mathematics", "Statistics", "Basic Programming"],
        icon: "🎓",
      },
      {
        stage: "Step 1",
        title: "Bachelor's Degree",
        subtitle: "B.Sc. Data Science/Statistics",
        duration: "3 years",
        status: "upcoming",
        description: "Learn statistics, programming, and data analysis",
        skills: ["Python/R", "Statistics", "Machine Learning", "Data Visualization"],
        icon: "🏫",
      },
      {
        stage: "Step 2",
        title: "Specialization",
        subtitle: "Master's or Certifications",
        duration: "1-2 years",
        status: "upcoming",
        description: "Specialize in advanced analytics and AI",
        skills: ["Deep Learning", "Big Data", "Cloud Platforms", "Business Analytics"],
        icon: "📚",
      },
      {
        stage: "Step 3",
        title: "Data Analyst Role",
        subtitle: "Junior Data Analyst",
        duration: "1-2 years",
        status: "upcoming",
        description: "Start with data analysis and reporting",
        skills: ["SQL", "Excel", "Tableau", "Business Intelligence"],
        icon: "💼",
      },
      {
        stage: "Goal",
        title: "Senior Data Scientist",
        subtitle: "Lead Data Scientist",
        duration: "5+ years",
        status: "goal",
        description: "Lead data science projects and strategy",
        skills: ["Advanced ML", "Strategy", "Team Leadership", "Research"],
        icon: "🏆",
      },
    ],
  },
  doctor: {
    title: "Medical Doctor",
    icon: "🩺",
    description: "Heal and care for patients",
    timeline: [
      {
        stage: "Current",
        title: "Class 12th",
        subtitle: "Science Stream (PCB)",
        duration: "Present",
        status: "current",
        description: "Focus on Physics, Chemistry, and Biology",
        skills: ["Biology", "Chemistry", "Physics", "Scientific Method"],
        icon: "🎓",
      },
      {
        stage: "Step 1",
        title: "Medical Entrance",
        subtitle: "NEET Preparation & Exam",
        duration: "1 year",
        status: "upcoming",
        description: "Prepare for and clear NEET examination",
        skills: ["NEET Syllabus", "Time Management", "Test Strategy"],
        icon: "📝",
      },
      {
        stage: "Step 2",
        title: "MBBS Degree",
        subtitle: "Bachelor of Medicine",
        duration: "5.5 years",
        status: "upcoming",
        description: "Complete medical education and internship",
        skills: ["Anatomy", "Physiology", "Pathology", "Clinical Skills"],
        icon: "🏥",
      },
      {
        stage: "Step 3",
        title: "Specialization",
        subtitle: "MD/MS (Optional)",
        duration: "3 years",
        status: "upcoming",
        description: "Specialize in a particular field of medicine",
        skills: ["Specialized Knowledge", "Research", "Advanced Procedures"],
        icon: "🔬",
      },
      {
        stage: "Goal",
        title: "Practicing Doctor",
        subtitle: "Specialist/General Practitioner",
        duration: "Career",
        status: "goal",
        description: "Practice medicine and help patients",
        skills: ["Patient Care", "Diagnosis", "Treatment", "Empathy"],
        icon: "🏆",
      },
    ],
  },
}

export function CareerPathVisualizer() {
  const [selectedPath, setSelectedPath] = useState<keyof typeof careerPaths>("software-engineer")
  const router = useRouter()

  const currentPath = careerPaths[selectedPath]

  const handleBackToHome = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-2" onClick={handleBackToHome}>
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <div className="flex items-center gap-2">
              <Route className="w-5 h-5 text-primary" />
              <h1 className="font-heading font-bold text-xl text-foreground">Career Path Visualizer</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
              Your Journey to Success
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Visualize your complete career path from where you are now to your dream job
            </p>
          </div>

          {/* Path Selector */}
          <PathSelector paths={careerPaths} selectedPath={selectedPath} onPathChange={setSelectedPath} />

          {/* Current Path Overview */}
          <Card className="mb-8 border-border/50 shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{currentPath.icon}</div>
                <div>
                  <CardTitle className="font-heading text-2xl text-foreground">{currentPath.title}</CardTitle>
                  <p className="text-muted-foreground text-lg">{currentPath.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Total Duration</h3>
                  <p className="text-muted-foreground text-sm">
                    {currentPath.timeline.reduce((total, step) => {
                      if (step.duration.includes("years")) {
                        const years = Number.parseInt(step.duration.match(/\d+/)?.[0] || "0")
                        return total + years
                      }
                      return total
                    }, 0)}{" "}
                    years approximately
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Key Milestones</h3>
                  <p className="text-muted-foreground text-sm">{currentPath.timeline.length} major steps</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-chart-2/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Success Rate</h3>
                  <p className="text-muted-foreground text-sm">85% completion rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline Visualization */}
          <PathTimeline timeline={currentPath.timeline} />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button size="lg" className="gap-2">
              Start This Path
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg">
              Find Colleges
            </Button>
            <Button variant="outline" size="lg">
              Connect with Mentors
            </Button>
            <Button variant="ghost" size="lg">
              Download Roadmap
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
