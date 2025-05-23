import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, FileCheck, Share2, Bell } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary-50">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="premium-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trust Score</CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold premium-gradient-text">78/100</div>
            <Progress value={78} className="mt-2 bg-primary-100" />
            <p className="text-xs text-muted-foreground mt-2">Your profile is 78% trustworthy</p>
          </CardContent>
        </Card>
        <Card className="premium-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verification Status</CardTitle>
            <FileCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2/3</div>
            <p className="text-xs text-muted-foreground mt-2">Education & Employment verified</p>
          </CardContent>
        </Card>
        <Card className="premium-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Share Stats</CardTitle>
            <Share2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-2">Profile views this month</p>
          </CardContent>
        </Card>
        <Card className="premium-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscription</CardTitle>
            <Shield className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Basic</div>
            <p className="text-xs text-muted-foreground mt-2">Free tier with limited features</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="verification" className="space-y-4">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger
            value="verification"
            className="rounded-md data-[state=active]:bg-background data-[state=active]:text-primary"
          >
            Verification
          </TabsTrigger>
          <TabsTrigger
            value="sharing"
            className="rounded-md data-[state=active]:bg-background data-[state=active]:text-primary"
          >
            Sharing
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            className="rounded-md data-[state=active]:bg-background data-[state=active]:text-primary"
          >
            Recent Activity
          </TabsTrigger>
        </TabsList>
        <TabsContent value="verification" className="space-y-4">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle>Verification Progress</CardTitle>
              <CardDescription>Complete all verifications to achieve a 100% trust score</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 rounded-full bg-primary"></div>
                    <span>Education Verification</span>
                  </div>
                  <span className="text-sm font-medium text-primary">Completed</span>
                </div>
                <Progress value={100} className="bg-primary-100" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 rounded-full bg-primary"></div>
                    <span>Employment Verification</span>
                  </div>
                  <span className="text-sm font-medium text-primary">Completed</span>
                </div>
                <Progress value={100} className="bg-primary-100" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 rounded-full bg-muted"></div>
                    <span>Background Check</span>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Pending</span>
                </div>
                <Progress value={30} className="bg-muted" />
              </div>
              <Button asChild variant="premium">
                <Link href="/dashboard/verification">Complete Verification</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sharing" className="space-y-4">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle>Sharing Options</CardTitle>
              <CardDescription>Share your trust score with potential partners</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-border/40 p-4 bg-card shadow-premium-inner">
                <h3 className="font-semibold mb-2">Your Shareable Link</h3>
                <div className="flex items-center gap-2">
                  <Input value="https://trustverify.com/profile/john-doe" readOnly className="premium-input" />
                  <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary-50">
                    Copy
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  This link allows others to view your trust score and verification status.
                </p>
              </div>

              <div className="rounded-lg border border-border/40 p-4 bg-card shadow-premium-sm">
                <h3 className="font-semibold mb-2">QR Code</h3>
                <div className="flex justify-center py-4">
                  <div className="h-40 w-40 bg-white p-2 rounded-lg shadow-premium-md">
                    <Image src="/qr-code.png" width={160} height={160} alt="QR Code" />
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary-50">
                    Download QR Code
                  </Button>
                </div>
              </div>

              <Button asChild variant="premium">
                <Link href="/dashboard/share">Manage Sharing Options</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent actions and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "Employment verification completed",
                "Trust score updated to 78%",
                "Profile shared with a new recipient",
                "Profile viewed by 3 people this week",
              ].map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-4 p-3 rounded-lg border border-border/40 bg-card hover:shadow-premium-sm transition-all duration-300"
                >
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <div>
                    <p className="text-sm">{activity}</p>
                    <p className="text-xs text-muted-foreground">
                      {i + 1} day{i > 0 ? "s" : ""} ago
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
