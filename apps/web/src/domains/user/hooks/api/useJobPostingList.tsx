import { useQuery } from '@tanstack/react-query';

import type { FetchUserInfoResponse } from '@/api/user/fetchUserInfo.server';
import { QUERY_KEYS } from '@/constants/query-keys';

export const useUserInfo = () => {
  const { data } = useQuery<FetchUserInfoResponse>({
    queryKey: QUERY_KEYS.user.info,
  });

  return { isSignedIn: !!data, email: data?.email };
};
