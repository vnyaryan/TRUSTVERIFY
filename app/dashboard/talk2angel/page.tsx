"use client"

import { Badge } from "@/components/ui/badge"
import { Heart, Users, User } from "lucide-react"
import Image from "next/image"

export default function Talk2AngelPage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Talk2Angel</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Professional Premarital Counseling Services to help you build a strong foundation for your marriage
        </p>
        <Badge variant="secondary" className="text-sm">
          Trusted by thousands of couples
        </Badge>
      </div>

      {/* Individual Counseling Section */}
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Individual Counseling</h2>
            </div>
            <p className="text-muted-foreground">Personal guidance for singles preparing for marriage</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Gain clearer insight into your relationship goals</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Learn to manage emotions effectively</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Secure space for personal expression</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Professional guidance for mental wellness</span>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src="/single-counseling.png"
                alt="Individual Counseling Services"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Couples Counseling Section */}
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Couples Counseling</h2>
            </div>
            <p className="text-muted-foreground">Joint sessions for couples planning their future together</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Plan your perfect marriage together</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Learn negotiation and compromise skills</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Discuss household responsibilities</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Family and child planning guidance</span>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <Image src="/couple-counseling.png" alt="Couples Counseling Services" fill className="object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
