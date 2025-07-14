import { EMPLOYMENT_TYPE } from '@/constats/job';

export interface JobPosting {
  title: string;
  postingId: string;
  openDate: string;
  job: string;
  dueDate: string | null;
  link: string;
  company: string;
}

export interface JobPostingDetail {
  html: string;
  textForLLM: string;
  minExperience: number;
  maxExperience: number;
  employmentType: (typeof EMPLOYMENT_TYPE)[keyof typeof EMPLOYMENT_TYPE];
}

export interface Crawler {
  getJobPostings(company: string, url: string): Promise<JobPosting[]>;
  getJobPostingDetail(url: string): Promise<JobPostingDetail>;
  getLogoImageURL(url: string): Promise<string>;
}
