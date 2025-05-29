"use client"

import { useState, useEffect } from "react"
import { Shield, Share2, Save, RefreshCw, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { SharingSyncService } from "@/lib/sharing-sync-service"

export default function SharePage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userId, setUserId] = useState<string>("")

  // Email inputs
  const [email1, setEmail1] = useState("")
  const [email2, setEmail2] = useState("")

  // Checkbox states
  const [nameEmail1, setNameEmail1] = useState(false)
  const [nameEmail2, setNameEmail2] = useState(false)
  const [phoneEmail1, setPhoneEmail1] = useState(false)
  const [phoneEmail2, setPhoneEmail2] = useState(false)

  useEffect(() => {
    // Get current user from localStorage (matching your auth system)
    const getCurrentUserId = () => {
      if (typeof window === "undefined") return ""

      const userData = localStorage.getItem("user")
      if (!userData) return ""

      try {
        const user = JSON.parse(userData)
        return user.email || "" // Use email as user ID
      } catch {
        return ""
      }
    }

    const currentUserId = getCurrentUserId()
    setUserId(currentUserId)
  }, [])

  // Load existing preferences
  useEffect(() => {
    if (!userId) return // Don't load if no user ID

    async function loadPreferences() {
      try {
        setLoading(true)
        setError(null)

        const preferences = await SharingSyncService.getPreferences(userId)

        // If we have preferences, populate the form
        if (preferences && preferences.length > 0) {
          // Find preferences for first and second email slots
          const firstPref = preferences[0]
          if (firstPref) {
            setEmail1(firstPref.recipientEmail)
            setNameEmail1(firstPref.shareName)
            setPhoneEmail1(firstPref.sharePhone)
          }

          const secondPref = preferences[1]
          if (secondPref) {
            setEmail2(secondPref.recipientEmail)
            setNameEmail2(secondPref.shareName)
            setPhoneEmail2(secondPref.sharePhone)
          }
        }
      } catch (err) {
        setError("Failed to load sharing preferences. Please try again.")
        console.error("Error loading preferences:", err)
      } finally {
        setLoading(false)
      }
    }

    loadPreferences()
  }, [userId])

  // Handle form submission
  const handleSave = async () => {
    try {
      setSaving(true)
      setError(null)

      // Validate emails
      if ((email1 && !isValidEmail(email1)) || (email2 && !isValidEmail(email2))) {
        setError("Please enter valid email addresses.")
        return
      }

      // Save preferences for email1 if provided
      if (email1) {
        await SharingSyncService.savePreference({
          userId,
          recipientEmail: email1,
          shareName: nameEmail1,
          sharePhone: phoneEmail1,
        })
      }

      // Save preferences for email2 if provided
      if (email2) {
        await SharingSyncService.savePreference({
          userId,
          recipientEmail: email2,
          shareName: nameEmail2,
          sharePhone: phoneEmail2,
        })
      }

      toast({
        title: "Preferences saved",
        description: "Your sharing preferences have been saved successfully.",
      })
    } catch (err) {
      setError("Failed to save sharing preferences. Please try again.")
      console.error("Error saving preferences:", err)
    } finally {
      setSaving(false)
    }
  }

  // Validate email format
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // Handle refresh
  const handleRefresh = async () => {
    try {
      setLoading(true)
      setError(null)
      await SharingSyncService.syncWithServer(userId)

      // Reload preferences
      const preferences = await SharingSyncService.getPreferences(userId, true)

      // Reset form
      setEmail1("")
      setEmail2("")
      setNameEmail1(false)
      setNameEmail2(false)
      setPhoneEmail1(false)
      setPhoneEmail2(false)

      // Populate form with refreshed data
      if (preferences && preferences.length > 0) {
        const firstPref = preferences[0]
        if (firstPref) {
          setEmail1(firstPref.recipientEmail)
          setNameEmail1(firstPref.shareName)
          setPhoneEmail1(firstPref.sharePhone)
        }

        const secondPref = preferences[1]
        if (secondPref) {
          setEmail2(secondPref.recipientEmail)
          setNameEmail2(secondPref.shareName)
          setPhoneEmail2(secondPref.sharePhone)
        }
      }

      toast({
        title: "Refreshed",
        description: "Your sharing preferences have been refreshed.",
      })
    } catch (err) {
      setError("Failed to refresh sharing preferences. Please try again.")
      console.error("Error refreshing preferences:", err)
    } finally {
      setLoading(false)
    }
  }

  if (!userId) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Share Trust Details</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">Loading user information...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Share Trust Details</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <div className="flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              <span>Trust Score: 67%</span>
            </div>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Share2 className="mr-2 h-5 w-5" />
            Share Your Trust Details
          </CardTitle>
          <CardDescription>Select which details you want to share with specific people</CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 bg-gray-50 p-4 text-left font-medium">TRUST-DETAILS</th>
                  <th className="border border-gray-300 bg-gray-50 p-4 text-left font-medium">EMAIL-ID OF PERSON</th>
                  <th className="border border-gray-300 bg-gray-50 p-4 text-left font-medium">EMAIL-ID OF PERSON</th>
                </tr>
              </thead>
              <tbody>
                {/* Email input row */}
                <tr>
                  <td className="border border-gray-300 p-4 font-medium">&nbsp;</td>
                  <td className="border border-gray-300 p-4">
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      value={email1}
                      onChange={(e) => setEmail1(e.target.value)}
                      disabled={loading || saving}
                    />
                  </td>
                  <td className="border border-gray-300 p-4">
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      value={email2}
                      onChange={(e) => setEmail2(e.target.value)}
                      disabled={loading || saving}
                    />
                  </td>
                </tr>

                {/* NAME row */}
                <tr>
                  <td className="border border-gray-300 p-4 font-medium">NAME</td>
                  <td className="border border-gray-300 p-4 text-center">
                    <Checkbox
                      checked={nameEmail1}
                      onCheckedChange={(checked) => setNameEmail1(checked === true)}
                      disabled={!email1 || loading || saving}
                    />
                  </td>
                  <td className="border border-gray-300 p-4 text-center">
                    <Checkbox
                      checked={nameEmail2}
                      onCheckedChange={(checked) => setNameEmail2(checked === true)}
                      disabled={!email2 || loading || saving}
                    />
                  </td>
                </tr>

                {/* PHONE row */}
                <tr>
                  <td className="border border-gray-300 p-4 font-medium">PHONE</td>
                  <td className="border border-gray-300 p-4 text-center">
                    <Checkbox
                      checked={phoneEmail1}
                      onCheckedChange={(checked) => setPhoneEmail1(checked === true)}
                      disabled={!email1 || loading || saving}
                    />
                  </td>
                  <td className="border border-gray-300 p-4 text-center">
                    <Checkbox
                      checked={phoneEmail2}
                      onCheckedChange={(checked) => setPhoneEmail2(checked === true)}
                      disabled={!email2 || loading || saving}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleRefresh} disabled={loading || saving}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <Button onClick={handleSave} disabled={loading || saving || (!email1 && !email2)}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Saving..." : "Save Preferences"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
