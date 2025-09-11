import { Select, SelectOption } from '@repo/ui';

import type { useQueryParams } from '@/hooks/useQueryParams';

import type { CompanyFilter } from '../../models';

interface SortFilterProps {
  queryParams: ReturnType<typeof useQueryParams<CompanyFilter>>;
}

export const SortFilter = ({ queryParams }: SortFilterProps) => {
  const { setParam, getParam } = queryParams;

  return (
    <Select
      defaultValue={getParam('orderBy') ?? 'name'}
      width="fit-content"
      variant="contained"
      onChange={(value) => setParam('orderBy', value as 'name' | 'bookmarks')}
    >
      <SelectOption value="name">이름순</SelectOption>
      <SelectOption value="bookmarks">북마크 많은 순</SelectOption>
    </Select>
  );
};
