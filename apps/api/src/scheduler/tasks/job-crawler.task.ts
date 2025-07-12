import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { JobPosting } from 'src/crawler/crawler.interface';
import { CrawlerService } from 'src/crawler/crawler.service';
import { Company } from 'src/modules/company/company.entity';
import { CompanyService } from 'src/modules/company/company.service';
import { JobPostingService } from 'src/modules/job-posting/job-posting.service';
import { getJobIdByKeyword } from 'src/utils/job';

@Injectable()
export class JobCrawlerTask {
  private readonly logger = new Logger(JobCrawlerTask.name);

  constructor(
    private readonly crawlerService: CrawlerService,
    private readonly jobPostingService: JobPostingService,
    private readonly companyService: CompanyService,
  ) {}

  onModuleInit() {
    void this.handleCron();
  }

  @Cron('0 2,14,20 * * 1-5')
  async handleCron() {
    await this.companyService.syncCompany();

    const jobPostings: JobPosting[] =
      await this.crawlerService.getAllJobPostings();

    const companies: Record<string, Company> = (
      await this.companyService.findAll()
    ).reduce((prev, current) => ({ ...prev, [current.name]: current }), {});

    for (const post of jobPostings) {
      // company가 존재하지 않으면 등록하지 않는다.
      if (!companies[post.company]) {
        return;
      }

      const companyId = companies[post.company].id;

      void (async () => {
        const isExists = await this.jobPostingService.isExists({
          companyId,
          postingId: post.postingId,
        });

        if (isExists) {
          return;
        }

        const jobId = getJobIdByKeyword(post.title);

        // IT 직군이 아닐 경우 등록하지 않는다.
        if (jobId === 0) {
          return;
        }

        const detail = await this.crawlerService.getJobPostingDetail(post.link);

        await this.jobPostingService.create({
          jobId,
          companyId,
          title: post.title,
          link: post.link,
          postingId: post.postingId,
          openDate: new Date(post.openDate),
          dueDate: post.dueDate === null ? undefined : new Date(post.dueDate),
          description: detail.html,
          employmentType: detail.employmentType,
          minExperience: detail.minExperience ?? undefined,
          maxExperience: detail.maxExperience ?? undefined,
        });
      })();
    }
  }
}
