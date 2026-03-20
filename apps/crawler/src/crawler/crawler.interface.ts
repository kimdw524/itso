export interface JobPosting {
  title: string;
  postingId: string;
  openDate: string;
  dueDate: string | null;
  link: string;
  company: string;
  site: 'greeting' | 'ninehire';
  minExperience: number;
  maxExperience: number;
  employmentType: EmploymentType;
}

export interface JobPostingDetail {
  html: string;
  textForLLM: string;
}

export enum EmploymentType {
  FULL_TIME = 1,
  CONTRACT = 2,
  INTERN = 3,
  MILITARY_ALTERNATIVE = 4,
  FREE_LANCER = 5,
}
