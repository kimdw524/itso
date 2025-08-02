import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { FetchIsBookmarkedResponse } from '@/api/bookmark/fetchIsBookmarked';
import { removeBookmark } from '@/api/bookmark/removeBookmark';
import { QUERY_KEYS } from '@/constants/queryKeys';

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
    onMutate: () => {
      queryClient.setQueryData(queryKey, {
        isBookmarked: false,
      } satisfies FetchIsBookmarkedResponse);
    },
  });
};
