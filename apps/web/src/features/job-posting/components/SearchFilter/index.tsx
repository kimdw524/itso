'use client';

import { type ReactNode } from 'react';

import { Box, ScrollArea } from '@kimdw-rtk/ui';
import { useOverlay } from '@kimdw-rtk/utils';

import {
  CheckboxModal,
  DisableWrapper,
  FilterButton,
  RangeModal,
  StickyHeader,
} from '@/shared/components';
import type { useQueryParams } from '@/shared/hooks';
import { serializeQueryString, type RequestType } from '@/shared/utils';

import {
  EMPLOYMENT_TYPE_KEY,
  JOB_ID,
  JOB_POSTING,
  JOB_POSTING_FILTER_STORAGE,
} from '../../constants';
import type { JobPostingService } from '../../services';
import { formatExperienceRange } from '../../utils';
import { SortFilter } from './SortFilter';

interface SearchFilterProps {
  children?: ReactNode;
  queryParams: ReturnType<
    typeof useQueryParams<
      RequestType<typeof JobPostingService.getJobPostingList>
    >
  >;
  isDisabled?: boolean;
}

export const SearchFilter = ({
  children,
  queryParams,
  isDisabled = false,
}: SearchFilterProps) => {
  const { push } = useOverlay();

  const { getParam, setParam: setParamOrigin, rawParams } = queryParams;

  const setParam = (...params: Parameters<typeof setParamOrigin>) => {
    setParamOrigin(...params);

    localStorage.setItem(
      JOB_POSTING_FILTER_STORAGE,
      serializeQueryString({ ...rawParams, [params[0]]: params[1] }, ','),
    );
  };

  return (
    <StickyHeader>
      <ScrollArea>
        <Box alignItems="center" gap="lg" flex>
          <DisableWrapper
            condition={isDisabled}
            sx={{ display: 'flex', gap: 'lg', alignItems: 'center' }}
          >
            {/* 직무 선택 */}
            <FilterButton
              width="180px"
              onClick={() =>
                push(
                  <CheckboxModal
                    defaultChecked={getParam('jobIds') ?? []}
                    header="직무 선택"
                    items={JOB_ID}
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
                    defaultChecked={getParam('employmentTypes') || []}
                    header="고용형태 선택"
                    items={EMPLOYMENT_TYPE_KEY}
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
                    defaultMaxValue={
                      getParam('maxExperience') === 99
                        ? 16
                        : (getParam('maxExperience') ?? 16)
                    }
                    defaultMinValue={getParam('minExperience') || 0}
                    header="경력 선택"
                    max={16}
                    min={0}
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
                getParam('minExperience') ?? 0,
                getParam('maxExperience') ?? 99,
              )}
            </FilterButton>
          </DisableWrapper>
          {children}
        </Box>
      </ScrollArea>
      <SortFilter queryParams={queryParams} />
    </StickyHeader>
  );
};
