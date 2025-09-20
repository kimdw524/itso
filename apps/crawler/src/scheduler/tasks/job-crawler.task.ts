import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { JobPosting } from 'src/crawler/crawler.interface';
import { CrawlerService } from 'src/crawler/crawler.service';
import { Company } from 'src/modules/company/company.entity';
import { CompanyService } from 'src/modules/company/company.service';
import { JobPostingService } from 'src/modules/job-posting/job-posting.service';
import { getJobIdByKeyword, mapJobPosting } from 'src/utils/job';
import { IsNull } from 'typeorm';

@Injectable()
export class JobCrawlerTask {
  private readonly logger = new Logger(JobCrawlerTask.name);

  constructor(
    private readonly crawlerService: CrawlerService,
    private readonly jobPostingService: JobPostingService,
    private readonly companyService: CompanyService,
  ) {}

  async onModuleInit() {
    await this.companyService.syncCompany();
    void this.handleCron();
  }

  @Cron('0 2,14,20 * * 1-5')
  async handleCron() {
    await this.updateJobPosting();
  }

  private async closePostings(
    previousJobPostings: ReturnType<typeof mapJobPosting>,
  ): Promise<Set<number>> {
    const set = new Set<number>();
    let count = 0;
    for (const company of Object.values(previousJobPostings)) {
      for (const posting of Object.values(company)) {
        count++;
        set.add(posting.companyId);
        await this.jobPostingService.closePostings(
          posting.companyId,
          posting.postingId,
        );
      }
    }

    if (count > 0) {
      this.logger.log(`${count}개의 공고를 마감하였습니다.`);
    }

    return set;
  }

  private async createPosting(
    companyId: number,
    post: JobPosting,
    previousJobPostings: ReturnType<typeof mapJobPosting>,
  ): Promise<boolean> {
    try {
      const isExists = Object.hasOwn(
        previousJobPostings[companyId] ?? {},
        post.postingId,
      );

      // 이미 공고가 DB에 존재하는 경우
      if (isExists) {
        const previous = previousJobPostings[companyId][post.postingId];

        const serializedPrevious = `${previous.title}-${previous.dueDate?.toISOString?.() ?? 'null'}`;
        const serializedCurrent = `${post.title}-${post.dueDate ? new Date(post.dueDate).toISOString() : 'null'}`;

        // 공고의 제목과 마감일이 바뀌지 않았으면 업데이트 하지 않는다.
        if (serializedCurrent === serializedPrevious) {
          delete previousJobPostings[companyId]?.[post.postingId];
          return false;
        }

        // 바뀌었으면 업데이트 한다.
        const jobId = getJobIdByKeyword(post.title);
        const detail = await this.crawlerService.getJobPostingDetail(post);
        await this.jobPostingService.update(previous.id, {
          jobId,
          companyId,
          title: post.title,
          link: post.link,
          postingId: post.postingId,
          openDate: new Date(post.openDate),
          dueDate: post.dueDate === null ? undefined : new Date(post.dueDate),
          description: detail.html,
          employmentType: detail.employmentType,
          minExperience: detail.minExperience,
          maxExperience: detail.maxExperience,
        });

        Logger.log(
          `${previous.id}번 공고가 변경되었습니다. (${serializedPrevious} -> ${serializedCurrent})`,
        );
        return false;
      }

      const jobId = getJobIdByKeyword(post.title);

      // IT 직군이 아닐 경우 등록하지 않는다.
      if (jobId === 0) {
        return false;
      }

      const detail = await this.crawlerService.getJobPostingDetail(post);

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
        minExperience: detail.minExperience,
        maxExperience: detail.maxExperience,
      });
      return true;
    } catch (error) {
      Logger.error(
        `${post.company} 회사 공고를 추가하지 못했습니다. (${post.link})`,
        error,
      );
      return false;
    }
  }

  private async updateCompany(id: number) {
    const postings = await this.jobPostingService.count({
      companyId: id,
      closeDate: IsNull(),
    });
    const date = await this.jobPostingService.getLastPosted(id);
    await this.companyService.update(id, {
      postings,
      lastPostedAt: date,
    });
  }

  private async updateCompanies(companies: number[]) {
    for (const company of companies) {
      await this.updateCompany(company);
    }
  }

  private async updateJobPosting() {
    const set = new Set<number>();
    const jobPostings: JobPosting[] =
      await this.crawlerService.getAllJobPostings();

    const companies: Record<string, Company> = (
      await this.companyService.findAll()
    ).reduce((prev, current) => ({ ...prev, [current.name]: current }), {});

    const previousJobPostings = mapJobPosting(
      await this.jobPostingService.getAllOpenPostings(),
    );

    const postPromises: Promise<void>[] = [];

    for (const post of jobPostings) {
      // company가 존재하지 않으면 등록하지 않는다.
      if (!companies[post.company]) {
        continue;
      }

      const companyId = companies[post.company].id;

      postPromises.push(
        (async () => {
          const result = await this.createPosting(
            companyId,
            post,
            previousJobPostings,
          );

          if (result) {
            set.add(companyId);
          }
        })(),
      );
    }

    await Promise.all(postPromises);

    const closedSet = await this.closePostings(previousJobPostings);

    await this.updateCompanies([...new Set([...set, ...closedSet])]);
  }
}
