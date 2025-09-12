export interface CompanySummary {
  id: number;
  name: string;
  logo: string;
}

export interface Company {
  id: number;
  name: string;
  logo: string | null;
  description: string | null;
  bookmarks: number;
  postings: number;
  lastPostedAt: string | null;
}

export interface CompanyFilter {
  orderBy?: 'name' | 'bookmarks' | 'lastPostedAt' | 'postings';
}
