export interface CrawledJobPosting {
  title: string;
  postingId: string;
  openDate: string;
  dueDate: string | null;
  link: string;
  company: string;
  /** 신입: 0-0, 경력 무관: 0-99 */
  minExperience: number;
  maxExperience: number;
  employmentType: EmploymentType;
  getDescription: () => Promise<string>;
}

export enum EmploymentType {
  FULL_TIME = 1,
  CONTRACT = 2,
  INTERN = 3,
  MILITARY_ALTERNATIVE = 4,
  FREE_LANCER = 5,
}
