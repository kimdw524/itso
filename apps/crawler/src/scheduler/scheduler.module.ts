import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { CrawlerModule } from '@/crawler/crawler.module';
import { CompanyModule } from '@/modules/company/company.module';
import { JobPostingModule } from '@/modules/job-posting/job-posting.module';

import { JobCrawlerTask } from './tasks/job-crawler.task';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CrawlerModule,
    JobPostingModule,
    CompanyModule,
  ],
  providers: [JobCrawlerTask],
})
export class SchedulerModule {}
