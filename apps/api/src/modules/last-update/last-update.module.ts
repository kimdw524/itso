import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LastUpdateInfo } from './last-update-info.entity';
import { LastUpdateService } from './last-update.service';

@Module({
  imports: [TypeOrmModule.forFeature([LastUpdateInfo])],
  providers: [LastUpdateService],
  exports: [LastUpdateService],
})
export class LastUpdateModule {}
