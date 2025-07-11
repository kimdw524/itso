import { Injectable } from '@nestjs/common';

import { GREETING_LIST } from 'src/constats/greeting';

import { JobPosting } from './crawler.interface';
import { GreetingCrawler } from './crawlers/greeting.crawler';

@Injectable()
export class CrawlerService {
  constructor(private readonly greetingCrawler: GreetingCrawler) {}

  private async getGreetingJobPostings(): Promise<JobPosting[]> {
    const result: JobPosting[] = [];

    await Promise.all(
      GREETING_LIST.map(async (company) =>
        result.push(
          ...(await this.greetingCrawler.getJobPostings(company.url)),
        ),
      ),
    );

    return result;
  }

  async getAllJobPostings(): Promise<JobPosting[]> {
    const result: JobPosting[] = [];

    result.push(...(await this.getGreetingJobPostings()));

    return result;
  }
}
