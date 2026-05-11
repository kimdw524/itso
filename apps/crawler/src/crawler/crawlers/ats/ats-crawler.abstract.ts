import { Crawler } from '@/crawler/crawler.abstract';

export abstract class ATSCrawler<T extends { name: string }> extends Crawler {
  protected company: T;

  constructor(company: T) {
    super();

    this.company = company;
  }

  public getCompanyName(): string {
    return this.company.name;
  }
}
