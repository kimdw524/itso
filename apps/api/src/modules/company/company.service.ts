import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

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

  async isExists(data: Partial<Company>): Promise<boolean> {
    return await this.companyRepo.existsBy(data);
  }

  async incrementBookmark(data: Partial<Company>): Promise<void> {
    await this.companyRepo.increment(data, 'bookmarks', 1);
  }

  async decrementBookmark(data: Partial<Company>): Promise<void> {
    await this.companyRepo.decrement(data, 'bookmarks', 1);
  }
}
