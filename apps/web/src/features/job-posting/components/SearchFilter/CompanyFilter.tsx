'use client';

import { CompanyService } from '@/features/company/services';
import { FilterChip } from '@/shared/components';
import type { useQueryParams } from '@/shared/hooks';
import type { RequestType } from '@/shared/utils';

import type { JobPostingService } from '../../services';

interface CompanyFilterProps {
  queryParams: ReturnType<
    typeof useQueryParams<
      RequestType<typeof JobPostingService.getJobPostingList>
    >
  >;
}

export const CompanyFilter = ({ queryParams }: CompanyFilterProps) => {
  const companyId = queryParams.getParam('companyId') ?? 0;
  const { data, isSuccess } = CompanyService.useFetchCompany({ id: companyId });

  if (!isSuccess || !data) {
    return null;
  }

  return (
    <FilterChip onClick={() => queryParams.removeParam('companyId')}>
      {data.name}
    </FilterChip>
  );
};
