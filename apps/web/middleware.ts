import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { USER } from './src/domains/user/constants/user';

const protectedRoutes = ['/bookmark'];

export function middleware(request: NextRequest) {
  const hasUserCookie = Boolean(request.cookies.get(USER.COOKIE_NAME));
  const currentPath = request.nextUrl.pathname;

  if (
    !hasUserCookie &&
    protectedRoutes.some((route) => currentPath.startsWith(route))
  ) {
    return NextResponse.redirect(new URL('/sign-in', process.env.BASE_URL));
  }
}
