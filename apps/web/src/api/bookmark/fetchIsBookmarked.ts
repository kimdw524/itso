import type { BookmarkType } from '@/domains/bookmark/types/bookmark';

import { fetcher } from '../fetcher';

export interface FetchIsBookmarkedResponse {
  isBookmarked: boolean;
}

export interface FetchIsBookmarkedParams {
  type: BookmarkType;
  id: number;
}

export const fetchIsBookmarked = async ({
  type,
  id,
}: FetchIsBookmarkedParams): Promise<FetchIsBookmarkedResponse> => {
  const response = await fetcher(`/bookmark/${type}/${id}`, {
    method: 'GET',
    throwOnError: false,
  });

  if (response.ok === false) {
    return { isBookmarked: false };
  }

  return await response.json();
};
