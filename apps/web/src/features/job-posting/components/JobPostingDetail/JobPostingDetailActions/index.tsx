import type React from 'react';

import { Box, Card } from '@kimdw-rtk/ui';

import { BookmarkButton } from '@/features/bookmark/components';
import { BookmarkService } from '@/features/bookmark/services';

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
    <Box alignItems="center" gap="md" flex>
      {/* 북마크 버튼 */}
      <BookmarkButton
        bookmarkType="job-posting"
        color="secondary"
        isBookmarked={isBookmarked}
        size="icon-lg"
        targetId={jobPosting.id}
      />
      <ShareButton jobPosting={jobPosting} />
      <ApplyButton jobPosting={jobPosting} size="lg" sx={{ flexGrow: '1' }} />
    </Box>
  );
};
