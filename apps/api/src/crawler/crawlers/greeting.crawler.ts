import { Injectable } from '@nestjs/common';

import { removeHTMLAttributes, stripHTML } from '../../utils/parser';
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

    const title = text
      .split('style="word-wrap:break-word"')[1]
      .split('">')[1]
      .split('</span>')[0];
    const description = stripHTML(
      text.split('sc-e2120ba8-2 zbjlJ">')[1].split('<iframe')[0],
    );
    const body = text
      .split('<div class="ql-editor">')[1]
      .split('</div></div></div></div>')[0];

    return {
      html: removeHTMLAttributes(body),
      textForLLM: `${title}\n${description}\n${stripHTML(body)}`,
    };
  }
}
