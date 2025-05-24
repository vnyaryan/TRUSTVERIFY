import type React from "react"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar"
import { Shield } from "lucide-react"

export function DashboardHeader({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <MobileSidebar />
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold inline-block">
              Trust<span className="text-primary">Verify</span>
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          {children}
        </div>
      </div>
    </header>
  )
}
