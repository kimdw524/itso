'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Spinner } from '@/shared/components';
import { parseQueryString, serializeQueryString } from '@/shared/utils';

import {
  JOB_POSTING_DEFAULT_FILTER,
  JOB_POSTING_FILTER_STORAGE,
} from '../../constants';

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

  return <Spinner fill />;
};
