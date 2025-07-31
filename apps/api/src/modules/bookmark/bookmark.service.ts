import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { Company } from '../company/company.entity';
import { CompanyService } from '../company/company.service';
import { CompanySummaryDto } from '../company/dto';
import { JobPostingSummaryDto } from '../job-posting/dto';
import { JobPosting } from '../job-posting/job-posting.entity';
import { JobPostingService } from '../job-posting/job-posting.service';
import { Bookmark } from './bookmark.entity';
import { BookmarkType } from './bookmark.types';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepo: Repository<Bookmark>,
    private readonly companyService: CompanyService,
    private readonly jobPostingService: JobPostingService,
  ) {}

  async create(data: Omit<Bookmark, 'createdAt'>): Promise<Bookmark> {
    if (await this.isExists(data)) {
      throw new ConflictException('bookmark already exists');
    }

    switch (data.targetType) {
      case 'company': {
        if (!(await this.companyService.isExists({ id: data.targetId }))) {
          throw new NotFoundException('company not found');
        }

        await this.companyService.incrementBookmark({ id: data.targetId });

        const entity = this.bookmarkRepo.create(data);
        return await this.bookmarkRepo.save(entity);
      }
      case 'job-posting': {
        if (!(await this.jobPostingService.isExists({ id: data.targetId }))) {
          throw new NotFoundException('job posting not found');
        }

        await this.jobPostingService.incrementBookmark({ id: data.targetId });

        const entity = this.bookmarkRepo.create(data);
        return await this.bookmarkRepo.save(entity);
      }
    }
  }

  async remove(data: Omit<Bookmark, 'createdAt'>): Promise<boolean> {
    const bookmark = await this.find(data);

    if (bookmark === null) {
      return false;
    }

    await this.bookmarkRepo.remove(bookmark);

    switch (data.targetType) {
      case 'company': {
        await this.companyService.decrementBookmark({ id: data.targetId });
        break;
      }
      case 'job-posting': {
        await this.jobPostingService.decrementBookmark({ id: data.targetId });
        break;
      }
    }

    return true;
  }

  async isExists(data: Partial<Bookmark>): Promise<boolean> {
    return await this.bookmarkRepo.existsBy(data);
  }

  async find(data: Partial<Bookmark>): Promise<Bookmark | null> {
    const bookmark = await this.bookmarkRepo.findOneBy(data);

    if (!bookmark) {
      throw new NotFoundException(`bookmark not found`);
    }

    return bookmark;
  }

  async findBookmarkedCompany(
    data: Omit<Partial<Bookmark>, 'targetType'>,
  ): Promise<CompanySummaryDto[]> {
    const query = this.bookmarkRepo
      .createQueryBuilder('bookmark')
      .innerJoin(Company, 'company', 'company.id = bookmark.targetId')
      .where('bookmark.targetType = :targetType', {
        targetType: 'company' satisfies BookmarkType,
      });

    if (data.targetId !== undefined) {
      query.andWhere('bookmark.targetId = :targetId', {
        targetId: data.targetId,
      });
    }

    if (data.userId !== undefined) {
      query.andWhere('bookmark.userId = :userId', {
        userId: data.userId,
      });
    }

    query.select([
      'company.id as id',
      'company.name as name',
      'company.logo as logo',
    ]);

    return plainToInstance(CompanySummaryDto, await query.getRawMany());
  }

  async findBookmarkedJobPosting(
    data: Omit<Partial<Bookmark>, 'targetType'>,
  ): Promise<JobPostingSummaryDto[]> {
    const query = this.bookmarkRepo
      .createQueryBuilder('bookmark')
      .innerJoin(JobPosting, 'jobPosting', 'jobPosting.id = bookmark.targetId')
      .where('bookmark.targetType = :targetType', {
        targetType: 'job-posting' satisfies BookmarkType,
      });

    if (data.targetId !== undefined) {
      query.andWhere('bookmark.targetId = :targetId', {
        targetId: data.targetId,
      });
    }

    if (data.userId !== undefined) {
      query.andWhere('bookmark.userId = :userId', {
        userId: data.userId,
      });
    }

    query.select([
      'jobPosting.id as id',
      'jobPosting.title as title',
      'jobPosting.openDate as openDate',
      'jobPosting.dueDate as dueDate',
      'jobPosting.jobId as jobId',
      'jobPosting.views as views',
      'jobPosting.bookmarks as bookmarks',
      'jobPosting.minExperience as minExperience',
      'jobPosting.maxExperience as maxExperience',
      'jobPosting.employmentType as employmentType',
    ]);

    return plainToInstance(JobPostingSummaryDto, await query.getRawMany());
  }
}
