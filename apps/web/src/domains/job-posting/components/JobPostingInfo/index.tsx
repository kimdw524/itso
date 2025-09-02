import type React from 'react';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Share2Icon } from 'lucide-react';

import { Box, Button, Card } from '@repo/ui';

import { QUERY_CLIENT_CONFIG } from '@/constants/queryClient';
import { BookmarkButton } from '@/domains/bookmark/components/BookmarkButton';
import { fetchIsBookmarkQueryOptions } from '@/domains/bookmark/queries';

import type { JobPosting } from '../../types/job-posting';
import { ApplyButton } from '../ApplyButton';

interface JobPostingInfoProps extends React.ComponentProps<typeof Card> {
  jobPosting: JobPosting;
}

export const JobPostingInfo = async ({ jobPosting }: JobPostingInfoProps) => {
  const queryClient = new QueryClient(QUERY_CLIENT_CONFIG);

  await queryClient.prefetchQuery(
    fetchIsBookmarkQueryOptions({ type: 'job-posting', id: jobPosting.id }),
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
      <Button size="icon-lg" color="secondary">
        <Share2Icon />
      </Button>
      <ApplyButton jobPosting={jobPosting} size="lg" sx={{ flexGrow: '1' }} />
    </Box>
  );
};
