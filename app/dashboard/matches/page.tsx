"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Shield, MessageCircle, Heart, X, ChevronLeft, ChevronRight } from "lucide-react"
import { ResponsiveImage } from "@/components/ui/responsive-image"

// Mock data for matches
const mockMatches = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: `Match ${i + 1}`,
  age: 25 + (i % 8),
  location: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune"][i % 6],
  occupation: ["Software Engineer", "Doctor", "Teacher", "Entrepreneur", "Lawyer", "Architect"][i % 6],
  education: ["B.Tech", "MBBS", "MBA", "Ph.D.", "LLB", "B.Arch"][i % 6],
  trustScore: 70 + (i % 25),
  image: `/placeholder.svg?height=300&width=300&query=person%20${i % 2 === 0 ? "man" : "woman"}%20portrait%20${i}`,
  about:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
}))

export default function MatchesPage() {
  const [matches, setMatches] = useState(mockMatches)
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null)
  const [trustScoreFilter, setTrustScoreFilter] = useState([50])
  const [currentPage, setCurrentPage] = useState(1)
  const matchesPerPage = 6

  const indexOfLastMatch = currentPage * matchesPerPage
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage
  const currentMatches = matches.slice(indexOfFirstMatch, indexOfLastMatch)
  const totalPages = Math.ceil(matches.length / matchesPerPage)

  const handleFilterChange = () => {
    // Filter matches based on trust score
    const filtered = mockMatches.filter((match) => match.trustScore >= trustScoreFilter[0])
    setMatches(filtered)
    setCurrentPage(1)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Find Matches</h1>
      </div>

      <Tabs defaultValue="browse" className="space-y-4">
        <TabsList>
          <TabsTrigger value="browse">Browse Matches</TabsTrigger>
          <TabsTrigger value="preferences">Match Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>Browse Potential Matches</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative w-full md:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search matches..." className="w-full md:w-[200px] pl-8" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center rounded-lg border p-4">
                  <div className="space-y-1 flex-1">
                    <Label htmlFor="trust-score-filter">Minimum Trust Score: {trustScoreFilter[0]}</Label>
                    <Slider
                      id="trust-score-filter"
                      defaultValue={[50]}
                      max={100}
                      step={5}
                      value={trustScoreFilter}
                      onValueChange={setTrustScoreFilter}
                    />
                  </div>
                  <div className="space-y-1 w-full md:w-auto">
                    <Label htmlFor="location-filter">Location</Label>
                    <Select>
                      <SelectTrigger id="location-filter" className="w-full md:w-[180px]">
                        <SelectValue placeholder="Any location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any location</SelectItem>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                        <SelectItem value="chennai">Chennai</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1 w-full md:w-auto">
                    <Label htmlFor="age-filter">Age Range</Label>
                    <Select>
                      <SelectTrigger id="age-filter" className="w-full md:w-[180px]">
                        <SelectValue placeholder="Any age" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any age</SelectItem>
                        <SelectItem value="18-25">18-25</SelectItem>
                        <SelectItem value="26-30">26-30</SelectItem>
                        <SelectItem value="31-35">31-35</SelectItem>
                        <SelectItem value="36-40">36-40</SelectItem>
                        <SelectItem value="41+">41+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleFilterChange}>Apply Filters</Button>
                </div>

                {selectedMatch !== null ? (
                  <div className="space-y-4">
                    <Button variant="ghost" className="flex items-center gap-1" onClick={() => setSelectedMatch(null)}>
                      <ChevronLeft className="h-4 w-4" />
                      Back to matches
                    </Button>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative aspect-square overflow-hidden rounded-lg">
                        <ResponsiveImage
                          src={matches[selectedMatch].image}
                          alt={matches[selectedMatch].name}
                          fill
                          className="object-cover"
                          fallbackSrc="/thoughtful-artist.png"
                        />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-2xl font-bold">{matches[selectedMatch].name}</h2>
                          <p className="text-muted-foreground">
                            {matches[selectedMatch].age} • {matches[selectedMatch].location}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-primary" />
                          <span className="font-medium">Trust Score: {matches[selectedMatch].trustScore}%</span>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-semibold">About</h3>
                          <p className="text-muted-foreground">{matches[selectedMatch].about}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-semibold">Education</h3>
                            <p className="text-muted-foreground">{matches[selectedMatch].education}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Occupation</h3>
                            <p className="text-muted-foreground">{matches[selectedMatch].occupation}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Message
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Heart className="mr-2 h-4 w-4" />
                            Like
                          </Button>
                          <Button variant="ghost" size="icon">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {currentMatches.map((match, index) => (
                        <Card key={match.id} className="overflow-hidden">
                          <div className="relative aspect-square">
                            <ResponsiveImage
                              src={match.image}
                              alt={match.name}
                              fill
                              className="object-cover"
                              fallbackSrc="/thoughtful-artist.png"
                            />
                            <div className="absolute bottom-2 right-2 bg-background/80 rounded-full px-2 py-1 text-xs font-medium flex items-center">
                              <Shield className="h-3 w-3 mr-1 text-primary" />
                              {match.trustScore}%
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-lg">{match.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {match.age} • {match.location}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">{match.occupation}</p>
                          </CardContent>
                          <CardFooter className="p-4 pt-0 flex justify-between">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedMatch(indexOfFirstMatch + index)}
                            >
                              View Profile
                            </Button>
                            <Button size="sm" variant="ghost">
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center space-x-2 mt-4">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm">
                          Page {currentPage} of {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Match Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="age-preference">Age Range</Label>
                <div className="flex items-center gap-4">
                  <Select defaultValue="25">
                    <SelectTrigger id="age-min" className="w-full">
                      <SelectValue placeholder="Min Age" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 23 }, (_, i) => i + 18).map((age) => (
                        <SelectItem key={age} value={age.toString()}>
                          {age}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span>to</span>
                  <Select defaultValue="35">
                    <SelectTrigger id="age-max" className="w-full">
                      <SelectValue placeholder="Max Age" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 33 }, (_, i) => i + 18).map((age) => (
                        <SelectItem key={age} value={age.toString()}>
                          {age}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location-preference">Location Preference</Label>
                <Select>
                  <SelectTrigger id="location-preference">
                    <SelectValue placeholder="Select location preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any location</SelectItem>
                    <SelectItem value="same-city">Same city</SelectItem>
                    <SelectItem value="same-state">Same state</SelectItem>
                    <SelectItem value="custom">Custom locations</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="education-preference">Education Preference</Label>
                <Select>
                  <SelectTrigger id="education-preference">
                    <SelectValue placeholder="Select education preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any education</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                    <SelectItem value="post-graduate">Post Graduate</SelectItem>
                    <SelectItem value="doctorate">Doctorate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupation-preference">Occupation Preference</Label>
                <Select>
                  <SelectTrigger id="occupation-preference">
                    <SelectValue placeholder="Select occupation preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any occupation</SelectItem>
                    <SelectItem value="it">IT Professional</SelectItem>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="engineer">Engineer</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Minimum Trust Score: {trustScoreFilter[0]}</Label>
                <Slider
                  defaultValue={[50]}
                  max={100}
                  step={5}
                  value={trustScoreFilter}
                  onValueChange={setTrustScoreFilter}
                />
              </div>

              <Button className="w-full">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
