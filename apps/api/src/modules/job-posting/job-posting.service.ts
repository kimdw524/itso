import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { plainToInstance } from 'class-transformer';
import {
  FindOptionsWhere,
  ILike,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';

import { PaginatedResponse } from '@/types/pagination';

import { JobPostingFilterDto, JobPostingSummaryDto } from './dto';
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

  async getFilteredPostings(
    filter: JobPostingFilterDto,
  ): Promise<PaginatedResponse<JobPostingSummaryDto>> {
    const {
      companyId,
      title,
      jobIds,
      minExperience,
      maxExperience,
      employmentType,
      page = 1,
      limit = 20,
    } = filter;

    const where: FindOptionsWhere<JobPosting> = {};

    if (companyId !== undefined) {
      where.companyId = companyId;
    }

    if (title) {
      where.title = ILike(`%${title}%`);
    }

    if (jobIds && jobIds.length > 0) {
      where.jobId = In(jobIds);
    }

    if (minExperience !== undefined) {
      where.minExperience = MoreThanOrEqual(minExperience);
    }

    if (maxExperience !== undefined) {
      where.maxExperience = LessThanOrEqual(maxExperience);
    }

    if (employmentType !== undefined) {
      where.employmentType = employmentType;
    }

    const [data, total] = await this.jobPostingRepo.findAndCount({
      where,
      order: { id: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: plainToInstance(JobPostingSummaryDto, data),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
