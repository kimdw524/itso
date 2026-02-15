import type React from 'react';

import { Box, Card } from '@kimdw-rtk/ui';

import { BookmarkButton } from '@/features/bookmark/components/BookmarkButton';
import { BookmarkService } from '@/features/bookmark/services/BookmarkService';

import type { JobPosting } from '../../../models';
import { ApplyButton } from '../../ApplyButton';
import { ShareButton } from '../../ShareButton';

interface JobPostingActionsProps extends React.ComponentProps<typeof Card> {
  jobPosting: JobPosting;
}

export const JobPostingActions = async ({
  jobPosting,
}: JobPostingActionsProps) => {
  const { isBookmarked } = await BookmarkService.getIsBookmarked({
    type: 'job-posting',
    id: jobPosting.id,
  });

  return (
    <Box flex alignItems="center" gap="md">
      {/* 북마크 버튼 */}
      <BookmarkButton
        size="icon-lg"
        color="secondary"
        bookmarkType="job-posting"
        isBookmarked={isBookmarked}
        targetId={jobPosting.id}
      />
      <ShareButton jobPosting={jobPosting} />
      <ApplyButton jobPosting={jobPosting} size="lg" sx={{ flexGrow: '1' }} />
    </Box>
  );
};
