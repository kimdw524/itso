import Link from 'next/link';

import { Card, CardContent, CardInteraction, Typography } from '@kimdw-rtk/ui';

import type { JobPostingSearchFilter } from '@/features/job-posting/models';
import {
  formatExperienceRange,
  formatJobName,
} from '@/features/job-posting/utils';
import { Separator } from '@/shared/components/Separator';
import { serializeQueryString } from '@/shared/utils/queryString';

interface FilterShortcutItemProps
  extends Required<
    Pick<JobPostingSearchFilter, 'jobIds' | 'minExperience' | 'maxExperience'>
  > {
  name: string;
}

export const FilterShortcutItem = ({
  name,
  jobIds,
  maxExperience,
  minExperience,
}: FilterShortcutItemProps) => {
  const queryString = serializeQueryString(
    {
      jobIds,
      minExperience,
      maxExperience,
    },
    ',',
  );

  return (
    <Link href={`/post?${queryString}`}>
      <Card
        color="transparent"
        size="xl"
        style={{ width: 'fit-content' }}
        variant="outlined"
      >
        <CardInteraction>
          <CardContent>
            <Typography fontWeight="medium" sx={{ marginBottom: 'lg' }}>
              {name}
            </Typography>
            <Typography color="secondary-foreground" fontSize="sm">
              <Separator separator=" · ">
                <>
                  {formatJobName(jobIds.at(0) ?? 1)}
                  {jobIds.length > 1 && ` 외 ${jobIds.length - 1}개 직무`}
                </>
                <>{formatExperienceRange(minExperience, maxExperience)}</>
              </Separator>
            </Typography>
          </CardContent>
        </CardInteraction>
      </Card>
    </Link>
  );
};
