'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { parseQueryString, serializeQueryString } from '@/utils/queryString';

import {
  JOB_POSTING_DEFAULT_FILTER,
  JOB_POSTING_FILTER_STORAGE,
} from '../../constants/job-posting';

export const LocalJobPostingFilter = () => {
  const router = useRouter();

  useEffect(() => {
    const storageFilter = parseQueryString(
      localStorage.getItem(JOB_POSTING_FILTER_STORAGE) ?? '',
      ',',
    );
    const queryString = serializeQueryString(
      { ...JOB_POSTING_DEFAULT_FILTER, ...storageFilter },
      ',',
    );
    router.replace(`?${queryString}`);
  }, [router]);

  return <></>;
};
