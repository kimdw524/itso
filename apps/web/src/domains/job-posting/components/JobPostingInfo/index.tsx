import type React from 'react';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Share2Icon } from 'lucide-react';

import { Box, Button, Card, CardContent } from '@repo/ui';

import { QUERY_CLIENT_CONFIG } from '@/constants/queryClient';
import { fetchIsBookmarkQueryOptions } from '@/domains/bookmark/queries';

import type { JobPosting } from '../../types/job-posting';
import { JobDetail } from './JobDetail';
import { JobPostingBookmarkButton } from './JobPostingBookmarkButton';

interface JobPostingInfoProps extends React.ComponentProps<typeof Card> {
  jobPosting: JobPosting;
}

export const JobPostingInfo = async ({
  jobPosting,
  sx,
  ...rest
}: JobPostingInfoProps) => {
  const queryClient = new QueryClient(QUERY_CLIENT_CONFIG);

  await queryClient.prefetchQuery(
    fetchIsBookmarkQueryOptions({ type: 'job-posting', id: jobPosting.id }),
  );

  const state = dehydrate(queryClient);

  return (
    <Card
      sx={{
        width: { mobile: '100%', desktop: '20em' },
        fontSize: { mobile: 'sm', desktop: 'md' },
        ...sx,
      }}
      {...rest}
    >
      <CardContent sx={{ padding: 'xl', width: '100%' }}>
        <Box flex flexDirection="column" gap="2xl">
          {/* 경력, 고용형태, 마감일 등을 보여주는 컴포넌트 */}
          <JobDetail jobPosting={jobPosting} />
          <Box flex alignItems="center" gap="lg" flexShrink="0" marginTop="lg">
            {/* 북마크 버튼 */}
            <HydrationBoundary state={state}>
              <JobPostingBookmarkButton id={jobPosting.id} />
            </HydrationBoundary>
            <Button size="icon-lg" color="secondary">
              <Share2Icon />
            </Button>
            <Button size="lg" sx={{ flexGrow: '1' }}>
              지원하기
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
