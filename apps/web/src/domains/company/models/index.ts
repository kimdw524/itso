export interface CompanySummary {
  id: number;
  name: string;
  logo: string;
}

export interface Company {
  id: number;
  name: string;
  logo: string;
  description: string | null;
}
