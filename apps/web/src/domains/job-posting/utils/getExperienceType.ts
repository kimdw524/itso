import type { ExperienceType } from '../types/job-posting';

/**
 * 요구 경력이 주어지면 ExperienceType을 반환한다.
 */
export const getExperienceType = (min: number, max: number): ExperienceType => {
  if (min === 0 && max === 99) {
    return 'NO-MATTER';
  }

  if (min === 0 && max === 0) {
    return 'ENTRY';
  }

  return 'EXPERIENCED';
};
