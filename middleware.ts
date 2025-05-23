import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define which paths require authentication
const protectedPaths = ["/dashboard", "/profile", "/settings"]

// Define which paths are accessible only to non-authenticated users
const authPaths = ["/login", "/signup", "/auth/login", "/auth/register"]

// Define public paths that don't require any authentication checks
const publicPaths = ["/", "/about", "/contact", "/pricing", "/how-it-works", "/why-trustverify"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static files, API routes, and other non-page routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/") ||
    pathname.includes(".") ||
    pathname.startsWith("/public/")
  ) {
    return NextResponse.next()
  }

  // Get session cookies without using next/headers
  const sessionCookie = request.cookies.get("session")?.value

  // Check if user is authenticated
  const isAuthenticated = !!sessionCookie

  // Allow public paths without authentication checks
  if (publicPaths.some((path) => pathname === path)) {
    return NextResponse.next()
  }

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && authPaths.some((path) => pathname === path)) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Redirect unauthenticated users away from protected pages
  if (!isAuthenticated && protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
