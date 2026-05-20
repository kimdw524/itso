'use client';

import { type MouseEvent } from 'react';

import { Button } from '@kimdw-rtk/ui';
import { theme } from '@kimdw-rtk/ui/theme';
import { StarIcon } from 'lucide-react';

import { useToggleBookmark } from '../../hooks';
import type { BookmarkType } from '../../models';

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
  const { toggle, isPending, current } = useToggleBookmark({
    type: bookmarkType,
    id: targetId,
    isBookmarked,
  });

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    rest?.onClick?.(e);

    toggle();
  };
  return (
    <Button {...rest} disabled={isPending} onClick={handleClick}>
      {current ? (
        <StarIcon fill={`rgb(${theme.color.yellow[300]})`} strokeWidth="0" />
      ) : (
        <StarIcon strokeWidth={1.5} />
      )}
    </Button>
  );
};
