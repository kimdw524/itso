import { NINEHIRE_LIST } from '@/constats/ninehire';

import { NinehireCrawler } from './ninehire.crawler';

describe('나인하이어 크롤러', () => {
  const ninehireCrawler: NinehireCrawler = new NinehireCrawler();

  describe('채용 공고 사이트 테스트', () => {
    NINEHIRE_LIST.map((company) => {
      it(`${company.name}에 1개 이상의 공고가 존재한다.`, async () => {
        expect(
          (
            await ninehireCrawler.getJobPostings(
              company.name,
              company.companyId,
              company.url,
            )
          ).length,
        ).toBeGreaterThanOrEqual(1);
      });
    });
  });
});
