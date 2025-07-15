import type { CompanySummary } from '@/domains/company/types/company';

import type { JOB_POSTING } from '../constants/job-posting';

export type EmploymentType = keyof typeof JOB_POSTING.EMPLOYMENT_TYPE;

export type JobId = keyof typeof JOB_POSTING.JOB_NAME;

export interface JobPostingSummary {
  id: number;
  title: string;
  openDate: string;
  dueDate: string | null;
  jobId: JobId;
  views: number;
  minExperience: number;
  maxExperience: number;
  employmentType: EmploymentType;
  company: CompanySummary;
}
