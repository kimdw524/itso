import { Suspense } from 'react';

import { Box } from '@repo/ui';

import { JobPostingList } from '@/domains/job-posting/components/JobPostingList';

export default async function Home() {
  return (
    <main>
      <Box padding="2xl">
        <Suspense fallback={<div>loading...</div>}>
          <JobPostingList />
        </Suspense>
      </Box>
    </main>
  );
}
