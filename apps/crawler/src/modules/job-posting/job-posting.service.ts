import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { JobPostingDto } from './dto/job-posting.dto';
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
    const jobPosting = await this.jobPostingRepo.findOneBy({ id });
    if (!jobPosting) {
      throw new NotFoundException(`posting ${id} not found`);
    }
    return { ...jobPosting, description: jobPosting.description };
  }

  async getPosting(id: number): Promise<JobPostingDto | null> {
    const jobPosting = await this.jobPostingRepo.findOne({
      where: { id },
      relations: ['company'],
    });
    if (!jobPosting) {
      throw new NotFoundException(`posting ${id} not found`);
    }
    return { ...jobPosting, description: jobPosting.description };
  }

  async isExists(data: Partial<JobPosting>): Promise<boolean> {
    return await this.jobPostingRepo.existsBy(data);
  }
}
