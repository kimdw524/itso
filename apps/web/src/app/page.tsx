import { Box } from '@repo/ui';

import { JobPostingContainer } from '@/domains/job-posting/components/JobPostingContainer';

export default async function Home() {
  return (
    <Box padding="2xl">
      <JobPostingContainer />
    </Box>
  );
}
