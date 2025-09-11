import type { SearchParams } from 'next/dist/server/request/search-params';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { Box } from '@repo/ui';

import { CompanyContainer } from '@/domains/company/components/CompanyContainer';
import type { CompanyFilter } from '@/domains/company/models';
import { companyFilterSchema } from '@/domains/company/schemas/companyFilter';
import { CompanyService } from '@/domains/company/services/CompanyService';
import { getQueryClient } from '@/utils/getQueryClient';

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
