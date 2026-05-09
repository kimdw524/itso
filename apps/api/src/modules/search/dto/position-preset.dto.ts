import { Transform, Type } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';

export class PositionPresetDto {
  name!: string;

  @IsOptional()
  @Transform(({ value }) => ([] as unknown[]).concat(value))
  @IsArray()
  jobIds?: number[];

  @IsOptional()
  @Type(() => Number)
  minExperience?: number;

  @IsOptional()
  @Type(() => Number)
  maxExperience?: number;

  @IsOptional()
  @Transform(({ value }) => ([] as unknown[]).concat(value))
  @IsArray()
  employmentTypes?: number[];
}
