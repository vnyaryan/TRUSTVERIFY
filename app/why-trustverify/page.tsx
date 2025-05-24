import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, Clock, Award, Heart } from "lucide-react"
import { ResponsiveImage } from "@/components/ui/responsive-image"

export const metadata: Metadata = {
  title: "Why TrustVerify | Building Trust in Online Matchmaking",
  description:
    "Discover why TrustVerify is essential for safe online matchmaking. Our platform addresses fake profiles, provides transparency, and offers affordable verification for meaningful connections.",
  keywords:
    "trust verification, online matchmaking, fake profiles, background checks, trust score, verified credentials, matrimonial trust",
}

export default function WhyTrustVerifyPage() {
  const reasons = [
    {
      icon: <Shield className="h-12 w-12 text-primary" />,
      title: "Combating Fake Profiles",
      description:
        "The rise of fake profiles and misinformation has made it difficult for genuine individuals to trust online matches. TrustVerify restores faith by ensuring that users are who they claim to be.",
      image: "/22ND-IMAGE.png", // Updated to use the new image
      alt: "Verification illustration showing protection against fake profiles with a shield",
    },
    {
      icon: <Users className="h-12 w-12 text-primary" />,
      title: "Transparency for Lifelong Commitments",
      description:
        "Marriages are lifelong commitments. Before taking such a big step, families and individuals need a transparent view of a partner's identity, education, employment, and background.",
      image: "/3RD-IMAGE.png",
      alt: "Transparent document showing verified credentials",
    },
    {
      icon: <Clock className="h-12 w-12 text-primary" />,
      title: "Faster, Affordable Verification",
      description:
        "Traditional background checks are slow, invasive, and expensive. TrustVerify offers a faster, affordable, and tamper-proof alternative — tailored specifically for digital matchmaking.",
      image: "/4RTH-IMAGE.png",
      alt: "Fast verification process illustration",
    },
    {
      icon: <Award className="h-12 w-12 text-primary" />,
      title: "Trust Score: The New Currency",
      description:
        "In a digital-first world, trust is the new currency. TrustVerify empowers users with a 'Trust Score' backed by verified credentials, making the entire matchmaking experience more secure and credible.",
      image: "/55TH-IMAGE.png",
      alt: "Trust score meter showing high credibility",
    },
    {
      icon: <Heart className="h-12 w-12 text-primary" />,
      title: "Meaningful Connections",
      description:
        "Not just matches — meaningful connections. Verified information leads to better compatibility, fewer disappointments, and greater peace of mind for both individuals and families.",
      image: "/66TH-IMAGE.png",
      alt: "Two people connecting with verified profiles",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background via-background to-primary-50/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Why <span className="premium-gradient-text">TrustVerify</span>?
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  In a world of uncertainty, we're building a foundation of trust for life's most important decision.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-12 max-w-5xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Trust is the Foundation of Every Relationship</h2>
                    <p className="text-muted-foreground">
                      In today's digital matchmaking landscape, trust has become more important—and more elusive—than
                      ever before. TrustVerify was born from a simple yet powerful idea: what if we could make online
                      matchmaking as trustworthy as traditional introductions, but with the convenience and reach of
                      modern technology?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                      <Link href="/register">
                        <Button size="lg" className="premium-button w-full sm:w-auto">
                          Get Verified Today
                        </Button>
                      </Link>
                      <Link href="/how-it-works">
                        <Button
                          size="lg"
                          variant="outline"
                          className="w-full sm:w-auto border-primary/20 hover:bg-primary-50"
                        >
                          See How It Works
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2 flex justify-center">
                  <div className="relative max-w-md w-full">
                    <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>
                    <div className="relative z-10 rounded-2xl overflow-hidden shadow-premium-xl border border-white/20 h-[400px]">
                      <ResponsiveImage
                        src="/1ST-IMAGE.png"
                        width={500}
                        height={400}
                        alt="Trust as the foundation of relationships"
                        className="w-full h-full"
                        objectFit="cover"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl space-y-16">
              {reasons.map((reason, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className={`${index % 2 === 1 ? "md:order-2" : "md:order-1"}`}>
                    <Card className="premium-card border-primary/10">
                      <CardHeader className="pb-2">
                        <div className="mb-3">{reason.icon}</div>
                        <CardTitle className="text-2xl">{reason.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{reason.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className={`${index % 2 === 1 ? "md:order-1" : "md:order-2"} flex justify-center`}>
                    <div className="relative max-w-md w-full">
                      <div className="absolute -top-4 -left-4 w-20 h-20 bg-primary/5 rounded-full blur-lg"></div>
                      <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-secondary/5 rounded-full blur-lg"></div>
                      <div className="relative z-10 rounded-2xl overflow-hidden shadow-premium-md border border-border/40 h-[300px]">
                        <ResponsiveImage
                          src={reason.image}
                          width={400}
                          height={300}
                          alt={reason.alt}
                          className="w-full h-full"
                          objectFit="contain" // Changed to "contain" to ensure the entire image is visible
                          objectPosition="center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Real Stories, Real Trust</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from users who found peace of mind through TrustVerify
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <Card className="premium-card">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="relative h-20 w-20 overflow-hidden rounded-full">
                      <ResponsiveImage src="/testimonial-1.png" alt="Priya Sharma" fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Priya Sharma</h3>
                      <p className="text-sm text-muted-foreground">Delhi, India</p>
                    </div>
                    <p className="text-muted-foreground italic">
                      "Before TrustVerify, I was constantly worried about the authenticity of profiles. Now, I can focus
                      on finding the right match instead of worrying about fake profiles."
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="premium-card">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="relative h-20 w-20 overflow-hidden rounded-full">
                      <ResponsiveImage src="/testimonial-2.png" alt="Rahul Patel" fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Rahul Patel</h3>
                      <p className="text-sm text-muted-foreground">Mumbai, India</p>
                    </div>
                    <p className="text-muted-foreground italic">
                      "My parents were skeptical about online matchmaking until I showed them my match's TrustVerify
                      score. It gave them the confidence they needed to proceed."
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="premium-card md:col-span-2 lg:col-span-1">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="relative h-20 w-20 overflow-hidden rounded-full">
                      <ResponsiveImage src="/testimonial-3.png" alt="Ananya Gupta" fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Ananya Gupta</h3>
                      <p className="text-sm text-muted-foreground">Bangalore, India</p>
                    </div>
                    <p className="text-muted-foreground italic">
                      "The Trust Score feature helped me filter out incompatible matches early. I found my partner
                      within weeks, and we're now happily married."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-premium text-primary-foreground">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Ready to Build Trust in Your Relationships?
                </h2>
                <p className="mx-auto max-w-[700px] text-primary-foreground/90 md:text-xl">
                  Join thousands of users who have found peace of mind through verified credentials.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                    Get Verified Today
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent text-white border-white hover:bg-white/10"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-primary-700/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-secondary/20 rounded-full blur-3xl"></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
