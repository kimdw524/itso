import { NextResponse, type NextRequest } from 'next/server';

import { signOut } from '@/api/user/signOut';
import { USER } from '@/domains/user/constants/user';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const url = new URL('/', request.url);

  const response = NextResponse.redirect(url);

  try {
    await signOut();
  } finally {
    response.cookies.delete(USER.COOKIE_NAME);
  }

  return response;
}
