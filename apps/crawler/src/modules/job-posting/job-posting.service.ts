import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  FindOneOptions,
  FindOptionsWhere,
  IsNull,
  Repository,
  UpdateResult,
} from 'typeorm';

import { JobPosting } from './job-posting.entity';

@Injectable()
export class JobPostingService {
  constructor(
    @InjectRepository(JobPosting)
    private readonly jobPostingRepo: Repository<JobPosting>,
  ) {}

  async count(data: FindOneOptions<JobPosting>['where']): Promise<number> {
    return await this.jobPostingRepo.count({ where: data });
  }

  async create(data: Partial<JobPosting>): Promise<JobPosting> {
    const entity = this.jobPostingRepo.create(data);
    return await this.jobPostingRepo.save(entity);
  }

  async update(
    id: JobPosting['id'],
    data: Partial<JobPosting>,
  ): Promise<UpdateResult> {
    const result = await this.jobPostingRepo.update({ id }, data);
    return result;
  }

  /**
   * 회사의 가장 최근 공고 등록일을 조회합니다.
   *
   * @param companyId 조회할 회사 ID
   * @returns 가장 최근 공고 등록일 또는 등록된 공고가 없을 때 null
   */
  async findLatestOpenDate(companyId: number): Promise<Date | null> {
    const jobPosting = await this.jobPostingRepo.findOne({
      where: { companyId },
      order: { openDate: 'DESC' },
      select: ['companyId', 'openDate'],
    });

    if (jobPosting === null) {
      return null;
    }

    return jobPosting.openDate;
  }

  async findById(id: number): Promise<JobPosting | null> {
    const jobPosting = await this.jobPostingRepo.findOneBy({ id });
    if (!jobPosting) {
      throw new NotFoundException(`posting ${id} not found`);
    }
    return { ...jobPosting, description: jobPosting.description };
  }

  async isExists(data: FindOptionsWhere<JobPosting>): Promise<boolean> {
    return await this.jobPostingRepo.existsBy(data);
  }

  /**
   * 마감되지 않은 채용 공고를 조회합니다.
   *
   * @param companyId 조회할 회사 ID
   * @returns 마감되지 않은 채용 공고 목록
   */
  async findOpenPostings(companyId: number): Promise<JobPosting[]> {
    const jobPostings = await this.jobPostingRepo.find({
      where: { companyId, closeDate: IsNull() },
    });
    return jobPostings;
  }

  /**
   * 채용 공고를 마감 처리합니다.
   *
   * @param companyId 마감 처리할 공고의 회사 ID
   * @param postingId 마감 처리할 외부 공고 ID
   */
  async closePosting(
    companyId: number,
    postingId: string,
  ): Promise<UpdateResult> {
    const result = await this.jobPostingRepo.update(
      { companyId, postingId },
      {
        closeDate: () => 'NOW()',
      },
    );
    return result;
  }
}
