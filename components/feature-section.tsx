import { Shield, FileCheck, Share2, Lock, Award, BarChart } from "lucide-react"

export function FeatureSection() {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Comprehensive Verification",
      description: "Verify your education, employment, and background information through our secure platform.",
    },
    {
      icon: <BarChart className="h-10 w-10 text-primary" />,
      title: "Trust Score",
      description: "Receive a quantifiable trust score based on your verified credentials and background checks.",
    },
    {
      icon: <Share2 className="h-10 w-10 text-primary" />,
      title: "Secure Sharing",
      description: "Share your trust score and verified information securely with potential partners on any platform.",
    },
    {
      icon: <FileCheck className="h-10 w-10 text-primary" />,
      title: "Tamper-Proof Verification",
      description: "All verifications are cryptographically secured to prevent tampering or falsification.",
    },
    {
      icon: <Lock className="h-10 w-10 text-primary" />,
      title: "Privacy Control",
      description: "You control who sees your information and how much is shared with each recipient.",
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Premium Verification",
      description: "Enhanced verification options for those seeking additional trust assurance.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background premium-section">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Features That <span className="premium-gradient-text">Build Trust</span>
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform offers comprehensive tools to verify your background and share your trustworthiness.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-3 rounded-xl border border-border/40 p-6 shadow-premium-md bg-card hover:shadow-premium-lg transition-all duration-300"
            >
              <div className="rounded-full bg-primary-50 p-3">{feature.icon}</div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-center text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
