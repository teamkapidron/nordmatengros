import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getUser } from './functions/auth.functions';

import { User } from '@repo/types/user';

const noAuthRoutes = [
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
];

const protectedRoutes = ['/cart', '/wishlist', '/order', '/address'];

function isOnboardingCompleted(user: User) {
  return (
    !!user.companyName &&
    !!user.organizationNumber &&
    !!user.address &&
    !!user.phoneNumber
  );
}

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (
    noAuthRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    if (token) {
      try {
        const user = await getUser(token);

        if (user) {
          if (!isOnboardingCompleted(user)) {
            return NextResponse.redirect(new URL('/onboarding', request.url));
          } else if (!user.isApprovedByAdmin) {
            return NextResponse.redirect(
              new URL('/wait-for-approval', request.url),
            );
          } else {
            return NextResponse.redirect(new URL('/', request.url));
          }
        }
      } catch {
        return NextResponse.next();
      }
    }
  }

  if (request.nextUrl.pathname === '/onboarding') {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    try {
      const user = await getUser(token);
      if (!user) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      if (isOnboardingCompleted(user)) {
        if (!user.isApprovedByAdmin) {
          return NextResponse.redirect(
            new URL('/wait-for-approval', request.url),
          );
        } else {
          return NextResponse.redirect(new URL('/', request.url));
        }
      }

      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (request.nextUrl.pathname === '/wait-for-approval') {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const user = await getUser(token);
      if (!user) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      if (!isOnboardingCompleted(user)) {
        return NextResponse.redirect(new URL('/onboarding', request.url));
      }

      if (user.isApprovedByAdmin) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const user = await getUser(token);
      if (!user) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      if (!isOnboardingCompleted(user)) {
        return NextResponse.redirect(new URL('/onboarding', request.url));
      }

      if (!user.isApprovedByAdmin) {
        return NextResponse.redirect(
          new URL('/wait-for-approval', request.url),
        );
      }

      return NextResponse.next();
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
