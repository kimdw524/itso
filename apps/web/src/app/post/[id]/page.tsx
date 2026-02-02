import { JobPostingDetail } from '@/features/job-posting/components/JobPostingDetail';
import { JobPostingService } from '@/features/job-posting/services/JobPostingService';

export default async function JobPostingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await JobPostingService.getJobPosting({ id: Number(id) });

  return (
    <JobPostingDetail
      jobPosting={response}
      description={response.description}
    />
  );
}
