import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { GREETING_LIST } from '@/constats/greeting';
import { NINEHIRE_LIST } from '@/constats/ninehire';
import { GreetingCrawler } from '@/crawler/crawlers/greeting.crawler';

import { NinehireCrawler } from './../../crawler/crawlers/ninehire.crawler';
import { Company } from './company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {}

  async create(data: Partial<Company>): Promise<Company> {
    const entity = this.companyRepo.create(data);
    return await this.companyRepo.save(entity);
  }

  async find(data: Partial<Company>): Promise<Company | null> {
    return await this.companyRepo.findOneBy(data);
  }

  async findAll(): Promise<Company[]> {
    return await this.companyRepo.find();
  }

  async syncCompany(): Promise<void> {
    const greetingCrawler = new GreetingCrawler();
    const ninehireCrawler = new NinehireCrawler();

    for (const company of GREETING_LIST) {
      if ((await this.find({ name: company.name })) === null) {
        await this.create({
          name: company.name,
          logo: await greetingCrawler.getLogoImageURL(company.url),
        });
      }
    }

    for (const company of NINEHIRE_LIST) {
      if ((await this.find({ name: company.name })) === null) {
        try {
          await this.create({
            name: company.name,
            logo: await ninehireCrawler.getLogoImageURL(company.url),
          });
        } catch (error) {
          Logger.error(
            `${company.name} 회사를 DB에 등록하지 못했습니다.`,
            error,
          );
        }
      }
    }

    return;
  }
}
