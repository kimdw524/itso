import { Box } from '@repo/ui';

import { JobPostingContainer } from '@/domains/job-posting/components/JobPostingContainer';

export default async function PostPage() {
  return (
    <Box
      padding={{ desktop: '2xl', mobile: 'xl' }}
      style={{ isolation: 'isolate' }}
    >
      <JobPostingContainer />
    </Box>
  );
}
