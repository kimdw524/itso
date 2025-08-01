import type { BookmarkType } from '@/domains/bookmark/types/bookmark';

import { axiosInstance } from '../axiosInstance';

export interface RemoveBookmarkParams {
  type: BookmarkType;
  id: number;
}

export interface RemoveBookmarkResponse {
  result: boolean;
}

export const removeBookmark = async (
  params: RemoveBookmarkParams,
): Promise<RemoveBookmarkResponse> => {
  const res = await axiosInstance.delete<RemoveBookmarkResponse>(
    `/bookmark/${params.type}/${params.id}`,
  );

  return res.data;
};
