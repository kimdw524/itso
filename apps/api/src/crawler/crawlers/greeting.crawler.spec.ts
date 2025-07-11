import { GREETING_LIST } from '../../constats/greeting';
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
});
