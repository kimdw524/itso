import { useQuery } from '@tanstack/react-query';

import type { ResponseType } from '@/shared/utils/http';

import { queryOptions } from '../queries';
import type { service } from '../service';

export const useUserInfo = () => {
  const { data } = useQuery<ResponseType<typeof service.getInfo>>(
    queryOptions.info,
  );

  return { isSignedIn: !!data, email: data?.email };
};
