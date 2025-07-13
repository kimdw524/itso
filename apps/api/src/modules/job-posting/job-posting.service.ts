import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { plainToInstance } from 'class-transformer';
import {
  FindOptionsWhere,
  ILike,
  In,
  LessThan,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';

import { CursorPaginatedResponse, PaginatedResponse } from '@/types/pagination';

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
  ): Promise<CursorPaginatedResponse<JobPostingSummaryDto>> {
    const {
      companyId,
      title,
      jobIds,
      minExperience,
      maxExperience,
      employmentType,
      cursor,
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

    if (cursor !== undefined) {
      where.id = LessThan(cursor);
    }

    const [data] = await this.jobPostingRepo.findAndCount({
      where,
      order: { id: 'DESC' },
      take: limit + 1,
    });

    const hasNext = data.length > limit;
    const slicedData = hasNext ? data.slice(0, limit) : data;
    const nextCursor = hasNext ? slicedData[slicedData.length - 1].id : null;

    return {
      data: plainToInstance(JobPostingSummaryDto, slicedData),
      nextCursor,
      hasNext,
    };
  }
}
