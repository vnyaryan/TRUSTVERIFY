"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Calendar, Mail, Users, User } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

export default function ProfilePage() {
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

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return ""

    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
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

  const userAge = calculateAge(user?.dateOfBirth)
  const formattedDate = formatDate(user?.dateOfBirth)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
      </div>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Your registered account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Address */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Email Address
                </Label>
                <div className="p-3 bg-muted/30 rounded-md border">
                  <p className="text-sm font-medium">{user?.email || "Not provided"}</p>
                </div>
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Date of Birth
                </Label>
                <div className="p-3 bg-muted/30 rounded-md border">
                  <p className="text-sm font-medium">{formattedDate || "Not provided"}</p>
                </div>
              </div>

              {/* Age (Calculated) */}
              {userAge && (
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    Age
                  </Label>
                  <div className="p-3 bg-muted/30 rounded-md border">
                    <p className="text-sm font-medium">{userAge} years old</p>
                  </div>
                </div>
              )}

              {/* Gender */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  Gender
                </Label>
                <div className="p-3 bg-muted/30 rounded-md border">
                  <p className="text-sm font-medium capitalize">{user?.sex || "Not specified"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
