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

import { getIP } from '@/utils/common';

import { AuthSessionGuard } from '../auth-session-guard/auth-session-gaurd';
import { JobPostingFilterDto } from './dto';
import { BookmarkedJobPostingFilterDto } from './dto/bookmarked-job-posting-filter.dto';
import { JobPostingRankingFilterDto } from './dto/job-posting-ranking-filter.dto';
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

  @Get('/ranking')
  getPostingRanking(
    @Req() req: Request,
    @Query() filter: JobPostingRankingFilterDto,
  ) {
    const userId = req.session.user;
    return this.jobPostingService.getPostingRanking(
      userId,
      filter.jobIds ?? [],
      5,
    );
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
  async getPosting(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const posting = await this.jobPostingService.getPosting(id);

    if (posting !== null) {
      await this.jobPostingService.registerView(id, getIP(req.ips) ?? req.ip);
    }

    return posting;
  }
}
