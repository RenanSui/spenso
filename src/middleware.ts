import withAuth from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.cookies.get('next-auth.session-token')

    if (token && pathname === '/signin') {
      return NextResponse.redirect(new URL('/signout', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ req }) => {
        // verify token and return a boolean
        const sessionToken = req.cookies.get('next-auth.session-token')
        if (sessionToken) return true
        else return false
      },
    },
  },
)

export const config = {
  matcher: ['/dashboard/:path*', '/signout', '/signin'],
}
