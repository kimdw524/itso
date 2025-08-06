import { NextResponse, type NextRequest } from 'next/server';

import { USER } from '@/domains/user/constants/user';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  const result = await fetch(
    `${process.env.API_BASE_URL}/auth/google?code=${code}`,
  );

  url.search = '';

  if (result.ok === false) {
    url.pathname = '/error';
    return NextResponse.redirect(url);
  }

  url.pathname = '/';
  const response = NextResponse.redirect(url);

  const sessionId = decodeURIComponent(
    result.headers
      .getSetCookie()?.[0]
      ?.split(`${USER.COOKIE_NAME}=`)?.[1]
      ?.split(';')[0] || '',
  );

  if (sessionId) {
    response.cookies.set(USER.COOKIE_NAME, sessionId, {
      domain: `.${process.env.DOMAIN}`,
      maxAge: 60 * 60 * 24 * 14,
    });
  }

  return response;
}
