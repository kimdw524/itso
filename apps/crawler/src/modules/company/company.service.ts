import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere, Repository, UpdateResult } from 'typeorm';

import { FileUtil } from '@/utils';
import { removeFile } from '@/utils/file';

import { R2Service } from '../r2/r2.service';
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
    params: Partial<Company>,
  ): Promise<UpdateResult> {
    const result = await this.companyRepo.update({ id: companyId }, params);
    return result;
  }

  /**
   * 로고 이미지를 R2에 업로드하고 이미지 URL을 반환합니다.
   *
   * @param url 로고 이미지 URL
   * @returns R2에 업로드된 로고 이미지 URL
   */
  async uploadLogoImage(url: string): Promise<string> {
    if (url === '') {
      return '';
    }

    const file = await FileUtil.storeStaticImage(url);

    await FileUtil.resizeImage(file.path, 360, 240);

    const result = await this.r2Service.uploadLocalImage(file.path, {
      key: `company/logo/${file.name}`,
    });

    await removeFile(file.path);

    return result.url ?? '';
  }
}
