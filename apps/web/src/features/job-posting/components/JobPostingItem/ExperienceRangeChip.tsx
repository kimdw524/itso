import type { ComponentProps } from 'react';

import { Chip } from '@kimdw-rtk/ui';

import type { ExperienceType } from '../../models';
import { formatExperienceRange, getExperienceType } from '../../utils';

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

  return (
    <Chip color={color[getExperienceType(min, max)]}>
      {formatExperienceRange(min, max)}
    </Chip>
  );
};
