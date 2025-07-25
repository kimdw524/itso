import { useEffect, useRef } from 'react';

import {
  useSuspenseInfiniteQuery,
  type InfiniteData,
} from '@tanstack/react-query';

import {
  fetchJobPostingList,
  type FetchJobPostingListParams,
  type FetchJobPostingListResponse,
} from '@/api/job-posting/fetchJobPostingList.client';
import { QUERY_KEYS } from '@/constants/query-keys';

export const useFetchJobPostingListSuspense = (
  params: FetchJobPostingListParams,
) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery<
      FetchJobPostingListResponse,
      Error,
      InfiniteData<FetchJobPostingListResponse>,
      unknown[],
      number | undefined
    >({
      queryKey: QUERY_KEYS['job-posting'].list(params),
      initialPageParam: undefined,
      gcTime: 0,
      queryFn: ({ pageParam }) =>
        fetchJobPostingList({ ...params, cursor: pageParam }),
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
