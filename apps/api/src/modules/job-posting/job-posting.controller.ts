import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { Request } from 'express';

import { AuthSessionGuard } from '../auth-session-guard/auth-session-gaurd';
import { JobPostingFilterDto } from './dto';
import { BookmarkedJobPostingFilterDto } from './dto/bookmarked-job-posting-filter.dto';
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

  @UseGuards(AuthSessionGuard)
  @Get('/bookmark')
  getBookmarkedPostings(
    @Req() req: Request,
    @Query() filter: BookmarkedJobPostingFilterDto,
  ) {
    const userId = req.session.user;
    return this.jobPostingService.getBookmarkedPostings(userId, filter);
  }

  @Get(':id')
  getPosting(@Param('id', ParseIntPipe) id: number) {
    return this.jobPostingService.getPosting(id);
  }
}
