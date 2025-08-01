import { useQuery } from '@tanstack/react-query';

import {
  fetchUserInfo,
  type FetchUserInfoResponse,
} from '@/api/user/fetchUserInfo.server';
import { QUERY_KEYS } from '@/constants/query-keys';

export const useUserInfo = () => {
  const { data } = useQuery<FetchUserInfoResponse>({
    queryKey: QUERY_KEYS.user.info,
    queryFn: fetchUserInfo,
    staleTime: 3600 * 1000,
    gcTime: 3600 * 1000,
  });

  return { isSignedIn: !!data, email: data?.email };
};
