import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';

import { CursorPaginatedResponse } from '@/types/pagination';

import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { CompanyFilterDto } from './dto/company-filter.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async search(
    @Query() filter: CompanyFilterDto,
  ): Promise<CursorPaginatedResponse<Company>> {
    return await this.companyService.search(filter);
  }

  @Get(':id')
  async getCompany(@Param('id', ParseIntPipe) id: number) {
    return await this.companyService.find({ id });
  }
}
