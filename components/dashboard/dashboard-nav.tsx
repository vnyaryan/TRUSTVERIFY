"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserCircle, FileCheck, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

export function DashboardNav() {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      title: "My Profile",
      href: "/dashboard/profile",
      icon: <UserCircle className="mr-2 h-4 w-4" />,
    },
    {
      title: "Verification",
      href: "/dashboard/verification",
      icon: <FileCheck className="mr-2 h-4 w-4" />,
    },
    {
      title: "Trust Score",
      href: "/dashboard/trust-score",
      icon: <Shield className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <nav className="grid items-start gap-2 px-2 py-4 md:px-4">
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={cn(
            "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-primary-50",
            pathname === item.href ? "bg-primary-50 text-primary" : "text-muted-foreground",
          )}
        >
          {item.icon}
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  )
}
