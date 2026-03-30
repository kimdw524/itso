'use client';

import { CompanyService } from '@/features/company/services';
import { FilterChip } from '@/shared/components';

import { useJobPostingFilter } from '../../hooks';

export const CompanyFilter = () => {
  const [filter, setFilter] = useJobPostingFilter();

  const companyId = filter.companyId ?? 0;
  const { data, isSuccess } = CompanyService.useFetchCompany({ id: companyId });

  if (!isSuccess || !data) {
    return null;
  }

  return (
    <FilterChip onClick={() => setFilter({ companyId: undefined })}>
      {data.name}
    </FilterChip>
  );
};
