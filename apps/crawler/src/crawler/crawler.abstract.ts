import { JobPosting } from './crawler.interface';

export abstract class Crawler {
  /**
   * 채용 공고 목록을 조회합니다.
   *
   * @returns 채용 공고 목록
   */
  abstract getJobPostings(): Promise<JobPosting[]>;

  /**
   * 채용 공고 본문 내용을 조회합니다.
   *
   * @param url 채용 공고 상세 페이지 URL
   * @returns 채용 공고 본문 내용
   */
  abstract getJobPostingDescription(url: string): Promise<string>;

  /**
   * Company 로고 이미지의 URL을 가져옵니다.
   *
   * @returns 로고 URL
   */
  abstract getLogoUrl(): Promise<string>;

  /**
   * Company 이름을 가져옵니다.
   *
   * @returns Company 이름
   */
  abstract getCompanyName(): string;
}
