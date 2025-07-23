import type { ComponentProps } from 'react';

import { Chip } from '@repo/ui';

import type { ExperienceType } from '../../types/job-posting';
import { formatExperienceRange } from '../../utils';
import { getExperienceType } from '../../utils/getExperienceType';

interface ExperienceRangeChipProps {
  min: number;
  max: number;
}

export const ExperienceRangeChip = ({ min, max }: ExperienceRangeChipProps) => {
  const color: Record<ExperienceType, ComponentProps<typeof Chip>['color']> = {
    ENTRY: 'green',
    EXPERIENCED: 'purple',
    'NO-MATTER': 'amber',
  };

  return <Chip color={color[getExperienceType(min, max)]}>{formatExperienceRange(min, max)}</Chip>;
};
