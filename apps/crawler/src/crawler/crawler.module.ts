import { Module } from '@nestjs/common';

import { CrawlerService } from './crawler.service';
import { GreetingCrawler } from './crawlers/greeting.crawler';
import { NinehireCrawler } from './crawlers/ninehire.crawler';

@Module({
  providers: [NinehireCrawler, GreetingCrawler, CrawlerService],
  exports: [CrawlerService],
})
export class CrawlerModule {}
