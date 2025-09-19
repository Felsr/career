"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Star, ExternalLink, Navigation, Heart, Compass as Compare } from "lucide-react"
import { toast } from "sonner"

const colleges = [
  {
    name: "Delhi University",
    location: "New Delhi",
    distance: "2.5 km",
    type: "Government",
    rating: 4.8,
    students: "15k+",
    established: "1922",
    ranking: "#3 in India",
    courses: ["B.Sc. Computer Science", "B.Sc. Physics", "B.Com", "B.A. Economics"],
    facilities: ["Library", "Labs", "Sports Complex", "Hostel"],
    fees: "₹15,000-45,000/year",
    image: "/placeholder.svg?height=200&width=300&text=Delhi+University",
  },
  {
    name: "Jamia Millia Islamia",
    location: "New Delhi",
    distance: "8.2 km",
    type: "Central University",
    rating: 4.6,
    students: "12k+",
    established: "1920",
    ranking: "#12 in India",
    courses: ["B.Tech. Computer Science", "B.Sc. Biotechnology", "B.A. Mass Communication"],
    facilities: ["Modern Labs", "Library", "Cafeteria", "Medical Center"],
    fees: "₹25,000-65,000/year",
    image: "/placeholder.svg?height=200&width=300&text=Jamia+Millia",
  },
  {
    name: "Guru Gobind Singh Indraprastha University",
    location: "New Delhi",
    distance: "12.1 km",
    type: "State University",
    rating: 4.4,
    students: "8k+",
    established: "1998",
    ranking: "#25 in India",
    courses: ["B.Tech. IT", "B.Sc. Data Science", "BBA", "B.Des"],
    facilities: ["Innovation Hub", "Placement Cell", "Sports Facilities", "Auditorium"],
    fees: "₹35,000-85,000/year",
    image: "/placeholder.svg?height=200&width=300&text=GGSIPU",
  },
]

export function CollegeRecommendations() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [compareList, setCompareList] = useState<string[]>([])

  const handleViewDetails = (collegeName: string) => {
    toast.success(`Opening detailed information for ${collegeName}`)
    // In a real app, this would navigate to a detailed college page
    console.log(`[v0] Viewing details for ${collegeName}`)
  }

  const handleGetDirections = (collegeName: string, location: string) => {
    toast.success(`Opening directions to ${collegeName}`)
    // In a real app, this would open maps with directions
    const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(collegeName + " " + location)}`
    window.open(mapsUrl, "_blank")
  }

  const handleToggleFavorite = (collegeName: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(collegeName)
        ? prev.filter((name) => name !== collegeName)
        : [...prev, collegeName]

      const action = newFavorites.includes(collegeName) ? "added to" : "removed from"
      toast.success(`${collegeName} ${action} favorites`)
      return newFavorites
    })
  }

  const handleToggleCompare = (collegeName: string) => {
    setCompareList((prev) => {
      if (prev.includes(collegeName)) {
        const newList = prev.filter((name) => name !== collegeName)
        toast.success(`${collegeName} removed from comparison`)
        return newList
      } else if (prev.length < 3) {
        const newList = [...prev, collegeName]
        toast.success(`${collegeName} added to comparison (${newList.length}/3)`)
        return newList
      } else {
        toast.error("You can only compare up to 3 colleges at once")
        return prev
      }
    })
  }

  const handleApply = (collegeName: string) => {
    toast.success(`Starting application process for ${collegeName}`)
    // In a real app, this would navigate to application form
    console.log(`[v0] Starting application for ${collegeName}`)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-4">Nearby Government Colleges</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Top-rated colleges in your area offering your preferred courses
        </p>
        {compareList.length > 0 && (
          <div className="mt-4">
            <Badge variant="secondary" className="gap-2">
              <Compare className="w-4 h-4" />
              {compareList.length} colleges selected for comparison
            </Badge>
            {compareList.length >= 2 && (
              <Button
                variant="outline"
                size="sm"
                className="ml-2 bg-transparent"
                onClick={() => toast.success("Opening college comparison view")}
              >
                Compare Now
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="grid gap-6">
        {colleges.map((college, index) => (
          <Card
            key={index}
            className="border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src={college.image || "/placeholder.svg"}
                  alt={college.name}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              <div className="md:w-2/3">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="font-heading text-xl text-foreground">{college.name}</CardTitle>
                        <Badge variant="secondary">{college.type}</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleFavorite(college.name)}
                          className={`p-1 ${favorites.includes(college.name) ? "text-red-500" : "text-muted-foreground"}`}
                        >
                          <Heart className={`w-4 h-4 ${favorites.includes(college.name) ? "fill-current" : ""}`} />
                        </Button>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {college.location} • {college.distance}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          {college.rating}/5
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">Est. {college.established}</span>
                        <Badge variant="outline" className="text-xs">
                          {college.ranking}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary mb-1">{college.fees}</div>
                      <div className="text-sm text-muted-foreground">Annual Fees</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="font-heading font-semibold text-sm mb-2">Available Courses</h4>
                      <div className="space-y-1">
                        {college.courses.slice(0, 3).map((course, idx) => (
                          <div key={idx} className="text-sm text-muted-foreground">
                            • {course}
                          </div>
                        ))}
                        {college.courses.length > 3 && (
                          <div className="text-sm text-primary">+{college.courses.length - 3} more courses</div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-sm mb-2">Key Facilities</h4>
                      <div className="flex flex-wrap gap-1">
                        {college.facilities.map((facility, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 flex-wrap">
                    <Button className="gap-2" onClick={() => handleViewDetails(college.name)}>
                      View Details
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="gap-2 bg-transparent"
                      onClick={() => handleGetDirections(college.name, college.location)}
                    >
                      <Navigation className="w-4 h-4" />
                      Get Directions
                    </Button>
                    <Button
                      variant={compareList.includes(college.name) ? "default" : "ghost"}
                      onClick={() => handleToggleCompare(college.name)}
                      className="gap-2"
                    >
                      <Compare className="w-4 h-4" />
                      {compareList.includes(college.name) ? "Added" : "Compare"}
                    </Button>
                    <Button variant="secondary" onClick={() => handleApply(college.name)}>
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
