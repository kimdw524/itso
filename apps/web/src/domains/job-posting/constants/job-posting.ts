import { getKeys } from '@/utils/getKeys';

const EMPLOYMENT_TYPE = {
  1: '정규직',
  2: '계약직',
  3: '인턴',
  4: '병역 특례',
} as const;

const JOB_NAME = {
  1: 'Frontend',
  2: 'Backend',
  3: 'Fullstack',
  4: 'DevOps·SRE',
  5: 'ML',
  6: 'QA·Test',
  7: 'Data',
  8: 'Embedded',
  9: 'Hardware',
  10: 'Web Publisher',
  11: 'Security',
  12: 'Designer',
  13: 'Technical Writer',
  14: 'System·Network',
  15: 'SAP·ERP·MES',
  16: 'Mobile',
  17: 'DBA',
  99: '기타',
} as const;

// 한 번에 조회할 공고의 개수
const LIST_LIMIT = 20;

export const JOB_POSTING = {
  EMPLOYMENT_TYPE,
  JOB_NAME,
  LIST_LIMIT,
};

export const JOB_ID = getKeys(JOB_POSTING.JOB_NAME).map((jobId) => jobId);
export const EMPLOYMENT_TYPE_KEY = getKeys(JOB_POSTING.EMPLOYMENT_TYPE).map(
  (type) => type,
);
