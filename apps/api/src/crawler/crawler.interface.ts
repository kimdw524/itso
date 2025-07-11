export interface JobPosting {
  title: string;
  postingId: string;
  openDate: string;
  job: string;
  dueDate: string | null;
  link: string;
}

export interface JobPostingDetail {
  html: string;
  textForLLM: string;
}

export interface Crawler {
  getJobPostings(url: string): Promise<JobPosting[]>;
  getJobPostingDetail(url: string): Promise<JobPostingDetail>;
}
