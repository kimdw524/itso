import type { ComponentProps } from 'react';

import { Select, SelectOption } from '@repo/ui';

import type { SearchFilter } from '.';

interface SortFilterProps {
  queryParams: ComponentProps<typeof SearchFilter>['queryParams'];
}

export const SortFilter = ({ queryParams }: SortFilterProps) => {
  const { setParam, getParam } = queryParams;

  return (
    <Select
      defaultValue={getParam('orderBy')}
      width="fit-content"
      variant="contained"
      onChange={(value) =>
        setParam('orderBy', value as 'createdAt' | 'recentViews')
      }
    >
      <SelectOption value="createdAt">최신순</SelectOption>
      <SelectOption value="recentViews">인기순</SelectOption>
    </Select>
  );
};
