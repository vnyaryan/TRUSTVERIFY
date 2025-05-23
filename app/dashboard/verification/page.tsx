"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Upload, FileText, CheckCircle, AlertCircle, Clock, Shield } from "lucide-react"

export default function VerificationPage() {
  const { toast } = useToast()
  const [uploading, setUploading] = useState(false)
  const [educationStatus, setEducationStatus] = useState("verified") // verified, pending, not-started
  const [employmentStatus, setEmploymentStatus] = useState("verified") // verified, pending, not-started
  const [backgroundStatus, setBackgroundStatus] = useState("not-started") // verified, pending, not-started

  const handleFileUpload = (category: string) => {
    setUploading(true)

    // Simulate file upload
    setTimeout(() => {
      setUploading(false)

      if (category === "background") {
        setBackgroundStatus("pending")
      }

      toast({
        title: "Document uploaded",
        description: "Your document has been uploaded and is pending verification.",
      })
    }, 2000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "pending":
        return <Clock className="h-5 w-5 text-amber-500" />
      case "not-started":
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "verified":
        return "Verified"
      case "pending":
        return "Pending Verification"
      case "not-started":
        return "Not Started"
      default:
        return ""
    }
  }

  const calculateProgress = () => {
    let progress = 0
    if (educationStatus === "verified") progress += 33.33
    if (employmentStatus === "verified") progress += 33.33
    if (backgroundStatus === "verified") progress += 33.33
    else if (backgroundStatus === "pending") progress += 16.67
    return progress
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Verification</h1>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/trust-score">
            <Shield className="mr-2 h-4 w-4" />
            View Trust Score
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Verification Progress</CardTitle>
          <CardDescription>Complete all verifications to achieve a 100% trust score</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-medium">{Math.round(calculateProgress())}%</span>
            </div>
            <Progress value={calculateProgress()} />
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(educationStatus)}
                <span>Education Verification</span>
              </div>
              <span className="text-sm font-medium">{getStatusText(educationStatus)}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(employmentStatus)}
                <span>Employment Verification</span>
              </div>
              <span className="text-sm font-medium">{getStatusText(employmentStatus)}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(backgroundStatus)}
                <span>Background Check</span>
              </div>
              <span className="text-sm font-medium">{getStatusText(backgroundStatus)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="education" className="space-y-4">
        <TabsList>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
          <TabsTrigger value="background">Background Check</TabsTrigger>
        </TabsList>

        <TabsContent value="education" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Education Verification</CardTitle>
              <CardDescription>Verify your educational qualifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {educationStatus === "verified" ? (
                <div className="rounded-lg border p-4 bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <h3 className="font-semibold">Verification Complete</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your education details have been verified successfully.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="font-medium">Degree:</span>
                      <span>Bachelor of Technology</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="font-medium">Institution:</span>
                      <span>Indian Institute of Technology</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="font-medium">Year of Completion:</span>
                      <span>2020</span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="degree">Degree</Label>
                    <Input id="degree" placeholder="e.g., Bachelor of Technology" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institution">Institution</Label>
                    <Input id="institution" placeholder="e.g., Indian Institute of Technology" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year of Completion</Label>
                    <Input id="year" placeholder="e.g., 2020" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="certificate">Upload Degree Certificate</Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="certificate-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">PDF, JPG or PNG (MAX. 5MB)</p>
                        </div>
                        <Input
                          id="certificate-upload"
                          type="file"
                          className="hidden"
                          onChange={() => handleFileUpload("education")}
                        />
                      </label>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            {educationStatus !== "verified" && (
              <CardFooter>
                <Button disabled={uploading || educationStatus === "pending"}>
                  {uploading ? "Uploading..." : "Submit for Verification"}
                </Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="employment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Employment Verification</CardTitle>
              <CardDescription>Verify your employment history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {employmentStatus === "verified" ? (
                <div className="rounded-lg border p-4 bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <h3 className="font-semibold">Verification Complete</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your employment details have been verified successfully.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="font-medium">Company:</span>
                      <span>Tech Innovations Ltd.</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="font-medium">Position:</span>
                      <span>Senior Software Engineer</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="font-medium">Duration:</span>
                      <span>2020 - Present</span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" placeholder="e.g., Tech Innovations Ltd." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input id="position" placeholder="e.g., Senior Software Engineer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input id="duration" placeholder="e.g., 2020 - Present" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employment-proof">Upload Employment Proof</Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="employment-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">PDF, JPG or PNG (MAX. 5MB)</p>
                        </div>
                        <Input
                          id="employment-upload"
                          type="file"
                          className="hidden"
                          onChange={() => handleFileUpload("employment")}
                        />
                      </label>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            {employmentStatus !== "verified" && (
              <CardFooter>
                <Button disabled={uploading || employmentStatus === "pending"}>
                  {uploading ? "Uploading..." : "Submit for Verification"}
                </Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="background" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Background Check</CardTitle>
              <CardDescription>Complete a background check for enhanced trust</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {backgroundStatus === "verified" ? (
                <div className="rounded-lg border p-4 bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <h3 className="font-semibold">Verification Complete</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your background check has been completed successfully.
                  </p>
                </div>
              ) : backgroundStatus === "pending" ? (
                <div className="rounded-lg border p-4 bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-amber-500" />
                    <h3 className="font-semibold">Verification in Progress</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your background check is currently being processed. This typically takes 3-5 business days.
                  </p>
                </div>
              ) : (
                <>
                  <div className="rounded-lg border p-4 bg-muted/50 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Background Check Information</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      The background check verifies your identity and checks for any criminal records. This helps build
                      trust with potential partners.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      You'll need to provide a government-issued ID and consent to the background check.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="id-proof">Upload Government ID</Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="id-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">PDF, JPG or PNG (MAX. 5MB)</p>
                        </div>
                        <Input
                          id="id-upload"
                          type="file"
                          className="hidden"
                          onChange={() => handleFileUpload("background")}
                        />
                      </label>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            {backgroundStatus === "not-started" && (
              <CardFooter>
                <Button disabled={uploading} onClick={() => handleFileUpload("background")}>
                  {uploading ? "Uploading..." : "Submit for Verification"}
                </Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
