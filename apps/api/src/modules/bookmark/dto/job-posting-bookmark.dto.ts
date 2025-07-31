import { JobPostingSummaryDto } from '@/modules/job-posting/dto';

export class JobPostingBookmarkDto {
  id: number;

  createdAt: Date;

  company: JobPostingSummaryDto;
}
