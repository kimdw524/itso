import { Injectable } from '@nestjs/common';

import { Crawler } from './crawler.abstract';
import { JobPosting } from './crawler.interface';
import { GreetingCrawler } from './crawlers/ats/greeting/greeting.crawler';
import { NinehireCrawler } from './crawlers/ats/ninrehire/ninehire.crawler';

@Injectable()
export class CrawlerService {
  private crawlers: Crawler[] = [];

  constructor() {
    this.initCrawlers();
  }

  async getJobPostingDetail(post: JobPosting): Promise<string> {
    return await post.getDescription();
  }

  private initCrawlers() {
    const crawlers: Crawler[] = [];

    crawlers.push(...GreetingCrawler.createAllCrawlers());
    crawlers.push(...NinehireCrawler.createAllCrawlers());

    this.crawlers = crawlers;
  }
}
