import { Suspense } from 'react';

import { Box, Typography } from '@kimdw-rtk/ui';

import {
  BookmarkedJobPostingList,
  JobPostingListLoading,
} from '@/features/job-posting/components';

import * as s from './page.css';

export default async function Bookmark() {
  return (
    <Box paddingX="lg" paddingY="2xl">
      <Typography fontSize="lg" sx={{ marginY: 'xl' }}>
        북마크한 채용공고
      </Typography>
      <div className={s.postContainer}>
        <Suspense fallback={<JobPostingListLoading />}>
          <BookmarkedJobPostingList />
        </Suspense>
      </div>
    </Box>
  );
}
