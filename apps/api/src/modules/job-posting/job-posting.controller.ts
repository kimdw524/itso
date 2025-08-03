import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Req,
} from '@nestjs/common';

import { Request } from 'express';

import { JobPostingFilterDto } from './dto';
import { JobPostingService } from './job-posting.service';

@Controller('job-posting')
export class JobPostingController {
  constructor(private readonly jobPostingService: JobPostingService) {}

  @Get()
  getFilteredPostings(
    @Req() req: Request,
    @Query() filter: JobPostingFilterDto,
  ) {
    const userId = req.session.user;
    return this.jobPostingService.getFilteredPostings(userId, filter);
  }

  @Get(':id')
  getPosting(@Param('id', ParseIntPipe) id: number) {
    return this.jobPostingService.getPosting(id);
  }
}
