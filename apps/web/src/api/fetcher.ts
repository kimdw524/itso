import { USER } from '@/domains/user/constants/user';
import { serializeQueryString } from '@/utils/queryString';

export const fetcher = async <T>(
  input: Parameters<typeof fetch>[0],
  init: Parameters<typeof fetch>[1] & {
    params?: object;
    throwOnError?: boolean;
  },
): Promise<Response & { json: () => Promise<T> }> => {
  const isServer = typeof window === 'undefined';

  const url: string =
    input.toString() +
    (init.params !== undefined ? `?${serializeQueryString(init.params)}` : '');

  let response: Response;
  if (isServer) {
    const { headers, cookies } = await import('next/headers');
    const header = await headers();

    response = await fetch(`${process.env.API_BASE_URL}${url}`, {
      ...init,
      headers: {
        ...init?.headers,
        Cookie: `${USER.COOKIE_NAME}=${(await cookies()).get(USER.COOKIE_NAME)?.value}`,
        'x-forwarded-for': header.get('x-forwarded-for')?.split(',')[0] ?? '',
      },
    });
  } else {
    response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
      credentials: 'include',
      ...init,
    });
  }

  if (init.throwOnError !== false && response.ok === false) {
    throw response;
  }

  return response;
};
