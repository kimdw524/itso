import { Select, SelectOption } from '@kimdw-rtk/ui';

import type { useQueryParams } from '@/shared/hooks';

import type { CompanyFilter } from '../../models';

interface SortFilterProps {
  queryParams: ReturnType<typeof useQueryParams<CompanyFilter>>;
}

export const SortFilter = ({ queryParams }: SortFilterProps) => {
  const { setParam, getParam } = queryParams;

  return (
    <Select
      defaultValue={getParam('orderBy') ?? 'name'}
      variant="contained"
      width="160px"
      onChange={(value) =>
        setParam('orderBy', value as keyof CompanyFilter['orderBy'])
      }
    >
      <SelectOption value="name">이름순</SelectOption>
      <SelectOption value="lastPostedAt">마지막 공고 순</SelectOption>
      <SelectOption value="postings">공고 많은 순</SelectOption>
      <SelectOption value="bookmarks">북마크 많은 순</SelectOption>
    </Select>
  );
};
