import 'server-only';

import { fetcher } from '../fetcher';

export type FetchUserInfoResponse = {
  email: string;
  profile: string;
} | null;

export const fetchUserInfo = async (): Promise<FetchUserInfoResponse> => {
  const response = await fetcher(
    `${process.env.API_BASE_URL}/user`,
    {
      method: 'GET',
    },
    false,
  );

  if (response.ok === false) {
    return null;
  }

  return await response.json();
};
