import { http } from '@/utils/http';

import type { Bookmark, BookmarkType } from '../../models';

export const service = {
  async getIsBookmarked(params: {
    type: BookmarkType;
    id: number;
  }): Promise<{ isBookmarked: boolean }> {
    try {
      return await http.get<{ isBookmarked: boolean }>(
        `/bookmark/${params.type}/${params.id}`,
        {
          params,
          throwOnError: true,
        },
      );
    } catch {
      return { isBookmarked: false };
    }
  },

  async createBookmark(params: {
    type: BookmarkType;
    id: number;
  }): Promise<Bookmark> {
    return http.post<Bookmark>(`/bookmark/${params.type}/${params.id}`);
  },

  async deleteBookmark(params: {
    type: BookmarkType;
    id: number;
  }): Promise<{ result: boolean }> {
    return http.delete<{ result: boolean }>(
      `/bookmark/${params.type}/${params.id}`,
    );
  },
};
