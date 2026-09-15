import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple pass-through middleware — locale is handled in the layout
export default function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  // Match all paths except for API routes, static files, and Next.js internals
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
