'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';

import { useQueryParams } from '@/shared/hooks';

import type { JobPostingSearchFilter } from '../../models';
import { FilteredJobPostingList } from '../FilteredJobPostingList';
import { JobPostingListLoading } from '../JobPostingList/loading';
import { SearchFilter } from '../SearchFilter';
import { ShowAllButton } from './ShowAllButton';

interface FilteredJobPostingContainerProps {
  filter: JobPostingSearchFilter;
}

export const FilteredJobPostingContainer = ({
  filter,
}: FilteredJobPostingContainerProps) => {
  const [isShowAll, setShowAll] = useState<boolean>(false);

  const queryParams = useQueryParams<JobPostingSearchFilter>(filter, ',');

  const currentFilter = useMemo(
    () =>
      isShowAll
        ? { orderBy: queryParams.getParam('orderBy') }
        : queryParams.rawParams,
    [queryParams, isShowAll],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentFilter]);

  const handleShowAllClick = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <>
      <SearchFilter isDisabled={isShowAll} queryParams={queryParams}>
        <ShowAllButton isShowAll={isShowAll} onClick={handleShowAllClick} />
      </SearchFilter>

      <Suspense fallback={<JobPostingListLoading />}>
        <FilteredJobPostingList params={currentFilter} />
      </Suspense>
    </>
  );
};
