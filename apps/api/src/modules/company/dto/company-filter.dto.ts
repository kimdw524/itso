import { Type } from 'class-transformer';
import { IsIn, IsOptional, Max, Min } from 'class-validator';

export class CompanyFilterDto {
  @IsOptional()
  cursor?: number | string;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  cursorId?: number;

  @IsOptional()
  @Type(() => Number)
  @Max(20)
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsIn(['name', 'bookmarks'])
  orderBy?: 'name' | 'bookmarks';
}
