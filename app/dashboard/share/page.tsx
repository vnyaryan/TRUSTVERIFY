"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Share2, Download, Copy, RefreshCw, Eye, EyeOff, Shield, FileText, QrCode } from "lucide-react"

export default function SharePage() {
  const { toast } = useToast()
  const [generating, setGenerating] = useState(false)
  const [shareableLink, setShareableLink] = useState("https://trustverify.com/profile/john-doe")
  const [expiryDays, setExpiryDays] = useState("30")

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink)
    toast({
      title: "Link copied",
      description: "The shareable link has been copied to your clipboard.",
    })
  }

  const handleGenerateNewLink = () => {
    setGenerating(true)

    // Simulate generating a new link
    setTimeout(() => {
      setGenerating(false)
      setShareableLink(`https://trustverify.com/profile/john-doe?ref=${Math.random().toString(36).substring(7)}`)
      toast({
        title: "New link generated",
        description: "Your shareable link has been updated.",
      })
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Share & Export</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <div className="flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              <span>Trust Score: 78%</span>
            </div>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="share" className="space-y-4">
        <TabsList>
          <TabsTrigger value="share">Share Options</TabsTrigger>
          <TabsTrigger value="export">Export Profile</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="share" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shareable Link</CardTitle>
              <CardDescription>Share your trust score and verified information with others</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="share-link">Your unique shareable link</Label>
                <div className="flex gap-2">
                  <Input id="share-link" value={shareableLink} readOnly className="flex-1" />
                  <Button variant="outline" size="icon" onClick={handleCopyLink}>
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy link</span>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  This link allows others to view your trust score and verification status.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiry">Link expiry</Label>
                <Select value={expiryDays} onValueChange={setExpiryDays}>
                  <SelectTrigger id="expiry">
                    <SelectValue placeholder="Select expiry period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="0">Never expires</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" className="w-full" onClick={handleGenerateNewLink} disabled={generating}>
                {generating ? (
                  <>Generating...</>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate New Link
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>QR Code</CardTitle>
              <CardDescription>Share your profile with a scannable QR code</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center py-4">
                <div className="h-48 w-48 bg-white p-2 rounded-lg shadow-sm">
                  <Image src="/qr-code.png" width={180} height={180} alt="QR Code" />
                </div>
              </div>
              <div className="flex justify-center gap-2">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download PNG
                </Button>
                <Button variant="outline">
                  <QrCode className="mr-2 h-4 w-4" />
                  Print QR Code
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customize Shared Information</CardTitle>
              <CardDescription>Control what information is visible when sharing your profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="trust-score">Trust Score</Label>
                    <p className="text-sm text-muted-foreground">Your overall trust score</p>
                  </div>
                  <Switch id="trust-score" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="education">Education Details</Label>
                    <p className="text-sm text-muted-foreground">Your verified education information</p>
                  </div>
                  <Switch id="education" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="employment">Employment Details</Label>
                    <p className="text-sm text-muted-foreground">Your verified employment information</p>
                  </div>
                  <Switch id="employment" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="background">Background Check Status</Label>
                    <p className="text-sm text-muted-foreground">Your background check verification status</p>
                  </div>
                  <Switch id="background" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="personal-info">Personal Information</Label>
                    <p className="text-sm text-muted-foreground">Your name, age, and location</p>
                  </div>
                  <Switch id="personal-info" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="contact-info">Contact Information</Label>
                    <p className="text-sm text-muted-foreground">Your email and phone number</p>
                  </div>
                  <Switch id="contact-info" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Share2 className="mr-2 h-4 w-4" />
                Save Sharing Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Export Verification Report</CardTitle>
              <CardDescription>Download your verification details in various formats</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4 bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Verification Report</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  This report includes your trust score, verification status, and a summary of your verified
                  information.
                </p>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    PDF Format
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Digital Certificate
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-message">Add a custom message to your report</Label>
                <Textarea
                  id="custom-message"
                  placeholder="Enter a personal message to include with your verification report..."
                  className="min-h-[100px]"
                />
                <p className="text-xs text-muted-foreground">
                  This message will be included in your exported verification report.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Generate and Download Report
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verification Badge</CardTitle>
              <CardDescription>Add a verification badge to your social media or dating profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center py-4">
                <div className="h-32 w-32 bg-white p-2 rounded-lg shadow-sm flex items-center justify-center">
                  <Image src="/placeholder-nrsnm.png" width={120} height={120} alt="Verification Badge" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="badge-code">HTML Code for Badge</Label>
                <Input
                  id="badge-code"
                  value='<a href="https://trustverify.com/profile/john-doe"><img src="https://trustverify.com/badge/john-doe.png" alt="TrustVerify Badge" /></a>'
                  readOnly
                />
                <div className="flex justify-center mt-2">
                  <Button variant="outline" onClick={handleCopyLink}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Badge Code
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control who can access your verification information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Link Access Control</h3>
                    <p className="text-sm text-muted-foreground">
                      Require recipients to verify their identity before viewing your profile
                    </p>
                  </div>
                  <Switch id="access-control" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">View Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when someone views your shared profile
                    </p>
                  </div>
                  <Switch id="view-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Access Logs</h3>
                    <p className="text-sm text-muted-foreground">
                      Keep a record of who has accessed your verification information
                    </p>
                  </div>
                  <Switch id="access-logs" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">One-time Access</h3>
                    <p className="text-sm text-muted-foreground">Generate links that can only be viewed once</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Eye className="h-4 w-4" />
                      <span>Enable</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <EyeOff className="h-4 w-4" />
                      <span>Disable</span>
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Revoke All Links</h3>
                    <p className="text-sm text-muted-foreground">Invalidate all previously shared links</p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Revoke All
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Privacy Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
