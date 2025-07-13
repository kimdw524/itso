import { Injectable } from '@nestjs/common';

import { EMPLOYMENT_TYPE } from '@/constats/job';
import { removeHTMLAttributes, stripHTML } from '@/utils/parser';

import { Crawler, JobPosting, JobPostingDetail } from '../crawler.interface';

const headers = {
  accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
  'accept-language': 'ko-KR,ko;q=0.9',
};

interface Greetingposting {
  openingId: number;
  job: string;
  title: string;
  openDate: string;
  dueDate: string | null;
}

interface GreetingPostingsResponse {
  props: {
    pageProps: {
      dehydratedState: {
        queries: {
          queryHash: string;
          state: {
            data: Greetingposting[];
          };
        }[];
      };
    };
  };
}

@Injectable()
export class GreetingCrawler implements Crawler {
  static getDescriptionValue(text: string, key: string): string | undefined {
    return text
      .split(`bVgotQ">${key}</span>`)?.[1]
      ?.split('jZdylq">')?.[1]
      ?.split('</span>')?.[0];
  }

  static getExperience(text: string | undefined): {
    min: number;
    max: number;
  } {
    try {
      switch (text) {
        case '신입':
          return { min: 0, max: 0 };
        case '경력 무관':
        case undefined:
          return { min: 0, max: 99 };
        default: {
          if (text.slice(-2) === '이상') {
            return {
              min: Number(text.split('경력 ')[1].split('년')[0]),
              max: 99,
            };
          }

          return {
            min: Number(text.split('경력 ')[1].split('~')[0]),
            max: Number(text.split('~')[1].split('년')[0]),
          };
        }
      }
    } catch (_) {
      return {
        min: 0,
        max: 99,
      };
    }
  }

  static getEmploymentType(
    text: string | undefined,
  ): (typeof EMPLOYMENT_TYPE)[keyof typeof EMPLOYMENT_TYPE] {
    switch (text) {
      case '계약직':
        return EMPLOYMENT_TYPE.CONTRACT;
      case '인턴':
        return EMPLOYMENT_TYPE.INTERN;
      case '병역특례':
        return EMPLOYMENT_TYPE.MILITARY_ALTERNATIVE;
      case '정규직':
      default:
        return EMPLOYMENT_TYPE.FULL_TIME;
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

    return postings.map((posting) => ({
      postingId: String(posting.openingId),
      job: posting.job,
      title: posting.title,
      openDate: posting.openDate,
      dueDate: posting.dueDate,
      link: `https://${url.split('/')[2]}/ko/o/${posting.openingId}`,
      company,
    }));
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

    const experience = GreetingCrawler.getExperience(
      GreetingCrawler.getDescriptionValue(text, '경력사항'),
    );
    const employmentType = GreetingCrawler.getEmploymentType(
      GreetingCrawler.getDescriptionValue(text, '고용형태'),
    );

    return {
      html: removeHTMLAttributes(body),
      textForLLM: `${title}\n${description}\n${stripHTML(body)}`,
      minExperience: experience.min,
      maxExperience: experience.max,
      employmentType,
    };
  }
}
