import { JOB_ID, JOB_KEYWORD, JOB_KEYWORD_EXACT } from 'src/constats/job';

import { JobPosting } from '@/modules/job-posting/job-posting.entity';

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

    for (const keyword of JOB_KEYWORD_EXACT[
      job as keyof typeof JOB_KEYWORD_EXACT
    ]) {
      if (body.includes(keyword)) {
        return JOB_ID[job as keyof typeof JOB_KEYWORD];
      }
    }
  }

  return 0;
};

/**
 * JobPosting[] 을 Record<CompanyId, Record<PostingId, JobPosting>> 형태로 매핑하는 함수
 */
export const mapJobPosting = (
  jobPostings: JobPosting[],
): Record<number, Record<string, JobPosting>> => {
  const result: Record<number, Record<string, JobPosting>> = {};
  jobPostings.forEach((jobPosting) => {
    if (!Object.hasOwn(result, jobPosting.companyId)) {
      result[jobPosting.companyId] = {};
    }
    result[jobPosting.companyId][jobPosting.postingId] = jobPosting;
  });

  return result;
};
