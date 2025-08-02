'use client';

import { StarIcon } from 'lucide-react';

import { Button } from '@repo/ui';
import { color } from '@repo/ui/tokens';

import { useToggleBookmark } from '@/domains/bookmark/hooks/api/useToggleBookmark';

interface JobPostingBookmarkButtonProps {
  id: number;
}

export const JobPostingBookmarkButton = ({
  id,
}: JobPostingBookmarkButtonProps) => {
  const { isBookmarked, toggle } = useToggleBookmark({
    type: 'job-posting',
    id,
  });

  return (
    <Button size="icon-lg" color="secondary" onClick={toggle}>
      {isBookmarked ? (
        <StarIcon fill={`rgb(${color.yellow[300]})`} stroke="0" />
      ) : (
        <StarIcon />
      )}
    </Button>
  );
};
