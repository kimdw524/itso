import type { Bookmark, BookmarkType } from '@/domains/bookmark/types/bookmark';

import { fetcher } from '../fetcher';

export interface CreateBookmarkParams {
  type: BookmarkType;
  id: number;
}

export const createBookmark = async (
  params: CreateBookmarkParams,
): Promise<Bookmark> => {
  const res = await fetcher<Bookmark>(`/bookmark/${params.type}/${params.id}`, {
    method: 'POST',
  });

  return await res.json();
};
