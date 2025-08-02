import type { BookmarkType } from '@/domains/bookmark/types/bookmark';

import { fetcher } from '../fetcher';

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
  const res = await fetcher<RemoveBookmarkResponse>(
    `/bookmark/${params.type}/${params.id}`,
    { method: 'DELETE' },
  );

  return await res.json();
};
