import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useDialog } from '@repo/ui';

import { createBookmark } from '@/api/bookmark/createBookmark';
import type { FetchIsBookmarkedResponse } from '@/api/bookmark/fetchIsBookmarked';
import { MESSAGE } from '@/constants/message';
import { QUERY_KEYS } from '@/constants/queryKeys';

import type { BookmarkType } from '../../types/bookmark';

interface UseAddBookmarkProps {
  type: BookmarkType;
  id: number;
}

export const useCreateBookmark = ({ type, id }: UseAddBookmarkProps) => {
  const queryClient = useQueryClient();
  const { alert } = useDialog();

  const queryKey = QUERY_KEYS.bookmark({ type, id });

  return useMutation({
    mutationFn: () => createBookmark({ type, id }),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
    onError: (error: Response) => {
      if (error.status === 401) {
        alert(MESSAGE.BOOKMARK.SIGN_IN_REQUIRED);
      }
    },
    onMutate: () => {
      queryClient.setQueryData(queryKey, {
        isBookmarked: true,
      } satisfies FetchIsBookmarkedResponse);
    },
  });
};
