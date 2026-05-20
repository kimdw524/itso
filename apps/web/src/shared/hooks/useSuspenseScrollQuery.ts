import {
  useSuspenseInfiniteQuery,
  type DefaultError,
  type InfiniteData,
  type QueryClient,
  type QueryKey,
  type UseSuspenseInfiniteQueryOptions,
} from '@tanstack/react-query';

import { useInfiniteScroll } from './useInfiniteScroll';

export const useSuspenseScrollQuery = <
  TQueryFnData,
  TError = DefaultError,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
>(
  options: UseSuspenseInfiniteQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryKey,
    TPageParam
  >,
  queryClient?: QueryClient,
) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(options, queryClient);
  const { trigger } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return { data, hasNextPage, isFetchingNextPage, trigger };
};
