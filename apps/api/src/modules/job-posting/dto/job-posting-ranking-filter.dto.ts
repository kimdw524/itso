import { Transform } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';

export class JobPostingRankingFilterDto {
  @IsOptional()
  @Transform(({ value }) => ([] as unknown[]).concat(value))
  @IsArray()
  jobIds?: number[];
}
