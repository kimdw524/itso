import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { PositionPresetDto } from './dto/position-preset.dto';
import { PositionPresetEntity } from './position-preset.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(PositionPresetEntity)
    private readonly positionPresetRepo: Repository<PositionPresetEntity>,
  ) {}

  async createPositionPreset(
    dto: PositionPresetDto,
  ): Promise<PositionPresetEntity> {
    const { name, ...preset } = dto;
    const entity = this.positionPresetRepo.create({
      name,
      preset,
    });
    return await this.positionPresetRepo.save(entity);
  }

  async findAllPositionPresets(): Promise<PositionPresetEntity[]> {
    return await this.positionPresetRepo.find({
      order: {
        id: 'ASC',
      },
    });
  }
}
