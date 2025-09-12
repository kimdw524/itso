import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere, Repository } from 'typeorm';

import { CursorPaginatedResponse } from '@/types/pagination';

import { Company } from './company.entity';
import { CompanyFilterDto } from './dto';

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
    const res = await this.companyRepo.findOneBy(data);
    if (!res) {
      throw new NotFoundException('company not found');
    }

    return await this.companyRepo.findOneBy(data);
  }

  async findAll(): Promise<Company[]> {
    return await this.companyRepo.find();
  }

  async isExists(data: FindOptionsWhere<Company>): Promise<boolean> {
    return await this.companyRepo.existsBy(data);
  }

  async incrementBookmark(data: FindOptionsWhere<Company>): Promise<void> {
    await this.companyRepo.increment(data, 'bookmarks', 1);
  }

  async decrementBookmark(data: FindOptionsWhere<Company>): Promise<void> {
    await this.companyRepo.decrement(data, 'bookmarks', 1);
  }

  async search(
    filter: CompanyFilterDto,
  ): Promise<CursorPaginatedResponse<Company>> {
    const { orderBy, limit = 20 } = filter;

    const cursor = filter.cursor?.split(',')[0],
      cursorId = Number(filter.cursor?.split(',')[1]);

    let cursorKey: keyof Company;
    const qb = this.companyRepo.createQueryBuilder('company');

    switch (orderBy) {
      case 'name':
      default:
        qb.addOrderBy('company.name', 'ASC');
        qb.andWhere('company.name > :name', {
          name: cursor ?? '',
        });
        cursorKey = 'name';

        break;
      case 'bookmarks':
      case 'lastPostedAt':
      case 'postings':
        qb.addOrderBy(`company.${orderBy}`, 'DESC');
        qb.addOrderBy('company.id', 'ASC');

        if (cursor === undefined) {
          qb.andWhere('company.id > :cursorId', {
            cursorId: isFinite(cursorId) ? cursorId : 0,
          });
        } else {
          qb.andWhere(
            `(company.${orderBy} < :cursor) OR (company.${orderBy} = :cursor AND company.id > :cursorId)`,
            {
              cursor: Number(cursor),
              cursorId: isFinite(cursorId) ? cursorId : 0,
            },
          );
        }
        cursorKey = orderBy;
        break;
    }

    qb.limit(limit + 1);

    const data = await qb.getMany();

    const hasNext = data.length > limit;
    const slicedData = data.slice(0, limit);
    const nextCursor = hasNext
      ? `${slicedData.at(-1)![cursorKey as string]},${slicedData.at(-1)!.id}`
      : null;

    return { data: slicedData, hasNext, nextCursor };
  }
}
