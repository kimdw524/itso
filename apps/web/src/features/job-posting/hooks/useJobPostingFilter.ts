'use client';

import { searchParamsStore } from '@/shared/store';

import { jobPostingSearchParamsSchema } from '../schemas';

export const useJobPostingFilter = () =>
  searchParamsStore.useAllParams(jobPostingSearchParamsSchema);
