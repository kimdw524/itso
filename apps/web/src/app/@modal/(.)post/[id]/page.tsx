import { Suspense } from 'react';

import JobPostingPage from '@/app/post/[id]/page';
import { JobPostingDetailLoading } from '@/features/job-posting/components/JobPostingDetail';
import { Modal } from '@/shared/components/Modal';

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
