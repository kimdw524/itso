import { Box } from '@repo/ui';

import { fetchJobPosting } from '@/api/job-posting/fetchJobPosting';
import { JobPostingDescription } from '@/domains/job-posting/components/JobPostingDescription';
import { JobPostingHeader } from '@/domains/job-posting/components/JobPostingHeader';
import { JobPostingInfo } from '@/domains/job-posting/components/JobPostingInfo';

import * as s from './style.css';

export default async function JobPostingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetchJobPosting({ id: Number(id) });

  return (
    <>
      <JobPostingHeader jobPosting={response}>
        <JobPostingInfo jobPosting={response} />
      </JobPostingHeader>
      <Box padding="lg" className={s.content}>
        <JobPostingDescription description={response.description} />
      </Box>
    </>
  );
}
