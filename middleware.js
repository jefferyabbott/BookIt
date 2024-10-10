import { redirect } from 'next/dist/server/api-utils';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  // fake authentication for testing
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// this middleware will only run on the routes in this config
export const config = {
  matcher: [
    '/bookings',
  ]
};
