import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JobPostingController } from './job-posting.controller';
import { JobPosting } from './job-posting.entity';
import { JobPostingService } from './job-posting.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobPosting])],
  controllers: [JobPostingController],
  providers: [JobPostingService],
  exports: [JobPostingService],
})
export class JobPostingModule {}
