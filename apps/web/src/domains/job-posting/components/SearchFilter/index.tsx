'use client';

import { useRef, type ReactNode } from 'react';

import { Box, ScrollArea } from '@repo/ui';
import { useOverlay } from '@repo/utils';

import type { FetchJobPostingParams } from '@/api/job-posting/fetchJobPostingList';
import { CheckboxModal } from '@/components/CheckboxModal';
import { DisableWrapper } from '@/components/DisableWrapper';
import { FilterButton } from '@/components/FilterButton';
import { RangeModal } from '@/components/RangeModal';
import { STICKY_TOP } from '@/constants/sticky';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useSticky } from '@/hooks/useSticky';

import {
  EMPLOYMENT_TYPE_KEY,
  JOB_ID,
  JOB_POSTING,
} from '../../constants/job-posting';
import { formatExperienceRange } from '../../utils';
import * as s from './style.css';

interface SearchFilterProps {
  children?: ReactNode;
  queryParams: ReturnType<typeof useQueryParams<FetchJobPostingParams>>;
  isDisabled?: boolean;
}

export const SearchFilter = ({
  children,
  queryParams,
  isDisabled = false,
}: SearchFilterProps) => {
  const { push } = useOverlay();

  const { getParam, setParam } = queryParams;

  const ref = useRef<HTMLDivElement>(null);
  const isPinned = useSticky(ref, STICKY_TOP.JOB_POSTING_FILTER);

  return (
    <Box
      ref={ref}
      className={s.container({ isPinned })}
      sx={{ fontSize: { mobile: 'sm', desktop: 'md' } }}
    >
      <ScrollArea>
        <Box flex gap="md" alignItems="center">
          <DisableWrapper
            condition={isDisabled}
            sx={{ display: 'flex', gap: 'md', alignItems: 'center' }}
          >
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
                    onConfirm={(checked) =>
                      setParam('employmentTypes', checked)
                    }
                  />,
                )
              }
            >
              {getParam('employmentTypes')?.map(
                (type) => JOB_POSTING.EMPLOYMENT_TYPE[type],
              ) || ''}
            </FilterButton>

            {/* 경력 선택 */}
            <FilterButton
              width="140px"
              onClick={() =>
                push(
                  <RangeModal
                    header="경력 선택"
                    min={0}
                    max={16}
                    defaultMinValue={getParam('minExperience') || 0}
                    defaultMaxValue={
                      getParam('maxExperience') === 99
                        ? 16
                        : getParam('maxExperience') || 16
                    }
                    renderDescription={(min, max) =>
                      formatExperienceRange(min, max == 16 ? 99 : max)
                    }
                    style={{ width: '480px' }}
                    onConfirm={(min, max) => {
                      setParam('minExperience', min);
                      setParam('maxExperience', max === 16 ? 99 : max);
                    }}
                  />,
                )
              }
            >
              {formatExperienceRange(
                getParam('minExperience') || 0,
                getParam('maxExperience') || 99,
              )}
            </FilterButton>
          </DisableWrapper>
          {children}
        </Box>
      </ScrollArea>
    </Box>
  );
};
