import JobPostingPage from '@/app/post/[id]/page';
import { Modal } from '@/shared/components/Modal';

export default async function JobPostingModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Modal>
      <JobPostingPage params={params} />
    </Modal>
  );
}
