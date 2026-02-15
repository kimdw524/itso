import Link from 'next/link';

import { Flex, Typography } from '@kimdw-rtk/ui';

import { formatExperienceRange } from '@/features/job-posting/utils';
import { serializeQueryString } from '@/shared/utils/queryString';

import type { JobPositionPreset } from '../../models';
import * as s from './style.css';

interface PositionPresetItemProps {
  positionPreset: JobPositionPreset;
}

export const PositionPresetItem = ({
  positionPreset,
}: PositionPresetItemProps) => {
  return (
    <Link href={`/post?${serializeQueryString(positionPreset.preset, ',')}`}>
      <Flex
        className={s.item}
        gap="md"
        alignItems="center"
        justifyContent="space-between"
      >
        <span>{positionPreset.name}</span>
        <Typography
          as="span"
          color="muted-foreground"
          fontSize="sm"
          fontWeight="light"
        >
          {formatExperienceRange(
            positionPreset.preset.minExperience ?? 0,
            positionPreset.preset.maxExperience ?? 99,
          )}
        </Typography>
      </Flex>
    </Link>
  );
};
