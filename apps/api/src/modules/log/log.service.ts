import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';

import { Log } from './log.entity';

@Injectable()
export class LogService {
  private readonly LIMIT = 30;

  private readonly INTERVAL = 1000 * 60;

  constructor(
    @InjectRepository(Log)
    private readonly logRepo: Repository<Log>,

    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async createLog(type: string, target: string, userId?: number, ip?: string) {
    const cacheKey = `${ip}`;
    const count = Number(await this.cacheManager.get<number>(cacheKey)) || 0;

    if (count > this.LIMIT) {
      return;
    }

    await this.cacheManager.set(cacheKey, count + 1, this.INTERVAL);
    await this.logRepo.insert({ ip, type, target, userId });
  }
}
