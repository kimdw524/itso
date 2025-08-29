import { CacheModule } from '@nestjs/cache-manager';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JobPostingModule } from '../job-posting/job-posting.module';
import { JobPostingRankingService } from './job-posting-ranking.service';
import { JobPostingRanking } from './job-posting.-ranking.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobPostingRanking]),
    CacheModule.register(),
    forwardRef(() => JobPostingModule),
  ],
  providers: [JobPostingRankingService],
  exports: [JobPostingRankingService],
})
export class JobPostingRankingModule {}
