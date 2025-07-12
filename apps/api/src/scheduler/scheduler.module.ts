import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { CrawlerModule } from 'src/crawler/crawler.module';
import { CompanyModule } from 'src/modules/company/company.module';
import { JobPostingModule } from 'src/modules/job-posting/job-posting.module';

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
