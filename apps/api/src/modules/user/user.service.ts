import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(data: Partial<User>): Promise<User> {
    const entity = this.userRepo.create(data);
    return await this.userRepo.save(entity);
  }

  async find(data: Partial<User>): Promise<User | null> {
    return await this.userRepo.findOneBy(data);
  }

  async updateLastSignedInDate(userId: number): Promise<void> {
    await this.userRepo.update(userId, {
      lastSignedInAt: new Date(),
    });
  }
}
