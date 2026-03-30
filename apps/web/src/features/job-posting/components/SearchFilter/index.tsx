'use client';

import { type ReactNode } from 'react';

import { Box, Flex, ScrollArea } from '@kimdw-rtk/ui';
import { useOverlay } from '@kimdw-rtk/utils';

import {
  CheckboxModal,
  DisableWrapper,
  FilterButton,
  RangeModal,
  StickyHeader,
} from '@/shared/components';
import { serializeQueryString } from '@/shared/utils';

import {
  EMPLOYMENT_TYPE_KEY,
  JOB_ID,
  JOB_POSTING,
  JOB_POSTING_FILTER_STORAGE,
} from '../../constants';
import { useJobPostingFilter } from '../../hooks';
import { formatExperienceRange } from '../../utils';
import { CompanyFilter } from './CompanyFilter';
import { SortFilter } from './SortFilter';

interface SearchFilterProps {
  children?: ReactNode;
  isDisabled?: boolean;
}

export const SearchFilter = ({
  children,
  isDisabled = false,
}: SearchFilterProps) => {
  const { push } = useOverlay();

  const [filter, setFilterOrigin] = useJobPostingFilter();

  const setFilter = (params: Parameters<typeof setFilterOrigin>[0]) => {
    setFilterOrigin(params);

    // Company 필터가 적용된 경우 필터를 저장하지 않는다.
    if (filter.companyId ?? 0 > 0) {
      return;
    }

    localStorage.setItem(
      JOB_POSTING_FILTER_STORAGE,
      serializeQueryString({ ...filter, ...params }, ','),
    );
  };

  return (
    <StickyHeader>
      <Flex alignItems="center" gap="lg" justifyContent="space-between">
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
                      defaultChecked={filter.jobIds ?? []}
                      header="직무 선택"
                      items={JOB_ID}
                      renderChildren={(jobId) =>
                        JOB_POSTING.JOB_NAME[jobId] ?? ''
                      }
                      style={{ maxWidth: '512px' }}
                      onConfirm={(checked) => setFilter({ jobIds: checked })}
                    />,
                  )
                }
              >
                {filter.jobIds
                  ?.map((jobId) => JOB_POSTING.JOB_NAME[jobId] ?? '')
                  .slice(0, 5) || ''}
              </FilterButton>

              {/* 고용형태 선택 */}
              <FilterButton
                width="180px"
                onClick={() =>
                  push(
                    <CheckboxModal
                      defaultChecked={filter.employmentTypes || []}
                      header="고용형태 선택"
                      items={EMPLOYMENT_TYPE_KEY}
                      renderChildren={(type) =>
                        JOB_POSTING.EMPLOYMENT_TYPE[type]
                      }
                      style={{ maxWidth: '512px' }}
                      onConfirm={(checked) =>
                        setFilter({ employmentTypes: checked })
                      }
                    />,
                  )
                }
              >
                {filter.employmentTypes?.map(
                  (type) => JOB_POSTING.EMPLOYMENT_TYPE[type] ?? '',
                ) || ''}
              </FilterButton>

              {/* 경력 선택 */}
              <FilterButton
                width="140px"
                onClick={() =>
                  push(
                    <RangeModal
                      defaultMaxValue={
                        filter.maxExperience === 99
                          ? 16
                          : (filter.maxExperience ?? 16)
                      }
                      defaultMinValue={filter.minExperience || 0}
                      header="경력 선택"
                      max={16}
                      min={0}
                      renderDescription={(min, max) =>
                        formatExperienceRange(min, max == 16 ? 99 : max)
                      }
                      style={{ width: '480px' }}
                      onConfirm={(min, max) => {
                        setFilter({ minExperience: min });
                        setFilter({ maxExperience: max === 16 ? 99 : max });
                      }}
                    />,
                  )
                }
              >
                {formatExperienceRange(
                  filter.minExperience ?? 0,
                  filter.maxExperience ?? 99,
                )}
              </FilterButton>
            </DisableWrapper>
            {children}
          </Box>
        </ScrollArea>
        <SortFilter />
      </Flex>
      <Flex alignItems="center" gap="lg">
        {filter.companyId && <CompanyFilter />}
      </Flex>
    </StickyHeader>
  );
};
