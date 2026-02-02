import type { RequestType, ResponseType } from '@/shared/utils/http';

import { service } from './service';

export const queryKeys = {
  list: (params: RequestType<typeof service.getCompanyList>) => [
    'company',
    'list',
    params,
  ],
};

export const queryOptions = {
  listInfinite: (params: RequestType<typeof service.getCompanyList>) => ({
    queryKey: queryKeys.list(params),
    initialPageParam: undefined,
    gcTime: 0,
    queryFn: ({ pageParam }: { pageParam?: string }) =>
      service.getCompanyList({ ...params, cursor: pageParam }),
    getNextPageParam: (lastPage: ResponseType<typeof service.getCompanyList>) =>
      lastPage.nextCursor,
  }),
};
