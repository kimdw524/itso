import { Controller, Get } from '@nestjs/common';

import { Company } from '../company/company.entity';
import { CompanyService } from '../company/company.service';
import { PositionPresetEntity } from './position-preset.entity';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly searchService: SearchService,
  ) {}

  @Get('company')
  async getCompanyList(): Promise<Company[]> {
    return await this.companyService.findAll();
  }

  @Get('position-preset')
  async getPositionPresetList(): Promise<PositionPresetEntity[]> {
    return await this.searchService.findAllPositionPresets();
  }
}
