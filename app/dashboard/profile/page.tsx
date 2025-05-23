"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Upload, Save, Shield, Eye, EyeOff } from "lucide-react"
import { ResponsiveImage } from "@/components/ui/responsive-image"

export default function ProfilePage() {
  const { toast } = useToast()
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    setSaving(true)

    // Simulate saving
    setTimeout(() => {
      setSaving(false)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <div className="flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              <span>Trust Score: 78%</span>
            </div>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="preferences">Partner Preferences</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative h-24 w-24">
                  <ResponsiveImage
                    src="/abstract-geometric-shapes.png"
                    alt="Profile"
                    fill
                    className="rounded-full object-cover"
                    fallbackSrc="/diverse-profile-avatars.png"
                  />
                  <div className="absolute -bottom-2 -right-2">
                    <label
                      htmlFor="profile-upload"
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm"
                    >
                      <Upload className="h-4 w-4" />
                      <span className="sr-only">Upload profile picture</span>
                      <Input id="profile-upload" type="file" className="hidden" />
                    </label>
                  </div>
                </div>
                <div className="space-y-1 text-center md:text-left">
                  <h3 className="font-semibold">John Doe</h3>
                  <p className="text-sm text-muted-foreground">Update your profile picture</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" defaultValue="Doe" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" type="tel" defaultValue="+91 9876543210" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of birth</Label>
                  <Input id="dob" type="date" defaultValue="1990-01-01" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select defaultValue="male">
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="about">About me</Label>
                <Textarea
                  id="about"
                  placeholder="Tell us about yourself"
                  defaultValue="I am a software engineer with a passion for technology and innovation. I enjoy reading, traveling, and exploring new cultures."
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue="Mumbai, Maharashtra" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="religion">Religion</Label>
                  <Select defaultValue="hindu">
                    <SelectTrigger id="religion">
                      <SelectValue placeholder="Select religion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hindu">Hindu</SelectItem>
                      <SelectItem value="muslim">Muslim</SelectItem>
                      <SelectItem value="christian">Christian</SelectItem>
                      <SelectItem value="sikh">Sikh</SelectItem>
                      <SelectItem value="jain">Jain</SelectItem>
                      <SelectItem value="buddhist">Buddhist</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="education">Highest Education</Label>
                  <Input id="education" defaultValue="B.Tech in Computer Science" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input id="occupation" defaultValue="Senior Software Engineer" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Partner Preferences</CardTitle>
              <CardDescription>Specify your preferences for a potential partner</CardDescription>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height-preference">Height</Label>
                  <Select defaultValue="any">
                    <SelectTrigger id="height-preference">
                      <SelectValue placeholder="Select height preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any height</SelectItem>
                      <SelectItem value="150-160">150-160 cm</SelectItem>
                      <SelectItem value="160-170">160-170 cm</SelectItem>
                      <SelectItem value="170-180">170-180 cm</SelectItem>
                      <SelectItem value="180+">180+ cm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="marital-status">Marital Status</Label>
                  <Select defaultValue="never-married">
                    <SelectTrigger id="marital-status">
                      <SelectValue placeholder="Select marital status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never-married">Never Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                      <SelectItem value="any">Any</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="religion-preference">Religion</Label>
                  <Select defaultValue="any">
                    <SelectTrigger id="religion-preference">
                      <SelectValue placeholder="Select religion preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any religion</SelectItem>
                      <SelectItem value="hindu">Hindu</SelectItem>
                      <SelectItem value="muslim">Muslim</SelectItem>
                      <SelectItem value="christian">Christian</SelectItem>
                      <SelectItem value="sikh">Sikh</SelectItem>
                      <SelectItem value="jain">Jain</SelectItem>
                      <SelectItem value="buddhist">Buddhist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location-preference">Location</Label>
                  <Select defaultValue="same-city">
                    <SelectTrigger id="location-preference">
                      <SelectValue placeholder="Select location preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any location</SelectItem>
                      <SelectItem value="same-city">Same city</SelectItem>
                      <SelectItem value="same-state">Same state</SelectItem>
                      <SelectItem value="same-country">Same country</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="education-preference">Education</Label>
                  <Select defaultValue="graduate">
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
                  <Label htmlFor="occupation-preference">Occupation</Label>
                  <Select defaultValue="any">
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="trust-score-preference">Minimum Trust Score</Label>
                <Select defaultValue="70">
                  <SelectTrigger id="trust-score-preference">
                    <SelectValue placeholder="Select minimum trust score" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any score</SelectItem>
                    <SelectItem value="50">50+</SelectItem>
                    <SelectItem value="60">60+</SelectItem>
                    <SelectItem value="70">70+</SelectItem>
                    <SelectItem value="80">80+</SelectItem>
                    <SelectItem value="90">90+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-preferences">Additional Preferences</Label>
                <Textarea
                  id="additional-preferences"
                  placeholder="Any other preferences you have"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="photos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Photos</CardTitle>
              <CardDescription>Add photos to your profile (maximum 6 photos)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-md border border-dashed flex flex-col items-center justify-center p-4"
                  >
                    {index <= 2 ? (
                      <>
                        <div className="relative h-full w-full">
                          <ResponsiveImage
                            src={`/diverse-group.png?height=200&width=200&query=person%20${index}`}
                            alt={`Photo ${index}`}
                            fill
                            className="rounded-md object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Button variant="destructive" size="icon" className="h-6 w-6 rounded-full">
                              <span className="sr-only">Remove photo</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-3 w-3"
                              >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                              </svg>
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground text-center">Upload photo</p>
                        <label htmlFor={`photo-upload-${index}`} className="absolute inset-0 cursor-pointer">
                          <span className="sr-only">Upload photo</span>
                          <Input id={`photo-upload-${index}`} type="file" className="hidden" />
                        </label>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Photos
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control who can see your profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Profile Visibility</h3>
                    <p className="text-sm text-muted-foreground">Control who can view your profile</p>
                  </div>
                  <Select defaultValue="verified">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All users</SelectItem>
                      <SelectItem value="verified">Verified users only</SelectItem>
                      <SelectItem value="matches">Matches only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Contact Information</h3>
                    <p className="text-sm text-muted-foreground">Control who can see your contact details</p>
                  </div>
                  <Select defaultValue="none">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All users</SelectItem>
                      <SelectItem value="verified">Verified users only</SelectItem>
                      <SelectItem value="matches">Matches only</SelectItem>
                      <SelectItem value="none">No one</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Trust Score Details</h3>
                    <p className="text-sm text-muted-foreground">Control who can see your trust score breakdown</p>
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All users</SelectItem>
                      <SelectItem value="verified">Verified users only</SelectItem>
                      <SelectItem value="matches">Matches only</SelectItem>
                      <SelectItem value="none">No one</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Online Status</h3>
                    <p className="text-sm text-muted-foreground">Show when you are active on the platform</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Eye className="h-4 w-4" />
                      <span>Visible</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <EyeOff className="h-4 w-4" />
                      <span>Hidden</span>
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Profile in Search</h3>
                    <p className="text-sm text-muted-foreground">Allow your profile to appear in search results</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Eye className="h-4 w-4" />
                      <span>Visible</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <EyeOff className="h-4 w-4" />
                      <span>Hidden</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Privacy Settings
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
