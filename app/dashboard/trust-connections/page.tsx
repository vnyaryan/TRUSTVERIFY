"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, SortDesc } from "lucide-react"
import type { TrustConnection, TrustConnectionsFilter } from "@/lib/trust-connections-service"

export default function TrustConnectionsPage() {
  const router = useRouter()
  const [connections, setConnections] = useState<TrustConnection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<TrustConnectionsFilter>({
    sortBy: "recent",
    filterBy: "all",
  })
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        setLoading(true)
        setError(null)

        // Build query parameters
        const queryParams = new URLSearchParams()
        if (filter.sortBy) queryParams.append("sortBy", filter.sortBy)
        if (filter.filterBy) queryParams.append("filterBy", filter.filterBy)
        if (searchQuery) queryParams.append("search", searchQuery)

        // In a real app, you wouldn't need to pass userEmail as it would come from the session
        // This is just for demonstration
        queryParams.append("userEmail", "vny.aryan@gmail.com")

        const response = await fetch(`/api/trust-connections?${queryParams.toString()}`)

        if (!response.ok) {
          throw new Error("Failed to fetch connections")
        }

        const result = await response.json()

        if (result.success) {
          setConnections(result.data)
        } else {
          throw new Error(result.error || "Unknown error")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        console.error("Error fetching connections:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchConnections()
  }, [filter, searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // The search is already handled by the useEffect dependency
  }

  const handleViewDetails = (id: number) => {
    router.push(`/dashboard/trust-connections/${id}`)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Trust Connections</h1>
        <p className="text-muted-foreground">View trust details shared with you by other users</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearch} className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by email..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <div className="flex gap-2">
          <Select
            value={filter.sortBy}
            onValueChange={(value) => setFilter((prev) => ({ ...prev, sortBy: value as "recent" | "email" }))}
          >
            <SelectTrigger className="w-[160px]">
              <SortDesc className="mr-2 h-4 w-4" />
              <span>Sort by</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="email">Email</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filter.filterBy}
            onValueChange={(value) =>
              setFilter((prev) => ({ ...prev, filterBy: value as "all" | "name" | "phone" | "verified" }))
            }
          >
            <SelectTrigger className="w-[160px]">
              <Filter className="mr-2 h-4 w-4" />
              <span>Filter</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Connections</SelectItem>
              <SelectItem value="name">With Name</SelectItem>
              <SelectItem value="phone">With Phone</SelectItem>
              <SelectItem value="verified">Verified Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : connections.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No trust connections found</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3">TRUST-DETAILS</TableHead>
                    {connections.map((connection) => (
                      <TableHead key={connection.id} className="w-1/3">
                        EMAIL-ID OF PERSON
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell></TableCell>
                    {connections.map((connection) => (
                      <TableCell key={connection.id}>
                        <Input value={connection.senderEmail} readOnly className="bg-muted/50" />
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">NAME</TableCell>
                    {connections.map((connection) => (
                      <TableCell key={connection.id} className="text-center">
                        <Checkbox checked={connection.shareName} disabled />
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">PHONE</TableCell>
                    {connections.map((connection) => (
                      <TableCell key={connection.id} className="text-center">
                        <Checkbox checked={connection.sharePhone} disabled />
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {connections.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Connection Details</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {connections.map((connection) => (
              <Card
                key={connection.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleViewDetails(connection.id)}
              >
                <CardContent className="p-4">
                  <div className="font-medium">{connection.senderEmail}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Shared:{" "}
                    {[connection.shareName ? "Name" : null, connection.sharePhone ? "Phone" : null]
                      .filter(Boolean)
                      .join(", ")}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
