"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, LogOut, Settings } from "lucide-react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

interface UserAccountNavProps {
  user: {
    name: string
    email: string
    image: string
  }
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleSignOut = async () => {
    if (isLoggingOut) return // Prevent double-clicks

    setIsLoggingOut(true)

    try {
      // Show loading toast
      toast({
        title: "Logging out...",
        description: "Please wait while we log you out securely.",
      })

      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies
      })

      if (response.ok) {
        // Clear any client-side data
        if (typeof window !== "undefined") {
          // Clear localStorage
          localStorage.clear()
          // Clear sessionStorage
          sessionStorage.clear()
          // Clear any cached data
          if ("caches" in window) {
            caches.keys().then((names) => {
              names.forEach((name) => {
                caches.delete(name)
              })
            })
          }
        }

        // Show success message
        toast({
          title: "Logged out successfully",
          description: "You have been securely logged out.",
          variant: "default",
        })

        // Force a hard redirect to clear any cached state
        window.location.href = "/"
      } else {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || "Logout failed")
      }
    } catch (error) {
      console.error("Error during logout:", error)

      // Show error message
      toast({
        title: "Logout Error",
        description: error instanceof Error ? error.message : "An error occurred during logout. Please try again.",
        variant: "destructive",
      })

      // Even if logout fails, try to redirect to clear state
      setTimeout(() => {
        window.location.href = "/"
      }, 2000)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
          onSelect={handleSignOut}
          disabled={isLoggingOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
