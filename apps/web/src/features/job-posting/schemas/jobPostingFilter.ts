import { createSearchParamsSchema } from '@kimdw-rtk/react-search-params';
import * as z from 'zod';

import { JOB_POSTING_DEFAULT_FILTER } from '../constants';
import type { JobPostingSearchFilter } from '../models';

const filterSchema = z.object({
  companyId: z.coerce.number().optional(),
  title: z.string().optional(),
  jobIds: z.array(z.coerce.number()).optional(),
  minExperience: z.coerce.number().optional(),
  maxExperience: z.coerce.number().optional(),
  employmentTypes: z.array(z.coerce.number()).optional(),
  orderBy: z.enum(['createdAt', 'recentViews']).optional(),
});

export const jobPostingSearchParamsSchema = createSearchParamsSchema<
  Required<JobPostingSearchFilter>
>({
  defaultValue: {
    ...Object.keys(filterSchema.shape).reduce(
      (prev, current) => ({ ...prev, [current]: undefined }),
      {},
    ),
    ...JOB_POSTING_DEFAULT_FILTER,
  },
  arrayParams: ['jobIds', 'employmentTypes'],
  partial: true,
  validate(params) {
    return filterSchema.parse(params);
  },
});
