import type { RequestType, ResponseType } from '@/shared/utils';

import { service } from './service';

const queryKeys = {
  getJobPostingList: (params: RequestType<typeof service.getJobPostingList>) => [
    'job-posting',
    'list',
    params,
  ],

  getBookmarkedJobPostingList: (
    params: RequestType<typeof service.getBookmarkedJobPostingList>,
  ) => ['job-posting', 'bookmarkedList', params],
};

export const queries = {
  getJobPostingList: (
    params: RequestType<typeof service.getJobPostingList>,
  ) => ({
    queryKey: queryKeys.getJobPostingList(params),
    initialPageParam: undefined,
    gcTime: 0,
    queryFn: ({ pageParam }: { pageParam?: string }) =>
      service.getJobPostingList({ ...params, cursor: pageParam }),
    getNextPageParam: (
      lastPage: ResponseType<typeof service.getJobPostingList>,
    ) => lastPage.nextCursor,
  }),

  getBookmarkedJobPostingList: (
    params: RequestType<typeof service.getBookmarkedJobPostingList>,
  ) => ({
    queryKey: queryKeys.getBookmarkedJobPostingList(params),
    initialPageParam: undefined,
    gcTime: 0,
    queryFn: ({ pageParam }: { pageParam?: string }) =>
      service.getBookmarkedJobPostingList({
        ...params,
        cursor: pageParam,
      }),
    getNextPageParam: (
      lastPage: ResponseType<typeof service.getBookmarkedJobPostingList>,
    ) => lastPage.nextCursor,
  }),
};
