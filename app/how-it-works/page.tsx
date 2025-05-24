import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { UserPlus, FileCheck, BarChart, Share2, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "How It Works | TrustVerify",
  description: "Learn how TrustVerify helps you build trust in online matchmaking",
}

export default function HowItWorksPage() {
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
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background via-background to-primary-50/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  How <span className="premium-gradient-text">TrustVerify</span> Works
                </h1>
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

            <div className="mt-12 text-center">
              <Link href="/register">
                <Button size="lg" className="premium-button">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find answers to common questions about our verification process.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-12 max-w-3xl space-y-6">
              <div className="rounded-lg border p-6 premium-card">
                <h3 className="text-xl font-bold mb-2">How is my trust score calculated?</h3>
                <p className="text-muted-foreground">
                  Your trust score is calculated based on the verification of your education (30%), employment history
                  (30%), background check (30%), and profile completeness (10%). Each verified element contributes to
                  your overall score.
                </p>
              </div>

              <div className="rounded-lg border p-6 premium-card">
                <h3 className="text-xl font-bold mb-2">How long does the verification process take?</h3>
                <p className="text-muted-foreground">
                  The basic verification process typically takes 3-5 business days. Premium and Enterprise verifications
                  may take 7-10 business days due to the more comprehensive checks involved.
                </p>
              </div>

              <div className="rounded-lg border p-6 premium-card">
                <h3 className="text-xl font-bold mb-2">Is my personal information secure?</h3>
                <p className="text-muted-foreground">
                  Yes, we take data security very seriously. All your personal information is encrypted and stored
                  securely. We comply with data protection regulations and never share your information without your
                  explicit consent.
                </p>
              </div>

              <div className="rounded-lg border p-6 premium-card">
                <h3 className="text-xl font-bold mb-2">Can I control who sees my verification details?</h3>
                <p className="text-muted-foreground">
                  Absolutely. You have complete control over your privacy settings. You can choose to display your trust
                  score to all recipients while keeping specific verification details private, or customize what
                  information is visible to each recipient.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
