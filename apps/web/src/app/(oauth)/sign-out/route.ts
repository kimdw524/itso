import { NextResponse } from 'next/server';

import { USER } from '@/features/user/constants';
import { UserService } from '@/features/user/services';

export const dynamic = 'force-dynamic';

export async function GET() {
  const response = NextResponse.redirect(process.env.BASE_URL);

  try {
    await UserService.signOut();
  } finally {
    response.headers.set(
      'Set-Cookie',
      `${USER.COOKIE_NAME}=; Path=/; Domain=.${process.env.DOMAIN}; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    );
  }

  return response;
}
