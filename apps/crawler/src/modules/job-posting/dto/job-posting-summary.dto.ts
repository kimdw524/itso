import { Exclude, Type } from 'class-transformer';

import { Company } from '@/modules/company/company.entity';

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

  @Type(() => Company)
  declare company: Company;
}
