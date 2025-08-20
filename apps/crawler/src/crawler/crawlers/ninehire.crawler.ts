import { Injectable } from '@nestjs/common';

import { EMPLOYMENT_TYPE } from '@/constats/job';
import { removeHTMLAttributes, stripHTML } from '@/utils/parser';

import { JobPosting, JobPostingDetail } from '../crawler.interface';

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

@Injectable()
export class NinehireCrawler {
  async getJobPostings(
    company: string,
    companyId: string,
    url: string,
  ): Promise<JobPosting[]> {
    const result = await fetch(
      `https://api.ninehire.com/identity-access/homepage/recruitments?companyId=${companyId}&page=1&countPerPage=1000&externalTitle=&order=created_at_desc`,
      {
        headers,
        method: 'GET',
      },
    );
    const json = (await result.json()) as NinehirePostingsResponse;

    const postings = json.results;

    return postings.map((posting) => ({
      postingId: posting.recruitmentId,
      title: posting.title,
      openDate: posting.createdAt,
      dueDate: posting.deadlineValue,
      link: `${url}/job_posting/${posting.addressKey}`,
      company,
      site: 'ninehire',
    }));
  }

  private getEmploymentType(
    type?: [string],
  ): (typeof EMPLOYMENT_TYPE)[keyof typeof EMPLOYMENT_TYPE] {
    const employmentType = {
      full_time: 1,
      contractor: 2,
      freelancer: 2,
      intern: 3,
    } satisfies Record<
      string,
      (typeof EMPLOYMENT_TYPE)[keyof typeof EMPLOYMENT_TYPE]
    >;

    if (type === undefined) {
      return 1;
    }

    if (Object.hasOwn(employmentType, type[0])) {
      return employmentType[type[0] as keyof typeof employmentType];
    }

    return 2;
  }

  async getJobPostingDetail(url: string): Promise<JobPostingDetail> {
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

    const recruitment = json.props.pageProps.recruitment;

    const body = json.props.pageProps.jobPosting.content;

    return {
      html: removeHTMLAttributes(body),
      textForLLM: stripHTML(body),
      minExperience:
        recruitment.career === null
          ? 0
          : recruitment.career.type === 'experienced'
            ? recruitment.career.range!.over
            : 0,
      maxExperience:
        recruitment.career === null
          ? 99
          : recruitment.career.type === 'irrelevant'
            ? 99
            : recruitment.career.type === 'newcomer'
              ? 0
              : recruitment.career.range!.below || 99,
      employmentType: this.getEmploymentType(recruitment.employmentType),
    };
  }

  async getLogoImageURL(url: string): Promise<string> {
    try {
      const result = await fetch(`${url}/job_posting`, {
        headers,
        method: 'GET',
      });
      const text = await result.text();
      const code = text.split('2Fbrand%2F')[1].split('.png')[0];

      return `https://image.ninehire.com/brand/${code}.png`;
    } catch {
      return '';
    }
  }
}
