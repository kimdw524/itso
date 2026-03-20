import type { ComponentProps } from 'react';

import { Chip } from '@kimdw-rtk/ui';

import type { EmploymentType } from '../../models';
import { formatEmploymentType } from '../../utils';

interface EmploymentTypeChipProps {
  type: EmploymentType;
}

export const EmploymentTypeChip = ({ type }: EmploymentTypeChipProps) => {
  const color: Record<EmploymentType, ComponentProps<typeof Chip>['color']> = {
    '1': 'blue',
    '2': 'lime',
    '3': 'emerald',
    '4': 'rose',
    '5': 'teal',
  };

  return <Chip color={color[type]}>{formatEmploymentType(type)}</Chip>;
};
