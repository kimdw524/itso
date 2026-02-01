import * as z from 'zod';

export const companyFilterSchema = z.object({
  orderBy: z.enum(['name', 'bookmarks']).optional(),
});
