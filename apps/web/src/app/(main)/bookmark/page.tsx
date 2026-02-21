import { Suspense } from 'react';

import { Box, Tabs, TabsContent, TabsList, TabsTrigger } from '@kimdw-rtk/ui';

import {
  BookmarkedJobPostingList,
  JobPostingListLoading,
} from '@/features/job-posting/components';
import { StickyHeader } from '@/shared/components';

export default async function Bookmark() {
  return (
    <Box paddingX="lg" paddingY="2xl">
      <Tabs defaultValue={1}>
        <StickyHeader>
          <TabsList>
            <TabsTrigger value={1}>북마크한 채용공고</TabsTrigger>
          </TabsList>
        </StickyHeader>
        <TabsContent value={1}>
          <Suspense fallback={<JobPostingListLoading />}>
            <BookmarkedJobPostingList />
          </Suspense>
        </TabsContent>
      </Tabs>
    </Box>
  );
}
