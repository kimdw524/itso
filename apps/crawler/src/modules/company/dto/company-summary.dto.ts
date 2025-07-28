import { Exclude } from 'class-transformer';

export class CompanySummaryDto {
  id: number;
  name: string;
  logo: string;

  @Exclude()
  description: string;
}
