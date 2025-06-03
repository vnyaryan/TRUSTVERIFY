"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Phone, Calendar, Shield, CheckCircle, XCircle, Mail } from "lucide-react"
import { format } from "date-fns"
import type { TrustConnectionDetail } from "@/lib/trust-connections-service"

export default function TrustConnectionDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [connection, setConnection] = useState<TrustConnectionDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchConnectionDetail = async () => {
      try {
        setLoading(true)
        setError(null)

        // In a real app, you wouldn't need to pass userEmail as it would come from the session
        const queryParams = new URLSearchParams()
        queryParams.append("userEmail", "vny.aryan@gmail.com")

        const response = await fetch(`/api/trust-connections/${params.id}?${queryParams.toString()}`)

        if (!response.ok) {
          throw new Error("Failed to fetch connection details")
        }

        const result = await response.json()

        if (result.success) {
          setConnection(result.data)
        } else {
          throw new Error(result.error || "Unknown error")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        console.error("Error fetching connection details:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchConnectionDetail()
  }, [params.id])

  const handleBack = () => {
    router.back()
  }

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !connection) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-red-500">{error || "Connection not found"}</CardContent>
        <CardFooter>
          <Button onClick={handleBack} variant="outline" className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div>
      <Button variant="ghost" onClick={handleBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Trust Connections
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Trust Connection Details</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium flex items-center">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              Connection Information
            </h3>
            <div className="mt-2 grid gap-2">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  {connection.senderEmail}
                </span>
              </div>
              {connection.senderName && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{connection.senderName}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Connected Since</span>
                <span className="font-medium flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  {format(new Date(connection.createdAt), "PPP")}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">Shared Trust Details</h3>
            <div className="mt-2 grid gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span className="font-medium">Name</span>
                  </div>
                  {connection.shareName ? (
                    <Badge variant={connection.nameVerified ? "success" : "outline"}>
                      {connection.nameVerified ? (
                        <span className="flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" /> Verified
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <XCircle className="h-3 w-3 mr-1" /> Not Verified
                        </span>
                      )}
                    </Badge>
                  ) : (
                    <Badge variant="outline">Not Shared</Badge>
                  )}
                </div>
                {connection.shareName && connection.nameValue ? (
                  <p className="mt-2">{connection.nameValue}</p>
                ) : (
                  <p className="mt-2 text-muted-foreground">Name not shared</p>
                )}
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="font-medium">Phone</span>
                  </div>
                  {connection.sharePhone ? (
                    <Badge variant={connection.phoneVerified ? "success" : "outline"}>
                      {connection.phoneVerified ? (
                        <span className="flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" /> Verified
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <XCircle className="h-3 w-3 mr-1" /> Not Verified
                        </span>
                      )}
                    </Badge>
                  ) : (
                    <Badge variant="outline">Not Shared</Badge>
                  )}
                </div>
                {connection.sharePhone && connection.phoneValue ? (
                  <p className="mt-2">{connection.phoneValue}</p>
                ) : (
                  <p className="mt-2 text-muted-foreground">Phone not shared</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button>Contact User</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
