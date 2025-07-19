import { useMemo } from 'react';

import { CheckboxModal } from '@/components/CheckboxModal';
import { type CheckboxData } from '@/hooks/useCheckboxes';
import { getKeys } from '@/utils/getKeys';

import { JOB_POSTING } from '../../constants/job-posting';
import type { JobId } from '../../types/job-posting';

interface JobSelectModalProps {
  onSelect: (checked: JobId[]) => void;
}

export const JobSelectModal = ({ onSelect }: JobSelectModalProps) => {
  const items = useMemo(
    () =>
      getKeys(JOB_POSTING.JOB_NAME).map((jobId) => ({
        name: jobId,
        checked: true,
      })),
    [],
  ) satisfies CheckboxData<JobId>[];

  return (
    <CheckboxModal
      header="직무 선택"
      items={items}
      renderChildren={(jobId) => JOB_POSTING.JOB_NAME[jobId]}
      style={{ maxWidth: '512px' }}
      onConfirm={onSelect}
    />
  );
};
