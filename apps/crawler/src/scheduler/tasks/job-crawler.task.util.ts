import { CrawledJobPosting } from '@/crawler/crawler.interface';
import { JobPosting } from '@/modules/job-posting/job-posting.entity';

/**
 * 저장된 기존 채용 공고와 크롤러가 수집한 채용 공고의 변경 여부를 확인합니다.
 *
 * @param jobPosting 기존에 저장된 채용 공고
 * @param crawledJobPosting 새로 수집한 채용 공고
 * @returns 채용 공고가 달라졌으면 true
 */
export const hasJobPostingChanged = (
  jobPosting: JobPosting,
  crawledJobPosting: CrawledJobPosting,
) => {
  return (
    jobPosting.minExperience !== crawledJobPosting.minExperience ||
    jobPosting.maxExperience !== crawledJobPosting.maxExperience ||
    jobPosting.employmentType !== Number(crawledJobPosting.employmentType) ||
    jobPosting.title !== crawledJobPosting.title ||
    (jobPosting.dueDate === null
      ? null
      : new Date(jobPosting.dueDate).toISOString()) !==
      (crawledJobPosting.dueDate === null
        ? null
        : new Date(crawledJobPosting.dueDate).toISOString())
  );
};
