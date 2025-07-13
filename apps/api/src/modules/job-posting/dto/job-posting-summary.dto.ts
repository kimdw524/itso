import { Exclude } from 'class-transformer';

import { JobPosting } from '../job-posting.entity';

export class JobPostingSummaryDto extends JobPosting {
  @Exclude()
  declare description: string;

  @Exclude()
  declare postingId: string;

  @Exclude()
  declare link: string;
}
