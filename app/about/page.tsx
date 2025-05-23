import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "About Us | TrustVerify",
  description: "Learn about TrustVerify's mission to build trust in online matchmaking",
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background via-background to-primary-50/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  About <span className="premium-gradient-text">TrustVerify</span>
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our mission is to build trust and safety in online matchmaking through verified credentials.
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-3xl mt-12 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Our Story</h2>
                <p className="text-muted-foreground">
                  TrustVerify was founded in 2023 with a simple mission: to make online matchmaking safer and more
                  trustworthy. After witnessing friends and family members struggle with uncertainty in online
                  relationships, our founders decided to create a solution that would verify important credentials and
                  provide a quantifiable measure of trust.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Our Values</h2>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary-100 p-1 mt-1">
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
                    <div>
                      <strong>Trust:</strong> We believe trust is the foundation of any meaningful relationship.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary-100 p-1 mt-1">
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
                    <div>
                      <strong>Privacy:</strong> We respect your privacy and give you control over your information.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary-100 p-1 mt-1">
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
                    <div>
                      <strong>Security:</strong> Your data security is our top priority.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary-100 p-1 mt-1">
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
                    <div>
                      <strong>Transparency:</strong> We believe in clear, honest communication.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Our Team</h2>
                <p className="text-muted-foreground">
                  Our diverse team brings together expertise in technology, security, psychology, and relationship
                  counseling. We're united by our passion for creating safer online spaces for meaningful connections.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Our Approach</h2>
                <p className="text-muted-foreground">
                  TrustVerify uses a comprehensive verification process that includes education verification, employment
                  verification, and background checks. Our proprietary algorithm calculates a trust score based on these
                  verified credentials, giving users a reliable measure of trustworthiness.
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
