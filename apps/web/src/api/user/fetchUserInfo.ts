import 'server-only';

import { fetcher } from '../fetcher';

export type FetchUserInfoResponse = {
  email: string;
  profile: string;
} | null;

export const fetchUserInfo = async (): Promise<FetchUserInfoResponse> => {
  const response = await fetcher(`/user`, {
    method: 'GET',
    throwOnError: false,
  });

  if (response.ok === false) {
    return null;
  }

  return await response.json();
};
