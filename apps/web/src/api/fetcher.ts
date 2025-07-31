import { cookies } from 'next/headers';

import { USER } from '@/domains/user/constants/user';

export const fetcher = async (
  input: Parameters<typeof fetch>[0],
  init: Parameters<typeof fetch>[1],
  throwOnError: boolean = true,
): ReturnType<typeof fetch> => {
  const response = await fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      Cookie: `${USER.COOKIE_NAME}=${(await cookies()).get(USER.COOKIE_NAME)?.value}`,
    },
  });

  if (throwOnError && response.ok === false) {
    throw new Error(`Fetch failed with status code ${response.status}`);
  }

  return response;
};
