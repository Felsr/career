"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { GraduationCap, TrendingUp, Users, BookOpen, Heart, Star } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function ParentDashboard() {
  const [simplifiedMode, setSimplifiedMode] = useState(false)

  const incomeData = [
    { category: "High School Only", salary: 25000, jobs: 45 },
    { category: "Bachelor's Degree", salary: 45000, jobs: 75 },
    { category: "Master's Degree", salary: 65000, jobs: 85 },
    { category: "Professional Degree", salary: 85000, jobs: 90 },
  ]

  const successStories = [
    {
      name: "Priya Sharma",
      degree: "B.A. English from Govt. College",
      career: "Content Marketing Manager",
      salary: "₹8 LPA",
      company: "Tech Startup",
      image: "/placeholder.svg",
    },
    {
      name: "Rajesh Kumar",
      degree: "B.Com from Local College",
      career: "Financial Analyst",
      salary: "₹12 LPA",
      company: "Banking Sector",
      image: "/placeholder.svg",
    },
    {
      name: "Anita Devi",
      degree: "B.Sc. Mathematics",
      career: "Data Scientist",
      salary: "₹15 LPA",
      company: "MNC",
      image: "/placeholder.svg",
    },
  ]

  const careerOutcomes = [
    {
      degree: "B.A. English",
      avgSalary: "₹4-8 LPA",
      jobAvailability: "High",
      careers: ["Content Writer", "Teacher", "Journalist", "Marketing Executive"],
    },
    {
      degree: "B.Com",
      avgSalary: "₹3-10 LPA",
      jobAvailability: "Very High",
      careers: ["Accountant", "Financial Analyst", "Banking", "CA"],
    },
    {
      degree: "B.Sc. Computer Science",
      avgSalary: "₹6-25 LPA",
      jobAvailability: "Excellent",
      careers: ["Software Developer", "Data Analyst", "IT Support", "Web Developer"],
    },
    {
      degree: "B.Tech Engineering",
      avgSalary: "₹8-30 LPA",
      jobAvailability: "Excellent",
      careers: ["Engineer", "Project Manager", "Technical Lead", "Consultant"],
    },
  ]

  const faqs = [
    {
      question: "Why is higher education important for my child?",
      answer: simplifiedMode
        ? "College education helps your child get better jobs and earn more money. It also teaches important skills for life."
        : "Higher education provides your child with specialized knowledge, critical thinking skills, and professional networks that significantly increase their earning potential and career opportunities. Statistics show that college graduates earn 84% more over their lifetime compared to high school graduates.",
    },
    {
      question: "What jobs are possible after B.A. English?",
      answer: simplifiedMode
        ? "Your child can become a teacher, writer, work in offices, or join media companies. Many good jobs are available."
        : "B.A. English graduates have diverse career options including content writing, journalism, teaching, marketing, public relations, publishing, civil services, and corporate communications. The degree develops strong communication and analytical skills valued across industries.",
    },
    {
      question: "How much does college education cost?",
      answer: simplifiedMode
        ? "Government colleges cost less money (₹10,000-50,000 per year). Private colleges cost more (₹1-5 lakhs per year)."
        : "Government colleges typically charge ₹10,000-50,000 annually for undergraduate programs, while private institutions range from ₹1-5 lakhs per year. Various scholarships and education loans are available to support your child's education.",
    },
    {
      question: "Which stream should my child choose after 10th?",
      answer: simplifiedMode
        ? "Choose based on what your child likes. Science for doctor/engineer, Commerce for business jobs, Arts for creative work."
        : "Stream selection should align with your child's interests, aptitude, and career goals. Science opens doors to engineering, medicine, and research. Commerce leads to business, finance, and management careers. Arts/Humanities offers opportunities in social sciences, literature, and creative fields.",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section with Simplified Mode Toggle */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-6 h-6" />
                  Guidance for Your Child's Future 🌱
                </CardTitle>
                <CardDescription className="text-green-100">
                  {simplifiedMode
                    ? "Simple information to help your child succeed"
                    : "Evidence-based insights to support your child's educational journey"}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Simple Mode</span>
                <Switch checked={simplifiedMode} onCheckedChange={setSimplifiedMode} />
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Income Comparison Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              {simplifiedMode ? "Education vs Income" : "Degree vs No-Degree Income Comparison"}
            </CardTitle>
            <CardDescription>
              {simplifiedMode
                ? "More education usually means better salary"
                : "Statistical analysis of earning potential across education levels"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incomeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "salary" ? `₹${value.toLocaleString()}` : `${value}%`,
                      name === "salary" ? "Average Salary" : "Job Availability",
                    ]}
                  />
                  <Bar dataKey="salary" fill="#10B981" name="salary" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Success Stories */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              {simplifiedMode ? "Success Stories" : "Alumni Success Stories"}
            </CardTitle>
            <CardDescription>
              {simplifiedMode
                ? "Students who studied in government colleges and got good jobs"
                : "Real testimonials from government college graduates who achieved career success"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {successStories.map((story, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 border rounded-lg hover:shadow-md transition-all"
                >
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto flex items-center justify-center text-white font-bold text-lg">
                      {story.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h4 className="font-medium">{story.name}</h4>
                      <p className="text-sm text-muted-foreground">{story.degree}</p>
                    </div>
                    <div className="space-y-1">
                      <Badge variant="secondary">{story.career}</Badge>
                      <p className="text-sm font-medium text-green-600">{story.salary}</p>
                      <p className="text-xs text-muted-foreground">{story.company}</p>
                    </div>
                    <div className="flex justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Career Outcome Explorer */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              {simplifiedMode ? "Course Options" : "Career Outcome Explorer"}
            </CardTitle>
            <CardDescription>
              {simplifiedMode
                ? "Different courses and what jobs they lead to"
                : "Compare career options and outcomes for different degree programs"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {careerOutcomes.map((outcome, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div>
                      <h4 className="font-medium">{outcome.degree}</h4>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Average Salary</p>
                      <p className="font-medium text-green-600">{outcome.avgSalary}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Job Availability</p>
                      <Badge
                        variant={
                          outcome.jobAvailability === "Excellent"
                            ? "default"
                            : outcome.jobAvailability === "Very High"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {outcome.jobAvailability}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Career Options:</p>
                      <div className="flex flex-wrap gap-1">
                        {outcome.careers.slice(0, 2).map((career, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {career}
                          </Badge>
                        ))}
                        {outcome.careers.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{outcome.careers.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* FAQ Resources */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              {simplifiedMode ? "Common Questions" : "Frequently Asked Questions"}
            </CardTitle>
            <CardDescription>
              {simplifiedMode
                ? "Answers to questions parents often ask"
                : "Comprehensive guidance for common parental concerns about education"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
