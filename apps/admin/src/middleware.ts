import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getAdminData } from '@/functions/auth.functions';

const nonProtectedRoutes = ['/login'];
const protectedRoutes = ['/dashboard'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (nonProtectedRoutes.includes(request.nextUrl.pathname)) {
    if (token) {
      try {
        const admin = await getAdminData(token);
        if (admin) {
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }
      } catch {
        return NextResponse.next();
      }
    }
  }

  if (
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    try {
      const admin = await getAdminData(token);
      if (!admin) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
