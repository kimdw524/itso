import type { Bookmark, BookmarkType } from '@/domains/bookmark/types/bookmark';

import { axiosInstance } from '../axiosInstance';

export interface AddBookmarkParams {
  type: BookmarkType;
  id: number;
}

export const addBookmark = async (
  params: AddBookmarkParams,
): Promise<Bookmark> => {
  const res = await axiosInstance.post<Bookmark>(
    `/bookmark/${params.type}/${params.id}`,
  );

  return res.data;
};
