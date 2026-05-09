import { Injectable } from '@nestjs/common';

import { removeHTMLAttributes, stripHTML } from '@/utils/parser';

import {
  EmploymentType,
  JobPosting,
  JobPostingDetail,
} from '../../crawler.interface';

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

@Injectable()
export class GreetingCrawler {
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

  async getJobPostings(company: string, url: string): Promise<JobPosting[]> {
    const result = await fetch(url, {
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

          return {
            postingId: String(posting.openingId),
            title: posting.title,
            openDate: posting.openDate,
            dueDate: posting.dueDate,
            link: `https://${url.split('/')[2]}/ko/o/${posting.openingId}`,
            company,
            site: 'greeting',
            minExperience,
            maxExperience,
            employmentType,
          } satisfies JobPosting;
        } catch {
          return null;
        }
      })
      .filter((value) => value !== null);
  }

  async getJobPostingDetail(url: string): Promise<JobPostingDetail> {
    const result = await fetch(url, {
      headers,
      method: 'GET',
    });
    const text = await result.text();

    const title =
      text
        .split('style="word-wrap:break-word"')?.[1]
        ?.split('">')?.[1]
        ?.split('</span>')?.[0] ?? '';
    const description = stripHTML(
      text.split('sc-e2120ba8-2 zbjlJ">')?.[1]?.split('<iframe')?.[0] ?? '',
    );
    const body =
      text
        .split('<div class="ql-editor">')?.[1]
        ?.split('</div></div></div></div>')?.[0] ?? '';

    return {
      html: removeHTMLAttributes(body),
      textForLLM: `${title}\n${description}\n${stripHTML(body)}`,
    };
  }

  async getLogoImageURL(url: string): Promise<string> {
    const result = await fetch(url, {
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
}
