'use client';

import { useState, type MouseEvent } from 'react';

import { StarIcon } from 'lucide-react';

import { Button } from '@repo/ui';
import { color } from '@repo/ui/tokens';

import type { BookmarkType } from '@/domains/bookmark/types/bookmark';
import { useUserInfo } from '@/domains/user/hooks/api/useUserInfo';

import { useToggleBookmark } from '../../hooks/api/useToggleBookmark';

interface OptimisticBookmarkButtonProps
  extends Omit<React.ComponentProps<typeof Button>, 'defaultValue'> {
  bookmarkType: BookmarkType;
  targetId: number;
  defaultValue: boolean;
}

export const OptimisticBookmarkButton = ({
  bookmarkType,
  targetId,
  defaultValue,
  ...rest
}: OptimisticBookmarkButtonProps) => {
  const { isSignedIn } = useUserInfo();
  const [isBookmarked, setIsBookmarked] = useState<boolean>(defaultValue);
  const { toggle } = useToggleBookmark({
    type: bookmarkType,
    id: targetId,
    isBookmarked,
  });

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    rest?.onClick?.(e);

    if (!isSignedIn) {
      return;
    }

    toggle();
    setIsBookmarked((prev) => !prev);
  };
  return (
    <Button {...rest} onClick={handleClick}>
      {isBookmarked ? (
        <StarIcon strokeWidth="0" fill={`rgb(${color.yellow[300]})`} />
      ) : (
        <StarIcon strokeWidth={1} />
      )}
    </Button>
  );
};
