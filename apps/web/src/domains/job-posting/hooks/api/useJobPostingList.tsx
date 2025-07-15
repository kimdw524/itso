import { useEffect, useRef } from 'react';

import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';

import {
  fetchJobPosting,
  type FetchJobPostingParams,
  type FetchJobPostingResponse,
} from '@/api/job-posting/fetchJobPosting';
import { QUERY_KEYS } from '@/constants/query-keys';

export const useFetchJobPostingListSuspense = (params: FetchJobPostingParams) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useSuspenseInfiniteQuery<
    FetchJobPostingResponse,
    Error,
    InfiniteData<FetchJobPostingResponse>,
    unknown[],
    number | undefined
  >({
    queryKey: QUERY_KEYS['job-posting'].list(params),
    initialPageParam: undefined,
    gcTime: 0,
    queryFn: ({ pageParam }) => fetchJobPosting({ cursor: pageParam }),
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

  const trigger = <div ref={loaderRef} />;

  return { data, hasNextPage, isFetchingNextPage, trigger };
};
