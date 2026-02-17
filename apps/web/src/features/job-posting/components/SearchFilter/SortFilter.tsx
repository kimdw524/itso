import type { ComponentProps } from 'react';

import { Select, SelectOption } from '@kimdw-rtk/ui';

import type { SearchFilter } from '.';

interface SortFilterProps {
  queryParams: ComponentProps<typeof SearchFilter>['queryParams'];
}

export const SortFilter = ({ queryParams }: SortFilterProps) => {
  const { setParam, getParam } = queryParams;

  return (
    <Select
      defaultValue={getParam('orderBy')}
      variant="contained"
      width="fit-content"
      onChange={(value) =>
        setParam('orderBy', value as 'createdAt' | 'recentViews')
      }
    >
      <SelectOption value="createdAt">최신순</SelectOption>
      <SelectOption value="recentViews">인기순</SelectOption>
    </Select>
  );
};
