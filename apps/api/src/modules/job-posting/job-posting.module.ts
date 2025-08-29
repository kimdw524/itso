import { CacheModule } from '@nestjs/cache-manager';
import { forwardRef, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JobPostingRankingModule } from '../job-posting-ranking/job-posting-ranking.module';
import { JobPostingController } from './job-posting.controller';
import { JobPosting } from './job-posting.entity';
import { JobPostingService } from './job-posting.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobPosting]),
    CacheModule.register(),
    ScheduleModule.forRoot(),
    forwardRef(() => JobPostingRankingModule),
  ],
  controllers: [JobPostingController],
  providers: [JobPostingService],
  exports: [JobPostingService],
})
export class JobPostingModule {}
