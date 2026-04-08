'use client';

import { Suspense, useState } from 'react';

import { useJobPostingFilter } from '../../hooks';
import { FilteredJobPostingList } from '../FilteredJobPostingList';
import { JobPostingListLoading } from '../JobPostingList/loading';
import { SearchFilter } from '../SearchFilter';
import { ShowAllButton } from './ShowAllButton';

export const FilteredJobPostingContainer = () => {
  const [isShowAll, setShowAll] = useState<boolean>(false);
  const [filter] = useJobPostingFilter();

  const handleShowAllClick = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    setShowAll(!isShowAll);
  };

  return (
    <>
      <SearchFilter isDisabled={isShowAll}>
        <ShowAllButton isShowAll={isShowAll} onClick={handleShowAllClick} />
      </SearchFilter>

      <Suspense fallback={<JobPostingListLoading />}>
        <FilteredJobPostingList
          params={isShowAll ? { orderBy: filter.orderBy } : filter}
        />
      </Suspense>
    </>
  );
};
