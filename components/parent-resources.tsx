"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, TrendingUp, HelpCircle } from "lucide-react"

interface ParentResourcesProps {
  simplifiedMode: boolean
}

const faqData = [
  {
    question: "Why is higher education important for my child?",
    simpleQuestion: "Why should my child go to college?",
    answer:
      "Higher education provides your child with specialized knowledge, critical thinking skills, and better career opportunities. Statistics show that degree holders earn 84% more over their lifetime compared to high school graduates.",
    simpleAnswer:
      "College helps your child get better jobs and earn more money. People with college degrees usually have more stable careers.",
    category: "Education Value",
    icon: BookOpen,
  },
  {
    question: "What career opportunities exist after BA English?",
    simpleQuestion: "What jobs can my child get with BA English?",
    answer:
      "BA English graduates can pursue careers in content writing, journalism, teaching, publishing, digital marketing, public relations, and corporate communications. The average starting salary ranges from ₹3-7 LPA.",
    simpleAnswer:
      "Your child can become a writer, teacher, journalist, or work in companies writing content. Starting salary is usually ₹3-7 lakhs per year.",
    category: "Career Options",
    icon: Users,
  },
  {
    question: "How do I support my child's career decision-making process?",
    simpleQuestion: "How can I help my child choose a career?",
    answer:
      "Encourage open discussions about their interests, provide exposure to different career fields, support their educational choices, and help them connect with professionals in their areas of interest.",
    simpleAnswer:
      "Talk to your child about what they like, show them different job options, and support their choices. Help them meet people who work in jobs they find interesting.",
    category: "Parental Guidance",
    icon: HelpCircle,
  },
  {
    question: "What is the job market outlook for different degrees?",
    simpleQuestion: "Which degrees have good job opportunities?",
    answer:
      "Technology, healthcare, and finance sectors show strong growth. Engineering and computer science have high demand, while traditional fields like commerce and arts are evolving with digital transformation.",
    simpleAnswer:
      "Computer jobs, healthcare jobs, and money-related jobs are growing fast. Engineering and computer science have many job openings.",
    category: "Market Trends",
    icon: TrendingUp,
  },
]

export function ParentResources({ simplifiedMode }: ParentResourcesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">
          {simplifiedMode ? "Common Questions" : "Resources & Frequently Asked Questions"}
        </CardTitle>
        <CardDescription>
          {simplifiedMode
            ? "Answers to questions parents often ask about their child's education and career"
            : "Essential information and answers to help guide your child's educational and career journey"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq, index) => {
            const Icon = faq.icon
            return (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold">{simplifiedMode ? faq.simpleQuestion : faq.question}</div>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {faq.category}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="pl-8">
                    <p className="text-muted-foreground leading-relaxed">
                      {simplifiedMode ? faq.simpleAnswer : faq.answer}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>

        <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
          <h3 className="font-heading font-semibold text-foreground mb-2">
            {simplifiedMode ? "Need More Help?" : "Additional Support"}
          </h3>
          <p className="text-muted-foreground mb-4">
            {simplifiedMode
              ? "If you have more questions, you can talk to our career counselors for free."
              : "Connect with our career counselors for personalized guidance tailored to your child's interests and goals."}
          </p>
          <div className="flex gap-3">
            <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
              📞 Free Consultation
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent/10">
              📧 Email Support
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
