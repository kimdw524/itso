import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { FetchIsBookmarkedResponse } from '@/api/bookmark/fetchIsBookmarked.client';
import { removeBookmark } from '@/api/bookmark/removeBookmark.client';
import { QUERY_KEYS } from '@/constants/query-keys';

import type { BookmarkType } from '../../types/bookmark';

interface UseRemoveBookmarkProps {
  type: BookmarkType;
  id: number;
}

export const useRemoveBookmark = ({ type, id }: UseRemoveBookmarkProps) => {
  const queryClient = useQueryClient();
  const queryKey = QUERY_KEYS.bookmark({ type, id });

  return useMutation({
    mutationFn: () => removeBookmark({ type, id }),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
    onMutate: () => {
      queryClient.setQueryData(queryKey, {
        isBookmarked: false,
      } satisfies FetchIsBookmarkedResponse);
    },
  });
};
