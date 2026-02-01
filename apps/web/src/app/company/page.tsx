import type { SearchParams } from 'next/dist/server/request/search-params';

import { Box } from '@kimdw-rtk/ui';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { CompanyContainer } from '@/features/company/components/CompanyContainer';
import type { CompanyFilter } from '@/features/company/models';
import { companyFilterSchema } from '@/features/company/schemas/companyFilter';
import { CompanyService } from '@/features/company/services/CompanyService';
import { getQueryClient } from '@/shared/utils/getQueryClient';

export default async function CompanyPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const search = await searchParams;

  const queryClient = getQueryClient();

  const result = companyFilterSchema.safeParse(search);
  const filter = (result.success ? result.data : {}) as CompanyFilter;

  await queryClient.prefetchInfiniteQuery({
    initialPageParam: undefined,
    queryKey: CompanyService.queryKeys.list(filter),
    queryFn: () => CompanyService.getCompanyList(filter),
  });

  return (
    <Box
      padding={{ desktop: '2xl', mobile: 'xl' }}
      style={{ isolation: 'isolate' }}
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CompanyContainer filter={filter} />
      </HydrationBoundary>
    </Box>
  );
}
