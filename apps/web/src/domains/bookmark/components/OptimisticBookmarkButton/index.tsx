'use client';

import { useState, type MouseEvent } from 'react';

import { Button } from '@kimdw-rtk/ui';
import { theme } from '@kimdw-rtk/ui/theme';
import { StarIcon } from 'lucide-react';

import type { BookmarkType } from '../../models';
import { BookmarkService } from '../../services/BookmarkService';

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
  const [isBookmarked, setIsBookmarked] = useState<boolean>(defaultValue);
  const { toggle } = BookmarkService.useToggleBookmark({
    type: bookmarkType,
    id: targetId,
    isBookmarked,
  });

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    rest?.onClick?.(e);

    toggle();
    setIsBookmarked((prev) => !prev);
  };
  return (
    <Button {...rest} onClick={handleClick} aria-label="Bookmark">
      {isBookmarked ? (
        <StarIcon strokeWidth="0" fill={`rgb(${theme.color.yellow[300]})`} />
      ) : (
        <StarIcon strokeWidth={1} />
      )}
    </Button>
  );
};
