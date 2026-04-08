import { Select, SelectOption } from '@kimdw-rtk/ui';

import { useJobPostingFilter } from '../../hooks';

export const SortFilter = () => {
  const [filter, setFilter] = useJobPostingFilter();

  return (
    <Select
      defaultValue={filter.orderBy}
      variant="contained"
      width="100px"
      onChange={(value) =>
        setFilter({ orderBy: value as 'createdAt' | 'recentViews' })
      }
    >
      <SelectOption value="createdAt">최신순</SelectOption>
      <SelectOption value="recentViews">인기순</SelectOption>
    </Select>
  );
};
