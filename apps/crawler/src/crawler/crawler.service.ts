import { Injectable, Logger } from '@nestjs/common';

import { GREETING_LIST } from 'src/constats/greeting';

import { NINEHIRE_LIST } from '@/constats/ninehire';

import { JobPosting, JobPostingDetail } from './crawler.interface';
import { GreetingCrawler } from './crawlers/greeting.crawler';
import { NinehireCrawler } from './crawlers/ninehire.crawler';

@Injectable()
export class CrawlerService {
  constructor(
    private readonly greetingCrawler: GreetingCrawler,
    private readonly ninehireCrawler: NinehireCrawler,
  ) {}

  private async getJobPostings(): Promise<JobPosting[]> {
    const result: JobPosting[] = [];

    // 그리팅 공고 조회
    await Promise.all(
      GREETING_LIST.map(async (company) => {
        try {
          result.push(
            ...(await this.greetingCrawler.getJobPostings(
              company.name,
              company.url,
            )),
          );
        } catch (error) {
          Logger.error(`${company.name} 공고 조회 실패`, error);
        }
      }),
    );

    // 나인하이어 공고 조회
    await Promise.all(
      NINEHIRE_LIST.map(async (company) => {
        try {
          result.push(
            ...(await this.ninehireCrawler.getJobPostings(
              company.name,
              company.companyId,
              company.url,
            )),
          );
        } catch (error) {
          Logger.error(`${company.name} 공고 조회 실패`, error);
        }
      }),
    );

    return result;
  }

  async getAllJobPostings(): Promise<JobPosting[]> {
    return await this.getJobPostings();
  }

  async getJobPostingDetail(post: JobPosting): Promise<JobPostingDetail> {
    switch (post.site) {
      case 'greeting':
        return await this.greetingCrawler.getJobPostingDetail(post.link);
      case 'ninehire':
        return await this.ninehireCrawler.getJobPostingDetail(post.link);
    }
  }
}
