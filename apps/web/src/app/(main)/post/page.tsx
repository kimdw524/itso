import type { SearchParams } from 'next/dist/server/request/search-params';

import { SearchParamsProvider } from '@kimdw-rtk/react-search-params';
import { Box } from '@kimdw-rtk/ui';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import {
  FilteredJobPostingContainer,
  LocalJobPostingFilter,
} from '@/features/job-posting/components';
import { JOB_POSTING_DEFAULT_FILTER } from '@/features/job-posting/constants';
import { jobPostingSearchParamsSchema } from '@/features/job-posting/schemas';
import { JobPostingService } from '@/features/job-posting/services';
import { getQueryClient, validateParams } from '@/shared/utils';

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

  const filter = {
    ...JOB_POSTING_DEFAULT_FILTER,
    ...validateParams(jobPostingSearchParamsSchema, search),
  };

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
      <SearchParamsProvider value={search}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <FilteredJobPostingContainer />
        </HydrationBoundary>
      </SearchParamsProvider>
    </Box>
  );
}
