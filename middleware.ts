// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request:Request) {
  const response = NextResponse.next()

  response.headers.set("Access-Control-Allow-Origin", "*")
  response.headers.set("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT")
  response.headers.set(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization"
  )

  return response
}

// Apply to all API routes
export const config = {
  matcher: '/api/:path*',
}
