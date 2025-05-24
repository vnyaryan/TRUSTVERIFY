"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Upload, Save, Shield } from "lucide-react"
import { ResponsiveImage } from "@/components/ui/responsive-image"
import { getCurrentUser } from "@/lib/auth"

export default function ProfilePage() {
  const { toast } = useToast()
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = () => {
      try {
        // ✅ FIXED: Now reads real user data from localStorage
        const userData = getCurrentUser()
        console.log("Fetched user data:", userData) // Debug log

        if (userData) {
          setUser(userData)
        } else {
          console.log("No user data found in localStorage")
          // Redirect to login if no user data
          window.location.href = "/login"
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error)
        // Redirect to login on error
        window.location.href = "/login"
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

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

  // Show loading state while fetching user data
  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </div>
    )
  }

  // Show error state if no user data
  if (!user) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Unable to load profile data</p>
            <Button onClick={() => (window.location.href = "/login")}>Return to Login</Button>
          </div>
        </div>
      </div>
    )
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
                  <h3 className="font-semibold">{user?.username || user?.email || "User"}</h3>
                  <p className="text-sm text-muted-foreground">Update your profile picture</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    defaultValue={user?.firstName || user?.first_name || ""}
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last-name"
                    defaultValue={user?.lastName || user?.last_name || ""}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user?.email || ""} placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    defaultValue={user?.phone || user?.phone_number || ""}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    defaultValue={user?.dateOfBirth || user?.date_of_birth || user?.dob || ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select defaultValue={user?.gender || user?.sex || "male"}>
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
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" defaultValue={user?.age || ""} placeholder="Enter your age" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="about">About me</Label>
                <Textarea
                  id="about"
                  placeholder="Tell us about yourself"
                  defaultValue={user?.about || user?.bio || ""}
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    defaultValue={user?.location || user?.city || ""}
                    placeholder="Enter your location"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="religion">Religion</Label>
                  <Select defaultValue={user?.religion || "hindu"}>
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
                  <Input
                    id="education"
                    defaultValue={user?.education || user?.highest_education || ""}
                    placeholder="Enter your education"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    defaultValue={user?.occupation || user?.job || ""}
                    placeholder="Enter your occupation"
                  />
                </div>
              </div>

              {/* Debug Information (remove in production) */}
              <div className="mt-8 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Debug Info (User Data):</h4>
                <pre className="text-xs overflow-auto">{JSON.stringify(user, null, 2)}</pre>
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
      </Tabs>
    </div>
  )
}
