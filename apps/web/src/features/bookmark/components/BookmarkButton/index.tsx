'use client';

import { type MouseEvent } from 'react';

import { Button } from '@kimdw-rtk/ui';
import { theme } from '@kimdw-rtk/ui/theme';
import { StarIcon } from 'lucide-react';

import type { BookmarkType } from '../../models';
import { BookmarkService } from '../../services/BookmarkService';

interface BookmarkButtonProps extends React.ComponentProps<typeof Button> {
  bookmarkType: BookmarkType;
  targetId: number;
  isBookmarked: boolean;
}

export const BookmarkButton = ({
  bookmarkType,
  targetId,
  isBookmarked,
  ...rest
}: BookmarkButtonProps) => {
  const { toggle } = BookmarkService.useToggleBookmark({
    type: bookmarkType,
    id: targetId,
    isBookmarked,
  });

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    rest?.onClick?.(e);

    toggle();
  };
  return (
    <Button {...rest} onClick={handleClick}>
      {isBookmarked ? (
        <StarIcon strokeWidth="0" fill={`rgb(${theme.color.yellow[300]})`} />
      ) : (
        <StarIcon strokeWidth={1.5} />
      )}
    </Button>
  );
};
