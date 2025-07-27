import { Box } from '@repo/ui';

import { fetchJobPosting } from '@/api/job-posting/fetchJobPosting.server';
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
    <Box className={s.container}>
      <JobPostingHeader jobPosting={response} />
      <Box
        flex
        gap="lg"
        flexDirection={{ mobile: 'column', desktop: 'row-reverse' }}
        padding="lg"
        className={s.content}
      >
        <Box flexShrink="0">
          <JobPostingInfo jobPosting={response} />
        </Box>
        <Box flexGrow="1" className={s.description}>
          <JobPostingDescription description={response.description} />
        </Box>
      </Box>
    </Box>
  );
}
