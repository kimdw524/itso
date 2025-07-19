'use client';

import { Box } from '@repo/ui';
import { useOverlay } from '@repo/utils';

import type { FetchJobPostingParams } from '@/api/job-posting/fetchJobPosting';
import { CheckboxModal } from '@/components/CheckboxModal';
import { FilterButton } from '@/components/FilterButton';
import { useQueryParams } from '@/hooks/useQueryParams';

import {
  EMPLOYMENT_TYPE_KEY,
  JOB_ID,
  JOB_POSTING,
} from '../../constants/job-posting';

interface SearchFilterProps {
  queryParams: ReturnType<typeof useQueryParams<FetchJobPostingParams>>;
}

export const SearchFilter = ({ queryParams }: SearchFilterProps) => {
  const { push } = useOverlay();

  const { getParam, setParam } = queryParams;

  return (
    <Box flex gap="md" marginBottom="xl" paddingY="xl">
      {/* 직무 선택 */}
      <FilterButton
        width="180px"
        onClick={() =>
          push(
            <CheckboxModal
              header="직무 선택"
              items={JOB_ID}
              defaultChecked={getParam('jobIds') || []}
              renderChildren={(jobId) => JOB_POSTING.JOB_NAME[jobId]}
              style={{ maxWidth: '512px' }}
              onConfirm={(checked) => setParam('jobIds', checked)}
            />,
          )
        }
      >
        {getParam('jobIds')
          ?.map((jobId) => JOB_POSTING.JOB_NAME[jobId])
          .slice(0, 5) || ''}
      </FilterButton>

      {/* 고용형태 선택 */}
      <FilterButton
        width="180px"
        onClick={() =>
          push(
            <CheckboxModal
              header="고용형태 선택"
              items={EMPLOYMENT_TYPE_KEY}
              defaultChecked={getParam('employmentTypes') || []}
              renderChildren={(type) => JOB_POSTING.EMPLOYMENT_TYPE[type]}
              style={{ maxWidth: '512px' }}
              onConfirm={(checked) => setParam('employmentTypes', checked)}
            />,
          )
        }
      >
        {getParam('employmentTypes')?.map(
          (type) => JOB_POSTING.EMPLOYMENT_TYPE[type],
        ) || ''}
      </FilterButton>

      {/* 경력 선택 */}
      <FilterButton width="130px">10~20년차</FilterButton>
    </Box>
  );
};
