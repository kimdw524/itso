import { Crawler } from '@/crawler/crawler.abstract';
import { EmploymentType, JobPosting } from '@/crawler/crawler.interface';
import { removeHTMLAttributes } from '@/utils/parser';

import { ATSCrawler } from '../ats-crawler.abstract';
import { GREETING_LIST } from './greeting.constants';

const headers = {
  accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
  'accept-language': 'ko-KR,ko;q=0.9',
};

type GreetingEmploymentType =
  | 'MILITARY_SERVICE_EXCEPTION'
  | 'FREE_LANCER'
  | 'INTERN_WORKER'
  | 'CONTRACT_WORKER'
  | 'FULL_TIME_WORKER';

type GreetingCareerType = 'NEW_COMER' | 'EXPERIENCED' | 'NOT_MATTER';

interface GreetingPosting {
  openingId: number;
  title: string;
  openDate: string;
  dueDate: string | null;
  openingJobPosition: {
    openingJobPositions: [
      {
        jobPositionCareer: {
          careerFrom: number | null;
          careerTo: number | null;
          careerType: GreetingCareerType;
        } | null;
        jobPositionEmployment: {
          employmentType: GreetingEmploymentType;
        } | null;
      },
    ];
  };
}

interface GreetingPostingsResponse {
  props: {
    pageProps: {
      dehydratedState: {
        queries: {
          queryHash: string;
          state: {
            data: GreetingPosting[];
          };
        }[];
      };
    };
  };
}

export class GreetingCrawler extends ATSCrawler<{ name: string; url: string }> {
  /**
   * Greeting ATS를 사용하는 모든 회사 이름을 조회합니다.
   *
   * @returns 회사 이름 목록
   */
  static getAllCompanyNames(): string[] {
    return GREETING_LIST.map((company) => company.name);
  }

  /**
   * Greeting ATS 회사 목록을 기반으로 크롤러 인스턴스를 생성합니다.
   *
   * @returns Greeting ATS 회사별 크롤러 목록
   */
  static createAllCrawlers(): Crawler[] {
    const crawlers: Crawler[] = GREETING_LIST.map(({ name, url }) => {
      return new GreetingCrawler({ name, url });
    });

    return crawlers;
  }

  private static getEmploymentType(
    type: GreetingEmploymentType | undefined,
  ): EmploymentType {
    switch (type) {
      case 'CONTRACT_WORKER':
        return EmploymentType.CONTRACT;
      case 'INTERN_WORKER':
        return EmploymentType.INTERN;
      case 'MILITARY_SERVICE_EXCEPTION':
        return EmploymentType.MILITARY_ALTERNATIVE;
      case 'FREE_LANCER':
        return EmploymentType.FREE_LANCER;
      case 'FULL_TIME_WORKER':
      default:
        return EmploymentType.FULL_TIME;
    }
  }

  async getLogoUrl(): Promise<string> {
    const result = await fetch(this.company.url, {
      headers,
      method: 'GET',
    });
    const text = await result.text();

    return (
      text.split('logoUrl="')?.[1]?.split('"')?.[0] ||
      text.split('alt="logo"')?.[1]?.split('src="')?.[1]?.split('"')?.[0] ||
      ''
    );
  }

  async getJobPostingDescription(url: string): Promise<string> {
    const result = await fetch(url, {
      headers,
      method: 'GET',
    });
    const text = await result.text();
    const body =
      text
        .split('<div class="ql-editor">')?.[1]
        ?.split('</div></div></div></div>')?.[0] ?? '';

    return removeHTMLAttributes(body);
  }

  async getJobPostings(): Promise<JobPosting[]> {
    const result = await fetch(this.company.url, {
      headers,
      method: 'GET',
    });
    const text = await result.text();
    const json = JSON.parse(
      text
        .split('<script id="__NEXT_DATA__" type="application/json">')[1]
        .split('</script>')[0],
    ) as GreetingPostingsResponse;

    const postings = json.props.pageProps.dehydratedState.queries.find(
      (query) => (JSON.parse(query.queryHash) as string[])[0] === 'openings',
    )!.state.data;

    return postings
      .map((posting) => {
        try {
          const { jobPositionCareer, jobPositionEmployment } =
            posting.openingJobPosition.openingJobPositions[0];
          const employmentType = GreetingCrawler.getEmploymentType(
            jobPositionEmployment?.employmentType,
          );

          let minExperience = jobPositionCareer?.careerFrom ?? 0,
            maxExperience = jobPositionCareer?.careerTo ?? 99;

          switch (jobPositionCareer?.careerType) {
            case 'NOT_MATTER': {
              minExperience = 0;
              maxExperience = 99;
              break;
            }
            case 'NEW_COMER': {
              minExperience = 0;
              maxExperience = 0;
              break;
            }
            default: {
              minExperience = jobPositionCareer?.careerFrom ?? 0;
              maxExperience = jobPositionCareer?.careerTo ?? 99;
            }
          }

          const link = `https://${this.company.url.split('/')[2]}/ko/o/${posting.openingId}`;

          return {
            postingId: String(posting.openingId),
            title: posting.title,
            openDate: posting.openDate,
            dueDate: posting.dueDate,
            link,
            company: this.company.name,
            minExperience,
            maxExperience,
            employmentType,
            getDescription: async () => {
              return this.getJobPostingDescription(link);
            },
          } satisfies JobPosting;
        } catch {
          return null;
        }
      })
      .filter((value) => value !== null);
  }
}
