import * as z from 'zod';

const multiStrings = z
  .string()
  .transform((val) => val.split(','))
  .optional();

export const jobPostingFilterSchema = z.object({
  companyId: z.coerce.number().optional(),
  title: z.string().optional(),
  jobIds: multiStrings,
  minExperience: z.coerce.number().optional(),
  maxExperience: z.coerce.number().optional(),
  employmentTypes: multiStrings,
  orderBy: z.enum(['createdAt', 'recentViews']).optional(),
});
