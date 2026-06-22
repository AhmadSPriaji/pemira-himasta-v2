import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const adminSession = request.cookies.get('admin_session')
  const studentSession = request.cookies.get('student_session')
  const { pathname } = request.nextUrl

  // Protect all /admin routes except login, forgot-password, and reset-password
  const publicAdminRoutes = ['/admin/login', '/admin/forgot-password', '/admin/reset-password']
  if (pathname.startsWith('/admin') && !publicAdminRoutes.includes(pathname)) {
    if (!adminSession) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // If logged in as admin, don't let them access the login page
  if (pathname === '/admin/login' && adminSession) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  // Protect student voting routes — hanya student yang sudah login yang bisa akses
  const protectedStudentRoutes = ['/voting', '/response']
  if (protectedStudentRoutes.some(route => pathname.startsWith(route))) {
    if (!studentSession) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/voting/:path*', '/response/:path*'],
}
