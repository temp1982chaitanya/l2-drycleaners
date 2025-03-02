import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get the token from the request
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  // Check if the user is authenticated
  const isAuthenticated = !!token

  // Define protected routes
  const isAdminRoute = pathname.startsWith("/admin")
  const isDashboardRoute = pathname.startsWith("/dashboard")
  const isAuthRoute = pathname === "/login" || pathname === "/register"

  // Redirect logic
  if (isAdminRoute) {
    // Only allow admin users to access admin routes
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    if (token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  if (isDashboardRoute && !isAuthenticated) {
    // Redirect unauthenticated users to login
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isAuthRoute && isAuthenticated) {
    // Redirect authenticated users based on their role
    if (token?.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", request.url))
    } else {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/login", "/register"],
}

