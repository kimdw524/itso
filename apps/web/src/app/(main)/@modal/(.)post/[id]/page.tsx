import { Suspense } from 'react';

import JobPostingPage from '@/app/(main)/post/[id]/page';
import { JobPostingDetailLoading } from '@/features/job-posting/components';
import { Modal } from '@/shared/components';

export default async function JobPostingModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Modal>
      <Suspense fallback={<JobPostingDetailLoading />}>
        <JobPostingPage params={params} />
      </Suspense>
    </Modal>
  );
}
