import { useEffect, useRef } from 'react';

import {
  useSuspenseInfiniteQuery,
  type InfiniteData,
} from '@tanstack/react-query';

import {
  fetchBookmarkedJobPostingList,
  type FetchBookmarkedJobPostingListParams,
  type FetchBookmarkedJobPostingListResponse,
} from '@/api/job-posting/fetchBookmarkedJobPostingList';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useFetchBookmarkedJobPostingListSuspense = (
  params: FetchBookmarkedJobPostingListParams,
) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery<
      FetchBookmarkedJobPostingListResponse,
      Error,
      InfiniteData<FetchBookmarkedJobPostingListResponse>,
      unknown[],
      string | undefined
    >({
      queryKey: QUERY_KEYS['job-posting'].bookmarkedList(params),
      initialPageParam: undefined,
      gcTime: 0,
      queryFn: ({ pageParam }) =>
        fetchBookmarkedJobPostingList({ ...params, cursor: pageParam }),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  useEffect(() => {
    if (!hasNextPage || !loaderRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  const trigger = (
    <div
      ref={loaderRef}
      style={{ display: isFetchingNextPage ? 'none' : 'block' }}
    />
  );

  return { data, hasNextPage, isFetchingNextPage, trigger };
};
