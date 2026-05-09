import { IsIn, MaxLength } from 'class-validator';

export class CreateLogDto {
  @IsIn(['apply', 'share'])
  type!: 'apply' | 'share';

  @MaxLength(32)
  target!: string;
}
