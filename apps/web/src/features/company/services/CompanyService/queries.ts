import type { RequestType, ResponseType } from '@/shared/utils';

import { service } from './service';

export const queryKeys = {
  list: (params: RequestType<typeof service.getCompanyList>) => [
    'company',
    'list',
    params,
  ],
  data: (id: number) => ['company', 'data', id],
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
  data: (params: RequestType<typeof service.getCompany>) => ({
    queryKey: queryKeys.data(params.id),
    gcTime: 0,
    queryFn: () => service.getCompany({ id: params.id }),
  }),
};
