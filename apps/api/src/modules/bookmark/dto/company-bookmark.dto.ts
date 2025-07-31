import { CompanySummaryDto } from '@/modules/company/dto';

export class CompanyBookmarkDto {
  id: number;

  createdAt: Date;

  company: CompanySummaryDto;
}
