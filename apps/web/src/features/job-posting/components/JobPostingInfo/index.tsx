import type React from 'react';

import { Box, Card } from '@kimdw-rtk/ui';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { QUERY_CLIENT_CONFIG } from '@/constants/queryClient';
import { BookmarkButton } from '@/features/bookmark/components/BookmarkButton';
import { BookmarkService } from '@/features/bookmark/services/BookmarkService';

import type { JobPosting } from '../../models';
import { ApplyButton } from '../ApplyButton';
import { ShareButton } from '../ShareButton';

interface JobPostingInfoProps extends React.ComponentProps<typeof Card> {
  jobPosting: JobPosting;
}

export const JobPostingInfo = async ({ jobPosting }: JobPostingInfoProps) => {
  const queryClient = new QueryClient(QUERY_CLIENT_CONFIG);

  await queryClient.prefetchQuery(
    BookmarkService.queryOptions.isBookmarked({
      type: 'job-posting',
      id: jobPosting.id,
    }),
  );

  const state = dehydrate(queryClient);

  return (
    <Box flex alignItems="center" gap="md">
      {/* 북마크 버튼 */}
      <HydrationBoundary state={state}>
        <BookmarkButton
          size="icon-lg"
          color="secondary"
          bookmarkType="job-posting"
          targetId={jobPosting.id}
        />
      </HydrationBoundary>
      <ShareButton jobPosting={jobPosting} />
      <ApplyButton jobPosting={jobPosting} size="lg" sx={{ flexGrow: '1' }} />
    </Box>
  );
};
