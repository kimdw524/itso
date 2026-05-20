'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useDialog } from '@kimdw-rtk/ui';
import { useMutation } from '@tanstack/react-query';

import type { Bookmark, BookmarkType } from '@/features/bookmark/models';
import { useUserInfo } from '@/features/user/hooks';
import { MESSAGE } from '@/shared/constants';
import type { ResponseType } from '@/shared/utils';

import { BookmarkService } from '../services';

export interface UseToggleBookmarkProps {
  type: BookmarkType;
  id: number;
  isBookmarked: boolean;
}

export const useToggleBookmark = ({
  type,
  id,
  isBookmarked,
}: UseToggleBookmarkProps) => {
  const router = useRouter();
  const { alert } = useDialog();
  const { isSignedIn } = useUserInfo();

  const [current, setCurrent] = useState(isBookmarked);

  const { mutate, isPending } = useMutation<
    Bookmark | ResponseType<typeof BookmarkService.deleteBookmark>,
    Response,
    boolean
  >({
    mutationFn: (next: boolean) =>
      next
        ? BookmarkService.createBookmark({ type, id })
        : BookmarkService.deleteBookmark({ type, id }),
    onMutate: (next) => {
      setCurrent(next);
    },
    onError: (error: Response, next) => {
      // 로그인하지 않은 사용자가 북마크를 추가/삭제하려고 하는 경우
      if (error.status === 401) {
        alert(MESSAGE.BOOKMARK.SIGN_IN_REQUIRED);
        return;
      }

      // 존재하지 않는 북마크를 삭제하려고 하는 경우
      if (next === false && error.status === 404) {
        setCurrent(false);
        return;
      }

      // 이미 존재하는 북마크를 추가하려고 하는 경우
      if (next === true && error.status === 409) {
        setCurrent(true);
        return;
      }
    },
    onSuccess: async (_data, next) => {
      setCurrent(next);
    },
  });

  const toggle = () => {
    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }

    if (isPending) {
      return;
    }

    mutate(!current);
  };

  return { toggle, current, isPending };
};
