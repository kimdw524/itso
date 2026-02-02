import { cookies } from 'next/headers';

import 'server-only';

import { USER } from '../constants/user';

export const isSignedIn = async () => {
  return !!(await cookies()).get(USER.COOKIE_NAME);
};
