import { EMPLOYMENT_TYPE } from '@/constats/job';

export interface JobPosting {
  title: string;
  postingId: string;
  openDate: string;
  dueDate: string | null;
  link: string;
  company: string;
  site: 'greeting' | 'ninehire';
}

export interface JobPostingDetail {
  html: string;
  textForLLM: string;
  minExperience: number;
  maxExperience: number;
  employmentType: (typeof EMPLOYMENT_TYPE)[keyof typeof EMPLOYMENT_TYPE];
}
