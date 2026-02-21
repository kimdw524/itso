'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import type { BookmarkType } from '@/features/bookmark/models';
import { UserService } from '@/features/user/services';

import { useCreateBookmark } from './useCreateBookmark';
import { useRemoveBookmark } from './useRemoveBookmark';

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
  const { isSignedIn } = UserService.useUserInfo();
  const { mutate: addBookmark, isPending: isAddPending } = useCreateBookmark({
    type,
    id,
  });
  const { mutate: removeBookmark, isPending: isRemovePending } =
    useRemoveBookmark({ type, id });
  const [current, setCurrent] = useState<boolean>(isBookmarked);

  const toggle = () => {
    const isPending = isAddPending || isRemovePending;

    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }

    if (isPending) {
      return;
    }

    if (isBookmarked) {
      removeBookmark();
      setCurrent(false);
      return;
    }

    addBookmark();
    setCurrent(true);
  };

  return { toggle, current };
};
