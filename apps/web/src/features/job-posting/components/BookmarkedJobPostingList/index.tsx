'use client';

import { JOB_POSTING } from '../../constants';
import { JobPostingService } from '../../services';
import { EmptyJobPostingList } from '../EmptyJobPostingList';
import { JobPostingList } from '../JobPostingList/JobPostingList';

export const BookmarkedJobPostingList = () => {
  const { data, trigger, isFetchingNextPage } =
    JobPostingService.useFetchBookmarkedListSuspense({
      limit: JOB_POSTING.LIST_LIMIT,
    });

  if (!data.pages[0]?.data.length) {
    return (
      <EmptyJobPostingList
        description="별 모양 버튼으로 원하는 공고를 북마크할 수 있어요."
        title="북마크한 공고가 없어요."
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
