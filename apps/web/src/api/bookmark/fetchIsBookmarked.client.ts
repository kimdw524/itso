import type { BookmarkType } from '@/domains/bookmark/types/bookmark';

import { axiosInstance } from '../axiosInstance';

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
  const res = await axiosInstance.get<FetchIsBookmarkedResponse>(
    `/bookmark/${type}/${id}`,
  );

  return res.data;
};
