import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { CursorPaginatedResponse } from '@/types/pagination';

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
      employmentTypes,
      cursor,
      limit = 20,
    } = filter;

    const qb = this.jobPostingRepo
      .createQueryBuilder('posting')
      .leftJoin('posting.company', 'company')
      .addSelect(['company.id', 'company.name', 'company.logo'])
      .orderBy('posting.id', 'DESC')
      .take(limit + 1);

    if (companyId !== undefined) {
      qb.andWhere('company.id = :companyId', { companyId });
    }

    if (title) {
      qb.andWhere('posting.title ILIKE :title', { title: `%${title}%` });
    }

    if (jobIds?.length) {
      qb.andWhere('posting.jobId IN (:...jobIds)', { jobIds });
    }

    if (minExperience !== undefined) {
      qb.andWhere('posting.minExperience >= :minExperience', { minExperience });
    }

    if (maxExperience !== undefined) {
      qb.andWhere('posting.maxExperience <= :maxExperience', { maxExperience });
    }

    if (employmentTypes?.length) {
      qb.andWhere('posting.employmentType IN (:...employmentTypes)', {
        employmentTypes,
      });
    }

    if (cursor !== undefined) {
      qb.andWhere('posting.id < :cursor', { cursor });
    }

    const data = await qb.getMany();
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
