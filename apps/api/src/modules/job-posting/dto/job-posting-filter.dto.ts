import { Transform, Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, Max, Min } from 'class-validator';

export class JobPostingFilterDto {
  @IsOptional()
  @Type(() => Number)
  companyId?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => ([] as unknown[]).concat(value).map(Number))
  jobIds?: number[];

  @IsOptional()
  @Type(() => Number)
  minExperience?: number;

  @IsOptional()
  @Type(() => Number)
  maxExperience?: number;

  @IsOptional()
  @Type(() => Number)
  employmentType?: number;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  cursor?: number;

  @IsOptional()
  @Type(() => Number)
  @Max(20)
  @Min(1)
  limit?: number;
}
