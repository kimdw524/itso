import { Exclude } from 'class-transformer';

export class CompanySummaryDto {
  id: number;
  name: string;
  logo: string;
  bookmarks: number;

  @Exclude()
  description: string;
}
