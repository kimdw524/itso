import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { CursorPaginatedResponse } from '@/types/pagination';

import { Bookmark } from '../bookmark/bookmark.entity';
import { JobPostingFilterDto, JobPostingSummaryDto } from './dto';
import { BookmarkedJobPostingFilterDto } from './dto/bookmarked-job-posting-filter.dto';
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

  async getBookmarkedPostings(
    userId: number | undefined,
    filter: BookmarkedJobPostingFilterDto,
  ): Promise<CursorPaginatedResponse<JobPostingSummaryDto>> {
    const { cursor, limit = 20 } = filter;

    const qb = this.jobPostingRepo
      .createQueryBuilder('posting')
      .innerJoin(
        Bookmark,
        'bookmark',
        `bookmark.userId = :userId AND bookmark.targetType = 'job-posting' AND bookmark.targetId = posting.id`,
        { userId },
      )
      .leftJoin('posting.company', 'company')
      .select([
        'company.id',
        'company.name',
        'company.logo',
        'posting.id',
        'posting.title',
        'posting.openDate',
        'posting.dueDate',
        'posting.jobId',
        'posting.views',
        'posting.bookmarks',
        'posting.minExperience',
        'posting.maxExperience',
        'posting.employmentType',
        'bookmark.createdAt',
      ])
      .orderBy('bookmark.createdAt', 'DESC')
      .limit(limit + 1)
      .addSelect('true as isBookmarked')
      .distinct(true);

    if (cursor !== undefined) {
      qb.andWhere('bookmark.createdAt < :cursor', { cursor });
    }

    const data: {
      posting_id: number;
      posting_title: string;
      posting_open_date: string;
      posting_due_date: string | null;
      posting_job_id: number;
      posting_views: number;
      posting_bookmarks: number;
      posting_min_experience: number;
      posting_max_experience: number;
      posting_employment_type: number;
      company_id: number;
      company_name: string;
      company_logo: string;
      bookmark_created_at: string;
      isBookmarked: 0 | 1;
    }[] = await qb.getRawMany();

    const transformedData = data.map((i) => ({
      id: i.posting_id,
      title: i.posting_title,
      openDate: i.posting_open_date,
      dueDate: i.posting_due_date,
      jobId: i.posting_job_id,
      views: i.posting_views,
      bookmarks: i.posting_bookmarks,
      minExperience: i.posting_min_experience,
      maxExperience: i.posting_max_experience,
      employmentType: i.posting_employment_type,
      company: {
        id: i.company_id,
        name: i.company_name,
        logo: i.company_logo,
      },
      bookmark: {
        createdAt: i.bookmark_created_at,
      },
      isBookmarked: i.isBookmarked == 1,
    }));

    const hasNext = transformedData.length > limit;
    const slicedData = hasNext
      ? transformedData.slice(0, limit)
      : transformedData;
    const nextCursor = hasNext
      ? slicedData[slicedData.length - 1].bookmark.createdAt
      : null;

    return {
      data: plainToInstance(JobPostingSummaryDto, slicedData),
      nextCursor,
      hasNext,
    };
  }

  async getFilteredPostings(
    userId: number | undefined,
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
      .select([
        'company.id',
        'company.name',
        'company.logo',
        'posting.id',
        'posting.title',
        'posting.openDate',
        'posting.dueDate',
        'posting.jobId',
        'posting.views',
        'posting.bookmarks',
        'posting.minExperience',
        'posting.maxExperience',
        'posting.employmentType',
      ])
      .orderBy('posting.id', 'DESC')
      .limit(limit + 1)
      .distinct(true);

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

    if (userId == undefined) {
      qb.addSelect('false AS `isBookmarked`');
    } else {
      qb.leftJoin(
        Bookmark,
        'bookmark',
        `bookmark.userId = :userId AND bookmark.targetType = 'job-posting' AND bookmark.targetId = posting.id`,
        { userId },
      );
      qb.addSelect(
        'CASE WHEN bookmark.targetId IS NOT NULL THEN true ELSE false END as isBookmarked',
      );
    }

    const data: {
      posting_id: number;
      posting_title: string;
      posting_open_date: string;
      posting_due_date: string | null;
      posting_job_id: number;
      posting_views: number;
      posting_bookmarks: number;
      posting_min_experience: number;
      posting_max_experience: number;
      posting_employment_type: number;
      company_id: number;
      company_name: string;
      company_logo: string;
      isBookmarked: 0 | 1;
    }[] = await qb.getRawMany();

    const transformedData = data.map((i) => ({
      id: i.posting_id,
      title: i.posting_title,
      openDate: i.posting_open_date,
      dueDate: i.posting_due_date,
      jobId: i.posting_job_id,
      views: i.posting_views,
      bookmarks: i.posting_bookmarks,
      minExperience: i.posting_min_experience,
      maxExperience: i.posting_max_experience,
      employmentType: i.posting_employment_type,
      company: {
        id: i.company_id,
        name: i.company_name,
        logo: i.company_logo,
      },
      isBookmarked: i.isBookmarked == 1,
    }));

    const hasNext = transformedData.length > limit;
    const slicedData = hasNext
      ? transformedData.slice(0, limit)
      : transformedData;
    const nextCursor = hasNext ? slicedData[slicedData.length - 1].id : null;

    return {
      data: plainToInstance(JobPostingSummaryDto, slicedData),
      nextCursor,
      hasNext,
    };
  }
}
