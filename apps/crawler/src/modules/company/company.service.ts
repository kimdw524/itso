import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as path from 'path';
import { FindOptionsWhere, Repository, UpdateResult } from 'typeorm';

import { GREETING_LIST } from '@/constats/greeting';
import { NINEHIRE_LIST } from '@/constats/ninehire';
import { GreetingCrawler } from '@/crawler/crawlers/greeting.crawler';
import { FileUtil } from '@/utils';
import { removeFile } from '@/utils/file';

import { R2Service } from '../r2/r2.service';
import { NinehireCrawler } from './../../crawler/crawlers/ninehire.crawler';
import { Company } from './company.entity';

@Injectable()
export class CompanyService {
  /**
   * 회사 저장소와 R2 업로드 서비스를 주입합니다.
   *
   * @param companyRepo 회사 엔티티 저장소
   * @param r2Service 로고 이미지를 업로드할 R2 서비스
   */
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
    private readonly r2Service: R2Service,
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

  /**
   * 채용 플랫폼의 회사 정보를 동기화하고 로컬에 저장한 로고 이미지를 R2에 업로드합니다.
   */
  async syncAllCompany(): Promise<void> {
    const greetingCrawler = new GreetingCrawler();
    const ninehireCrawler = new NinehireCrawler();

    await Promise.all([
      ...GREETING_LIST.map((company) =>
        this.syncCompany(company, greetingCrawler),
      ),

      ...NINEHIRE_LIST.map((company) =>
        this.syncCompany(company, ninehireCrawler),
      ),
    ]);

    return;
  }

  /**
   * 회사가 DB에 없으면 로고 이미지를 업로드한 뒤 회사 정보를 등록합니다.
   *
   * @param company 동기화할 회사 정보
   * @param crawler 회사 로고 이미지 URL을 가져올 크롤러
   */
  async syncCompany(
    company: { name: string; url: string },
    crawler: { getLogoImageURL: (url: string) => Promise<string> },
  ): Promise<void> {
    const companyEntity = await this.find({ name: company.name });
    if (companyEntity !== null) {
      return;
    }

    try {
      const image = await crawler.getLogoImageURL(company.url);
      let logo = '';

      if (image) {
        const url = new URL(image, company.url).href;
        logo = await this.uploadLogoImage(url);
      }

      await this.create({
        name: company.name,
        logo,
      });
    } catch (error) {
      Logger.error(`${company.name} 회사를 DB에 등록하지 못했습니다.`, error);
    }
  }

  /**
   * 원격 로고 이미지를 로컬에 저장한 뒤 R2에 업로드하고 공개 URL을 반환합니다.
   *
   * @param url 다운로드할 원격 로고 이미지 URL
   * @returns R2에 업로드된 로고 이미지 공개 URL
   */
  private async uploadLogoImage(url: string): Promise<string> {
    const fileName = await FileUtil.storeStaticImage(url);
    const filePath = path.resolve(process.env.STATIC_DIR ?? 'static', fileName);
    await FileUtil.resizeImage(filePath, 360, 240);

    const result = await this.r2Service.uploadLocalImage(filePath, {
      key: `company/logo/${fileName}`,
    });

    await removeFile(filePath);

    return result.url ?? '';
  }
}
