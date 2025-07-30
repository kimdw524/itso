import 'server-only';

import { fetcher } from '../fetcher';

export type FetchUserInfoResponse = {
  email: string;
  picture: string;
};

export const fetchUserInfo = async (): Promise<FetchUserInfoResponse> => {
  const response = await fetcher(`${process.env.API_BASE_URL}/user`, {
    method: 'GET',
  });

  return response.json();
};
