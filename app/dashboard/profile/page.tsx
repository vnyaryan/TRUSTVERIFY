"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Upload, Save, Shield, Calendar, Mail, Users } from "lucide-react"
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
        const userData = getCurrentUser()

        if (userData) {
          setUser(userData)
        } else {
          console.log("No user data found in localStorage")
          window.location.href = "/login"
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error)
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

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return null

    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
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

  const userAge = calculateAge(user?.dateOfBirth || user?.date_of_birth)

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
              <CardDescription>View and update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture Section */}
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative h-24 w-24">
                  <ResponsiveImage
                    src="/abstract-user-avatar.png"
                    alt="Profile"
                    fill
                    className="rounded-full object-cover"
                    fallbackSrc="/diverse-profile-avatars.png"
                  />
                  <div className="absolute -bottom-2 -right-2">
                    <label
                      htmlFor="profile-upload"
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                    >
                      <Upload className="h-4 w-4" />
                      <span className="sr-only">Upload profile picture</span>
                      <Input id="profile-upload" type="file" className="hidden" accept="image/*" />
                    </label>
                  </div>
                </div>
                <div className="space-y-1 text-center md:text-left">
                  <h3 className="font-semibold text-lg">{user?.email || "User"}</h3>
                  <p className="text-sm text-muted-foreground">Update your profile picture</p>
                  {userAge && <p className="text-sm text-muted-foreground">{userAge} years old</p>}
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Account Information
                </h4>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user?.email || ""}
                    placeholder="Enter your email"
                    className="bg-muted/50"
                    readOnly
                  />
                  <p className="text-xs text-muted-foreground">Email cannot be changed after registration</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dob" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Date of Birth
                    </Label>
                    <Input
                      id="dob"
                      type="date"
                      defaultValue={user?.dateOfBirth || user?.date_of_birth || ""}
                      className="bg-muted/50"
                      readOnly
                    />
                    <p className="text-xs text-muted-foreground">Date of birth cannot be changed</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender" className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Gender
                    </Label>
                    <Select defaultValue={user?.gender || user?.sex || "male"} disabled>
                      <SelectTrigger id="gender" className="bg-muted/50">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">Gender cannot be changed after registration</p>
                  </div>
                </div>

                {/* Calculated Age Display */}
                {userAge && (
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Age
                    </Label>
                    <div className="p-3 bg-muted/50 rounded-md border">
                      <p className="text-sm font-medium">{userAge} years old</p>
                      <p className="text-xs text-muted-foreground">Automatically calculated from date of birth</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Account Status */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Account Status</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Account Status</span>
                    </div>
                    <p className="text-sm text-green-600">Active</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Trust Score</span>
                    </div>
                    <p className="text-sm text-blue-600">78% Verified</p>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                Most profile information cannot be changed after registration for security purposes.
              </p>
              <Button onClick={handleSave} disabled={saving} variant="outline">
                {saving ? (
                  <>Updating...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Update Profile Picture
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
