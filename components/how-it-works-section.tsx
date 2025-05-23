import { UserPlus, FileCheck, BarChart, Share2, Shield } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: <UserPlus className="h-10 w-10 text-primary" />,
      title: "Create Your Profile",
      description: "Sign up and create your profile with your personal information.",
    },
    {
      icon: <FileCheck className="h-10 w-10 text-primary" />,
      title: "Submit Verification Documents",
      description: "Upload your education, employment, and background documents for verification.",
    },
    {
      icon: <BarChart className="h-10 w-10 text-primary" />,
      title: "Get Your Trust Score",
      description: "Once verified, receive your trust score based on our comprehensive algorithm.",
    },
    {
      icon: <Share2 className="h-10 w-10 text-primary" />,
      title: "Share Your Verification",
      description: "Generate secure links or QR codes to share your trust score with potential partners.",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Build Trusted Connections",
      description: "Connect with confidence knowing your credentials are verified and secure.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our simple process helps you verify and share your trustworthiness in just a few steps.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-5xl">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-12">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10">
                {step.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">
                  Step {index + 1}: {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
