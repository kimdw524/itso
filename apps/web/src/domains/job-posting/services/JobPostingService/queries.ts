import type { RequestType, ResponseType } from '@/utils/http';

import { service } from './service';

export const queryKeys = {
  list: (params: RequestType<typeof service.getJobPostingList>) => [
    'job-posting',
    'list',
    params,
  ],

  bookmarkedList: (
    params: RequestType<typeof service.getBookmarkedJobPostingList>,
  ) => ['job-posting', 'bookmarkedList', params],
};

export const queryOptions = {
  listInfinite: (params: RequestType<typeof service.getJobPostingList>) => ({
    queryKey: queryKeys.list(params),
    initialPageParam: undefined,
    gcTime: 0,
    queryFn: ({ pageParam }: { pageParam?: string }) =>
      service.getJobPostingList({ ...params, cursor: pageParam }),
    getNextPageParam: (
      lastPage: ResponseType<typeof service.getJobPostingList>,
    ) => lastPage.nextCursor,
  }),

  bookmarkedListInfinite: (
    params: RequestType<typeof service.getBookmarkedJobPostingList>,
  ) => ({
    queryKey: queryKeys.bookmarkedList(params),
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
