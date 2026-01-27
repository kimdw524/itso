import { Box } from '@kimdw-rtk/ui';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { CompanyJobPostingContainer } from '@/domains/company/components/CompanyJobPostingContainer';
import { CompanyJobPostingHeader } from '@/domains/company/components/CompanyJobPostingHeader';
import type { JobPostingSearchFilter } from '@/domains/job-posting/models';
import { JobPostingService } from '@/domains/job-posting/services/JobPostingService';
import { getQueryClient } from '@/utils/getQueryClient';

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = getQueryClient();
  const filter = { companyId: Number(id) } as JobPostingSearchFilter;

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
      <CompanyJobPostingHeader id={Number(id)} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CompanyJobPostingContainer filter={filter} />
      </HydrationBoundary>
    </Box>
  );
}
