import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Shield, Info, AlertTriangle } from "lucide-react"

export default function TrustScorePage() {
  const trustScore = 78
  const scoreBreakdown = [
    { category: "Education Verification", score: 30, maxScore: 30, status: "verified" },
    { category: "Employment Verification", score: 30, maxScore: 30, status: "verified" },
    { category: "Background Check", score: 10, maxScore: 30, status: "pending" },
    { category: "Profile Completeness", score: 8, maxScore: 10, status: "partial" },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Trust Score</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="md:col-span-2 premium-card">
          <CardHeader>
            <CardTitle>Your Trust Score</CardTitle>
            <CardDescription>
              Your trust score is calculated based on verified information and profile completeness
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-8 border-primary/20">
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-primary-200">
                  <Shield className="h-12 w-12 text-primary" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center">
                  <span className="text-4xl font-bold premium-gradient-text">{trustScore}</span>
                  <span className="text-xl text-muted-foreground">/100</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Your profile has a good trust score</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Score Breakdown</h3>
              {scoreBreakdown.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{item.category}</span>
                      {item.status === "pending" && <AlertTriangle className="h-4 w-4 text-secondary" />}
                    </div>
                    <span className="text-sm font-medium">
                      {item.score}/{item.maxScore}
                    </span>
                  </div>
                  <Progress
                    value={(item.score / item.maxScore) * 100}
                    className={
                      item.status === "verified"
                        ? "bg-primary-100"
                        : item.status === "pending"
                          ? "bg-secondary-100"
                          : "bg-muted"
                    }
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardHeader>
            <CardTitle>How Trust Score Works</CardTitle>
            <CardDescription>Understanding how your trust score is calculated</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-2">
              <div className="rounded-full bg-primary-50 p-1 mt-0.5">
                <Info className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Education Verification (30%)</h4>
                <p className="text-sm text-muted-foreground">
                  Verification of your educational qualifications and certificates.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="rounded-full bg-primary-50 p-1 mt-0.5">
                <Info className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Employment Verification (30%)</h4>
                <p className="text-sm text-muted-foreground">
                  Verification of your employment history and current position.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="rounded-full bg-primary-50 p-1 mt-0.5">
                <Info className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Background Check (30%)</h4>
                <p className="text-sm text-muted-foreground">
                  Verification of your identity and background information.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="rounded-full bg-primary-50 p-1 mt-0.5">
                <Info className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Profile Completeness (10%)</h4>
                <p className="text-sm text-muted-foreground">
                  How complete your profile information is, including photos and personal details.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardHeader>
            <CardTitle>Trust Score Benefits</CardTitle>
            <CardDescription>Advantages of having a high trust score</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-border/40 p-3 bg-card hover:shadow-premium-sm transition-all duration-300">
              <h4 className="font-semibold">Enhanced Credibility</h4>
              <p className="text-sm text-muted-foreground">
                A high trust score enhances your credibility when sharing with potential partners.
              </p>
            </div>
            <div className="rounded-lg border border-border/40 p-3 bg-card hover:shadow-premium-sm transition-all duration-300">
              <h4 className="font-semibold">More Responses</h4>
              <p className="text-sm text-muted-foreground">
                Users with verified profiles and high trust scores receive more positive responses.
              </p>
            </div>
            <div className="rounded-lg border border-border/40 p-3 bg-card hover:shadow-premium-sm transition-all duration-300">
              <h4 className="font-semibold">Trust Badge</h4>
              <p className="text-sm text-muted-foreground">
                Profiles with scores above 90 receive a special trust badge visible to all recipients.
              </p>
            </div>
            <div className="rounded-lg border border-border/40 p-3 bg-card hover:shadow-premium-sm transition-all duration-300">
              <h4 className="font-semibold">Premium Features</h4>
              <p className="text-sm text-muted-foreground">
                Unlock additional sharing features when you achieve a trust score of 85 or higher.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
