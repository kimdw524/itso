import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyModule } from '../company/company.module';
import { JobPostingModule } from '../job-posting/job-posting.module';
import { BookmarkController } from './bookmark.controller';
import { Bookmark } from './bookmark.entity';
import { BookmarkService } from './bookmark.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bookmark]),
    CompanyModule,
    JobPostingModule,
  ],
  controllers: [BookmarkController],
  providers: [BookmarkService],
  exports: [BookmarkService],
})
export class BookmarkModule {}
