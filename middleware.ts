import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Allow all requests to pass through since we're using demo mode
  return NextResponse.next()
}

export const config = {
  matcher: ["/farmer/:path*", "/distributor/:path*", "/retailer/:path*", "/consumer/:path*", "/analytics/:path*"],
}
