import { Controller, Get, Query } from '@nestjs/common';

import { JobPostingFilterDto } from './dto';
import { JobPostingService } from './job-posting.service';

@Controller('job-posting')
export class JobPostingController {
  constructor(private readonly jobPostingService: JobPostingService) {}

  @Get()
  getFilteredPostings(@Query() filter: JobPostingFilterDto) {
    return this.jobPostingService.getFilteredPostings(filter);
  }
}
