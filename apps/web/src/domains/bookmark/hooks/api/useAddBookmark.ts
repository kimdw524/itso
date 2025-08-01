import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { useDialog } from '@repo/ui';

import { addBookmark } from '@/api/bookmark/addBookmark.client';
import type { FetchIsBookmarkedResponse } from '@/api/bookmark/fetchIsBookmarked.client';
import { MESSAGE } from '@/constants/message';
import { QUERY_KEYS } from '@/constants/query-keys';

import type { BookmarkType } from '../../types/bookmark';

interface UseAddBookmarkProps {
  type: BookmarkType;
  id: number;
}

export const useAddBookmark = ({ type, id }: UseAddBookmarkProps) => {
  const queryClient = useQueryClient();
  const { alert } = useDialog();

  const queryKey = QUERY_KEYS.bookmark({ type, id });

  return useMutation({
    mutationFn: () => addBookmark({ type, id }),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
    onError: (error: AxiosError) => {
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
