import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { useInfiniteScroll } from '@/shared/hooks';
import type { RequestType } from '@/shared/utils';

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
