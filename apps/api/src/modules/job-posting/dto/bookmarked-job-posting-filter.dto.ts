import { Type } from 'class-transformer';
import { IsOptional, Max, Min } from 'class-validator';

export class BookmarkedJobPostingFilterDto {
  @IsOptional()
  @Type(() => String)
  cursor?: string;

  @IsOptional()
  @Type(() => Number)
  @Max(20)
  @Min(1)
  limit?: number;
}
