import type { EmploymentType, JobId } from '@/features/job-posting/models';

export interface JobPositionPreset {
  id: number;
  name: string;
  preset: {
    jobIds?: JobId[];
    maxExperience?: number;
    minExperience?: number;
    employmentTypes?: EmploymentType[];
  };
}
