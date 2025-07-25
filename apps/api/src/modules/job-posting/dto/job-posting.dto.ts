import { Type } from 'class-transformer';

import { CompanySummaryDto } from '@/modules/company/dto';

import { JobPosting } from '../job-posting.entity';

export class JobPostingDto extends JobPosting {
  @Type(() => CompanySummaryDto)
  declare company: CompanySummaryDto;
}
