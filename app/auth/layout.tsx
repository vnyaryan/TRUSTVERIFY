import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { ModeToggle } from "@/components/mode-toggle"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex bg-muted/50 items-center justify-center p-8">
        <div className="max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">TrustVerify</h1>
            <p className="text-muted-foreground">
              Verify your background and share your trust score with potential partners.
            </p>
          </div>
          <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
            <Image src="/placeholder-1lmoe.png" fill alt="Authentication" className="object-cover" />
          </div>
          <div className="space-y-2 text-center">
            <blockquote className="text-lg font-semibold italic">
              "TrustVerify helped me establish credibility and build trust in my online relationships."
            </blockquote>
            <p className="text-sm text-muted-foreground">— Priya S., verified user since 2023</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">TrustVerify</span>
          </Link>
          <ModeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md space-y-8">{children}</div>
        </div>
      </div>
    </div>
  )
}
