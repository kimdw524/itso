import { GREETING_LIST } from '@/constats/greeting';

import { GreetingCrawler } from './greeting.crawler';

describe('그리팅 크롤러', () => {
  const greetingCrawler: GreetingCrawler = new GreetingCrawler();

  describe('채용 공고 사이트 테스트', () => {
    GREETING_LIST.map((company) => {
      it(`${company.name}에 1개 이상의 공고가 존재한다.`, async () => {
        expect(
          (await greetingCrawler.getJobPostings(company.name, company.url))
            .length,
        ).toBeGreaterThanOrEqual(1);
      });
    });
  });

  it('문자열로 된 경력사항을 객체로 변환한다.', () => {
    expect(GreetingCrawler.getExperience('신입')).toEqual({
      min: 0,
      max: 0,
    });

    expect(GreetingCrawler.getExperience('경력 무관')).toEqual({
      min: null,
      max: null,
    });

    expect(GreetingCrawler.getExperience('경력 1~5년')).toEqual({
      min: 1,
      max: 5,
    });
  });
});
