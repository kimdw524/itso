import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { Request } from 'express';

import { AuthSessionGuard } from '../auth-session-guard/auth-session-gaurd';
import { BookmarkService } from './bookmark.service';

@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @UseGuards(AuthSessionGuard)
  @Get('/company')
  async getBookmarkedCompany(@Req() req: Request) {
    const userId = req.session.user!;

    return await this.bookmarkService.findBookmarkedCompany({ userId });
  }

  @UseGuards(AuthSessionGuard)
  @Get('/company/:id')
  async isCompanyBookmarked(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = req.session.user!;

    return {
      isBookmarked: await this.bookmarkService.isExists({
        userId,
        targetId: id,
        targetType: 'company',
      }),
    };
  }

  @UseGuards(AuthSessionGuard)
  @Post('/company/:id')
  async bookmarkCompany(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = req.session.user!;

    return await this.bookmarkService.create({
      userId,
      targetId: id,
      targetType: 'company',
    });
  }

  @UseGuards(AuthSessionGuard)
  @Delete('/company/:id')
  async deleteCompanyBookmark(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = req.session.user!;

    return {
      result: await this.bookmarkService.remove({
        userId,
        targetId: id,
        targetType: 'company',
      }),
    };
  }

  @UseGuards(AuthSessionGuard)
  @Get('/job-posting')
  async getBookmarkedJobPosting(@Req() req: Request) {
    const userId = req.session.user!;

    return await this.bookmarkService.findBookmarkedJobPosting({ userId });
  }

  @UseGuards(AuthSessionGuard)
  @Get('/job-posting/:id')
  async isJobPostingBookmarked(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = req.session.user!;

    return {
      isBookmarked: await this.bookmarkService.isExists({
        userId,
        targetId: id,
        targetType: 'job-posting',
      }),
    };
  }

  @UseGuards(AuthSessionGuard)
  @Post('/job-posting/:id')
  async bookmarkJobPosting(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = req.session.user!;

    return await this.bookmarkService.create({
      userId,
      targetId: id,
      targetType: 'job-posting',
    });
  }

  @UseGuards(AuthSessionGuard)
  @Delete('/job-posting/:id')
  async deleteJobPostingBookmark(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = req.session.user!;

    return {
      result: await this.bookmarkService.remove({
        userId,
        targetId: id,
        targetType: 'job-posting',
      }),
    };
  }
}
