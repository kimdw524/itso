import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { LastUpdateInfo } from './last-update-info.entity';

@Injectable()
export class LastUpdateService {
  constructor(
    @InjectRepository(LastUpdateInfo)
    private readonly lastUpdateInfoRepo: Repository<LastUpdateInfo>,
  ) {}

  async updateNow(key: string): Promise<void> {
    await this.lastUpdateInfoRepo.upsert(
      {
        key,
        updatedAt: new Date(),
      },
      ['key'],
    );
  }
}
