import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { CursorPaginatedResponse } from '@/types/pagination';

import { JobPostingFilterDto, JobPostingSummaryDto } from './dto';
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

  async incrementBookmark(data: Partial<JobPosting>): Promise<void> {
    await this.jobPostingRepo.increment(data, 'bookmarks', 1);
  }

  async decrementBookmark(data: Partial<JobPosting>): Promise<void> {
    await this.jobPostingRepo.decrement(data, 'bookmarks', 1);
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

    if (minExperience !== undefined && maxExperience !== undefined) {
      qb.andWhere(
        '(posting.minExperience <= :maxExperience AND posting.maxExperience >= :minExperience)',
        { minExperience, maxExperience },
      );
    } else if (minExperience !== undefined) {
      qb.andWhere('posting.maxExperience >= :minExperience', { minExperience });
    } else if (maxExperience !== undefined) {
      qb.andWhere('posting.minExperience <= :maxExperience', { maxExperience });
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
