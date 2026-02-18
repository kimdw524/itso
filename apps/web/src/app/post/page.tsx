import type { SearchParams } from 'next/dist/server/request/search-params';

import { Box } from '@kimdw-rtk/ui';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import {
  JobPostingContainer,
  LocalJobPostingFilter,
} from '@/features/job-posting/components';
import { JOB_POSTING_DEFAULT_FILTER } from '@/features/job-posting/constants';
import type { JobPostingSearchFilter } from '@/features/job-posting/models';
import { jobPostingFilterSchema } from '@/features/job-posting/schemas';
import { JobPostingService } from '@/features/job-posting/services';
import { getQueryClient } from '@/shared/utils';

export default async function PostPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const search = await searchParams;

  // searchParams가 없으면 localStorage에 저장된 값을 불러온다.
  if (Object.keys(search).length == 0) {
    return <LocalJobPostingFilter />;
  }

  const queryClient = getQueryClient();

  const result = jobPostingFilterSchema.safeParse(search);
  const filter = (
    result.success
      ? { ...JOB_POSTING_DEFAULT_FILTER, ...result.data }
      : JOB_POSTING_DEFAULT_FILTER
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
