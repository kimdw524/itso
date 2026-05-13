import { Injectable } from '@nestjs/common';

import { Crawler } from './crawler.abstract';
import { GreetingCrawler } from './crawlers/ats/greeting/greeting.crawler';
import { NinehireCrawler } from './crawlers/ats/ninrehire/ninehire.crawler';

@Injectable()
export class CrawlerService {
  private crawlers: Crawler[] = [];

  constructor() {
    this.initCrawlers();
  }

  /**
   * 등록된 모든 크롤러를 조회합니다.
   *
   * @returns 등록된 모든 크롤러
   */
  getCrawlers(): Crawler[] {
    return this.crawlers;
  }

  private initCrawlers() {
    const crawlers: Crawler[] = [];

    crawlers.push(...GreetingCrawler.createAllCrawlers());
    crawlers.push(...NinehireCrawler.createAllCrawlers());

    this.crawlers = crawlers;
  }
}
