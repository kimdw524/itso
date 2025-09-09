'use client';

import { Suspense, useEffect, useState } from 'react';

import { Box } from '@repo/ui';

import { useQueryParams } from '@/hooks/useQueryParams';
import { serializeQueryString } from '@/utils/queryString';

import { JOB_POSTING_FILTER_STORAGE } from '../../constants/job-posting';
import type { JobPostingSearchFilter } from '../../models';
import { JobPostingList } from '../JobPostingList';
import { JobPostingListLoading } from '../JobPostingList/loading';
import { SearchFilter } from '../SearchFilter';
import { ShowAllButton } from './ShowAllButton';
import * as s from './style.css';

interface JobPostingContainerProps {
  filter: JobPostingSearchFilter;
}

export const JobPostingContainer = ({ filter }: JobPostingContainerProps) => {
  const [isShowAll, setShowAll] = useState<boolean>(false);

  const queryParams = useQueryParams<JobPostingSearchFilter>(filter, ',');

  const handleShowAllClick = () => {
    setShowAll((prev) => !prev);
  };

  useEffect(() => {
    // 필터가 변경되면 localStorage에 저장한다.
    localStorage.setItem(
      JOB_POSTING_FILTER_STORAGE,
      serializeQueryString(queryParams.rawParams, ','),
    );
  }, [queryParams.rawParams]);

  return (
    <>
      <SearchFilter queryParams={queryParams} isDisabled={isShowAll}>
        <ShowAllButton isShowAll={isShowAll} onClick={handleShowAllClick} />
      </SearchFilter>
      <Box
        className={s.container}
        sx={{ fontSize: { mobile: 'sm', desktop: '1rem' } }}
      >
        <Suspense fallback={<JobPostingListLoading />}>
          <JobPostingList
            params={
              isShowAll
                ? { orderBy: queryParams.getParam('orderBy') }
                : queryParams.rawParams
            }
          />
        </Suspense>
      </Box>
    </>
  );
};
