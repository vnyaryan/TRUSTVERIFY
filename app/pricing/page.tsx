import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Pricing | TrustVerify",
  description: "Choose the right plan for your verification needs",
}

export default function PricingPage() {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "Essential verification features",
      features: [
        "Basic profile creation",
        "Education verification",
        "Trust score generation",
        "Limited sharing options",
        "Email support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Premium",
      price: "₹999/month",
      description: "Comprehensive verification and sharing",
      features: [
        "All Basic features",
        "Employment verification",
        "Background check",
        "Unlimited sharing options",
        "Detailed trust score breakdown",
        "Shareable verification badge",
        "Priority verification processing",
        "24/7 customer support",
      ],
      cta: "Get Premium",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "₹1,999/month",
      description: "Advanced verification for serious users",
      features: [
        "All Premium features",
        "Enhanced background verification",
        "Identity verification with biometrics",
        "Custom verification reports",
        "API access for integration",
        "Dedicated account manager",
        "VIP customer support",
      ],
      cta: "Contact Sales",
      popular: false,
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
                  Simple, <span className="premium-gradient-text">Transparent</span> Pricing
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that works best for your verification needs.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
              {plans.map((plan, index) => (
                <Card
                  key={index}
                  className={`flex flex-col border ${
                    plan.popular
                      ? "border-primary shadow-premium-lg relative bg-gradient-to-b from-card to-primary-50/30"
                      : "shadow-premium-md hover:shadow-premium-lg transition-all duration-300"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 rounded-bl-lg rounded-tr-lg bg-gradient-premium px-3 py-1 text-xs font-medium text-primary-foreground">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="flex flex-col space-y-1.5 p-6">
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4 text-4xl font-bold">{plan.price}</div>
                  </CardHeader>
                  <CardContent className="flex-1 p-6 pt-0">
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <div className="rounded-full bg-primary-100 p-1">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link href="/register" className="w-full">
                      <Button
                        variant={plan.popular ? "default" : "outline"}
                        className={
                          plan.popular ? "premium-button w-full" : "w-full border-primary/20 hover:bg-primary-50"
                        }
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Compare Plans</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See which plan is right for you
                </p>
              </div>
            </div>

            <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-lg border shadow-premium-md">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-6 py-3 text-left text-sm font-semibold">Feature</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold">Basic</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold bg-primary-50">Premium</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-6 py-4 text-sm">Education Verification</td>
                      <td className="px-6 py-4 text-center">
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center bg-primary-50/30">
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm">Employment Verification</td>
                      <td className="px-6 py-4 text-center">—</td>
                      <td className="px-6 py-4 text-center bg-primary-50/30">
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm">Background Check</td>
                      <td className="px-6 py-4 text-center">—</td>
                      <td className="px-6 py-4 text-center bg-primary-50/30">
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm">Shareable Trust Score</td>
                      <td className="px-6 py-4 text-center">
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center bg-primary-50/30">
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm">Verification Badge</td>
                      <td className="px-6 py-4 text-center">—</td>
                      <td className="px-6 py-4 text-center bg-primary-50/30">
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm">Priority Processing</td>
                      <td className="px-6 py-4 text-center">—</td>
                      <td className="px-6 py-4 text-center bg-primary-50/30">
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm">Dedicated Support</td>
                      <td className="px-6 py-4 text-center">—</td>
                      <td className="px-6 py-4 text-center bg-primary-50/30">—</td>
                      <td className="px-6 py-4 text-center">
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
