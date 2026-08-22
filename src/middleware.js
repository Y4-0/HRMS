import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const url = req.nextUrl.pathname;
    const userRole = req.nextauth.token?.role;

    // Admin routes protection
    if (url.startsWith('/dashboard/admin') && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard/employee', req.url))
    }
    
    // Redirect /dashboard to respective roles
    if (url === '/dashboard') {
      if (userRole === 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard/admin', req.url))
      } else {
        return NextResponse.redirect(new URL('/dashboard/employee', req.url))
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: "/auth/signin"
    }
  }
)

export const config = { 
  matcher: [
    "/dashboard/:path*", 
    "/profile/:path*", 
    "/attendance/:path*", 
    "/leave/:path*", 
    "/payroll/:path*"
  ] 
}
