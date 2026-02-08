import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere, Repository, UpdateResult } from 'typeorm';

import { GREETING_LIST } from '@/constats/greeting';
import { NINEHIRE_LIST } from '@/constats/ninehire';
import { GreetingCrawler } from '@/crawler/crawlers/greeting.crawler';
import { FileUtil } from '@/utils';

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

  async find(data: FindOptionsWhere<Company>): Promise<Company | null> {
    return await this.companyRepo.findOneBy(data);
  }

  async findAll(): Promise<Company[]> {
    return await this.companyRepo.find();
  }

  async update(
    companyId: number,
    params: { lastPostedAt: Date | null; postings: number },
  ): Promise<UpdateResult> {
    const result = await this.companyRepo.update({ id: companyId }, params);
    return result;
  }

  async syncCompany(): Promise<void> {
    const greetingCrawler = new GreetingCrawler();
    const ninehireCrawler = new NinehireCrawler();

    await Promise.all([
      ...GREETING_LIST.map(async (company) => {
        const companyEntity = await this.find({ name: company.name });
        if (companyEntity === null) {
          try {
            const image = await greetingCrawler.getLogoImageURL(company.url);
            let logo = '';

            if (image) {
              const url = new URL(image, company.url).href;
              logo = await FileUtil.storeStaticImage(url);
            }

            await this.create({
              name: company.name,
              logo,
            });
          } catch (error) {
            Logger.error(
              `${company.name} 회사를 DB에 등록하지 못했습니다.`,
              error,
            );
          }
        }
      }),

      ...NINEHIRE_LIST.map(async (company) => {
        const companyEntity = await this.find({ name: company.name });
        if (companyEntity === null) {
          try {
            const image = await ninehireCrawler.getLogoImageURL(company.url);
            let logo = '';

            if (image) {
              const url = new URL(image, company.url).href;
              logo = await FileUtil.storeStaticImage(url);
            }

            await this.create({
              name: company.name,
              logo,
            });
          } catch (error) {
            Logger.error(
              `${company.name} 회사를 DB에 등록하지 못했습니다.`,
              error,
            );
          }
        }
      }),
    ]);

    return;
  }
}
