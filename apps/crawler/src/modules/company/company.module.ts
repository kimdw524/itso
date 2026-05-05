import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { R2Module } from '../r2/r2.module';
import { Company } from './company.entity';
import { CompanyService } from './company.service';

@Module({
  imports: [R2Module, TypeOrmModule.forFeature([Company])],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
