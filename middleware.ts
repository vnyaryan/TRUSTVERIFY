import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define which paths require authentication
const protectedPaths = ["/dashboard", "/profile", "/settings"]

// Define which paths are accessible only to non-authenticated users
const authPaths = ["/login", "/signup"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionCookie = request.cookies.get("session")

  // Check if user is authenticated
  const isAuthenticated = !!sessionCookie

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && authPaths.some((path) => pathname.startsWith(path))) {
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
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
