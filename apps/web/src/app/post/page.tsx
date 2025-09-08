import type { SearchParams } from 'next/dist/server/request/search-params';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { Box } from '@repo/ui';

import { JobPostingContainer } from '@/domains/job-posting/components/JobPostingContainer';
import {
  EMPLOYMENT_TYPE_KEY,
  JOB_ID,
  JOB_POSTING,
} from '@/domains/job-posting/constants/job-posting';
import type { JobPostingSearchFilter } from '@/domains/job-posting/models';
import { jobPostingFilterSchema } from '@/domains/job-posting/schemas/jobPostingFilter';
import { JobPostingService } from '@/domains/job-posting/services/JobPostingService';
import { getQueryClient } from '@/utils/getQueryClient';

const defaultFilter = {
  jobIds: JOB_ID,
  employmentTypes: EMPLOYMENT_TYPE_KEY,
  orderBy: 'createdAt',
  limit: JOB_POSTING.LIST_LIMIT,
} satisfies JobPostingSearchFilter;

export default async function PostPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const queryClient = getQueryClient();

  const result = jobPostingFilterSchema.safeParse(await searchParams);
  const filter = (
    result.success ? { ...defaultFilter, ...result.data } : defaultFilter
  ) as JobPostingSearchFilter;

  await queryClient.prefetchInfiniteQuery({
    initialPageParam: undefined,
    queryKey: JobPostingService.queryKeys.list(filter),
    queryFn: () => JobPostingService.getJobPostingList(filter),
  });

  return (
    <Box
      padding={{ desktop: '2xl', mobile: 'xl' }}
      style={{ isolation: 'isolate' }}
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <JobPostingContainer filter={filter} />
      </HydrationBoundary>
    </Box>
  );
}
