import { useQuery } from '@tanstack/react-query';

import type { FetchIsBookmarkedParams } from '@/api/bookmark/fetchIsBookmarked';

import { fetchIsBookmarkQueryOptions } from '../../queries';

export const useFetchIsBookmarked = (params: FetchIsBookmarkedParams) => {
  const { data } = useQuery(fetchIsBookmarkQueryOptions(params));

  return { data };
};
