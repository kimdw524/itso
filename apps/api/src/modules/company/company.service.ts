import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CursorPaginatedResponse } from '@/types/pagination';

import { Company } from './company.entity';
import { CompanyFilterDto } from './dto/company-filter.dto';

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
    const res = await this.companyRepo.findOneBy(data);
    if (!res) {
      throw new NotFoundException('company not found');
    }

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

  async search(
    filter: CompanyFilterDto,
  ): Promise<CursorPaginatedResponse<Company>> {
    const limit = filter.limit ?? 20;
    let cursorKey: keyof Company;
    const qb = this.companyRepo.createQueryBuilder('company');

    switch (filter.orderBy) {
      case 'name':
      default:
        qb.addOrderBy('company.name', 'ASC');
        qb.andWhere('company.name > :name', {
          name: filter.cursor ?? '',
        });
        cursorKey = 'name';

        break;
      case 'bookmarks':
        qb.addOrderBy('company.bookmarks', 'DESC');
        qb.addOrderBy('company.id', 'ASC');

        if (filter.cursor === undefined) {
          qb.andWhere('company.id > :cursorId', {
            cursorId: filter.cursorId ?? 0,
          });
        } else {
          qb.andWhere(
            '(company.bookmarks < :cursor) OR (company.bookmarks = :cursor AND company.id > :cursorId)',
            { cursor: filter.cursor, cursorId: filter.cursorId ?? 0 },
          );
        }
        cursorKey = 'bookmarks';
        break;
    }

    qb.limit(limit + 1);

    const data = await qb.getMany();

    const hasNext = data.length > limit;
    const slicedData = data.slice(0, limit);
    const nextCursor = hasNext ? slicedData.at(-1)![cursorKey] : null;
    const nextCursorId = hasNext ? slicedData.at(-1)!.id : null;

    return { data: slicedData, hasNext, nextCursor, nextCursorId };
  }
}
