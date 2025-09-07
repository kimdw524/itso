'use client';

import { type MouseEvent } from 'react';

import { StarIcon } from 'lucide-react';

import { Button } from '@repo/ui';
import { theme } from '@repo/ui/themes';

import type { BookmarkType } from '../../models';
import { BookmarkService } from '../../services/BookmarkService';

interface BookmarkButtonProps extends React.ComponentProps<typeof Button> {
  bookmarkType: BookmarkType;
  targetId: number;
}

export const BookmarkButton = ({
  bookmarkType,
  targetId,
  ...rest
}: BookmarkButtonProps) => {
  const { data } = BookmarkService.useFetchIsBookmarked({
    type: bookmarkType,
    id: targetId,
  });

  const isBookmarked = !!data?.isBookmarked;

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
