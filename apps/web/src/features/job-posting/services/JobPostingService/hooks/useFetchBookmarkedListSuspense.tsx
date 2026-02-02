import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import type { RequestType } from '@/shared/utils/http';

import { queryOptions } from '../queries';
import type { service } from '../service';

export const useFetchBookmarkedListSuspense = (
  params: RequestType<typeof service.getBookmarkedJobPostingList>,
) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(queryOptions.bookmarkedListInfinite(params));
  const { trigger } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return { data, hasNextPage, isFetchingNextPage, trigger };
};
