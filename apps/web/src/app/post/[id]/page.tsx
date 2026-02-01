import { Box } from '@kimdw-rtk/ui';

import { JobPostingDescription } from '@/features/job-posting/components/JobPostingDescription';
import { JobPostingHeader } from '@/features/job-posting/components/JobPostingHeader';
import { JobPostingInfo } from '@/features/job-posting/components/JobPostingInfo';
import { JobPostingService } from '@/features/job-posting/services/JobPostingService';

export default async function JobPostingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await JobPostingService.getJobPosting({ id: Number(id) });

  return (
    <>
      <JobPostingHeader jobPosting={response}>
        <JobPostingInfo jobPosting={response} />
      </JobPostingHeader>
      <Box padding="lg">
        <JobPostingDescription description={response.description} />
      </Box>
    </>
  );
}
