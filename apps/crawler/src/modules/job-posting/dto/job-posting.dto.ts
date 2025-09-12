import { Type } from 'class-transformer';

import { Company } from '@/modules/company/company.entity';

import { JobPosting } from '../job-posting.entity';

export class JobPostingDto extends JobPosting {
  @Type(() => Company)
  declare company: Company;
}
