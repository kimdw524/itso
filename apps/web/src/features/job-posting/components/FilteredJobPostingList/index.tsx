import type { JobPostingSearchFilter } from '../../models';
import { JobPostingService } from '../../services';
import { JobPostingList } from '../JobPostingList/JobPostingList';

interface FilteredJobPostingListProps {
  params: JobPostingSearchFilter;
}

export const FilteredJobPostingList = ({
  params,
}: FilteredJobPostingListProps) => {
  const { data, trigger, isFetchingNextPage } =
    JobPostingService.useFetchListSuspense(params);

  return (
    <JobPostingList
      data={data}
      isFetchingNextPage={isFetchingNextPage}
      trigger={trigger}
    />
  );
};
