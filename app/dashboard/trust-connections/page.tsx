"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Define the interface for trust connections
interface TrustConnection {
  id: number
  email: string
  shareName: boolean
  sharePhone: boolean
}

export default function TrustConnectionsPage() {
  const [connections, setConnections] = useState<TrustConnection[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch connections (mock data for now)
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setConnections([
        {
          id: 1,
          email: "raj@gmail.com",
          shareName: false,
          sharePhone: true,
        },
        {
          id: 2,
          email: "vny.aryan1@gmail.com",
          shareName: false,
          sharePhone: true,
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Trust Connections</h1>
        <p className="text-muted-foreground">View trust details shared with you by other users</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Received Trust Details</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="border-collapse">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3 border border-gray-200 bg-gray-50 font-medium">TRUST-DETAILS</TableHead>
                    {connections.map((connection) => (
                      <TableHead key={connection.id} className="w-1/3 border border-gray-200 bg-gray-50 font-medium">
                        EMAIL-ID OF PERSON
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="border border-gray-200"></TableCell>
                    {connections.map((connection) => (
                      <TableCell key={connection.id} className="border border-gray-200 p-2">
                        <Input value={connection.email} readOnly className="bg-gray-50/50 border-gray-200" />
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="border border-gray-200 font-medium p-4">NAME</TableCell>
                    {connections.map((connection) => (
                      <TableCell key={connection.id} className="border border-gray-200 text-center">
                        <div className="flex justify-center">
                          <div
                            className={`h-5 w-5 rounded-full border ${connection.shareName ? "bg-primary border-primary" : "border-gray-300"}`}
                          >
                            {connection.shareName && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="white"
                                className="h-full w-full p-0.5"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="border border-gray-200 font-medium p-4">PHONE</TableCell>
                    {connections.map((connection) => (
                      <TableCell key={connection.id} className="border border-gray-200 text-center">
                        <div className="flex justify-center">
                          <div
                            className={`h-5 w-5 rounded-full border ${connection.sharePhone ? "bg-primary border-primary" : "border-gray-300"}`}
                          >
                            {connection.sharePhone && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="white"
                                className="h-full w-full p-0.5"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
