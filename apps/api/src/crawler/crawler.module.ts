import { Module } from '@nestjs/common';

import { CrawlerService } from './crawler.service';
import { GreetingCrawler } from './crawlers/greeting.crawler';

@Module({
  providers: [GreetingCrawler, CrawlerService],
  exports: [CrawlerService],
})
export class CrawlerModule {}
