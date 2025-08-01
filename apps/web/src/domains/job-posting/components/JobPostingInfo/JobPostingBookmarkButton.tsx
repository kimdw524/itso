'use client';

import { StarIcon } from 'lucide-react';

import { Button } from '@repo/ui';
import { color } from '@repo/ui/tokens';

import { useAddBookmark } from '@/domains/bookmark/hooks/api/useAddBookmark';
import { useFetchIsBookmarked } from '@/domains/bookmark/hooks/api/useFetchIsBookmarked';
import { useRemoveBookmark } from '@/domains/bookmark/hooks/api/useRemoveBookmark';

interface JobPostingBookmarkButtonProps {
  id: number;
}

export const JobPostingBookmarkButton = ({
  id,
}: JobPostingBookmarkButtonProps) => {
  const addBookmark = useAddBookmark({ type: 'job-posting', id });
  const removeBookmark = useRemoveBookmark({ type: 'job-posting', id });

  const { data } = useFetchIsBookmarked({ type: 'job-posting', id });

  const handleClick = () => {
    const isPending = addBookmark.isPending || removeBookmark.isPending;

    if (isPending) {
      return;
    }

    if (data?.isBookmarked) {
      removeBookmark.mutate();
      return;
    }

    addBookmark.mutate();
  };

  return (
    <Button size="icon-lg" color="secondary" onClick={handleClick}>
      {data?.isBookmarked ? (
        <StarIcon fill={`rgb(${color.yellow[300]})`} stroke="0" />
      ) : (
        <StarIcon />
      )}
    </Button>
  );
};
