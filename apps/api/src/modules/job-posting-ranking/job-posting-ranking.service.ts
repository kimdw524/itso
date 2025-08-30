import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';

import { LessThan, Repository } from 'typeorm';

import { JobPostingService } from '../job-posting/job-posting.service';
import { JOB_POSTING_RANKING } from './job-posting-ranking.constants';
import { JobPostingRanking } from './job-posting.-ranking.entity';

@Injectable()
export class JobPostingRankingService {
  constructor(
    @InjectRepository(JobPostingRanking)
    private readonly jobPostingRankingRepo: Repository<JobPostingRanking>,
    @Inject(forwardRef(() => JobPostingService))
    private readonly jobPostingService: JobPostingService,
  ) {}

  private viewBuffer = new Map<number, number>();

  increaseView(id: number) {
    this.viewBuffer.set(id, (this.viewBuffer.get(id) ?? 0) + 1);
  }

  private async cleanup() {
    const date = new Date();
    date.setMinutes(date.getDate() - JOB_POSTING_RANKING.CLEANUP_INTERVAL);

    await this.jobPostingRankingRepo.delete({
      createdAt: LessThan(date),
    });
  }

  @Cron(`0 0 */${JOB_POSTING_RANKING.AGGREGATE_INTERVAL} * * *`)
  private async flushPopularViews() {
    const tasks = Array.from(this.viewBuffer.entries()).map(
      async ([id, count]) => {
        return this.jobPostingRankingRepo.insert({
          postingId: id,
          views: count,
        });
      },
    );

    await Promise.all(tasks);
    this.viewBuffer.clear();
    await this.cleanup();
    await this.jobPostingService.updateRecentViews();
  }
}
