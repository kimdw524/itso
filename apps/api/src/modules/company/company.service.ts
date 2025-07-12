import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { GREETING_LIST } from '@/constats/greeting';

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
    for (const company of GREETING_LIST) {
      if ((await this.find({ name: company.name })) === null) {
        await this.create({ name: company.name });
      }
    }

    return;
  }
}
