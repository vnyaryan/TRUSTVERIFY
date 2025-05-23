import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Eye, Download } from "lucide-react"

export default function HistoryPage() {
  const verificationHistory = [
    {
      id: "VER-001",
      type: "Education",
      status: "Verified",
      date: "2023-10-15",
      institution: "Indian Institute of Technology",
      details: "Bachelor of Technology",
    },
    {
      id: "VER-002",
      type: "Employment",
      status: "Verified",
      date: "2023-10-18",
      institution: "Tech Innovations Ltd.",
      details: "Senior Software Engineer",
    },
    {
      id: "VER-003",
      type: "Background Check",
      status: "Pending",
      date: "2023-11-02",
      institution: "TrustVerify Security",
      details: "Identity and Criminal Record Check",
    },
  ]

  const accessHistory = [
    {
      id: "ACC-001",
      date: "2023-11-05 14:32",
      accessType: "Link View",
      ipAddress: "192.168.1.xxx",
      location: "Mumbai, India",
    },
    {
      id: "ACC-002",
      date: "2023-11-03 09:15",
      accessType: "QR Code Scan",
      ipAddress: "172.16.254.xxx",
      location: "Delhi, India",
    },
    {
      id: "ACC-003",
      date: "2023-10-28 18:45",
      accessType: "Badge Click",
      ipAddress: "10.0.0.xxx",
      location: "Bangalore, India",
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Verification History</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Verification Records</CardTitle>
          <CardDescription>History of your verification submissions and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {verificationHistory.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.id}</TableCell>
                  <TableCell>{record.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        record.status === "Verified"
                          ? "default"
                          : record.status === "Pending"
                            ? "outline"
                            : "destructive"
                      }
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.institution}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Access Logs</CardTitle>
          <CardDescription>Record of who has accessed your verification information</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Access Type</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accessHistory.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.id}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.accessType}</TableCell>
                  <TableCell>{record.ipAddress}</TableCell>
                  <TableCell>{record.location}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">Details</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
