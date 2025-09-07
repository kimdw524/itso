import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import type { RequestType } from '@/utils/http';

import { queryOptions } from '../queries';
import type { service } from '../service';

export const useFetchListSuspense = (
  params: RequestType<typeof service.getJobPostingList>,
) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(queryOptions.listInfinite(params));
  const { trigger } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return { data, hasNextPage, isFetchingNextPage, trigger };
};
