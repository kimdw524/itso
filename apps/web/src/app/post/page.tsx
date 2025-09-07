import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { Box } from '@repo/ui';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { JobPostingContainer } from '@/domains/job-posting/components/JobPostingContainer';
import {
  EMPLOYMENT_TYPE_KEY,
  JOB_ID,
  JOB_POSTING,
} from '@/domains/job-posting/constants/job-posting';
import { JobPostingService } from '@/domains/job-posting/services/JobPostingService';
import { getQueryClient } from '@/utils/getQueryClient';

export default async function PostPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    initialPageParam: undefined,
    queryKey: QUERY_KEYS['job-posting'].list({
      jobIds: JOB_ID,
      employmentTypes: EMPLOYMENT_TYPE_KEY,
      orderBy: 'createdAt',
      limit: JOB_POSTING.LIST_LIMIT,
    }),
    queryFn: () => JobPostingService.getJobPostingList({}),
  });

  return (
    <Box
      padding={{ desktop: '2xl', mobile: 'xl' }}
      style={{ isolation: 'isolate' }}
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <JobPostingContainer />
      </HydrationBoundary>
    </Box>
  );
}
