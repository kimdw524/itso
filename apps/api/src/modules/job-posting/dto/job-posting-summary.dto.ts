import { Exclude, Type } from 'class-transformer';

import { CompanySummaryDto } from '@/modules/company/dto';

import { JobPosting } from '../job-posting.entity';

export class JobPostingSummaryDto extends JobPosting {
  @Exclude()
  declare description: string;

  @Exclude()
  declare postingId: string;

  @Exclude()
  declare link: string;

  @Exclude()
  declare companyId: number;

  @Type(() => CompanySummaryDto)
  declare company: CompanySummaryDto;
}
