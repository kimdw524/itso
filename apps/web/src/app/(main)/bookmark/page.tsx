import { Suspense } from 'react';

import { Box, Tabs, TabsContent, TabsList, TabsTrigger } from '@kimdw-rtk/ui';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import {
  BookmarkedJobPostingList,
  JobPostingListLoading,
} from '@/features/job-posting/components';
import { JOB_POSTING } from '@/features/job-posting/constants';
import { JobPostingService } from '@/features/job-posting/services';
import { StickyHeader } from '@/shared/components';
import { getQueryClient } from '@/shared/utils';

export default async function BookmarkPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery(
    JobPostingService.queries.getBookmarkedJobPostingList({
      limit: JOB_POSTING.LIST_LIMIT,
    }),
  );

  return (
    <Box
      padding={{ desktop: '2xl', mobile: 'xl' }}
      style={{ isolation: 'isolate' }}
    >
      <Tabs defaultValue={1}>
        <StickyHeader>
          <TabsList>
            <TabsTrigger value={1}>북마크한 채용공고</TabsTrigger>
          </TabsList>
        </StickyHeader>
        <TabsContent value={1}>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<JobPostingListLoading />}>
              <BookmarkedJobPostingList />
            </Suspense>
          </HydrationBoundary>
        </TabsContent>
      </Tabs>
    </Box>
  );
}
