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
}

export interface Crawler {
  getJobPostings(company: string, url: string): Promise<JobPosting[]>;
  getJobPostingDetail(url: string): Promise<JobPostingDetail>;
}
