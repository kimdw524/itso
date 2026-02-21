import type { JobPostingSearchFilter } from '../../models';
import { JobPostingService } from '../../services';
import { EmptyJobPostingList } from '../EmptyJobPostingList';
import { JobPostingList } from '../JobPostingList/JobPostingList';

interface FilteredJobPostingListProps {
  params: JobPostingSearchFilter;
}

export const FilteredJobPostingList = ({
  params,
}: FilteredJobPostingListProps) => {
  const { data, trigger, isFetchingNextPage } =
    JobPostingService.useFetchListSuspense(params);

  if (!data.pages[0]?.data.length) {
    return (
      <EmptyJobPostingList
        description="다른 조건으로 다시 검색해 보세요."
        title="검색 결과가 없어요."
      />
    );
  }

  return (
    <JobPostingList
      data={data}
      isFetchingNextPage={isFetchingNextPage}
      trigger={trigger}
    />
  );
};
