import { Crawler } from '@/crawler/crawler.abstract';
import { EmploymentType, JobPosting } from '@/crawler/crawler.interface';
import { removeHTMLAttributes } from '@/utils/parser';

import { ATSCrawler } from '../ats-crawler.abstract';
import { NINEHIRE_LIST } from './ninehire.constants';

const headers = {
  accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
  'accept-language': 'ko-KR,ko;q=0.9',
};

interface NinehirePosting {
  companyId: string;
  addressKey: string;
  recruitmentId: string;
  title: string;
  deadlineValue: string | null;
  deadlineType: 'open_ended' | 'until_filled';
  employmentType: ['full_time' | 'contractor' | 'intern' | 'freelancer'];
  career: {
    type: 'experienced' | 'newcomer' | 'irrelevant';
    range: {
      over: number;
      below: number;
    } | null;
  };
  createdAt: string;
}

interface NinehirePostingsResponse {
  count: number;
  results: NinehirePosting[];
}

interface NinehireJobPosting {
  props: {
    pageProps: {
      recruitment: NinehirePosting;
      jobPosting: {
        content: string;
      };
    };
  };
}

export class NinehireCrawler extends ATSCrawler<{
  name: string;
  url: string;
  companyId: string;
}> {
  /**
   * Ninehire ATS를 사용하는 모든 회사 이름을 조회합니다.
   *
   * @returns 회사 이름 목록
   */
  static getAllCompanyNames(): string[] {
    return NINEHIRE_LIST.map((company) => company.name);
  }

  /**
   * Ninehire ATS 회사 목록을 기반으로 크롤러 인스턴스를 생성합니다.
   *
   * @returns Ninehire ATS 회사별 크롤러 목록
   */
  static createAllCrawlers(): Crawler[] {
    const crawlers: Crawler[] = NINEHIRE_LIST.map(
      ({ name, companyId, url }) => {
        return new NinehireCrawler({ name, companyId, url });
      },
    );

    return crawlers;
  }

  private static getExperience(
    over: number,
    below: number,
    careerType?: NinehirePosting['career']['type'],
  ): { minExperience: number; maxExperience: number } {
    let minExperience = 0,
      maxExperience = 0;

    if (careerType === null) {
      minExperience = 0;
    } else if (careerType === 'experienced') {
      minExperience = over;
    } else {
      minExperience = 0;
    }

    if (careerType === null) {
      maxExperience = 99;
    } else if (careerType === 'irrelevant') {
      maxExperience = 99;
    } else if (careerType === 'newcomer') {
      maxExperience = 0;
    } else {
      maxExperience = below || 99;
    }

    if (minExperience > 0 && minExperience === maxExperience) {
      maxExperience = 99;
    }

    return { minExperience, maxExperience };
  }

  private static getEmploymentType(type?: [string]): EmploymentType {
    const employmentType = {
      full_time: EmploymentType.FULL_TIME,
      contractor: EmploymentType.CONTRACT,
      freelancer: EmploymentType.FREE_LANCER,
      intern: EmploymentType.INTERN,
    } satisfies Record<string, EmploymentType>;

    if (type === undefined) {
      return EmploymentType.FULL_TIME;
    }

    if (Object.hasOwn(employmentType, type[0])) {
      return employmentType[type[0] as keyof typeof employmentType];
    }

    return EmploymentType.CONTRACT;
  }

  async getJobPostingDescription(url: string): Promise<string> {
    const result = await fetch(url, {
      headers,
      method: 'GET',
    });
    const text = await result.text();
    const json = JSON.parse(
      text
        .split('<script id="__NEXT_DATA__" type="application/json">')[1]
        .split('</script>')[0],
    ) as NinehireJobPosting;

    const body = json.props.pageProps.jobPosting.content;
    return removeHTMLAttributes(body);
  }

  async getLogoUrl(): Promise<string> {
    try {
      const result = await fetch(`${this.company.url}/job_posting`, {
        headers,
        method: 'GET',
      });
      const text = await result.text();

      return text.split('"image":{"fileUrl":"')[1].split('"')[0];
    } catch {
      return '';
    }
  }

  async getJobPostings(): Promise<JobPosting[]> {
    const result = await fetch(
      `https://api.ninehire.com/identity-access/homepage/recruitments?companyId=${this.company.companyId}&page=1&countPerPage=1000&externalTitle=&order=created_at_desc`,
      {
        headers,
        method: 'GET',
      },
    );
    const json = (await result.json()) as NinehirePostingsResponse;

    const postings = json.results;

    return postings.map((posting) => {
      const { career, employmentType } = posting;
      const link = `${this.company.url}/job_posting/${posting.addressKey}`;

      return {
        postingId: posting.recruitmentId,
        title: posting.title,
        openDate: posting.createdAt,
        dueDate: posting.deadlineValue,
        link,
        company: this.company.name,
        site: 'ninehire',
        ...NinehireCrawler.getExperience(
          career?.range?.over ?? 0,
          career?.range?.below ?? 99,
          career?.type,
        ),
        employmentType: NinehireCrawler.getEmploymentType(employmentType),
        getDescription: async () => {
          return this.getJobPostingDescription(link);
        },
      };
    });
  }
}
