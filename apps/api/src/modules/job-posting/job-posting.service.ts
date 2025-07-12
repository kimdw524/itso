import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { JobPosting } from './job-posting.entity';

@Injectable()
export class JobPostingService {
  constructor(
    @InjectRepository(JobPosting)
    private readonly jobPostingRepo: Repository<JobPosting>,
  ) {}

  async create(data: Partial<JobPosting>): Promise<JobPosting> {
    const entity = this.jobPostingRepo.create(data);
    return await this.jobPostingRepo.save(entity);
  }

  async findById(id: number): Promise<JobPosting | null> {
    return await this.jobPostingRepo.findOneBy({ id });
  }

  async isExists(data: Partial<JobPosting>): Promise<boolean> {
    return await this.jobPostingRepo.existsBy(data);
  }
}
