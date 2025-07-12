import { JOB_ID, JOB_KEYWORD } from 'src/constats/job';

import { sanitizeText } from './parser';

/**
 * 키워드를 검색하여 Job-Id를 반환하는 함수
 * IT 직군이 아닐 경우, 0을 리턴합니다.
 */
export const getJobIdByKeyword = (body: string): number => {
  for (const job in JOB_KEYWORD) {
    for (const keyword of JOB_KEYWORD[job as keyof typeof JOB_KEYWORD]) {
      if (sanitizeText(body).includes(keyword)) {
        return JOB_ID[job as keyof typeof JOB_KEYWORD];
      }
    }
  }

  return 0;
};
