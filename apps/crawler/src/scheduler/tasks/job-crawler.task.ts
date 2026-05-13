import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { Crawler } from '@/crawler/crawler.abstract';
import { CrawledJobPosting } from '@/crawler/crawler.interface';
import { CrawlerService } from '@/crawler/crawler.service';
import { CompanyService } from '@/modules/company/company.service';
import { JobPosting } from '@/modules/job-posting/job-posting.entity';
import { JobPostingService } from '@/modules/job-posting/job-posting.service';
import { getJobIdByKeyword } from '@/utils/job';

import { hasJobPostingChanged } from './job-crawler.task.util';

@Injectable()
export class JobCrawlerTask {
  private readonly logger = new Logger(JobCrawlerTask.name);

  constructor(
    private readonly crawlerService: CrawlerService,
    private readonly jobPostingService: JobPostingService,
    private readonly companyService: CompanyService,
  ) {}

  async onModuleInit() {
    await this.initCompany();
    await this.handleCron();
  }

  // 새로운 Company가 존재하는 경우 DB에 반영한다.
  async initCompany() {
    for (const crawler of this.crawlerService.getCrawlers()) {
      const name = crawler.getCompanyName();

      if (await this.companyService.find({ name })) {
        continue;
      }

      try {
        await this.companyService.create({
          name,
          logo: await this.companyService.uploadLogoImage(
            await crawler.getLogoUrl(),
          ),
        });
      } catch (error) {
        Logger.error(`${name} 회사를 DB에 등록하지 못했습니다.`, error);
      }
    }
  }

  @Cron('0 2,14,20 * * 1-5')
  async handleCron() {
    const crawlers = this.crawlerService.getCrawlers();
    for (const crawler of crawlers) {
      try {
        await this.updateCompanyJobPostings(crawler);
      } catch (error) {
        this.logger.error(`${crawler.getCompanyName()} 업데이트 실패`, error);
      }
    }
  }

  /**
   * 새로운 공고를 등록한다.
   *
   * @param companyId
   * @param jobPosting 크롤링한 JobPosting (CrawledJobPosting)
   * @returns 등록 여부
   */
  async createJobPosting(companyId: number, jobPosting: CrawledJobPosting) {
    const jobId = getJobIdByKeyword(jobPosting.title);

    // IT 직군이 아닐 경우 등록하지 않는다.
    if (jobId === 0) {
      return false;
    }

    await this.jobPostingService.create({
      jobId,
      companyId,
      title: jobPosting.title,
      link: jobPosting.link,
      postingId: jobPosting.postingId,
      openDate: new Date(jobPosting.openDate),
      dueDate:
        jobPosting.dueDate === null ? undefined : new Date(jobPosting.dueDate),
      description: await jobPosting.getDescription(),
      employmentType: jobPosting.employmentType,
      minExperience: jobPosting.minExperience,
      maxExperience: jobPosting.maxExperience,
    });

    return true;
  }

  /**
   * 기존 공고를 업데이트한다.
   *
   * @param prevJobPostingd 기존 JobPosting
   * @param jobPosting 크롤링한 CrawledJobPosting
   * @returns 업데이트 여부
   */
  async updateJobPosting(
    prevJobPosting: JobPosting,
    jobPosting: CrawledJobPosting,
  ) {
    const jobId = getJobIdByKeyword(jobPosting.title);

    // 변경된 공고가 IT 직군이 아닐 경우 기존 공고를 마감한다.
    if (jobId === 0) {
      await this.jobPostingService.closePosting(
        prevJobPosting.companyId,
        prevJobPosting.postingId,
      );
      return false;
    }

    await this.jobPostingService.update(prevJobPosting.id, {
      jobId,
      companyId: prevJobPosting.companyId,
      title: jobPosting.title,
      link: jobPosting.link,
      postingId: jobPosting.postingId,
      openDate: new Date(jobPosting.openDate),
      dueDate:
        jobPosting.dueDate === null ? undefined : new Date(jobPosting.dueDate),
      description: await jobPosting.getDescription(),
      employmentType: jobPosting.employmentType,
      minExperience: jobPosting.minExperience,
      maxExperience: jobPosting.maxExperience,
    });

    return true;
  }

  /**
   * 회사의 채용 공고 정보를 업데이트한다.
   *
   * @param crawler 크롤러
   */
  async updateCompanyJobPostings(crawler: Crawler) {
    const companyName = crawler.getCompanyName();
    const company = await this.companyService.find({
      name: companyName,
    });

    if (company === null) {
      throw new Error(
        `등록되지 않은 회사입니다. (${companyName}) 채용 공고 정보를 업데이트 할 수 없습니다.`,
      );
    }

    const jobPostings = await this.jobPostingService.findOpenPostings(
      company.id,
    );
    const crawledJobPostings = await crawler.getJobPostings();

    const jobPostingMap = new Map<string, JobPosting>();
    jobPostings.forEach((jobPosting) =>
      jobPostingMap.set(jobPosting.postingId, jobPosting),
    );

    let modifiedPosting = 0;
    await Promise.all(
      crawledJobPostings.map((crawledJobPosting) => {
        const jobPosting = jobPostingMap.get(crawledJobPosting.postingId);

        jobPostingMap.delete(crawledJobPosting.postingId);

        if (jobPosting) {
          // 이미 존재하는 공고인 경우 변경 여부를 확인 후 업데이트한다.
          if (hasJobPostingChanged(jobPosting, crawledJobPosting)) {
            modifiedPosting++;
            return this.updateJobPosting(jobPosting, crawledJobPosting);
          }
        } else {
          // 새로운 공고인 경우 새로 등록한다.
          return this.createJobPosting(company.id, crawledJobPosting);
        }
      }),
    );

    // 더 이상 크롤링되지 않는 기존 공고는 마감한다.
    await Promise.all(
      [...jobPostingMap].map(([postingId, jobPosting]) => {
        return this.jobPostingService.closePosting(
          jobPosting.companyId,
          postingId,
        );
      }),
    );

    if (modifiedPosting > 0) {
      Logger.log(`${company.name} 공고 수정 (${modifiedPosting}건)`);
    }
    if (jobPostingMap.size > 0) {
      Logger.log(`${company.name} 공고 마감 (${jobPostingMap.size}건)`);
    }

    // 공고 개수, 최근 공고 등록일을 업데이트한다.
    await this.companyService.update(company.id, {
      postings: await this.jobPostingService.count({ companyId: company.id }),
      lastPostedAt: await this.jobPostingService.findLatestOpenDate(company.id),
    });
  }
}
