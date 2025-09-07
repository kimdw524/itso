import { JOB_POSTING } from '../constants/job-posting';
import type { EmploymentType } from '../models';

export const formatEmploymentType = (
  employmentType: EmploymentType,
): string => {
  return JOB_POSTING.EMPLOYMENT_TYPE[employmentType];
};
