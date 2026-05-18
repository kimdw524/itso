import type { RequestType, ResponseType } from '@/shared/utils';

import { service } from './service';

const queryKeys = {
  getCompanyList: (params: RequestType<typeof service.getCompanyList>) => [
    'company',
    'list',
    params,
  ],
  getCompany: (id: number) => ['company', 'data', id],
};

export const queries = {
  getCompanyList: (params: RequestType<typeof service.getCompanyList>) => ({
    queryKey: queryKeys.getCompanyList(params),
    initialPageParam: undefined,
    gcTime: 0,
    queryFn: ({ pageParam }: { pageParam?: string }) =>
      service.getCompanyList({ ...params, cursor: pageParam }),
    getNextPageParam: (lastPage: ResponseType<typeof service.getCompanyList>) =>
      lastPage.nextCursor,
  }),
  getCompany: (params: RequestType<typeof service.getCompany>) => ({
    queryKey: queryKeys.getCompany(params.id),
    gcTime: 0,
    queryFn: () => service.getCompany({ id: params.id }),
  }),
};
