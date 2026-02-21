'use client';

import React, { type ReactElement } from 'react';

import { Box } from '@kimdw-rtk/ui';
import type { InfiniteData } from '@tanstack/react-query';

import type { CursorPaginatedResponse } from '@/api/types';

import type { JobPostingSummary } from '../../models';
import { JobPostingItem } from '../JobPostingItem';
import { JobPostingListLoading } from './loading';
import * as s from './style.css';

interface JobPostingListProps {
  data: InfiniteData<CursorPaginatedResponse<JobPostingSummary, string>>;
  trigger: ReactElement;
  isFetchingNextPage: boolean;
}

export const JobPostingList = ({
  data,
  trigger,
  isFetchingNextPage,
}: JobPostingListProps) => {
  return (
    <Box
      className={s.container}
      sx={{ fontSize: { mobile: 'sm', desktop: '1rem' } }}
    >
      {data.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.data.map((jobPosting) => (
            <JobPostingItem
              key={jobPosting.id}
              company={jobPosting.company}
              jobPosting={jobPosting}
            />
          ))}
        </React.Fragment>
      ))}
      {isFetchingNextPage && <JobPostingListLoading />}
      {trigger}
    </Box>
  );
};
