import { Box } from '@repo/ui';

import { JobPostingContainer } from '@/domains/job-posting/components/JobPostingContainer';

export default async function Home() {
  return (
    <Box padding={{ desktop: '2xl', mobile: 'xl' }}>
      <JobPostingContainer />
    </Box>
  );
}
