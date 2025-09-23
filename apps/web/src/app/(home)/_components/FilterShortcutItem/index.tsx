import Link from 'next/link';

import { Card, CardContent, CardInteraction, Typography } from '@repo/ui';

import { Separator } from '@/components/Separator';
import type { JobPostingSearchFilter } from '@/domains/job-posting/models';
import {
  formatExperienceRange,
  formatJobName,
} from '@/domains/job-posting/utils';
import { serializeQueryString } from '@/utils/queryString';

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
        color="secondary"
        variant="contained"
        style={{ width: 'fit-content' }}
      >
        <CardInteraction>
          <CardContent sx={{ padding: 'lg' }}>
            <Typography fontWeight="medium" sx={{ marginBottom: 'md' }}>
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
