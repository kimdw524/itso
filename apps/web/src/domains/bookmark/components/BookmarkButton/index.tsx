'use client';

import { type MouseEvent } from 'react';

import { StarIcon } from 'lucide-react';

import { Button } from '@repo/ui';
import { theme } from '@repo/ui/themes';

import type { BookmarkType } from '@/domains/bookmark/types/bookmark';

import { useFetchIsBookmarked } from '../../hooks/api/useFetchIsBookmarked';
import { useToggleBookmark } from '../../hooks/api/useToggleBookmark';

interface BookmarkButtonProps extends React.ComponentProps<typeof Button> {
  bookmarkType: BookmarkType;
  targetId: number;
}

export const BookmarkButton = ({
  bookmarkType,
  targetId,
  ...rest
}: BookmarkButtonProps) => {
  const { data } = useFetchIsBookmarked({ type: bookmarkType, id: targetId });

  const isBookmarked = !!data?.isBookmarked;

  const { toggle } = useToggleBookmark({
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
        <StarIcon strokeWidth={1} />
      )}
    </Button>
  );
};
