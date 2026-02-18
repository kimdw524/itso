import { JobPostingDetail } from '@/features/job-posting/components';
import { JobPostingService } from '@/features/job-posting/services';

export default async function JobPostingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await JobPostingService.getJobPosting({ id: Number(id) });

  return (
    <JobPostingDetail
      description={response.description}
      jobPosting={response}
    />
  );
}
