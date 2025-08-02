import type { UndefinedInitialDataOptions } from '@tanstack/react-query';

import {
  fetchIsBookmarked,
  type FetchIsBookmarkedParams,
  type FetchIsBookmarkedResponse,
} from '@/api/bookmark/fetchIsBookmarked';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const fetchIsBookmarkQueryOptions = (
  params: FetchIsBookmarkedParams,
): UndefinedInitialDataOptions<FetchIsBookmarkedResponse> => ({
  queryKey: QUERY_KEYS.bookmark(params),
  queryFn: () => fetchIsBookmarked(params),
});
