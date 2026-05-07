import { Exclude } from 'class-transformer';

export class CompanySummaryDto {
  id: number;

  name: string;

  logo: string | null;

  bookmarks: number;

  @Exclude()
  description: string | null;

  @Exclude()
  postings: number;

  @Exclude()
  lastPostedAt: Date | null;
}
