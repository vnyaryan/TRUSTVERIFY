"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, User, Phone, Mail, Calendar } from "lucide-react"
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

      {/* Services Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle>Individual Counseling</CardTitle>
            </div>
            <CardDescription>Personal guidance for singles preparing for marriage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square relative mb-4 rounded-lg overflow-hidden">
              <Image src="/single-counseling.png" alt="Individual Counseling Services" fill className="object-cover" />
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Gain clearer insight into your relationship goals</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Learn to manage emotions effectively</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Secure space for personal expression</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Professional guidance for mental wellness</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle>Couples Counseling</CardTitle>
            </div>
            <CardDescription>Joint sessions for couples planning their future together</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square relative mb-4 rounded-lg overflow-hidden">
              <Image src="/couple-counseling.png" alt="Couples Counseling Services" fill className="object-cover" />
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Plan your perfect marriage together</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Learn negotiation and compromise skills</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Discuss household responsibilities</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Family and child planning guidance</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Why Choose Talk2Angel?</CardTitle>
            <CardDescription>Our experienced counselors specialize in premarital guidance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">For Individuals</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Prepare yourself mentally and emotionally for marriage with personalized guidance.
                </p>
                <ul className="space-y-1 text-sm">
                  <li>• Self-awareness and personal growth</li>
                  <li>• Communication skills development</li>
                  <li>• Relationship expectations management</li>
                  <li>• Emotional intelligence building</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">For Couples</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Build a strong foundation together with professional couple's counseling.
                </p>
                <ul className="space-y-1 text-sm">
                  <li>• Conflict resolution strategies</li>
                  <li>• Financial planning discussions</li>
                  <li>• Family dynamics and boundaries</li>
                  <li>• Future goals alignment</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card>
          <CardHeader>
            <CardTitle>Ready to Start Your Journey?</CardTitle>
            <CardDescription>Contact our certified counselors to schedule your first session</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Call Us</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Email Us</p>
                  <p className="text-sm text-muted-foreground">hello@talk2angel.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Book Online</p>
                  <p className="text-sm text-muted-foreground">24/7 scheduling</p>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Button size="lg" className="mr-4">
                Schedule Consultation
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
