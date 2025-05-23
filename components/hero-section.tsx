"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ResponsiveImage } from "@/components/ui/responsive-image"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background via-background to-primary-50/50 overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              <span className="premium-gradient-text">Building trust</span> in online matchmaking
            </h1>
            <p className="max-w-[800px] mx-auto text-muted-foreground md:text-xl">
              Get verified credentials and a trust score to share with potential partners on any platform.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div className="order-2 lg:order-1 flex flex-col justify-center space-y-4">
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/40 shadow-premium-md">
              <h2 className="text-2xl font-bold mb-4">Why TrustVerify?</h2>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="rounded-full bg-primary-100 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Verify your education and employment credentials</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="rounded-full bg-primary-100 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Get a quantifiable trust score to share</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="rounded-full bg-primary-100 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Build confidence in your online relationships</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="lg" className="premium-button w-full sm:w-auto">
                  Get Verified
                </Button>
              </Link>
              <Link href="/how-it-works" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary/20 hover:bg-primary-50">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative max-w-md w-full">
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>

              {/* Main image with premium styling */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-premium-xl border border-white/20">
                <ResponsiveImage
                  src="/matrimonial.png"
                  width={600}
                  height={600}
                  alt="A couple with verified trust profiles showing their trust score for online matchmaking"
                  className="w-full h-auto"
                  priority
                  fallbackSrc="/couple-trust-profiles.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
    </section>
  )
}
