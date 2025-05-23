import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define which paths require authentication
const protectedPaths = ["/dashboard", "/profile", "/settings"]

// Define which paths are accessible only to non-authenticated users
const authPaths = ["/auth/login", "/auth/register", "/login", "/signup"]

// Define public paths that don't require any authentication checks
const publicPaths = ["/", "/about", "/contact", "/pricing", "/how-it-works", "/why-trustverify"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get session cookies
  const sessionCookie = request.cookies.get("trustverify_session")
  const legacySessionCookie = request.cookies.get("session")

  // Check if user is authenticated
  const isAuthenticated = !!(sessionCookie || legacySessionCookie)

  // Allow public paths without authentication checks
  if (publicPaths.includes(pathname) || pathname.startsWith("/api/") || pathname.startsWith("/_next/")) {
    return NextResponse.next()
  }

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && authPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Redirect unauthenticated users away from protected pages
  if (!isAuthenticated && protectedPaths.some((path) => pathname.startsWith(path))) {
    // Store the attempted URL for redirect after login
    const loginUrl = new URL("/auth/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Handle logout cleanup - if user tries to access protected routes without valid session
  if (!isAuthenticated && protectedPaths.some((path) => pathname.startsWith(path))) {
    const response = NextResponse.redirect(new URL("/", request.url))

    // Clear any remaining session cookies
    response.cookies.delete("trustverify_session")
    response.cookies.delete("session")

    return response
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
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
